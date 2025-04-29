---
title: "Metadata Example"
slug: "metadata-example"
description: "View detailed examples of how to implement metadata within your blockchain tokens, following Enjin’s guidelines for token structure and data representation."
---
In this page we will create JSON formatted metadata for a collection and a token, following the [Metadata Standard](/02-guides/03-advanced-mechanics/02-metadata-standard/02-metadata-standard.md).

You may set the collection/token `uri` on-chain attribute to a resource containing the collection's/token's metadata in JSON format, or set each individual metadata with an on-chain attribute, using the metadata type as the attribute key.  
For example, to set the token's description individually, set the token's on-chain attribute key to `description`, and provide the description as the attribute's value.  
If both on-chain and off-chain attributes are set, the on-chain attributes will take precedence over the off-chain attributes.

:::warning **Important:** Attribute keys are case sensitive.
Ensure you use the correct casing when defining attributes to avoid errors.
:::

## Collection Metadata

```json
{
  "name": "The Multiverse",
  "description": "A blockchain gaming multiverse is a collective gaming reality created by integrating a collection of blockchain assets with multiple games. In other words, a gaming multiverse is a collaborative gaming project where multiple game developers agree to use the same shared, decentralized database for some (or even all) of their in-game assets.\nThis enables gamers to utilize a multiverse asset in every game that is a part of a specific gaming multiverse (e.g., if a player owns a sword in Game A, they will also own it and can use it in Game B). In-game assets in a blockchain gaming multiverse are owned by gamers, while individual game developers control only the games they create.\nThe Enjin Multiverse is the first blockchain gaming multiverse ever.\nIt was announced on August 26, 2018, when six games (9Lives Arena, Age of Rust, Bitcoin Hodler, CryptoFights, Forest Knight, and War of Crypta) decided to collaborate and implement the first shared blockchain assets.\nIt has since grown to over 30 games.",
  "media": [
    {
      "url": "https://cdn.enjinx.io/assets/images/ethereum/platform/0/apps/8/2b728df41fadef568e4410fb823999d14473ef1e.jpeg",
      "type": "image/jpeg"
    },
    {
      "url": "https://platform.production.enjinusercontent.com/enterprise/enjin/assets/media/2024-multiverse.banner.jpg",
      "type": "image/jpg"
    }
  ],
  "fallback_image": "https://cdn.enjinx.io/assets/images/ethereum/platform/0/apps/8/2b728df41fadef568e4410fb823999d14473ef1e.jpeg",
  "external_url": "https://enjin.io/multiverse"
}
```

### Attribute Keys Explained:

- `name`: The collection's display name.
- `description`: The collection's description.
- `media`: A list of links to media files (images, GIFs, videos, etc.) to be displayed as the collection media.
  - The NFT.io marketplace uses the first provided media file as the collection's featured media, and the second provided media file as a banner image.
- `fallback_image`: A link to an alternative image file to be used when the media provided in the `media` list fails to load.
- `external_url`: A link to the collection's website.

## Token Metadata

```json
{
  "name": "Primythical Chest",
  "description": "As written in the fourth edition of 'Book of the Ruindawn', Primythical Chests contain fabled treasures, and are hidden through a myriad of universes by the Creators of Realms themselves—the Architects.\nThe wood-and-iron vaults are shrouded by the veils of time and space—and can only be found by the most courageous and intelligent Wanderers.",
  "media": [
    {
      "url": "https://cdn.enjin.io/mint/images/50000000000000c3.jpg",
      "type": "image/jpg"
    },
    {
      "url": "https://cdn.enjin.io/mint/videos/chest.mp4",
      "type": "video/mp4",
    },
    {
      "url": "https://cdn.enjin.io/mint/models/chest.glb",
      "type": "model/gltf-binary",
    }
  ],
  "fallback_image": "https://cdn.enjin.io/mint/images/50000000000000c3.jpg",
  "attributes": {
    "Usable In": {
      "value": "Lost Relics, Etherscape, Axiomech"
    },
    "Artifact Rarity": {
      "value": "Common"
    }
  },
  "external_url": "https://enjin.io/multiverse",
  "keywords": [
    "Multiverse Item",
    "Key",
    "Free"
  ]
}
```

### Attribute Keys Explained:

- `name`: The token's display name.
- `description`: The token's description.
- `media`: A list of links to media files (images, GIFs, mp4, GLB, etc.) to be displayed as the token media.
  - On the Enjin Wallet and NFT.io marketplace, when more than one media file is provided, the media is scrollable.
- `fallback_image`: A link to an alternative image file that serves as a backup when the media files listed under `media` fail to load or are unsupported in certain views.
  - Best Practice: Use an image hosted on a different server to ensure availability in case of server downtime.
  - The `fallback_image` is also helpful for views that do not support the primary media file.  
    Example: If the main media file is a 3D object (e.g., GLB), a fallback image can be displayed in views that lack 3D rendering support.
- `attributes`: A list of custom properties attached to the token. In the above example, it's used as an indicator of the item's common rarity and a list of games it's usable in.
- `external_url`: A link to the token's website or a website with information on the token.
- `keywords`: A list of keywords relevant to this token. Used to help find this token in search queries.
  - In the NFT.io Marketplace, keywords also act as tags.

:::info Need more information?
For a comprehensive document on the metadata structure, please head over to the [Universal Off-Chain Token Metadata Standard](https://github.com/enjin/universal-metadata-standard/blob/uotm-standard-wip/README.md) page.
:::
