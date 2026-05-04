---
title: "Enjin Farmer: Setup Guide"
sidebar_label: "Setup Guide"
slug: "setup-guide"
description: "Follow our step-by-step guide to set up a sample Unity game with full Enjin NFT integration. Learn how to configure a client, server, and wallet to mint, transfer, and manage blockchain assets in a hands-on project."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';

Welcome! This guide will walk you through setting up and running the Enjin Farm Game, a sample project demonstrating how to integrate Enjin's NFT technology into a Unity game.

In this simple farming game, you'll plant seeds, harvest crops, and collect resources. Some resources are special and will be minted as NFTs directly to your in-game wallet. You can then view these NFTs in your inventory, <GlossaryTerm id="melt" /> them, or transfer them to an external wallet.

### System Architecture

The project consists of four main components that work together:

  - **[Game Client (Unity)](https://github.com/enjin/platform-sample-game-client-unity):** The game itself, where you play and interact with items.
  - **[Game Server (Node.js)](https://github.com/enjin/platform-sample-game-server):** A backend API that the game client communicates with to handle all NFT-related actions like minting and transferring.
  - **<GlossaryTerm id="enjin_platform" />:** The cloud-based service that provides the core NFT infrastructure.
  - **Wallet Daemon:** A secure application that manages a wallet on behalf of the game to automatically sign and approve transactions.

-----

## Prerequisites

Before you begin, make sure you have the following installed:

  - ✅ **Unity Hub** with **Unity Editor version `6000.0.24f1`**.
  - ✅ **Node.js** (which includes `npm`).
  - ✅ **Git** for cloning the repositories.
  - ✅ An **Enjin Platform account**. If you don't have one, you can create it [here](https://platform.canary.enjin.io/).
  - ✅ Some cENJ tokens (can be aquired from the [cENJ Faucet](https://faucet.canary.enjin.io/))

-----

## Step 1: Download Project Files

First, you need to download the game client, the game server, and the Wallet Daemon.

1.  **Clone the Game Client:** Open a terminal or command prompt and run:

    ```bash
    git clone https://github.com/enjin/platform-sample-game-client-unity.git
    ```

2.  **Clone the Game Server:** In the same terminal, run:

    ```bash
    git clone https://github.com/enjin/platform-sample-game-server.git
    ```

3.  **Download the Wallet Daemon:** Download the latest executable for your operating system from the [Wallet Daemon releases page](https://github.com/enjin/wallet-daemon-ui/releases).

-----

## Step 2: Configure Enjin Services

Next, you'll set up your Enjin Platform account and the Wallet Daemon.

### Enjin Platform

1. Log in to your [Enjin Platform](https://platform.canary.enjin.io/) account.
2. Head over to your [account settings page](https://platform.canary.enjin.io/settings).
3. Navigate to the **Daemon Wallet** section and create a new API Token.
4. Copy the **API Token**; you will need this in the next step.

### Wallet Daemon

1. Run the Wallet Daemon executable you downloaded.
2. Follow the on-screen instructions to configure it, and enter the **API Token** you just copied from the Enjin Platform into the Settings → Canary Matrixchain input field. For a detailed guide, see the [Wallet Daemon documentation](/01-getting-started/06-using-wallet-daemon.md).
3. Select the Enjin Platform Canary in the network dropdown menu, and run the Wallet Daemon.
4. Once configured and running, the Wallet Daemon UI will display a wallet address. **Copy this wallet address** for the next step.

-----

## Step 3: Configure and Run the Game Server

Now, let's set up the backend server that powers the game's NFT features.

1. Navigate into the game server directory you cloned: `cd platform-sample-game-server`.
2. Duplicate the `.env.example` file and rename the copy to `.env`.
3. Open the `.env` file and fill in the following variables:
    - `PORT=3000` (You can change this if port 3000 is already in use).
    - `JWT_SECRET`: Generate another secure, random string. This is used for authenticating players.
    - `ENJIN_API_URL`: Keep the default `https://platform.canary.enjin.io/graphql` for testing on the Canary network.
    - `ENJIN_API_KEY`: Paste the **API Key Token** from your Enjin Platform account.
    - `DAEMON_WALLET_ADDRESS`: Paste the wallet address you copied from the Wallet Daemon UI.
    - `ENJIN_COLLECTION_ID`: Leave this blank for now.
4. Install the server dependencies by running `npm install`.
5. Launch the server for the first time by running `npm run dev`.

The server will now connect to the Enjin Platform, create a new NFT collection for your game, and create the NFT tokens for the in-game resources.

:::info **Important**
Watch the terminal logs. Once the setup is complete, the server will log the new **Collection ID**. It will look something like this: `Collection and resource tokens are ready. Using collection ID: XXXXXX`. **Copy this Collection ID** and save it. You'll need it to configure the game client.
:::

Keep the server and the Wallet Daemon running in the background.

-----

## Step 4: Configure the Unity Game Client

It's time to set up the Unity project and connect it to your game server.

1. Open **Unity Hub**.
2. Click `Add` → `Add project from disk` and select the `platform-sample-game-client` folder you cloned earlier.
3. Open the project.
4. Once the project is open in the Unity Editor, you need to configure two things.

#### 1. Configure the NFT Items

  - In the `Project` window, navigate to `Assets/Enjin Integration/Scripts/Data/Items`.
  - You will see three `Enjin Item` assets: `GemGreen`, `GoldCoin`, and `GoldCoinBlue`.
  <p align="center">
    <img src={require('/img/guides/enjin-farmer-sample-game/configure-items-1.png').default} width="400"/>
  </p>
  - Click on **each one** of these items.
  - In the `Inspector` window for each item, find the **Collection Id** field and paste the `Collection ID` you saved from the game server's terminal log.
  <p align="center">
    <img src={require('/img/guides/enjin-farmer-sample-game/configure-items-2.png').default} width="400"/>
  </p>

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

## Step 5: Play the Game! 🎮

You're all set up and ready to play.

1. In the Unity Editor's `Project` window, navigate to `Assets/HappyHarvest/Scenes`.
2. Double click on the `Farm_Outdoor` scene.
3. Press the **Play** button at the top of the Unity Editor to launch the game.
4. Look at the **Console** window in the editor. You should see a log message: `Server connection successful (Health Check: OK)`.
<p align="center">
  <img src={require('/img/guides/enjin-farmer-sample-game/connection-success.png').default} width="500"/>
</p>
  :::warning
  If you see an error, double-check that your server is running and that the `Host` and `App Key` in the `EnjinManager` are correct.
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
:::warning cENJ funds are required
New managed wallet have no funds. To melt or transfer tokens out of a managed wallet, you'll need to fund it with some cENJ, or set up a fuel tank.
To receive cENJ funds for testing, use the [cENJ faucet](https://faucet.canary.enjin.io/)
:::

:::info Understanding the code
To learn more about the implementation and dive deep into the game client and server code, continue to the [Enjin Farmer: Implementation Breakdown page](/02-guides/01-platform/05-enjin-farmer-sample-game/03-implementation-breakdown.md).
:::

Happy farming!