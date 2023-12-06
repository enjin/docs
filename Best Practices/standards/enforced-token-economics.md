---
title: "Enforced Rarity"
slug: "enforced-token-economics"
excerpt: ""
hidden: false
metadata: 
image: []
robots: "index"
createdAt: "Wed Nov 08 2023 18:48:55 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Nov 08 2023 20:15:19 GMT+0000 (Coordinated Universal Time)"
---
# NFT Collection

Consider a situation where your goal is to create a <<glossary:Collection>> limited to 1,000 tokens, where each token is an <<glossary:NFT>> symbolizing a distinct in-game sword.

Accomplishing this requires the right configuration of your Mint Policy:

![](https://files.readme.io/45ce034-image.png)

By setting the "**Max Token Count**" to `1,000`, you can cap the total number of tokens in the swords collection to 1,000.

Meanwhile, setting the "**Max Token Supply**" to `1` ensures that each token in the swords collection will have a maximum supply of `1`. This enforces the uniqueness of each token in the collection, enforcing each token in the collection to be an NFT.

# Immutable Tokenomics

Suppose you want to create a <<glossary:Collection>> with one simple but crucial rule: once a token is minted, it can't be minted again. This means the initial supply of a token becomes its forever cap.

Achieving this requires careful configuration of your Mint Policy:

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/c4aeb6b-image.png",
        null,
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


By toggling the "**Force Single Mint**", you ensure that each token in the collection can be minted once.  
This guarantees the immutability of each token's maximum supply in the collection, maintaining its value and scarcity over time.