---
title: "Enjin Farmer: Godot Client"
sidebar_label: "Godot Client"
slug: "godot"
description: "Set up and run the Godot client for the Enjin Farmer sample game, and dive into how the Godot client mints, melts, and transfers NFTs through the game server using the Enjin Platform."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';

This page covers the **Godot** client for the Enjin Farmer sample game.

:::info Set up the server first
This page assumes the game server, Enjin Platform, and Wallet Daemon are already running. If not, complete the [Overview & Server Setup](/02-guides/01-platform/05-enjin-farmer-sample-game/01-overview.md) page first, then come back here.
:::

-----

## Prerequisites

In addition to the [shared prerequisites](/02-guides/01-platform/05-enjin-farmer-sample-game/01-overview.md#prerequisites), the Godot client needs:

  - ✅ **[Godot 4.4+](https://godotengine.org/download)** (the standard build — the client needs no .NET; only the server does).

-----

## Step 1: Set Up the Godot Client

1.  **Clone the Game Client:**

    ```bash
    git clone https://github.com/enjin/platform-sample-game-client-godot.git
    ```

2.  **Open the project in Godot.** Launch Godot 4.4+ and import the cloned `platform-sample-game-client-godot` folder, or from a terminal run:

    ```bash
    godot4 --editor .
    ```

#### 1. Stamp the Collection ID onto the NFT Items

The game's three `EnjinItem` resources (`gem_green.tres`, `gold_coin.tres`, and `gold_coin_blue.tres` in `resources/items/`) each need the on-chain **Collection ID** the server created. The project ships an Editor tool that fetches it from your running server and stamps it onto all three resources for you.

  - Make sure your game server is still running.
  - In the Godot Editor, select **Project → Tools → Stamp Collection ID onto EnjinItem Assets**.
  - Confirm the server URL when prompted (defaults to `http://localhost:3000`). The tool calls the server's `/api/setup/collection-id` endpoint and writes the returned ID onto every `EnjinItem` resource.

:::note
Run this once after the server's first launch. You only need to run it again if the canary state ever resets and the server creates a new collection. You can also edit the `.tres` files in `resources/items/` by hand if you prefer.
:::

#### 2. Configure the connection to the Game Server

:::note
If you are running the game server and client on the same machine with the default port `3000`, you can skip this step.
:::

The client's server URL is defined by the `host` variable in [`scripts/enjin/api/enjin_api_service.gd`](https://github.com/enjin/platform-sample-game-client-godot/blob/52b336743cf3d5dd8f34399206bf457b6e214450/scripts/enjin/api/enjin_api_service.gd#L25), which defaults to `http://localhost:3000`. If your server runs elsewhere, update that value.

-----

## Step 2: Play the Game! 🎮

You're all set up and ready to play.

1. With the project open in the Godot Editor, press **F5** (Run Project). On startup the client runs a health check against the server. Watch the editor's **Output** panel — you should see `[EnjinApiService] Health check OK against http://localhost:3000`. If it fails, double-check that your server is running and that the `host` value matches your server URL.
<p align="center">
  <img src={require('/img/guides/enjin-farmer-sample-game/godot/godot-health-check.png').default} width="600"/>
</p>
2. On the **Happy Harvest** main menu, enter an **Email** and **Password**, then click **Register / Login**. This registers a new player (or logs in an existing one) and creates a managed wallet for them on the Enjin Platform.
<p align="center">
  <img src={require('/img/guides/enjin-farmer-sample-game/godot/godot-main-menu.png').default} width="500"/>
</p>
3. Once the managed wallet is ready, the menu shows **"Logged in - tokens enabled."** Click **Start** to enter the farm.
<p align="center">
  <img src={require('/img/guides/enjin-farmer-sample-game/godot/godot-logged-in.png').default} width="500"/>
</p>
4. Move your character and **till the soil**. Tilling has a chance to reveal a resource item.
<p align="center">
  <img src={require('/img/guides/enjin-farmer-sample-game/harvesting.png').default} width="400"/>
</p>
5. Collect the revealed item. This tells the game server to **mint** that item as an NFT to your player's wallet.
6. Press **B** to open the **backpack**. It displays your live on-chain wallet balances, keyed to your managed wallet address. From here you can **Melt** an NFT to destroy it, or enter a recipient address and **Transfer** it.
<p align="center">
  <img src={require('/img/guides/enjin-farmer-sample-game/godot/godot-backpack.png').default} width="600"/>
</p>

:::warning Keep your daemon wallet funded
New managed wallets start empty, so the server automatically drips a little cENJ (1 ENJ by default) from your **daemon wallet** to each new player wallet so it can pay the fees for melting and transferring. This means the daemon wallet itself needs cENJ — to create the collection, mint tokens, and fund new players. To top up the daemon wallet for testing, use the [built-in Canary faucet](/01-getting-started/04-using-the-enjin-platform.md#canary-faucet) in the Platform UI.
:::

:::info Understanding the code
To learn how the Godot client and game server work under the hood, see the [Implementation Breakdown](#implementation-breakdown) below (server-side details live on the [Overview](/02-guides/01-platform/05-enjin-farmer-sample-game/01-overview.md#server-implementation-breakdown) page).
:::

Happy farming!

-----

## Implementation Breakdown

The Godot client handles gameplay and offloads all blockchain operations to the game server. The server side — collection bootstrap, managed wallets, and the API endpoints the client calls — is documented on the [Overview](/02-guides/01-platform/05-enjin-farmer-sample-game/01-overview.md#server-implementation-breakdown) page.

### Core Components

The Enjin integration lives under `scripts/enjin/` plus an editor addon:

  * **[`enjin_manager.gd`](https://github.com/enjin/platform-sample-game-client-godot/blob/52b336743cf3d5dd8f34399206bf457b6e214450/scripts/enjin/core/enjin_manager.gd)**: An autoload singleton that manages the player's session (auth token, wallet snapshot) and exposes high-level methods like `mint_token()`, `melt_token()`, and `transfer_token()` for the rest of the game. It emits `login_complete`, `logout_complete`, and `wallet_updated` signals, and persists the auth token to `user://enjin.cfg`.
  * **[`enjin_api_service.gd`](https://github.com/enjin/platform-sample-game-client-godot/blob/52b336743cf3d5dd8f34399206bf457b6e214450/scripts/enjin/api/enjin_api_service.gd)**: Handles all REST communication with the game server using Godot's `HTTPRequest`. The server URL is the [`host` variable](https://github.com/enjin/platform-sample-game-client-godot/blob/52b336743cf3d5dd8f34399206bf457b6e214450/scripts/enjin/api/enjin_api_service.gd#L25) (defaults to `http://localhost:3000`).
  * **[`enjin_item.gd`](https://github.com/enjin/platform-sample-game-client-godot/blob/52b336743cf3d5dd8f34399206bf457b6e214450/scripts/enjin/data/enjin_item.gd)**: A `Resource` describing a blockchain item — its display data and its on-chain collection/token ID. The three concrete items live in `resources/items/*.tres`. ([`platform_models.gd`](https://github.com/enjin/platform-sample-game-client-godot/blob/52b336743cf3d5dd8f34399206bf457b6e214450/scripts/enjin/data/platform_models.gd) holds the wallet/token response models.)
  * **[`plugin.gd`](https://github.com/enjin/platform-sample-game-client-godot/blob/52b336743cf3d5dd8f34399206bf457b6e214450/addons/enjin_editor/plugin.gd)** (`addons/enjin_editor`): An Editor tool that adds the **Project → Tools → Stamp Collection ID onto EnjinItem Assets** menu. It calls the server's `/api/setup/collection-id` endpoint and writes the returned ID onto every `EnjinItem` resource, so you don't paste it by hand.
  * **UI scripts** ([`backpack_ui.gd`](https://github.com/enjin/platform-sample-game-client-godot/blob/52b336743cf3d5dd8f34399206bf457b6e214450/scripts/enjin/ui/backpack_ui.gd), [`backpack_item_row.gd`](https://github.com/enjin/platform-sample-game-client-godot/blob/52b336743cf3d5dd8f34399206bf457b6e214450/scripts/enjin/ui/backpack_item_row.gd)): Drive the backpack screen (`scenes/ui/backpack_ui.tscn`) for viewing and acting on the player's NFT inventory.
  * **[`enjin_token.gd`](https://github.com/enjin/platform-sample-game-client-godot/blob/52b336743cf3d5dd8f34399206bf457b6e214450/scripts/enjin/gameplay/enjin_token.gd)**: The world pickup (`scenes/enjin/enjin_token.tscn`) that, when collected, triggers a mint.

### Initial Setup & Player Authentication

1.  **Health Check**: On startup, `enjin_api_service.gd` [calls `/api/auth/health-check`](https://github.com/enjin/platform-sample-game-client-godot/blob/52b336743cf3d5dd8f34399206bf457b6e214450/scripts/enjin/api/enjin_api_service.gd#L41) to confirm the server is reachable.
2.  **Login/Register**: From the main menu the player registers or logs in, which calls [`EnjinManager.register_and_login()`](https://github.com/enjin/platform-sample-game-client-godot/blob/52b336743cf3d5dd8f34399206bf457b6e214450/scripts/enjin/core/enjin_manager.gd#L74). That posts to the [`/api/auth/register`](https://github.com/enjin/platform-sample-game-client-godot/blob/52b336743cf3d5dd8f34399206bf457b6e214450/scripts/enjin/api/enjin_api_service.gd#L57) endpoint (used for both register and login).
3.  **Store Auth Token**: The server returns a JWT; the client persists it to `user://enjin.cfg` and reloads it on subsequent launches.

### In-Game NFT Interactions

All blockchain actions are initiated by the client and executed by the server.

#### Tilling and Minting Tokens

When the player tills soil, [`EnjinManager.randomly_reveal_token()`](https://github.com/enjin/platform-sample-game-client-godot/blob/52b336743cf3d5dd8f34399206bf457b6e214450/scripts/enjin/core/enjin_manager.gd#L183) may spawn an `enjin_token` pickup. Collecting it calls [`EnjinManager.mint_token()`](https://github.com/enjin/platform-sample-game-client-godot/blob/52b336743cf3d5dd8f34399206bf457b6e214450/scripts/enjin/core/enjin_manager.gd#L143), which posts to the server's `/api/token/mint` endpoint. The daemon signs it.

#### Viewing the Wallet (Backpack UI)

Opening the backpack (**B**) calls [`EnjinManager.get_managed_wallet_tokens()`](https://github.com/enjin/platform-sample-game-client-godot/blob/52b336743cf3d5dd8f34399206bf457b6e214450/scripts/enjin/core/enjin_manager.gd#L106), which hits [`/api/wallet/get-tokens`](https://github.com/enjin/platform-sample-game-client-godot/blob/52b336743cf3d5dd8f34399206bf457b6e214450/scripts/enjin/api/enjin_api_service.gd#L91) and refreshes the displayed balances. `backpack_ui.gd` listens for the manager's `wallet_updated` signal to refresh after a mint, melt, or transfer.

#### Melting and Transferring Tokens

From a backpack row (`backpack_item_row.gd`), **Melt** flows through [`EnjinManager.melt_token()`](https://github.com/enjin/platform-sample-game-client-godot/blob/52b336743cf3d5dd8f34399206bf457b6e214450/scripts/enjin/core/enjin_manager.gd#L151) to `/api/token/melt`, and **Transfer** flows through [`EnjinManager.transfer_token()`](https://github.com/enjin/platform-sample-game-client-godot/blob/52b336743cf3d5dd8f34399206bf457b6e214450/scripts/enjin/core/enjin_manager.gd#L159) to `/api/token/transfer`. Both are signed by the player's managed wallet on the server side.
