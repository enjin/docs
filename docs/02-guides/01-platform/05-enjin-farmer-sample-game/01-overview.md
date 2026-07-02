---
title: "Enjin Farmer: Overview & Server Setup"
sidebar_label: "Overview & Server Setup"
slug: "overview"
description: "Overview of the Enjin Farmer sample game — a hands-on Enjin NFT integration available for both Unity and Godot — plus full setup for the shared .NET game server, Enjin Platform, and Wallet Daemon."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';

Welcome! The **Enjin Farmer** is a sample farming game that shows how to integrate Enjin's NFT technology into a real game. You plant seeds, harvest crops, and collect resources — some of which are minted as NFTs directly to your in-game wallet. You can then view those NFTs in your inventory, <GlossaryTerm id="melt" /> them, or transfer them to an external wallet.

The sample comes in **two flavors that share the same backend**:

- 🟦 **[Unity client](/02-guides/01-platform/05-enjin-farmer-sample-game/02-unity.md)** — built with Unity.
- 🟧 **[Godot client](/02-guides/01-platform/05-enjin-farmer-sample-game/03-godot.md)** — built with Godot.

Both talk to the **same .NET game server**, so this page covers everything common to both: the architecture, prerequisites, and how to stand up the server, Enjin Platform, and Wallet Daemon. Once the server is running, head to the page for your engine to set up and run the client.

### System Architecture

The project consists of four main components that work together:

  - **Game Client ([Unity](https://github.com/enjin/platform-sample-game-client-unity) or [Godot](https://github.com/enjin/platform-sample-game-client-godot)):** The game itself, where you play and interact with items.
  - **[Game Server (.NET)](https://github.com/enjin/platform-sample-game-server):** A backend API, built on the [Enjin Platform C# SDK](https://github.com/enjin/platform-csharp-sdk), that the game client communicates with to handle all NFT-related actions like minting and transferring.
  - **<GlossaryTerm id="enjin_platform" />:** The cloud-based service that provides the core NFT infrastructure.
  - **Wallet Daemon:** A secure application that manages a wallet on behalf of the game to automatically sign and approve transactions.

-----

### 💡 Important Considerations

Before you begin, please keep the following in mind:

  * **Demonstration Purpose:** This is a simplified example designed to showcase a basic integration. It is **not suitable for a production environment** as is.
  * **Polling, not subscriptions:** The Enjin Platform API doesn't yet expose [WebSocket events](/03-api-reference/03-websocket-events.md), so after submitting a transaction the server polls the `GetTransaction` query until it finalizes. Real-time event streaming is planned; once available it can simplify listening for finalization and for tokens arriving from external sources like the marketplace.
  * **Wallet Funding:** New managed wallets start empty. So they can pay the network fees for melting and transferring, this sample has the server automatically drip a small amount of cENJ (1 ENJ by default) from the daemon wallet to each new managed wallet. In a real-world application you'd typically use a [Fuel Tank](/02-guides/01-platform/02-managing-users/04-using-fuel-tanks.md) to subsidize transactions for all your users instead.
  * **On-chain actions aren't instant:** This sample melts and mints on-chain whenever items change hands, which takes seconds to finalize — fine for a farming demo, but unplayable for real-time action. For a production pattern that keeps item use instant while preserving on-chain ownership, see [Hot & Cold Inventories](/02-guides/01-platform/03-advanced-mechanics/07-hot-cold-inventories.md).

-----

## Prerequisites

Before you begin, make sure you have the following. These are the requirements for the **shared server**; each engine page lists the extra tooling its client needs (Unity Hub, or the Godot editor).

  - ✅ The **[.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)** for running the game server.
  - ✅ **Git** for cloning the repositories.
  - ✅ An **Enjin Platform account**. If you don't have one, you can create it [here](https://platform.beta.enjin.io/).
  - ✅ Some cENJ tokens (can be acquired from the [built-in Canary faucet](/01-getting-started/04-using-the-enjin-platform.md#canary-faucet) in the Platform UI).

-----

## Step 1: Download the Server & Wallet Daemon

1.  **Clone the Game Server:** Open a terminal and run:

    ```bash
    git clone https://github.com/enjin/platform-sample-game-server.git
    ```

2.  **Download the Wallet Daemon:** Download the prebuilt daemon for your operating system from [https://enj.in/daemon](https://enj.in/daemon) and extract it into a dedicated directory.

:::note
You'll clone your engine's **game client** (Unity or Godot) on its own setup page, after the server is running.
:::

-----

## Step 2: Configure Enjin Services

Next, you'll set up your Enjin Platform account and the Wallet Daemon.

### Enjin Platform

1. Log in to your [Enjin Platform](https://platform.beta.enjin.io/) account.
2. Head over to your [account settings page](https://platform.beta.enjin.io/settings).
3. Navigate to the **Daemon Wallet** section and create a new API Token.
4. Copy the **API Token**; you will need this in the next step.

### Wallet Daemon

The Wallet Daemon is the signer that approves your game server's transactions. It runs from the command line and is configured with a `.env` file.

1. In the daemon directory you extracted, copy the `.env.example` file to `.env`.
2. Open `.env` and set the two required values:
    - `PLATFORM_KEY`: The **API Token** you just copied from the Enjin Platform.
    - `KEY_PASS`: A unique, high-entropy password used to encrypt the wallet seed. Store it somewhere safe — you'll need it every time the daemon starts.
3. Start the daemon — `./wallet-daemon` (or `.\wallet-daemon.exe` on Windows). On first run it generates a new wallet, writes the encrypted seed to `wallet.seed`, and prints an SS58 address for each network.
4. From the printed addresses, **copy the Canary Matrixchain address** — that's the network this sample uses. You'll need it in the next step.

:::tip
For a detailed guide — including Docker, AWS, importing an existing seed, and backup guidance — see the [Wallet Daemon documentation](/01-getting-started/06-using-wallet-daemon.md).
:::

-----

## Step 3: Configure and Run the Game Server

Now, let's set up the backend server that powers the game's NFT features.

:::warning Before you run: .NET SDK + internet
The server targets .NET 9, so install the **[.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)** — it provides both the build tools and the .NET 9 runtime the server runs on. After installing, open a **new** terminal and confirm with `dotnet --list-sdks` (you should see a `9.x` entry).

If you only have a newer SDK such as .NET 10, the build will succeed but `dotnet run` fails with `You must install or update .NET … version '9.0.0'`, because the .NET 9 **runtime** is missing. Either install the .NET 9 SDK (simplest), or run on the newer runtime with `dotnet run --roll-forward Major`.

The first `dotnet run` restores the server's dependencies — including the [Enjin Platform C# SDK](https://www.nuget.org/packages/Enjin.Platform.Sdk) — from NuGet, so you need internet access. If restore fails with `NU1100: Unable to resolve …`, your machine has no usable NuGet source. Run `dotnet nuget list source`: if it says `No sources found` (or `nuget.org` is `[Disabled]`), add it with:

```bash
dotnet nuget add source https://api.nuget.org/v3/index.json -n nuget.org
```
:::

1. Navigate into the game server directory you cloned: `cd platform-sample-game-server`.
2. Copy the `appsettings.Sample.json` file and rename the copy to `appsettings.Local.json` (this file is gitignored, so your secrets stay out of version control).
3. Open `appsettings.Local.json` and fill in the following values:
    - `Jwt.Secret`: A long, random string (32+ characters). This is used for authenticating players.
    - `Enjin.ApiToken`: Paste the **API Token** from your Enjin Platform account.
    - `Enjin.DaemonWalletAddress`: Paste the daemon's **Canary Matrixchain** address you copied in the previous step.

   The remaining settings have sensible defaults in `appsettings.json` (for example, `Server.Port` defaults to `3000`), so you can leave them as-is for testing.
4. Launch the server for the first time by running `dotnet run`.

The server will now connect to the Enjin Platform, create a new NFT collection for your game (or reuse an existing one), and create the NFT tokens for the in-game resources. This can take a minute or two on first run while it waits for the on-chain transactions to finalize.

:::info **Important**
The server stores the **Collection ID** it bootstraps in a `state.json` file and reuses it on every restart, so you no longer need to copy it by hand — you'll stamp it onto the game client automatically when you set up your engine's client. When you see `Now listening on: http://[::]:3000` (and `Application started`) in the logs, the server is ready.
:::

:::note Windows firewall prompt
On Windows, the first time the server starts listening you may get a prompt to allow network access — click **Allow**. You don't need to restart the server afterwards; it keeps running and works right away.
:::

Keep the server and the Wallet Daemon running in the background.

-----

## Server Implementation Breakdown

The game server is a .NET 9 minimal-API application that talks to the Enjin Platform through the [Enjin Platform C# SDK](https://github.com/enjin/platform-csharp-sdk). It serves as the secure bridge between the game client and the platform — it holds the Enjin Platform API token, which the game client never sees. The main entry point is the [`Program.cs` file](https://github.com/enjin/platform-sample-game-server/blob/64949d25394526ef478b81c06a5d1e36375e455e/Program.cs), where the host, dependency injection, JWT authentication, and on-chain bootstrap are wired up.

### Configuration

The server is configured through `appsettings.json` (defaults) plus an `appsettings.Local.json` (gitignored) for your secrets. Only three values must be set; the rest have sensible defaults.

| Setting | Description |
| :--- | :--- |
| `Jwt.Secret` | A long, random string used for signing player authentication tokens. |
| `Enjin.ApiToken` | Your API token obtained from the Enjin Platform. |
| `Enjin.DaemonWalletAddress` | The SS58 address of your <GlossaryTerm id="wallet_daemon" />. This wallet owns the collection, mints the resource tokens, and funds new player wallets. |
| `Enjin.Network` / `Enjin.Chain` | The target network and chain. Defaults to `Canary` / `Matrix`. |
| `Server.Port` | The port the server listens on. Defaults to `3000` (both the Unity and Godot clients default to `3000`). |
| `Enjin.CollectionName` | Used to find or reuse an existing collection so a new one isn't created on every run. |
| `Enjin.ResourceTokens` | The resource tokens to create (Gold Coin, Gold Coin (Blue), Green Gem). Both the Unity and Godot clients ship matching item assets for token IDs `1`, `2`, and `3`. |
| `Enjin.Ss58Prefix` | The prefix used to encode wallet public keys into addresses. `9030` = Canary Matrixchain, `1110` = Enjin Mainnet Matrixchain. |
| `Enjin.DripEnjEnabled` / `Enjin.DripEnjAmount` | Whether to auto-fund each new managed wallet, and how much (default `1` ENJ). |

The strongly-typed config classes live in [`Services/Options.cs`](https://github.com/enjin/platform-sample-game-server/blob/64949d25394526ef478b81c06a5d1e36375e455e/Services/Options.cs), and all the defaults are in [`appsettings.json`](https://github.com/enjin/platform-sample-game-server/blob/64949d25394526ef478b81c06a5d1e36375e455e/appsettings.json).

### Server Initialization & Collection Setup

On startup — before serving any requests — the server runs [`PrepareCollectionAsync`](https://github.com/enjin/platform-sample-game-server/blob/64949d25394526ef478b81c06a5d1e36375e455e/Services/EnjinService.cs#L75) to make sure the collection and resource tokens exist.

1.  **Reuse or create the collection:** If no collection ID is stored yet, the server first [queries `GetCollections`](https://github.com/enjin/platform-sample-game-server/blob/64949d25394526ef478b81c06a5d1e36375e455e/Services/EnjinService.cs#L137) for one owned by the daemon wallet whose `name` attribute matches `Enjin.CollectionName` — this avoids creating duplicates if local state was lost. If none exists, it [creates one](https://github.com/enjin/platform-sample-game-server/blob/64949d25394526ef478b81c06a5d1e36375e455e/Services/EnjinService.cs#L165).

    In v3, every on-chain mutation goes through a single **`CreateTransaction`** mutation: you populate a `TransactionInput` with one of its method fields (`CreateCollection`, `CreateToken`, `MintToken`, `BurnToken`, `TransferToken`, …) and submit it. Collection creation looks like this:
    ```csharp
    var transaction = new TransactionInput
    {
        CreateCollection = new CreateCollectionInput
        {
            Attributes = new List<AttributeInput>
            {
                new() { Key = "name", Value = _opts.CollectionName },
                // banner_image, media, ...
            },
        },
    };

    var submitted = await CreateTransactionAsync(transaction, signerExternalId: null, ct);
    await WaitForFinalizationAsync(submitted.Uuid!, "collection creation", ct);
    ```
    [`CreateTransactionAsync`](https://github.com/enjin/platform-sample-game-server/blob/64949d25394526ef478b81c06a5d1e36375e455e/Services/EnjinService.cs#L582) builds the mutation with the SDK's query builders and sends it. The <GlossaryTerm id="wallet_daemon" /> picks the transaction up and signs it automatically:
    ```csharp
    var mutation = new MutationQueryBuilder().WithCreateTransaction(
        new TransactionQueryBuilder().WithUuid().WithState(),
        _network, _chain,
        transaction: input,
        signerExternalId: signerExternalId);

    var resp = await _client.SendMutation(mutation);
    ```

2.  **Wait for finalization:** `CreateTransaction` returns a transaction UUID. The server then [polls `GetTransaction`](https://github.com/enjin/platform-sample-game-server/blob/64949d25394526ef478b81c06a5d1e36375e455e/Services/EnjinService.cs#L608) by that UUID until `State` is `FINALIZED` (it throws if the transaction ends up `FAILED`, `ABANDONED`, or `TIMEOUT`). The new collection's ID is then recovered by querying `GetCollections` and matching on the `name` attribute. In a real-world application you'd instead listen for the collection-creation event rather than query for it — see [WebSocket Events](/03-api-reference/03-websocket-events.md).

3.  **Create resource tokens:** For each entry in `Enjin.ResourceTokens`, the server [checks whether the token already exists](https://github.com/enjin/platform-sample-game-server/blob/64949d25394526ef478b81c06a5d1e36375e455e/Services/EnjinService.cs#L200) with a `GetToken` query and, if not, [creates it](https://github.com/enjin/platform-sample-game-server/blob/64949d25394526ef478b81c06a5d1e36375e455e/Services/EnjinService.cs#L219) with a `CreateToken` input.

4.  **Persist:** The resolved collection ID is written to `state.json` so subsequent runs reuse it instead of re-creating anything.

After this, the server starts listening and logs the collection ID and `Server listening on http://0.0.0.0:3000`.

### Managed Wallets & Addresses

Each player gets one [managed wallet](/02-guides/01-platform/02-managing-users/03-using-managed-wallets.md), keyed by their email as the `externalId`. The server [ensures it exists](https://github.com/enjin/platform-sample-game-server/blob/64949d25394526ef478b81c06a5d1e36375e455e/Services/EnjinService.cs#L274) by calling the `CreateManagedWallet` mutation; because the platform provisions wallets asynchronously, the server then polls `GetManagedWallet` until the wallet is queryable. The platform returns the wallet's **public key** as hex, which the server [SS58-encodes locally](https://github.com/enjin/platform-sample-game-server/blob/64949d25394526ef478b81c06a5d1e36375e455e/Services/EnjinService.cs#L382) (using `Enjin.Ss58Prefix`) into the address used as a mint recipient and holder. Each new wallet is also [dripped a little ENJ](https://github.com/enjin/platform-sample-game-server/blob/64949d25394526ef478b81c06a5d1e36375e455e/Services/EnjinService.cs#L313) from the daemon so it can pay transaction fees.

### API Endpoints

The server exposes several endpoints to handle game actions. The `wallet` and `token` route groups require a valid JWT (`.RequireAuthorization()`, backed by the [JWT bearer configuration in `Program.cs`](https://github.com/enjin/platform-sample-game-server/blob/64949d25394526ef478b81c06a5d1e36375e455e/Program.cs#L70)). Each protected handler reads the player's `email` claim and uses it as the `externalId` when talking to the platform.

#### Authentication

  * [`GET /api/auth/health-check`](https://github.com/enjin/platform-sample-game-server/blob/64949d25394526ef478b81c06a5d1e36375e455e/Endpoints/AuthEndpoints.cs#L16): A simple endpoint to verify that the server is online.
  * [`POST /api/auth/register`](https://github.com/enjin/platform-sample-game-server/blob/64949d25394526ef478b81c06a5d1e36375e455e/Endpoints/AuthEndpoints.cs#L23): Registers a new player **or** logs in an existing one (the client uses this single endpoint for both), returning a JWT. On first registration it also [provisions the player's managed wallet](https://github.com/enjin/platform-sample-game-server/blob/64949d25394526ef478b81c06a5d1e36375e455e/Endpoints/AuthEndpoints.cs#L45) and drips it some cENJ, using the player's [email address as the unique `externalId`](https://github.com/enjin/platform-sample-game-server/blob/64949d25394526ef478b81c06a5d1e36375e455e/Services/AuthService.cs#L29).

#### Wallet Management

  * [`GET /api/wallet/get-tokens`](https://github.com/enjin/platform-sample-game-server/blob/64949d25394526ef478b81c06a5d1e36375e455e/Endpoints/WalletEndpoints.cs#L16): Retrieves the player's managed wallet and the resource-token balances it holds. It [looks up the wallet](https://github.com/enjin/platform-sample-game-server/blob/64949d25394526ef478b81c06a5d1e36375e455e/Services/EnjinService.cs#L395) via `GetManagedWallet`, then queries `GetToken` for each resource token and filters the holder list down to the player's address.

#### Token Actions

  * [`POST /api/token/mint`](https://github.com/enjin/platform-sample-game-server/blob/64949d25394526ef478b81c06a5d1e36375e455e/Endpoints/TokenEndpoints.cs#L14): Mints a token into the player's managed wallet via [`MintTokenAsync`](https://github.com/enjin/platform-sample-game-server/blob/64949d25394526ef478b81c06a5d1e36375e455e/Services/EnjinService.cs#L507). The daemon signs it.
    ```csharp
    var input = new TransactionInput
    {
        MintToken = new MintTokenInput
        {
            Recipient = recipientAddress,
            CollectionId = RequireCollectionId(),
            TokenId = tokenId,
            Amount = amount,
        },
    };
    ```
  * [`POST /api/token/melt`](https://github.com/enjin/platform-sample-game-server/blob/64949d25394526ef478b81c06a5d1e36375e455e/Endpoints/TokenEndpoints.cs#L36): Melts (burns) a token from the player's wallet via [`MeltTokenAsync`](https://github.com/enjin/platform-sample-game-server/blob/64949d25394526ef478b81c06a5d1e36375e455e/Services/EnjinService.cs#L527). Since the burn must come from the player's managed wallet, the call passes the player's email as `signerExternalId` so the daemon signs on that wallet's behalf. ([Learn more about managed wallets here](/02-guides/01-platform/02-managing-users/03-using-managed-wallets.md))
    ```csharp
    var input = new TransactionInput
    {
        BurnToken = new BurnTokenInput
        {
            CollectionId = RequireCollectionId(),
            TokenId = tokenId,
            Amount = amount,
        },
    };
    ```
  * [`POST /api/token/transfer`](https://github.com/enjin/platform-sample-game-server/blob/64949d25394526ef478b81c06a5d1e36375e455e/Endpoints/TokenEndpoints.cs#L57): Transfers a token from the player's managed wallet to another SS58 address via [`TransferTokenAsync`](https://github.com/enjin/platform-sample-game-server/blob/64949d25394526ef478b81c06a5d1e36375e455e/Services/EnjinService.cs#L546), again signed via the player's `signerExternalId`.
    ```csharp
    var input = new TransactionInput
    {
        TransferToken = new TransferTokenInput
        {
            Recipient = recipientAddress,
            CollectionId = RequireCollectionId(),
            TokenId = tokenId,
            Amount = amount,
        },
    };
    ```

#### Setup

  * [`GET /api/setup/collection-id`](https://github.com/enjin/platform-sample-game-server/blob/64949d25394526ef478b81c06a5d1e36375e455e/Endpoints/SetupEndpoints.cs#L26): Returns the collection ID the server bootstrapped. This is called once by the engine client's "Stamp Collection ID" tool to write the ID onto the client's NFT item assets; the running game never calls it.

-----

## Next: set up your client

The server, Enjin Platform, and Wallet Daemon are now configured. Keep the **server** and the **Wallet Daemon** running, then continue to the page for your engine:

  - 🟦 **[Set up the Unity client →](/02-guides/01-platform/05-enjin-farmer-sample-game/02-unity.md)**
  - 🟧 **[Set up the Godot client →](/02-guides/01-platform/05-enjin-farmer-sample-game/03-godot.md)**
