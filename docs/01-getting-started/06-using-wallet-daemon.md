---
title: "Using the Wallet Daemon"
slug: "using-wallet-daemon"
description: "Get started with the Enjin Wallet Daemon, an automated tool for managing blockchain transactions and assets securely and efficiently."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';

The Enjin Wallet Daemon provides a streamlined process for signing blockchain transactions, enabling seamless and efficient transactions between your game and the blockchain. This tool creates a persistent bridge between your game and the blockchain, ensuring a fluid gaming experience for players.

In the Enjin Platform context, the Wallet Daemon is a utility tool that manages a blockchain wallet address associated with an Enjin Blockchain account. When a transaction is initiated on the Enjin Platform, the Wallet Daemon receives the transaction, signs it, and sends it back to the platform. This ensures secure and efficient transaction processing for Enjin Platform users.

![A diagram of the Enjin Platform ](/img/getting-started/enjin-platform-diagram.png)

The diagram above provides insight into the interaction between the Enjin Wallet Daemon and the Enjin Platform. This illustrates how the Wallet Daemon can communicate with the API in both directions, automatically signing and broadcasting transactions to the blockchain. This helps developers better understand how the two components work together seamlessly to provide a streamlined experience.

## How the Wallet Daemon Works

![A diagram of the wallet daemon](/img/getting-started/wallet-daemon-diagram.png)

The diagram above depicts the various stages involved in creating a new collection on the Enjin Matrixchain via the Enjin Platform API.

1. **Send a mutation -** Your application calls `CreateTransaction` (with the `createCollection` discriminator) on the Enjin Platform API. The API encodes the corresponding extrinsic, stores it in its database with a `PENDING` state, and returns a transaction `uuid`.
2. **Wallet daemon requests pending transactions -** The wallet daemon repeatedly polls the Enjin Platform API for transactions to sign. This polling model — rather than the daemon accepting incoming connections — means the machine holding your <GlossaryTerm id="private_key" /> never needs to expose an open port.
3. **Sign and broadcast the transaction -** After receiving the pending transaction, the wallet daemon signs it with your private key and broadcasts it to the Enjin Matrixchain.
4. **Enjin Matrixchain processes the transaction -** If everything is valid, the Matrixchain processes the extrinsic, and the new collection is created.
5. **Enjin Platform API monitors the chain -** The Enjin Platform API watches the chain to detect when your transaction is finalized and updates the transaction record accordingly.
6. **Read the result -** Poll [`GetTransaction(uuid:)`](/03-api-reference/01-queries/01-transactions-queries.md#gettransaction) for the final `state` and `extrinsicHash`. To read the on-chain events the transaction emitted (the new `collection_id`, for example), see [Working with Events](/05-enjin-platform/03-working-with-events.md).

***

## Setup

:::note Code repository
The code repository can be found at https://github.com/enjin/wallet-daemon/
:::

It is recommended that the Enjin Wallet Daemon is installed and ran in isolation. This means running it on a dedicated server. The daemon itself is incredibly light-weight and does not require any extensive resources.

:::info Network-agnostic
The Wallet Daemon is network-agnostic — it does not need to be configured for a specific chain. A single daemon instance signs transactions for all Enjin networks (Enjin Matrixchain, Enjin Relaychain, Canary Matrixchain, and Canary Relaychain). Each chain just maps to a different SS58 address derived from the same wallet, all of which are printed when the daemon starts.
:::

The recommended way to run the daemon is to [download a prebuilt binary](#download-the-binary) for your operating system. If you'd rather run it inside Docker, see [Running with Docker](#running-with-docker) at the bottom of this page.

### Download the Binary

Download the latest release for your operating system from the [GitHub releases page](https://github.com/enjin/wallet-daemon/releases). Extract the archive — you should end up with a single executable (`wallet-daemon` on Linux/macOS, `wallet-daemon.exe` on Windows).

Place it in a directory of your choosing. From here on, "the daemon directory" refers to wherever you placed the binary.

### Create the Seed Store

Inside the daemon directory, create a `store` subdirectory. The daemon will write its encrypted wallet seed there on first launch.

```bash
mkdir store
```

### Configure the Daemon

The daemon reads its configuration from environment variables. You can either create a `.env` file in the daemon directory (recommended) or pass the variables inline when starting the binary.

| Variable       | Required | Description |
|----------------|----------|-------------|
| `PLATFORM_KEY` | Yes      | API token from the Settings page of the [Enjin Platform Cloud](https://platform.beta.enjin.io/settings). |
| `KEY_PASS`     | Yes (may be empty) | Password used to encrypt the wallet seed. Immutable once chosen. The variable must be set, but the value may be empty — see warning below. |
| `SEED_PATH`    | Yes      | **Absolute** path to the `store` directory you created above (see warning below). |

:::danger `KEY_PASS` is immutable
`KEY_PASS` is directly used to derive the wallet private key. Choose something unique and back it up securely — you cannot change it later without losing access to the wallet.

The variable itself must always be present (the daemon panics on startup if `KEY_PASS` is unset entirely). However, the value may be empty (`KEY_PASS=`), in which case the seed is effectively unencrypted at rest — anyone with read access to `wallet.seed` could recover the mnemonic. Only do this if your `store` directory is fully protected by filesystem permissions.
:::

:::warning `SEED_PATH` must be an absolute path
When running the standalone binary, `SEED_PATH` must be an **absolute** path to your `store` directory (e.g. `/home/you/wallet-daemon/store` on Linux/macOS, or `C:/Users/you/wallet-daemon/store` on Windows). A relative value such as `store` will fail because the binary resolves relative paths against the build directory baked in at compile time, not your current working directory.

If your path contains spaces, wrap the value in double quotes inside the `.env` file.
:::

#### The `.env` file

Create a `.env` file alongside the binary:

```bash
KEY_PASS=your-unique-password
PLATFORM_KEY=your-platform-api-token
SEED_PATH="C:/Users/you/wallet-daemon/store"
```

### Start the Daemon

From the daemon directory:

```bash
./wallet-daemon
```

(or `.\wallet-daemon.exe` on Windows)

On the initial launch, a 12-word mnemonic seed is generated and written to `store/wallet.seed`, encrypted with your `KEY_PASS`. The daemon prints the SS58 address for every supported chain on startup, for example:

```
******************* Enjin Wallet Daemon v3.0.1 *******************
** Enjin Relaychain   (SS58): enDD...
** Enjin Matrixchain  (SS58): efRg...
** Canary Relaychain  (SS58): cnU2...
** Canary Matrixchain (SS58): cxLx...
```

If you ever need to import this wallet into another wallet app, the derivation path is:
`<the-12-words-mnemonic-seed>///<the_key_pass>`

### Updating the Daemon

Download the latest release from the [GitHub releases page](https://github.com/enjin/wallet-daemon/releases) and replace the existing executable. Your `store/` directory and `.env` configuration remain compatible across versions.

### Importing an Existing Seed

The daemon ships with a built-in `import` command that prompts for a 12-word mnemonic and writes it to `SEED_PATH`, encrypted with your `KEY_PASS`.

:::info Wallet Daemon Encryption
The seed file is encrypted with the `KEY_PASS` env var. Make sure `KEY_PASS` is set to the password you want to encrypt the seed with — this same value will be required to decrypt and use the wallet on every subsequent run.
:::

1. Make sure your environment is configured with `KEY_PASS`, `PLATFORM_KEY`, and `SEED_PATH` (see [Configure the Daemon](#configure-the-daemon)).
2. Stop the daemon if it is currently running.
3. Run the import command. You will be prompted to type your 12-word mnemonic:
   ```bash
   ./wallet-daemon import
   ```
   (or `.\wallet-daemon.exe import` on Windows)
4. Start the daemon again as usual.

### Running with Docker

If you'd prefer to run the daemon inside Docker rather than as a standalone binary, clone the `3.x` branch of the repository (the active development branch) and use the included [`docker-compose.yml`](https://github.com/enjin/wallet-daemon/blob/3.x/docker-compose.yml).

```bash
git clone --branch 3.x https://github.com/enjin/wallet-daemon.git
cd wallet-daemon
```

Create (or edit) a `.env` file in the repository root with the following values:

```bash
KEY_PASS=your-unique-password
PLATFORM_KEY=your-platform-api-token
SEED_PATH=/wallet/store
```

`SEED_PATH=/wallet/store` is the absolute path the seed-store volume is mounted at inside the container. Then start the daemon:

```bash
docker compose up -d daemon
docker compose logs -f daemon
```

To update later, pull the repo, rebuild, and restart:

```bash
git pull
docker compose build --no-cache
docker compose up -d daemon
```

To import an existing seed under Docker, run:

```bash
docker compose run --rm daemon wallet import
```
