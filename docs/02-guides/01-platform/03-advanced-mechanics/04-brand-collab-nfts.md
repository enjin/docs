---
title: "Brand Collab NFTs"
slug: "brand-collab-nfts"
description: "Discover how to create brand collaboration NFTs, allowing for innovative partnerships that utilize blockchain to engage audiences with exclusive digital assets."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Co-Authored by [SamTheBay](https://twitter.com/SamTheBay)
Sam is the Founder of [Etherscape](https://www.etherscape.io/), a multiplayer RPG with some of the most innovative Web3 game design elements in the industry.

[Reach out to Sam on Discord](https://discord.gg/NXwWehg89p) for partnership and collaboration opportunities.
You can see examples of Brand Integrations in [Etherscape's whitepaper](https://whitepaper.etherscape.io/CryptoIntegration/multiverse-support/collaborations).
:::

As a developer, you can leverage brand integrations and multiverse items - NFTs that work across multiple games - to increase your playerbase and create new monetization methods.

These NFTs are stored on a public ledger, enabling your game to identify items a player owns, even if they were created elsewhere.

When a player with a brand or multiverse item enters your game, you can scan their wallet, recognize the item, and integrate it into your game's environment. This approach offers several benefits:

- Attract players who possess specific items.
- Accumulate these items to draw players interested in obtaining them through your game.
- Get compensated for incorporating these items into your game.
- Consider charging a nominal fee for unlocking the item's features in your game.

While the concept of multiverse items is appealing for players, it's important for you as a developer to adopt certain development and marketing strategies to ensure you reap measurable benefits from this integration.

## Acquisition

Your goal is to inform all existing and potential NFT owners that they can utilize their NFTs in your game, and to give them compelling reasons to engage with your game using these NFTs.

For this initiative to be successful for you, it's important to implement a range of strategic marketing actions.

### Show off Your Gameplay and Aesthetics

Using videos and GIFs is an excellent method to showcase your game's gameplay and visual appeal. They effectively demonstrate the experience players can anticipate when they play your game and utilize the NFTs within it.

### Create an Exciting Announcement

Announce that your game has integrated new functionalities for these NFTs. In your announcement, include video footage displaying how the NFT is used in your game, and highlight the enjoyable aspects of your gameplay to engage your audience.

It's crucial to communicate the reasons behind your decision to integrate these NFTs. Share what aspects of the NFT community you're supporting appeal to you and how your values and vision align with theirs.

### Ongoing Content Pushes

Regularly create and share posts, videos, and GIFs that highlight the versatility and capabilities of the NFT, usable across multiple games. This approach not only emphasizes the expanding usefulness of the NFT but also continuously promotes the games that support it.

### List Your Game on the Token

Ensure your game is included as a utility provider in the token's metadata. This step guarantees that your game can be found through the token's presence on various wallets and marketplaces.

### Utility Unlock Challenge

By designating your game's utility as "locked" on the token and clarifying that players can unlock this utility by engaging with your game, you provide them with a direct incentive to play your game. This strategy motivates players to explore your game in order to access the additional utility of their NFT.

## Monetization

To monetize collaborations effectively, it's important to create strategies that are enjoyable for players and advantageous for both the NFT creator and the utility provider.

### Commissioned Integrations

The NFT creator can opt to pay a flat fee to cover the costs of integrating their NFT into your platform, including the development of engaging and unique functionalities for the NFT.

### Community-Commissioned Integrations

You have the option to set up a community fundraising campaign on platforms like GoFundMe, where a specific funding goal is established. If this goal is met, you'll integrate the item in question.

The holders of the NFT will likely be inclined to contribute to this fund, as reaching the target means adding additional functionalities to their token.

### Utility Unlock Fees

By marking the utility of your game on the token’s metadata as "locked," and clarifying that players can unlock it by paying a small fee, you provide a straightforward incentive for them to pay and access the additional value and functionalities of their NFT in your game.

## Development

Reading the tokens a player holds is done with the `GetAccount` query — see [Reading User Wallets](/02-guides/01-platform/02-managing-users/02-reading-user-wallets.md) for the canonical query shape and response structure.

Each token in the returned `tokens` list carries its `collection.id` and `tokenId`, so identifying brand or multiverse items the player owns is a matter of matching those values against the IDs your game cares about.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query ScanForBrandItems {
  GetAccount(
    network: ENJIN  # or CANARY for testnet
    chain: MATRIX
    address: "efUVQhs3Q1ih9RKn1ukpb45p2Zomu5jvopsQE6n5LtW52FJH3"
  ) {
    tokens {
      id          # canonical "<collectionId>-<tokenId>"
      tokenId
      collection { id }
      attributes { key value }
    }
  }
}
```
  </TabItem>
  <TabItem value="curl" label="cURL">
```
curl --location 'https://platform.beta.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer YOUR_API_TOKEN' \
-d '{"query":"query ScanForBrandItems($address: String!) {\r\n  GetAccount(network: ENJIN, chain: MATRIX, address: $address) {\r\n    tokens {\r\n      id\r\n      tokenId\r\n      collection { id }\r\n      attributes { key value }\r\n    }\r\n  }\r\n}","variables":{"address":"efUVQhs3Q1ih9RKn1ukpb45p2Zomu5jvopsQE6n5LtW52FJH3"}}'
```
  </TabItem>
</Tabs>

The response includes every token the wallet currently holds. Filter it client-side by `collection.id` (and optionally `tokenId`) to pick out the brand-collab items your game integrates:

```json
{
  "data": {
    "GetAccount": {
      "tokens": [
        {
          "id": "2100-1",
          "tokenId": "1",
          "collection": { "id": "2100" },
          "attributes": [
            {
              "key": "uri",
              "value": "https://etherscapegame.com/crypto/ImperialSovereign.json"
            }
          ]
        }
      ]
    }
  }
}
```

To read the external metadata, fetch the URL listed under the token's `uri` attribute.

## Best Practices

:::tip Tips

- A token appears in a wallet's `tokens` list only while the wallet holds a balance of it, so the list always reflects current holdings — no need to filter out burned tokens.
- If you plan to utilize metadata from on-chain or external sources, also read the token's `attributes`. Typically you'll find a `uri` attribute that points to the external location of this metadata.
- When accessing external metadata or media, make the calls asynchronously and consider storing them in a local cache for faster retrieval.
:::

### Syncing Tokens

To implement any token in game you'll need to know which token IDs the player holds. `GetAccount.tokens` returns every token across every collection the wallet holds in a single response — filter the list client-side down to the collection IDs your game cares about (for example, the main collection associated with your game plus any brand-collab collections you integrate).

### Syncing Metadata

When implementing multiverse items you will want to think about how you will represent them in game. This generally means that you are going to want to provide metadata and media for them. Below are a few options for your consideration.

1. Static Metadata
   If you already know exactly what you want the token to do in your game and it won’t change then you can essentially hard code it. In this case, there is no need to read the metadata from the chain or from an external source. If the group and id match your intention then you can give it the in game visuals and utility that you want.
2. External Sources
   The most common practice is to store metadata off-chain at an external url. This is especially true for any media content such as images, videos, 3d models and audio. If you want to leverage this metadata then you will need to make calls to the URI that hosts it in order to download it. When doing that, you will want to consider the following…
   1. Make sure the calls are asynchronous. The external calls will take time and you don’t want them to impact your games frame rate.
   2. You probably want to cache any media locally on the drive. The URI you are downloading from could be slow, unreliable or throttle you. As a result, you will want to avoid reading it more often than necessary.

:::tip Metadata Management
Note that if you’re adopting another game’s token, you may not want to use all the metadata that is provided. For example, if you are making a 2D game you might want to create your own sprite to represent it instead of using a stylistic image that doesn’t suit your game. For example, this is how the ForgeHammer is represented in Etherscape - a 2D pixel-art game.
<p align="center">
  <img src={require('/img/guides/advanced-mechanics/adjust-art-style.png').default} width="400" alt="Adjust the item's art style to fit your game" />
</p>
:::

### ERC-1155 Grouped NFTs

There are many tokens that have been migrated from the ERC-1155 version of Enjin. In ERC-1155 there is a concept called "Grouped NFTs" where a set of NFT tokens share the same metadata.

A popular example of this would be "Oindrasdain" from "The Multiverse" collection. There are many copies of Oindrasdain and they have token ids that look like the following…

`107002853660685728488179487227240257220`

If you convert this token id into hex, you will be able to see its 128 bit representation like the following…

`508000000000002700000000000016C4`

This can then be broken into two 64 bit parts (or 16 hex string characters) like the following…

Group ID: `5080000000000027`

Group Index: `00000000000016C4`

All tokens in the collection that share the same group id are intended to be of the same token type and thus should get the same utility. This is similar to how <GlossaryTerm id="multi_unit_token" />s work.

:::tip Token Groups
For projects starting fresh, the recommended way to group tokens that share metadata or utility is the on-chain **Token Groups** feature, not packing a group ID into the token ID. Many migrated collections (including The Multiverse) have also been organized into on-chain Token Groups, so you can read group membership through the API instead of decoding the 128-bit layout. See [Token Groups mutations](/03-api-reference/02-mutations/07-token-groups-mutations.md) and [Token Groups queries](/03-api-reference/01-queries/07-token-groups-queries.md).
:::
