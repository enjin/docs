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
  - **[Game Server (.NET)](https://github.com/enjin/platform-sample-game-server):** A backend API, built on the [Enjin Platform C# SDK](https://github.com/enjin/platform-csharp-sdk), that the game client communicates with to handle all NFT-related actions like minting and transferring.
  - **<GlossaryTerm id="enjin_platform" />:** The cloud-based service that provides the core NFT infrastructure.
  - **Wallet Daemon:** A secure application that manages a wallet on behalf of the game to automatically sign and approve transactions.

-----

## Prerequisites

Before you begin, make sure you have the following installed:

  - ✅ **Unity Hub** with **Unity Editor version `6000.0.24f1`**.
  - ✅ The **[.NET 9 SDK](https://dotnet.microsoft.com/download)** for running the game server.
  - ✅ **Git** for cloning the repositories.
  - ✅ An **Enjin Platform account**. If you don't have one, you can create it [here](https://platform.beta.enjin.io/).
  - ✅ Some cENJ tokens (can be acquired from the [built-in Canary faucet](/01-getting-started/04-using-the-enjin-platform.md#canary-faucet) in the Platform UI)

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

3.  **Download the Wallet Daemon:** Download the prebuilt daemon for your operating system from [https://enj.in/daemon](https://enj.in/daemon) and extract it into a dedicated directory.

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

:::warning You need the .NET 9 SDK
The server runs on .NET, so the **.NET 9 SDK** (not just the runtime) must be installed. Confirm it by running `dotnet --list-sdks` — you should see a `9.x.x` entry. If the command isn't found or lists nothing, install the [.NET 9 SDK](https://dotnet.microsoft.com/download), then open a **new** terminal so your `PATH` picks it up.
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
The server stores the **Collection ID** it bootstraps in a `state.json` file and reuses it on every restart, so you no longer need to copy it by hand — you'll stamp it onto the game client automatically in [Step 4](#1-stamp-the-collection-id-onto-the-nft-items). When you see `Server listening on http://0.0.0.0:3000` in the logs, the server is ready.
:::

Keep the server and the Wallet Daemon running in the background.

-----

## Step 4: Configure the Unity Game Client

It's time to set up the Unity project and connect it to your game server.

1. Open **Unity Hub**.
2. Click `Add` → `Add project from disk` and select the `platform-sample-game-client` folder you cloned earlier.
3. Open the project.
4. Once the project is open in the Unity Editor, you need to configure two things.

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
To learn more about the implementation and dive deep into the game client and server code, continue to the [Enjin Farmer: Implementation Breakdown page](/02-guides/01-platform/05-enjin-farmer-sample-game/03-implementation-breakdown.md).
:::

Happy farming!