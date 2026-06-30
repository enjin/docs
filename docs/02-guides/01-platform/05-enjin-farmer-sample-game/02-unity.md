---
title: "Enjin Farmer: Unity Client"
sidebar_label: "Unity Client"
slug: "unity"
description: "Set up and run the Unity client for the Enjin Farmer sample game, and dive into how the Unity client mints, melts, and transfers NFTs through the game server using the Enjin Platform."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';

This page covers the **Unity** client for the Enjin Farmer sample game.

:::info Set up the server first
This page assumes the game server, Enjin Platform, and Wallet Daemon are already running. If not, complete the [Overview & Server Setup](/02-guides/01-platform/05-enjin-farmer-sample-game/overview) page first, then come back here.
:::

-----

## Prerequisites

In addition to the [shared prerequisites](/02-guides/01-platform/05-enjin-farmer-sample-game/overview#prerequisites), the Unity client needs:

  - ✅ **Unity Hub** with **Unity Editor version `6000.0.24f1`**.

-----

## Step 1: Set Up the Unity Client

It's time to set up the Unity project and connect it to your game server.

1.  **Clone the Game Client:**

    ```bash
    git clone https://github.com/enjin/platform-sample-game-client-unity.git
    ```

2. Open **Unity Hub**.
3. Click `Add` → `Add project from disk` and select the `platform-sample-game-client` folder you cloned earlier.
4. Open the project.
5. Once the project is open in the Unity Editor, you need to configure two things.

#### 1. Stamp the Collection ID onto the NFT Items

The game's three `Enjin Item` assets (`GemGreen`, `GoldCoin`, and `GoldCoinBlue`, found in `Assets/Enjin Integration/Scripts/Data/Items`) each need to know the on-chain **Collection ID** the server created. Rather than paste it by hand, the project ships an Editor menu that fetches it from your running server and stamps it onto all three assets for you.

  - Make sure your game server (from Step 3) is still running.
  - In the Unity Editor menu bar, select **Enjin → Stamp Collection ID onto EnjinItem Assets**.
  - Confirm the prompt. The Editor calls the server's `/api/setup/collection-id` endpoint and writes the returned ID onto every `EnjinItem` asset.

:::note
Run this once after the server's first launch. You only need to run it again if the canary state ever resets and the server creates a new collection.
:::

#### 2. Configure the connection to the Game Server

:::note
If you are running the game server and client on the same machine, and you haven't changed the default port of 3000, you can skip this step.
:::

  - In the `Project` window, navigate to `Assets/Enjin Integration/Prefabs/`.
  - Select the **EnjinManager** prefab.
  - In the `Inspector` window, find the `Enjin API Service (Script)` component and configure the host property to your game server URL. If you are running the game server and client on the same machine, the default `http://localhost:3000` is correct.

<p align="center">
  <img src={require('/img/guides/enjin-farmer-sample-game/configure-enjin-game-server-connection.png').default} width="600"/>
</p>

-----

## Step 2: Play the Game! 🎮

You're all set up and ready to play.

1. In the Unity Editor's `Project` window, navigate to `Assets/HappyHarvest/Scenes`.
2. Double click on the `Farm_Outdoor` scene.
3. Press the **Play** button at the top of the Unity Editor to launch the game.
4. Look at the **Console** window in the editor. You should see a log message: `Server connection successful (Health Check: OK)`.
<p align="center">
  <img src={require('/img/guides/enjin-farmer-sample-game/connection-success.png').default} width="500"/>
</p>
  :::warning
  If you see an error, double-check that your server is running and that the `Host` in the `EnjinManager` is correct.
  :::
5. In the game, click the **Menu** button (top-right), then **Login**.
<p align="center">
  <img src={require('/img/guides/enjin-farmer-sample-game/menu-button.png').default} width="500"/>
</p>
6. Enter an email and password and click **Login**. This will register a new user and create a managed wallet for your player on the Enjin Platform.
7. Close the menu and use the **W, A, S, D** keys to move your character.
8. Walk up to a crop and click on it to harvest it. Keep harvesting until a resource item pops out.
<p align="center">
  <img src={require('/img/guides/enjin-farmer-sample-game/harvesting.png').default} width="400"/>
</p>
9. Click on the resource item to collect it. This action tells the game server to mint that item as an NFT to your player's wallet.
10. From the inventory, you can click **Melt** to destroy the NFT or enter another wallet address in the **Transfer Recipient** field and click **Send** to send it to someone else.
<p align="center">
  <img src={require('/img/guides/enjin-farmer-sample-game/backpack.png').default} width="400"/>
</p>
:::warning Keep your daemon wallet funded
New managed wallets start empty, so the server automatically drips a little cENJ (1 ENJ by default) from your **daemon wallet** to each new player wallet so it can pay the fees for melting and transferring. This means the daemon wallet itself needs cENJ — to create the collection, mint tokens, and fund new players.
To top up the daemon wallet for testing, use the [built-in Canary faucet](/01-getting-started/04-using-the-enjin-platform.md#canary-faucet) in the Platform UI.
:::

:::info Understanding the code
To learn how the Unity client and game server work under the hood, see the [Implementation Breakdown](#implementation-breakdown) below (server-side details live on the [Overview](/02-guides/01-platform/05-enjin-farmer-sample-game/overview#server-implementation-breakdown) page).
:::

Happy farming!

-----

## Implementation Breakdown

The Unity client handles gameplay and offloads all blockchain operations to the game server. The server side — collection bootstrap, managed wallets, and the API endpoints the client calls — is documented on the [Overview](/02-guides/01-platform/05-enjin-farmer-sample-game/overview#server-implementation-breakdown) page.

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
