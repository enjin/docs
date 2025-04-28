---
title: "Brand Collab NFTs"
slug: "brand-collab-nfts"
excerpt: ""
hidden: false
metadata: 
  title: "Brand Collab NFTs - Power Your Collaborations with Blockchain"
  description: "Discover how to create brand collaboration NFTs, allowing for innovative partnerships that utilize blockchain to engage audiences with exclusive digital assets."
  image: []
  robots: "index"
createdAt: "Wed Jan 24 2024 23:22:47 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Sun Oct 27 2024 18:23:45 GMT+0000 (Coordinated Universal Time)"
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

If you're on the Self-Hosted Enjin platform, the steps for integrating multiverse features largely mirror the standard process of [reading wallets](/02-tutorials/02-managing-users/02-reading-user-wallets.md).

Here’s the Query you will need to use:

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetWallet {
  GetWallet(account:"efUVQhs3Q1ih9RKn1ukpb45p2Zomu5jvopsQE6n5LtW52FJH3") {
// omit “tokenIds” to read all tokens in a collection
// if you are getting a page after the first put the “endCursor” value into the “after” field
tokenAccounts (collectionIds:2100 tokenIds:1 after:"" first:100) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges{
        node {
          balance
          reservedBalance
					token{
            tokenId
            attributes {
              key
              value
            }
          }
        }
      }
    }
  }
}

```
  </TabItem>
  <TabItem value="curl" label="cURL">
```
curl -X POST "https://platform.canary.enjin.io/graphql" \
-H "Content-Type: application/json" \
-H "Authorization: enjin_api_key" \
-d '{
  "query": "query GetWallet { GetWallet(account: \"efUVQhs3Q1ih9RKn1ukpb45p2Zomu5jvopsQE6n5LtW52FJH3\") { tokenAccounts(collectionIds: 2100, tokenIds: 1, after: \"\", first: 100) { pageInfo { hasNextPage endCursor } edges { node { balance reservedBalance token { tokenId attributes { key value } } } } } } }"
}'
```
  </TabItem>
</Tabs>

Here’s an example of a response you can expect.

```json
{
  "data": {
    "GetWallet": {
      "tokenAccounts": {
        // if there are more items to read there will be a guid in the “endCursor” value
        "pageInfo": {
          "hasNextPage": false,
          "endCursor": ""
        },
        "edges": [
          {
            "node": {
              "balance": "3",
              "reservedBalance": "0",
              "token": {
                "tokenId": "1",
			// to read the metadata I should query the url provided as the value for the uri attribute
                "attributes": [
                  {
                    "key": "uri",
                    "value": "https://etherscapegame.com/crypto/ImperialSovereign.json"
                  }
                ]
              }
            }
          }
        ]
      }
    }
  }
}

```

## Best Practices

- Only pull data from the collections you need. This will improve performance and ensure your backend infrastructure remains scalable.
- Always read and check the balance. Sometimes, the player may hold the token but the balance is actually zero, for instance, if the token has been burned. These burned tokens should not have in-game utility.
- Consider whether you want NFTs that are listed on a marketplace to have utility in your game. Items that are listed for sale don't show up in regular token balance and show up in reserved balance instead. If you want them to have utility, you can check the reserved balance and include the reserved supply.
- Consider if you need to use pagination. Users can have hundreds of tokens, in this situation you will need to read them in multiple calls.
- If you plan to utilize metadata from on-chain or external sources, it's important to also read the token's attributes. Typically, you'll find a "uri" attribute that points to the external location of this metadata.
- When accessing external metadata or media, make sure to do so asynchronously and think about storing it in a local cache for faster retrieval.

### Syncing Tokens

In order to implement any token in game you will need to sync a list of token ids that your player has in their wallet. In the most simple case, you only need to sync tokens from a single collection (likely the main collection associated with your game). However, in multiverse cases, you will now need to sync tokens from multiple collections. There are a couple of options to achieve this.

1. Sync All Tokens  
   The first approach is to sync all the tokens in the players wallet across all collections. This makes the graphQL query very simple. However, with this approach you need to bear in mind that some wallets will have thousands of tokens in them (and could grow to even hundreds of thousands). This means that you can’t rely on syncing all the wallets tokens in a single call. You will need to make sure to implement proper pagination using the GraphQL API’s so that you can read out the tokens in many batches.
2. Sync Specific Collections Only  
   Another approach is to only sync the collections you care about. This will limit the total number of tokens that you need to sync. In your GraphQL query you can specify a list of collection and token ids in order to narrow down the range. Depending on your case, you may still want to handle pagination of calls if any of the collections you include have a large number of tokens.

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
  <img src={require('./img/adjust-art-style.png').default} width="400" alt="Adjust the item's art style to fit your game" />
</p>
:::

### ERC-1155 Grouped NFTs

There are many tokens that have been migrated from the ERC-1155 version of Enjin. In ERC-1155 there is a concept called “Grouped NFTs” where there is a grouping of NFT tokens that share the same metadata.

A popular example of this would be “Oindrasdain” from “The Multiverse” collection. There are many copies of Oindrasdain and they have token ids that look like the following…

`107002853660685728488179487227240257220`

If you convert this token id into hex, you will be able to see its 128 bit representation like the following…

`508000000000002700000000000016C4`

This can then be broken into two 64 bit parts (or 16 hex string characters) like the following…

Group ID: `5080000000000027`

Group Index: `00000000000016C4`

All tokens in the collection that share the same group id are intended to be of the same token type and thus should get the same utility. This is similar to how <GlossaryTerm id="multi_unit_token" />s work.
