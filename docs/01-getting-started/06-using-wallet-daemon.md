---
title: "Using the Wallet Daemon"
slug: "using-wallet-daemon"
description: "Get started with the Enjin Wallet Daemon, an automated tool for managing blockchain transactions and assets securely and efficiently."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Enjin Wallet Daemon provides a streamlined process for signing blockchain transactions, enabling seamless and efficient transactions between your game and the blockchain. This tool creates a persistent bridge between your game and the blockchain, ensuring a fluid gaming experience for players.

In the Enjin Platform context, the Wallet Daemon is a utility tool that manages a blockchain wallet address associated with an Enjin Blockchain account. When a transaction is initiated on the Enjin Platform, the Wallet Daemon receives the transaction, signs it, and sends it back to the platform. This ensures secure and efficient transaction processing for Enjin Platform users.

![A diagram of the Enjin Platform ](/img/getting-started/enjin-platform-diagram.png)

The diagram above provides insight into the interaction between the Enjin Wallet Daemon and the Enjin Platform. This illustrates how the Wallet Daemon can communicate with the API in both directions, automatically signing and broadcasting transactions to the blockchain. This helps developers better understand how the two components work together seamlessly to provide a streamlined experience.

## Wallet Daemon Events

![A diagram of the wallet daemon](/img/getting-started/wallet-daemon-diagram.png)

The diagram above depicts the various stages involved in creating a new collection on the Enjin Matrixchain via the Enjin Platform API, with a particular emphasis on the Wallet Daemon events.

1. **Establish a WebSocket connection -** Connect to a WebSocket server to subscribe to channels that receive events.
2. **Subscribe to a WebSocket channel -** Subscribe to the channel associated with your wallet to receive real-time events.
3. **Send a mutation -** Send a "CreateCollection" mutation to the Enjin Platform API to create a new collection on the Enjin Matrixchain. The API will encode the transaction that the wallet daemon needs to sign and save it in the Enjin Platform Database.
4. **Wallet daemon requests pending transactions -** The wallet daemon repeatedly asks the Enjin Platform API if there are any transactions to sign to prevent incoming connections to the wallet daemon, which holds your <GlossaryTerm id="private_key" />.
5. **Sign and broadcast the transaction -** After receiving the pending transaction, the wallet daemon signs it with your private key and broadcasts it to the Enjin Matrixchain.
6. **Enjin Matrixchain processes the transaction -** If everything is correct and valid, the Matrixchain successfully processes the extrinsic sent by the wallet daemon, and the new collection is created.
7. **Enjin Platform API monitors the chain -** The Enjin Platform API continually watches the chain via a WebSocket connection to detect any activity.
8. **Save the data to the database -** The Enjin Platform API stores the new collection data in its own database, allowing you to query it as desired.
9. **Emit an event -** The Enjin Platform API sends an event to the WebSocket channels, providing you with the opportunity to take appropriate actions if you're subscribed to the relevant channel.

***

:::info There are two approaches for running the Wallet Daemon:
- Using the [Wallet Daemon Executable](#wallet-daemon-executable).
- Setting up [Wallet Daemon via Docker](#setting-up-wallet-daemon-via-docker).
:::

:::tip Choosing the Right Approach for Running the Wallet Daemon
There are two ways to run the Wallet Daemon, each suitable for different user profiles and use cases:
1. **Executable Approach:** This method involves running a simple executable, configuring it via a user interface, and clicking 'Run' to start it. It is the most straightforward approach and is recommended for beginners or those who are not developers and for development environments / personal use. Learn how to set it up in our [Setting up Wallet Daemon using Executable](#wallet-daemon-executable) guide.  
2. **Docker Approach:** This method involves cloning a GitHub repository and modifying the configuration files. It offers more flexibility and control, making it suitable for developers and for production use. Learn how to set it up in our [Setting up Wallet Daemon using Docker](#setting-up-wallet-daemon-via-docker) guide.

Choose the approach that best fits your technical proficiency and the needs of your project.
:::

## Wallet Daemon Executable

![The wallet daemon executable app](/img/getting-started/wallet-daemon-executable-welcome.png)

Setting up the Wallet Daemon Executable is a straight forward process.  
Download the latest version of the Wallet Daemon from [GitHub](https://github.com/enjin/wallet-daemon-ui/releases), extract it, and run the `enjin_wallet_daemon.exe` executable file.  
Follow the on-screen instructions to set it up and make sure to insert your Enjin Platform API Token from your [account settings page](https://platform.canary.enjin.io/settings).

![Configuring the Wallet Daemon Executable with Enjin Platform](/img/getting-started/daemon-exec-overview.gif)

## Setting up Wallet Daemon via Docker

:::note Code repository
The code repository can be found at https://github.com/enjin/platform
:::

It is recommended that the Enjin Wallet Daemon is installed and ran in isolation. This means running it on a dedicated server. The daemon itself is incredibly light-weight and does not require any extensive resources.

:::tip Have Docker installed?
If you don't have Docker installed, please review the [Platform Local Installation Guide](/02-guides/04-going-open-source/01-self-hosting.md) for more information.
:::

You can do this by first cloning the `enjin/platform` repository from GitHub with the submodules:

```bash
git clone --recurse-submodules https://github.com/enjin/platform.git
```

### Configure Daemon

You will want to update the `configs/daemon/.env` file with the `PLATFORM_KEY` (which is an API Token generated within the Settings page of the Enjin Platform Cloud). In addition to this, you'll want to specify a unique `KEY_PASS`.

:::danger Important note
The `KEY_PASS` is immutable. It is directly used to derive the wallet private key. Choose something unique and make sure to backup this `KEY_PASS` in a secure manner.
:::

The final configuration is to update the `configs/daemon/config.json` file to communicate with either the Enjin Blockchain (mainnet) or Canary Blockchain (testnet). You can do this by updating the node property in the JSON file. You can find an example of both networks below.

<Tabs>
  <TabItem value="mainnet" label="Enjin Blockchain">
```
{  
  "node": "wss://rpc.matrix.blockchain.enjin.io:443",  
  "relay_node": "wss://rpc.relay.blockchain.enjin.io:443",  
  "api": "https://platform.enjin.io/graphql",  
  "master_key": "/opt/app/storage"  
}
```
  </TabItem>
  <TabItem value="canary" label="Canary Blockchain">
```
{  
  "node": "wss://rpc.matrix.canary.enjin.io:443",  
  "relay_node": "wss://rpc.relay.canary.enjin.io:443",  
  "api": "https://platform.canary.enjin.io/graphql",  
  "master_key": "/opt/app/storage"  
}
```
  </TabItem>
</Tabs>

### Starting the Daemon

Finally, you can spin up the daemon using the following command from the platform directory:

`docker compose up -d daemon`

### Importing Daemon Wallet From Existing Seed

:::info Daemon Wallets Encryption
Daemon wallets may be encrypted with a password specified in the `KEY_PASS` env var located in `configs/daemon/.env`.  
If your existing wallet is encrypted with a password, make sure to update your `KEY_PASS` var accordingly.  
If your existing wallet is not encrypted, leave the `KEY_PASS` var empty.  
:::

Follow the steps below to set up your wallet daemon from an existing seed:

1. Find your wallet's public key. You can convert your wallet's account address to it's public key with the [Account Format Transform](https://matrix.subscan.io/tools/format_transform) tool.  
   We'll use wallet address `efRP7f5aFWWobNiNxcWGNxhY1RdRXZ4kScvwuFdD4bsBHEUZW` as an example. It's public key is `0x62c75d8f81e05794cd0b703cf07b7ea3196840eaac4e300cb968fdd266882e02`.
2. Remove the 0x from the public key from step #1.  
   For our example, it's `62c75d8f81e05794cd0b703cf07b7ea3196840eaac4e300cb968fdd266882e02`
3. Inside your platform's `configs/daemon/store` folder, create a file with the name `73723235<string from step #2>`.  
   For our example, we've created the file `configs/daemon/store/7372323562c75d8f81e05794cd0b703cf07b7ea3196840eaac4e300cb968fdd266882e02`
4. Inside the new file created on step #3, insert your wallet's mnemonic seed wrapped with double quotes.  
   Example: `"earn meat maid rotate ..."`
5. Rebuild your platform for the changes to take effect:  
   `docker compose build`
6. Run the daemon again:  
   `docker compose up daemon`
