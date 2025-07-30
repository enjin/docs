---
title: "Enjin Farmer: Implementation Breakdown"
sidebar_label: "Implementation Breakdown"
slug: "implementation-breakdown"
description: "Dive deep into the code and architecture of the Enjin Farmer sample game. This technical breakdown explains the implementation flow, from the Unity client to the Node.js game server. Understand the key GraphQL mutations and API calls used to mint, transfer, and manage NFTs in your game."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';

The **Enjin Farmer** sample project demonstrates a basic Enjin Platform integration within a Unity game. It's built with a client-server architecture to ensure security and scalability.

The project consists of two main components:

  * **🎮 Unity Game (Client):** The front-end game that players interact with. It handles gameplay, visuals, and user input, communicating with the game server to perform blockchain actions.
  * **🖥️ Game Server (Backend):** A Node.js application that manages all Enjin Platform logic. It securely handles wallet creation, token minting, and other on-chain operations on behalf of the players.

### 💡 Important Considerations

Before you begin, please keep the following in mind:

  * **Demonstration Purpose:** This is a simplified example designed to showcase a basic integration. It is **not suitable for a production environment** as is.
  * **WebSockets:** This implementation does not use [WebSocket events](/03-api-reference/03-websocket-events.md). In a real-world application, WebSockets can simplify the process of listening for transaction finalization and receiving real-time updates, such as when a user receives an NFT from an external source like the marketplace.
  * **Wallet Funding:** New managed wallets are created without any funds. To cover network fees for actions like melting or transferring tokens, you must either fund each wallet individually or use a [Fuel Tank](/02-guides/01-platform/02-managing-users/04-using-fuel-tanks.md) to subsidize transactions for all your users.

-----

## 🖥️ Game Server

The game server is a RESTful API built with Node.js and Express. It serves as the secure bridge between the game client and the Enjin Platform. The main entry point is the [`src/index.js` file](https://github.com/enjin/platform-sample-game-server/blob/master/src/index.js).

### Environment Variables

The server is configured using the following environment variables:

| Variable | Description |
| :--- | :--- |
| `PORT` | The port the server listens on. Defaults to `3000`. |
| `JWT_SECRET` | A secure, random string used for signing player authentication tokens. |
| `ENJIN_API_URL` | The Enjin Platform API URL. Use `https://platform.canary.enjin.io/graphql` for testing (Canary Network) or `https://platform.enjin.io/graphql` for production. |
| `ENJIN_API_KEY` | Your API Key Token obtained from the Enjin Platform. |
| `DAEMON_WALLET_ADDRESS` | The address of your Wallet Daemon. This wallet receives the initial supply of all created tokens. |
| `ENJIN_COLLECTION_ID` | The ID of the Enjin Farmer collection. If left blank, the server will create a new collection on startup. |

### Server Initialization & Collection Setup

On startup, the server performs a one-time setup to ensure the necessary blockchain assets exist.

1.  **Check for Collection:** The server first checks if an `ENJIN_COLLECTION_ID` has been provided.
2.  **Create Collection:** If the ID is missing, the server calls the [`createCollection` function](https://github.com/enjin/platform-sample-game-server/blob/master/src/services/enjinService.js#L69), which executes the `CreateCollection` mutation on the Enjin Platform. The <GlossaryTerm id="wallet_daemon" /> automatically signs the request.
    ```graphql
    mutation CreateCollection($name: String!, ...) {
      CreateCollection(...) {
        id
        method
        state
      }
    }
    ```
3.  **Monitor Transaction:** The mutation returns a request ID. The server then [polls the `GetTransaction` query](https://github.com/enjin/platform-sample-game-server/blob/master/src/services/enjinService.js#L15) until the transaction `state` is `FINALIZED` and the `result` is `EXTRINSIC_SUCCESS`.
    ```graphql
    query GetTransaction($requestId: Int!) {
      GetTransaction(id: $requestId) {
        state
        result
        events { ... }
      }
    }
    ```
4.  **Extract Collection ID:** Once finalized, the server [extracts the new collection ID from the transaction's events](https://github.com/enjin/platform-sample-game-server/blob/master/src/services/enjinService.js#L43) and assigns it to the `ENJIN_COLLECTION_ID` variable.
5.  **Create NFTs:** Using a similar process, the server then [creates the three resource NFTs](https://github.com/enjin/platform-sample-game-server/blob/master/src/services/enjinService.js#L116) ([Gold Coin](https://github.com/enjin/platform-sample-game-server/blob/master/src/services/enjinService.js#L6), [Gold Coin (Blue)](https://github.com/enjin/platform-sample-game-server/blob/master/src/services/enjinService.js#L7), and [Green Gem](https://github.com/enjin/platform-sample-game-server/blob/master/src/services/enjinService.js#L8)) within the collection by calling the `CreateToken` mutation for each and waiting for finalization.
    ```graphql
    mutation CreateToken($collectionId: BigInt!, $name: String!, ...) {
     CreateToken(collectionId: $collectionId, params: { ... }) {
       id
       method
       state
     }
    }
    ```

After this setup is complete, the server starts listening for API requests.

### API Endpoints

The server exposes several endpoints to handle game actions. The `wallet` and `token` endpoints are protected by a [JWT authentication middleware](https://github.com/enjin/platform-sample-game-server/blob/master/src/middlewares/jwtAuth.js), which verifies the player's identity before processing the request.

#### Authentication

  * [`GET /api/auth/health-check`](https://github.com/enjin/platform-sample-game-server/blob/master/src/routes/auth.js#L7): A simple endpoint to verify that the server is online.
  * [`POST /api/auth/register`](https://github.com/enjin/platform-sample-game-server/blob/master/src/routes/auth.js#L14): Creates a new player and an associated [managed wallet](/02-guides/01-platform/02-managing-users/03-using-managed-wallets.md). To create the wallet, it calls the [`CreateWallet` mutation](https://github.com/enjin/platform-sample-game-server/blob/master/src/services/enjinService.js#L271), using the player's [email address as the unique `externalId`](https://github.com/enjin/platform-sample-game-server/blob/master/src/routes/auth.js#L18).
    ```graphql
    mutation CreateWallet($externalId: String!) {
      CreateWallet(externalId: $externalId)
    }
    ```
  * [`POST /api/auth/login`](https://github.com/enjin/platform-sample-game-server/blob/master/src/routes/auth.js#L36): Logs in an existing player, returning their wallet address and a JWT.

#### Wallet Management

  * [`POST /api/wallet/create`](https://github.com/enjin/platform-sample-game-server/blob/master/src/routes/wallet.js#L28): Creates a new managed wallet
  * [`POST /api/wallet/get`](https://github.com/enjin/platform-sample-game-server/blob/master/src/routes/wallet.js#L8): Retrieves details for the authenticated player's managed wallet.
  * [`GET /api/wallet/get-tokens`](https://github.com/enjin/platform-sample-game-server/blob/master/src/routes/wallet.js#L48): Retrieves the player's managed wallet and all tokens it holds. It calls the [`GetWallet` query](https://github.com/enjin/platform-sample-game-server/blob/master/src/services/enjinService.js#L208) (using [GraphQL Pagination](/01-getting-started/05-using-enjin-api/01-how-to-use-graphql.md#pagination) to loop through all pages of results, ensuring the complete inventory is fetched).
    ```graphql
    query GetWalletTokens($externalId: String!) {
      GetWallet(externalId: $externalId) {
        account { ... }
        tokenAccounts(...) { ... }
      }
    }
    ```

#### Token Actions

  * [`POST /api/token/mint`](https://github.com/enjin/platform-sample-game-server/blob/master/src/routes/token.js#L8): Mints a token to the player's wallet. The server calls the [`MintToken` mutation](https://github.com/enjin/platform-sample-game-server/blob/master/src/services/enjinService.js#L317). The recipient address is extracted from the player's authenticated session.
    ```graphql
    mutation mintToken($recipient: String!, $collectionId: BigInt!, ...) {
      MintToken(recipient: $recipient, collectionId: $collectionId, ...) {
        id
      }
    }
    ```
  * [`POST /api/token/melt`](https://github.com/enjin/platform-sample-game-server/blob/master/src/routes/token.js#L29): Melts a token from the player's wallet. This uses the [`Burn` mutation](https://github.com/enjin/platform-sample-game-server/blob/master/src/services/enjinService.js#L371). Since the token needs to be melted from the managed wallet's account, it needs to be signed by the managed wallet. For that, the player's managed wallet address is specified as the `signingAccount`. ([Learn more about managed wallets here](/02-guides/01-platform/02-managing-users/03-using-managed-wallets.md))
    ```graphql
    mutation burnToken($signingAccount: String!, $collectionId: BigInt!, ...) {
      Burn(signingAccount: $signingAccount, collectionId: $collectionId, ...) {
        id
      }
    }
    ```
  * [`POST /api/token/transfer`](https://github.com/enjin/platform-sample-game-server/blob/master/src/routes/token.js#L50): Transfers a token from the player's managed wallet to another address. This uses the [`SimpleTransferToken` mutation](https://github.com/enjin/platform-sample-game-server/blob/master/src/services/enjinService.js#L425), again specifying the player's managed wallet as the `signingAccount`.
    ```graphql
    mutation transferToken($signingAccount: String!, $recipient: String!, ...) {
      SimpleTransferToken(signingAccount: $signingAccount, recipient: $recipient, ...) {
        id
      }
    }
    ```

-----

## 🎮 Unity Game

The Unity game is the client-facing part of the project. It focuses on gameplay and user experience while offloading all sensitive blockchain operations to the game server.

### Core Components

The Enjin integration is managed by a few key scripts and a central prefab:

  * **`EnjinManager.prefab`**: The heart of the integration. This prefab is added to the `Farm_Outdoor` scene and configures the **Host URL** (e.g., `http://localhost:3000`) in the Inspector to connect to your game server.
  * **[`EnjinManager.cs`](https://github.com/enjin/platform-sample-game-client-unity/blob/master/Assets/Enjin%20Integration/Scripts/Core/EnjinManager.cs)**: A singleton controller that manages the player's session (auth token, wallet data) and exposes high-level methods like `MintToken()` for other game scripts to use.
  * **[`EnjinApiService.cs`](https://github.com/enjin/platform-sample-game-client-unity/blob/master/Assets/Enjin%20Integration/Scripts/API/EnjinApiService.cs)**: Handles all REST API communication with the game server using Unity's `UnityWebRequest`.
  * **[`EnjinItem.cs`](https://github.com/enjin/platform-sample-game-client-unity/blob/master/Assets/Enjin%20Integration/Scripts/Data/EnjinItem.cs)**: A `ScriptableObject` that represents the data of a blockchain item, such as its display name and its corresponding on-chain token ID.
  * **UI Scripts** ([`BackpackUI.cs`](https://github.com/enjin/platform-sample-game-client-unity/blob/master/Assets/Enjin%20Integration/Scripts/UI/BackpackUI.cs), [`BackpackItemController.cs`](https://github.com/enjin/platform-sample-game-client-unity/blob/master/Assets/Enjin%20Integration/Scripts/UI/BackpackItemController.cs)): Scripts that manage the UI for viewing and interacting with the player's NFT inventory.

### Initial Setup & Player Authentication

1.  **Health Check**: On launch, the client [calls the `/api/auth/health-check` endpoint](https://github.com/enjin/platform-sample-game-client-unity/blob/master/Assets/Enjin%20Integration/Scripts/API/EnjinApiService.cs#L36) to ensure the server is available.
2.  **Login/Register**: From the login screen, the player [clicks "Login"](https://github.com/enjin/platform-sample-game-client-unity/blob/master/Assets/HappyHarvest/Common/UI/SettingMenu/Script/SettingMenu.cs#L145), which calls the [`EnjinManager.Instance.RegisterAndLogin()` method](https://github.com/enjin/platform-sample-game-client-unity/blob/master/Assets/Enjin%20Integration/Scripts/Core/EnjinManager.cs#L141).
3.  **API Request**: This triggers `EnjinApiService` to [send a POST request to the `/api/auth/register` endpoint](https://github.com/enjin/platform-sample-game-client-unity/blob/master/Assets/Enjin%20Integration/Scripts/API/EnjinApiService.cs#L69).
4.  **Store Auth Token**: The server responds with a JWT authentication token. The client [saves this token locally using `PlayerPrefs`](https://github.com/enjin/platform-sample-game-client-unity/blob/master/Assets/Enjin%20Integration/Scripts/Core/EnjinManager.cs#L152) and [loads it on subsequent launches](https://github.com/enjin/platform-sample-game-client-unity/blob/master/Assets/Enjin%20Integration/Scripts/Core/EnjinManager.cs#L40) for a seamless experience.

### In-Game NFT Interactions

All blockchain actions are initiated by the client but securely executed by the server.

#### Harvesting and Minting Tokens

When a player [harvests a crop with the Hoe tool](https://github.com/enjin/platform-sample-game-client-unity/blob/master/Assets/HappyHarvest/Scripts/Items/Hoe.cs#L18), they have a chance to find a resource token.

1.  An `EnjinToken` GameObject [appears on the harvested tile](https://github.com/enjin/platform-sample-game-client-unity/blob/master/Assets/Enjin%20Integration/Scripts/Core/EnjinManager.cs#L218).
2.  When the player collects this GameObject, its [`InteractedWith()` method](https://github.com/enjin/platform-sample-game-client-unity/blob/master/Assets/Enjin%20Integration/Scripts/Gameplay/EnjinToken.cs#L20) is triggered.
3.  This calls [`EnjinItem.Collect()`](https://github.com/enjin/platform-sample-game-client-unity/blob/master/Assets/Enjin%20Integration/Scripts/Data/EnjinItem.cs#L37), which in turn calls `EnjinManager.Instance.MintToken()`.
4.  `EnjinManager` then uses `EnjinApiService` to [send a request to the `/api/token/mint` endpoint](https://github.com/enjin/platform-sample-game-client-unity/blob/master/Assets/Enjin%20Integration/Scripts/API/EnjinApiService.cs#L97).

#### Viewing the Wallet (Backpack UI)

1.  Clicking the backpack icon opens the inventory screen, managed by `BackpackUI.cs`.
2.  The UI [calls `EnjinManager.Instance.GetManagedWalletTokens()`](https://github.com/enjin/platform-sample-game-client-unity/blob/master/Assets/Enjin%20Integration/Scripts/UI/BackpackUI.cs#L47), which [sends a request to the `/api/wallet/get-tokens` endpoint](https://github.com/enjin/platform-sample-game-client-unity/blob/master/Assets/Enjin%20Integration/Scripts/API/EnjinApiService.cs#L205).
3.  The server saves the list of tokens, and the `BackpackUI` [populates the view with the data](https://github.com/enjin/platform-sample-game-client-unity/blob/master/Assets/Enjin%20Integration/Scripts/UI/BackpackUI.cs#L81).
4.  The `BackpackUI` also [subscribes to the `EnjinManager.Instance.OnWalletUpdated` event](https://github.com/enjin/platform-sample-game-client-unity/blob/master/Assets/Enjin%20Integration/Scripts/UI/BackpackUI.cs#L39) to automatically refresh the inventory after a token is [minted](https://github.com/enjin/platform-sample-game-client-unity/blob/master/Assets/Enjin%20Integration/Scripts/Core/EnjinManager.cs#L95), [melted](https://github.com/enjin/platform-sample-game-client-unity/blob/master/Assets/Enjin%20Integration/Scripts/Core/EnjinManager.cs#L107), or [transferred](https://github.com/enjin/platform-sample-game-client-unity/blob/master/Assets/Enjin%20Integration/Scripts/Core/EnjinManager.cs#L119).

#### Melting and Transferring Tokens

  * **Melting**: The player [clicks "Melt" in the backpack](https://github.com/enjin/platform-sample-game-client-unity/blob/master/Assets/Enjin%20Integration/Scripts/UI/BackpackItemController.cs#L38). This flows through [`EnjinManager`](https://github.com/enjin/platform-sample-game-client-unity/blob/master/Assets/Enjin%20Integration/Scripts/Core/EnjinManager.cs#L100) and sends a request to the [`/api/token/melt` endpoint](https://github.com/enjin/platform-sample-game-client-unity/blob/master/Assets/Enjin%20Integration/Scripts/API/EnjinApiService.cs#L126).
  * **Transferring**: The player [clicks "Send"](https://github.com/enjin/platform-sample-game-client-unity/blob/master/Assets/Enjin%20Integration/Scripts/UI/BackpackItemController.cs#L59), sending a request to the [`/api/token/transfer` endpoint](https://github.com/enjin/platform-sample-game-client-unity/blob/master/Assets/Enjin%20Integration/Scripts/API/EnjinApiService.cs#L155).