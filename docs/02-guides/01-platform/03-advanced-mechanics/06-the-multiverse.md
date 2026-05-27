---
title: "The Multiverse"
slug: "the-multiverse"
description: "Learn how to integrate Multiverse Items into your game and join the Enjin Multiverse — a cross-game ecosystem where shared NFTs power player acquisition and retention."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';

The **Enjin <GlossaryTerm id="the_multiverse" />** is a connected set of games and experiences built on a core idea: a player's gaming items can move with them. The [Multiverse NFT Collection](#the-multiverse-collection) brings these assets to life — its tokens are the shared in-game items of the Enjin ecosystem, recognized and given <GlossaryTerm id="utility" /> across every Multiverse game.

The **[Multiverse Quest](https://multiverse.nft.io/)** is Enjin's seasonal gaming campaign. Players play different Enjin games to earn **Essence**, which determines their share of that season's Multiverse Item rewards. As more games join the ecosystem, the utility of each item grows — giving players more reasons to keep playing and earning.

## How the Multiverse Quest works

The Multiverse Quest runs in four seasons per year. The 2026 theme is **Essence of the Elements** — each season features a natural element (Fire, Water, Wind, Earth) and distributes its own set of rewards.

### Essence

Essence is the player's points-and-progress meter for the season. More Essence means better rewards and stronger draw chances at the end of the season.

- When a player connects their gaming wallet on the [Multiverse Dashboard](https://multiverse.nft.io/), they automatically receive a free **Essence NFT**.
- Each Multiverse game can award up to **180 Essence per season** to a player.
- At the end of the season, accumulated Essence determines that player's share of the season's reward pool.

For the current season's element, integrated games, and reward details, see [multiverse.nft.io](https://multiverse.nft.io/).

## How to join the Multiverse as a Game

To list your game in the Multiverse Quest and gain access to a supply of Multiverse Items to distribute as rewards:

1. Join the [Enjin Spark Program](https://enjin.io/join).
2. [Contact Enjin](https://enjin.io/contact) to coordinate your integration.

Enjin promotes your game across the ecosystem to drive players in — it's then your responsibility to convert their interest into lasting engagement.

## The Primythical Chest

The <GlossaryTerm id="primythical_chest" /> is an infinite-supply Multiverse Item that Enjin distributes for free as part of Multiverse promotions. It exists to showcase the cross-game utility model — a single item that players can carry into any Multiverse game and use for an in-game benefit.

If your game adopts the Primythical Chest as a utility-bearing item, it becomes immediately accessible to every player Enjin onboards through these promotions.

## How to Add Multiverse Items into Your Game

### Step 1: Download the 3D Multiverse Models

Visit [Enjin's public resource repository](https://drive.google.com/drive/folders/1ijlDn_f9PN8GsT9kQfGZR0ObrUgEL2ge) to download 3D models for Unity and Unreal Engine.

These ready-to-integrate models will streamline your Multiverse integration.

You are also welcome to design your own 3D or 2D models to better suit your game's aesthetic, provided they remain recognizable to players as the Multiverse Items.

### Step 2: Add Utility to the Multiverse Tokens

To add utility to Multiverse Items, your game will need to:

1. [Link player wallets to your game](/02-guides/01-platform/02-managing-users/01-connecting-user-wallets/01-sending-wallet-requests.md).
2. [Read the inventory from player wallets](/02-guides/01-platform/02-managing-users/02-reading-user-wallets.md).
3. Validate ownership of the [Multiverse Items](#the-multiverse-collection).
4. Provide an in-game benefit for each Multiverse Item.

Once you've completed these steps, [contact Enjin](https://enjin.io/contact) to get your game listed on the [Multiverse Dashboard](https://multiverse.nft.io/) and to collaborate on marketing initiatives that drive players into your game.

## The Multiverse Collection

Collection ID: `2967`

Multiverse Items are organized into on-chain **Token Groups** (one group per item). To check whether a user owns a given Multiverse Item, use the [GetTokens query](/03-api-reference/01-queries/03-tokens-queries.md#gettokens) and filter by Collection ID or Token IDs, or query a group's members directly via `Collection.tokenGroups` (see [Token Groups queries](/03-api-reference/01-queries/07-token-groups-queries.md)).

| Token Name | Group ID | Token IDs (Ranging From) | Token IDs (Ranging To) |
| :--- | :--- | :--- | :--- |
| [Primythical Chest](https://nft.io/asset/2967-106338239662793273429419659195790131200)      | —   | 106338239662793273429419659195790131200 | N/A (<GlossaryTerm id="multi_unit_token" />/Stackable Tokens) |
| [Aeonclipse Key](https://nft.io/asset/2967-106338239662793274425543839176105918464)         | —   | 106338239662793274425543839176105918464 | N/A (<GlossaryTerm id="multi_unit_token" />/Stackable Tokens) |
| [Archspire](https://nft.io/asset/2967-106338239662793273447866403269499682816)              | —   | 106338239662793273447866403269499682816 | N/A (<GlossaryTerm id="multi_unit_token" />/Stackable Tokens) |
| [Tramyarus Quarter](https://nft.io/asset/2967-106338239662793367710728619925308440576/)     | —   | 106338239662793367710728619925308440576 | N/A (<GlossaryTerm id="multi_unit_token" />/Stackable Tokens) |
| [Epochrome Sword](https://nft.io/collection/the-multiverse/groups/694)                      | 694 | 107002853660685728525072975374659354625 | 107002853660685728543519719448368906239                       |
| [Forgehammer](https://nft.io/collection/the-multiverse/groups/696)                          | 696 | 107002853660685728543519719448368906241 | 107002853660685728561966463522078457855                       |
| [Shadowsong](https://nft.io/collection/the-multiverse/groups/697)                           | 697 | 107002853660685728617306695743207112705 | 107002853660685728635753439816916664319                       |
| [Oindrasdain](https://nft.io/collection/the-multiverse/groups/692)                          | 692 | 107002853660685728488179487227240251393 | 107002853660685728506626231300949803007                       |
| [Stormwall](https://nft.io/collection/the-multiverse/groups/699)                            | 699 | 107002853660685728580413207595788009473 | 107002853660685728598859951669497561087                       |
| [Soulshift Armor](https://nft.io/collection/the-multiverse/groups/700)                      | 700 | 107002853660685728598859951669497561089 | 107002853660685728617306695743207112703                       |
| [APG-M55](https://nft.io/collection/the-multiverse/groups/702)                              | 702 | 107002853660685728561966463522078457857 | 107002853660685728580413207595788009471                       |
| [Mike](https://nft.io/collection/the-multiverse/groups/693)                                 | 693 | 107002853660685728506626231300949803009 | 107002853660685728525072975374659354623                       |
| [Starbow](https://nft.io/collection/the-multiverse/groups/701)                              | 701 | 107002853660685760308813014376216788993 | 107002853660685760327259758449926340607                       |
| [The Mask of U'thuchul](https://nft.io/collection/the-multiverse/groups/698)                | 698 | 107002853660685751233014930111117393921 | 107002853660685751251461674184826945535                       |
| [Wanderer's Elixir](https://nft.io/collection/the-multiverse/groups/703)                    | 703 | 107002853660685751251461674184826945537 | 107002853660685751269908418258536497151                       |
| [Pegasoid Steed](https://nft.io/collection/the-multiverse/groups/695)                       | 695 | 107002853660685760327259758449926340609 | 107002853660685760345706502523635892223                       |
