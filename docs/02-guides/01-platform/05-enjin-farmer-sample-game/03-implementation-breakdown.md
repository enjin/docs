---
title: "Enjin Farmer: Implementation Breakdown"
sidebar_label: "Implementation Breakdown"
slug: "implementation-breakdown"
description: "Dive deep into the code and architecture of the Enjin Farmer sample game. This technical breakdown explains the implementation flow, from the Unity client to the .NET game server. Understand the key Enjin Platform C# SDK calls used to mint, transfer, and manage NFTs in your game."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';

The **Enjin Farmer** sample project demonstrates a basic Enjin Platform integration within a Unity game. It's built with a client-server architecture to ensure security and scalability.

The project consists of two main components:

  * **🎮 Unity Game (Client):** The front-end game that players interact with. It handles gameplay, visuals, and user input, communicating with the game server to perform blockchain actions.
  * **🖥️ Game Server (Backend):** A .NET application that manages all Enjin Platform logic using the [Enjin Platform C# SDK](https://github.com/enjin/platform-csharp-sdk). It securely handles wallet creation, token minting, and other on-chain operations on behalf of the players.

### 💡 Important Considerations

Before you begin, please keep the following in mind:

  * **Demonstration Purpose:** This is a simplified example designed to showcase a basic integration. It is **not suitable for a production environment** as is.
  * **Polling, not subscriptions:** The Enjin Platform API doesn't yet expose [WebSocket events](/03-api-reference/03-websocket-events.md), so after submitting a transaction the server polls the `GetTransaction` query until it finalizes. Real-time event streaming is planned; once available it can simplify listening for finalization and for tokens arriving from external sources like the marketplace.
  * **Wallet Funding:** New managed wallets start empty. So they can pay the network fees for melting and transferring, this sample has the server automatically drip a small amount of cENJ (1 ENJ by default) from the daemon wallet to each new managed wallet. In a real-world application you'd typically use a [Fuel Tank](/02-guides/01-platform/02-managing-users/04-using-fuel-tanks.md) to subsidize transactions for all your users instead.
  * **On-chain actions aren't instant:** This sample melts and mints on-chain whenever items change hands, which takes seconds to finalize — fine for a farming demo, but unplayable for real-time action. For a production pattern that keeps item use instant while preserving on-chain ownership, see [Hot & Cold Inventories](/02-guides/01-platform/03-advanced-mechanics/07-hot-cold-inventories.md).

-----

## 🖥️ Game Server

The game server is a .NET 9 minimal-API application that talks to the Enjin Platform through the [Enjin Platform C# SDK](https://github.com/enjin/platform-csharp-sdk). It serves as the secure bridge between the game client and the platform — it holds the Enjin Platform API token, which the Unity client never sees. The main entry point is the [`Program.cs` file](https://github.com/enjin/platform-sample-game-server/blob/64949d25394526ef478b81c06a5d1e36375e455e/Program.cs), where the host, dependency injection, JWT authentication, and on-chain bootstrap are wired up.

### Configuration

The server is configured through `appsettings.json` (defaults) plus an `appsettings.Local.json` (gitignored) for your secrets. Only three values must be set; the rest have sensible defaults.

| Setting | Description |
| :--- | :--- |
| `Jwt.Secret` | A long, random string used for signing player authentication tokens. |
| `Enjin.ApiToken` | Your API token obtained from the Enjin Platform. |
| `Enjin.DaemonWalletAddress` | The SS58 address of your <GlossaryTerm id="wallet_daemon" />. This wallet owns the collection, mints the resource tokens, and funds new player wallets. |
| `Enjin.Network` / `Enjin.Chain` | The target network and chain. Defaults to `Canary` / `Matrix`. |
| `Server.Port` | The port the server listens on. Defaults to `3000` (the Unity client expects `3000`). |
| `Enjin.CollectionName` | Used to find or reuse an existing collection so a new one isn't created on every run. |
| `Enjin.ResourceTokens` | The resource tokens to create (Gold Coin, Gold Coin (Blue), Green Gem). The Unity client ships matching `EnjinItem` assets for token IDs `1`, `2`, and `3`. |
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

  * [`GET /api/setup/collection-id`](https://github.com/enjin/platform-sample-game-server/blob/64949d25394526ef478b81c06a5d1e36375e455e/Endpoints/SetupEndpoints.cs#L26): Returns the collection ID the server bootstrapped. This is called once by the Unity Editor's "Stamp Collection ID" menu (see [Setup Guide → Step 4](/02-guides/01-platform/05-enjin-farmer-sample-game/01-setup-guide.md#1-stamp-the-collection-id-onto-the-nft-items)) to write the ID onto the client's NFT item assets; the running game never calls it.

-----

## 🎮 Unity Game

The Unity game is the client-facing part of the project. It focuses on gameplay and user experience while offloading all sensitive blockchain operations to the game server.

### Core Components

The Enjin integration is managed by a few key scripts and a central prefab:

  * **`EnjinManager.prefab`**: The heart of the integration. This prefab is added to the `Farm_Outdoor` scene and configures the **Host URL** (e.g., `http://localhost:3000`) in the Inspector to connect to your game server.
  * **[`EnjinManager.cs`](https://github.com/enjin/platform-sample-game-client-unity/blob/9101b08a7f7ea2a4685c315cfb55864a6be43a25/Assets/Enjin%20Integration/Scripts/Core/EnjinManager.cs)**: A singleton controller that manages the player's session (auth token, wallet data) and exposes high-level methods like `MintToken()` for other game scripts to use.
  * **[`EnjinApiService.cs`](https://github.com/enjin/platform-sample-game-client-unity/blob/9101b08a7f7ea2a4685c315cfb55864a6be43a25/Assets/Enjin%20Integration/Scripts/API/EnjinApiService.cs)**: Handles all REST API communication with the game server using Unity's `UnityWebRequest`.
  * **[`EnjinItem.cs`](https://github.com/enjin/platform-sample-game-client-unity/blob/9101b08a7f7ea2a4685c315cfb55864a6be43a25/Assets/Enjin%20Integration/Scripts/Data/EnjinItem.cs)**: A `ScriptableObject` that represents the data of a blockchain item, such as its display name and its corresponding on-chain token ID.
  * **[`StampCollectionIdMenu.cs`](https://github.com/enjin/platform-sample-game-client-unity/blob/9101b08a7f7ea2a4685c315cfb55864a6be43a25/Assets/Enjin%20Integration/Editor/StampCollectionIdMenu.cs)**: An Editor utility that adds the **Enjin → Stamp Collection ID onto EnjinItem Assets** menu. It calls the server's `/api/setup/collection-id` endpoint and writes the returned ID onto every `EnjinItem` asset, so you don't have to paste it by hand.
  * **UI Scripts** ([`BackpackUI.cs`](https://github.com/enjin/platform-sample-game-client-unity/blob/9101b08a7f7ea2a4685c315cfb55864a6be43a25/Assets/Enjin%20Integration/Scripts/UI/BackpackUI.cs), [`BackpackItemController.cs`](https://github.com/enjin/platform-sample-game-client-unity/blob/9101b08a7f7ea2a4685c315cfb55864a6be43a25/Assets/Enjin%20Integration/Scripts/UI/BackpackItemController.cs)): Scripts that manage the UI for viewing and interacting with the player's NFT inventory.

### Initial Setup & Player Authentication

1.  **Health Check**: On launch, the client [calls the `/api/auth/health-check` endpoint](https://github.com/enjin/platform-sample-game-client-unity/blob/9101b08a7f7ea2a4685c315cfb55864a6be43a25/Assets/Enjin%20Integration/Scripts/API/EnjinApiService.cs#L43) to ensure the server is available.
2.  **Login/Register**: From the login screen, the player [clicks "Login"](https://github.com/enjin/platform-sample-game-client-unity/blob/9101b08a7f7ea2a4685c315cfb55864a6be43a25/Assets/HappyHarvest/Common/UI/SettingMenu/Script/SettingMenu.cs#L129), which calls the [`EnjinManager.Instance.RegisterAndLogin()` method](https://github.com/enjin/platform-sample-game-client-unity/blob/9101b08a7f7ea2a4685c315cfb55864a6be43a25/Assets/Enjin%20Integration/Scripts/Core/EnjinManager.cs#L174).
3.  **API Request**: This triggers `EnjinApiService` to [send a POST request to the `/api/auth/register` endpoint](https://github.com/enjin/platform-sample-game-client-unity/blob/9101b08a7f7ea2a4685c315cfb55864a6be43a25/Assets/Enjin%20Integration/Scripts/API/EnjinApiService.cs#L72).
4.  **Store Auth Token**: The server responds with a JWT authentication token. The client [saves this token locally using `PlayerPrefs`](https://github.com/enjin/platform-sample-game-client-unity/blob/9101b08a7f7ea2a4685c315cfb55864a6be43a25/Assets/Enjin%20Integration/Scripts/Core/EnjinManager.cs#L208) and [loads it on subsequent launches](https://github.com/enjin/platform-sample-game-client-unity/blob/9101b08a7f7ea2a4685c315cfb55864a6be43a25/Assets/Enjin%20Integration/Scripts/Core/EnjinManager.cs#L219) for a seamless experience.

### In-Game NFT Interactions

All blockchain actions are initiated by the client but securely executed by the server.

#### Harvesting and Minting Tokens

When a player [harvests a crop with the Hoe tool](https://github.com/enjin/platform-sample-game-client-unity/blob/9101b08a7f7ea2a4685c315cfb55864a6be43a25/Assets/HappyHarvest/Scripts/Items/Hoe.cs#L18), they have a chance to find a resource token.

1.  An `EnjinToken` GameObject [appears on the harvested tile](https://github.com/enjin/platform-sample-game-client-unity/blob/9101b08a7f7ea2a4685c315cfb55864a6be43a25/Assets/Enjin%20Integration/Scripts/Core/EnjinManager.cs#L262).
2.  When the player collects this GameObject, its [`InteractedWith()` method](https://github.com/enjin/platform-sample-game-client-unity/blob/9101b08a7f7ea2a4685c315cfb55864a6be43a25/Assets/Enjin%20Integration/Scripts/Gameplay/EnjinToken.cs#L21) is triggered.
3.  This calls [`EnjinItem.Collect()`](https://github.com/enjin/platform-sample-game-client-unity/blob/9101b08a7f7ea2a4685c315cfb55864a6be43a25/Assets/Enjin%20Integration/Scripts/Data/EnjinItem.cs#L37), which in turn calls `EnjinManager.Instance.MintToken()`.
4.  `EnjinManager` then uses `EnjinApiService` to [send a request to the `/api/token/mint` endpoint](https://github.com/enjin/platform-sample-game-client-unity/blob/9101b08a7f7ea2a4685c315cfb55864a6be43a25/Assets/Enjin%20Integration/Scripts/API/EnjinApiService.cs#L97).

#### Viewing the Wallet (Backpack UI)

1.  Clicking the backpack icon opens the inventory screen, managed by `BackpackUI.cs`.
2.  The UI [calls `EnjinManager.Instance.GetManagedWalletTokens()`](https://github.com/enjin/platform-sample-game-client-unity/blob/9101b08a7f7ea2a4685c315cfb55864a6be43a25/Assets/Enjin%20Integration/Scripts/UI/BackpackUI.cs#L117), which [sends a request to the `/api/wallet/get-tokens` endpoint](https://github.com/enjin/platform-sample-game-client-unity/blob/9101b08a7f7ea2a4685c315cfb55864a6be43a25/Assets/Enjin%20Integration/Scripts/API/EnjinApiService.cs#L205).
3.  The `BackpackUI` then [populates the view with the returned tokens](https://github.com/enjin/platform-sample-game-client-unity/blob/9101b08a7f7ea2a4685c315cfb55864a6be43a25/Assets/Enjin%20Integration/Scripts/UI/BackpackUI.cs#L80).
4.  The `BackpackUI` also [subscribes to the `EnjinManager.Instance.OnWalletUpdated` event](https://github.com/enjin/platform-sample-game-client-unity/blob/9101b08a7f7ea2a4685c315cfb55864a6be43a25/Assets/Enjin%20Integration/Scripts/UI/BackpackUI.cs#L46) to automatically refresh the inventory after a token is [minted](https://github.com/enjin/platform-sample-game-client-unity/blob/9101b08a7f7ea2a4685c315cfb55864a6be43a25/Assets/Enjin%20Integration/Scripts/Core/EnjinManager.cs#L116), [melted](https://github.com/enjin/platform-sample-game-client-unity/blob/9101b08a7f7ea2a4685c315cfb55864a6be43a25/Assets/Enjin%20Integration/Scripts/Core/EnjinManager.cs#L132), or [transferred](https://github.com/enjin/platform-sample-game-client-unity/blob/9101b08a7f7ea2a4685c315cfb55864a6be43a25/Assets/Enjin%20Integration/Scripts/Core/EnjinManager.cs#L148).

#### Melting and Transferring Tokens

  * **Melting**: The player [clicks "Melt" in the backpack](https://github.com/enjin/platform-sample-game-client-unity/blob/9101b08a7f7ea2a4685c315cfb55864a6be43a25/Assets/Enjin%20Integration/Scripts/UI/BackpackItemController.cs#L53). This flows through [`EnjinManager.MeltToken()`](https://github.com/enjin/platform-sample-game-client-unity/blob/9101b08a7f7ea2a4685c315cfb55864a6be43a25/Assets/Enjin%20Integration/Scripts/Core/EnjinManager.cs#L125) and sends a request to the [`/api/token/melt` endpoint](https://github.com/enjin/platform-sample-game-client-unity/blob/9101b08a7f7ea2a4685c315cfb55864a6be43a25/Assets/Enjin%20Integration/Scripts/API/EnjinApiService.cs#L126).
  * **Transferring**: The player [clicks "Send"](https://github.com/enjin/platform-sample-game-client-unity/blob/9101b08a7f7ea2a4685c315cfb55864a6be43a25/Assets/Enjin%20Integration/Scripts/UI/BackpackItemController.cs#L75), which flows through [`EnjinManager.TransferToken()`](https://github.com/enjin/platform-sample-game-client-unity/blob/9101b08a7f7ea2a4685c315cfb55864a6be43a25/Assets/Enjin%20Integration/Scripts/Core/EnjinManager.cs#L141) and sends a request to the [`/api/token/transfer` endpoint](https://github.com/enjin/platform-sample-game-client-unity/blob/9101b08a7f7ea2a4685c315cfb55864a6be43a25/Assets/Enjin%20Integration/Scripts/API/EnjinApiService.cs#L155).
