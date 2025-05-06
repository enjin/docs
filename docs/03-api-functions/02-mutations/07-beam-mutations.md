---
title: "Beam"
slug: "beam"
description: "Perform Beam mutations in the Enjin API to manage QR code activations, enabling blockchain asset distribution via QR code scans."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Please note: This is an introductory reference
For the most up-to-date information, refer to the [API Reference](/01-getting-started/04-using-enjin-api/02-api-reference.md).\
🚧 The information provided in this section cannot be programmatically updated and may be subject to inconsistencies over time.
:::

:::tip Beam Endpoints
- **Testnet:** `http://platform.canary.enjin.io/graphql/beam`
- **Mainnet:** `http://platform.enjin.io/graphql/beam`
:::

This is a detailed reference guide that explains the most commonly used operations. 

## CreateBeam

The `CreateBeam` mutation is used to create a new Enjin Beam distribution campaign. Enjin Beam is a method for distributing tokens via QR codes. This mutation sets up the details and parameters of the Beam campaign.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateBeam {
  CreateBeam(
    name: "My Beam"
    description: "This is a test beam."
    image: "https://assets-global.website-files.com/60f57c496975b84c29335fb7/60f58bd888a6e86e3ff69551_Enjin.svg"
    start: "20230101"
    end: "20240101"
    collectionId: 7153
    tokens: [
      {tokenIds:"1..10" tokenQuantityPerClaim:1 claimQuantity:1 type:MINT_ON_DEMAND}
    ]
  )
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "CreateBeam": "cd6443f822cf6e89c03edd4f6fbc6e55"
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

- **You** can use the `CreateBeam` mutation to set up Enjin Beam campaigns for various purposes:
  - **Marketing and Promotions**: Distribute promotional items, rewards, or collectibles to engage users effectively.
  - **Event Tie-ins**: Create time-limited Beam campaigns to coincide with events or special occasions.
  - **Controlled Distribution**: Precisely control the distribution of tokens by specifying token IDs, claim quantities, and distribution types.
  - **Flexibility**: Opt for the "MINT_ON_DEMAND" distribution type to mint tokens only when they are claimed, optimizing resource usage and ensuring tokens are created as needed.

This mutation is a fundamental step in launching a new Enjin Beam campaign, allowing **you** to efficiently distribute tokens and interact with users through QR code-based token distribution.

## ClaimBeam

The `ClaimBeam` is used to claim a specific Enjin Beam using a unique code. Enjin Beam is a method for distributing tokens, and this mutation allows users to claim their allocated tokens by providing the necessary code and cryptographic signature.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation ClaimBeam {
  ClaimBeam(
    code: "cd6443f822cf6e89c03edd4f6fbc6e55"
    account: "cxMsNPRk7Ek5V76NC4o2HTBrnxcUnxLA9btuKPcuPkmYi84Ts"    
    signature:"0x1d670c35a76efa984fa2bd655d21eb28af0ee470e359848d2105845e170bb589fd6b7c2cbe97c9acce1eb205d4ade39cae75c619230cf44b64b25ec8677d7f0f"
    cryptoSignatureType:SR25519
  )
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "ClaimBeam": true
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

- **You** can use the `ClaimBeam` mutation in various scenarios, including:
  - **Digital Rewards**: Players can claim rewards for in-game achievements by entering a provided code within the game's interface. The mutation handles the claiming process in the background.
  - **Promotional Campaigns**: Special promotions can distribute codes via email, social media, or partnerships, allowing users to redeem them for special in-game items or bonuses.
  - **Cross-Platform Bonuses**: Players can claim rewards earned on one platform and use them on another platform by utilizing the `ClaimBeam` mutation.
  - **Gifts and Trades**: Players can trade items or send gifts to others using codes. The recipient claims the item with the mutation, ensuring secure and authorized transfers.

This mutation simplifies the asset claim process, making it convenient and secure for users. It eliminates the need for QR code scanning, which can be particularly advantageous in scenarios where scanning is not feasible or convenient. Additionally, it enables automated claiming processes within the game ecosystem, streamlining asset distribution.

## UpdateBeam

The `UpdateBeam` mutation is used to modify the properties of an existing Enjin Beam. It allows you to update specific attributes of a Beam, such as its name, to ensure that the campaign remains accurate and adaptable.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation UpdateBeam {
  UpdateBeam(
    code: "ca8524349abab1cc20994841a8e0f175"
    name: "My beam UPDATED"
  )
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "UpdateBeam": true
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

- You can use the `UpdateBeam` mutation in various scenarios, including:
  - **Campaign Adaptation**: If your marketing campaign evolves or changes its theme, you can use this mutation to update the Beam's name to reflect the new direction.
  - **Error Correction**: If there was an error or typo in the original Beam name or any other updatable detail, you can correct it without the need to create a new Beam.
  - **Dynamic Campaign Management**: As your campaign progresses, you have the flexibility to manage and update the Beam's details to keep them aligned with your campaign strategy.

This mutation is a valuable tool for campaign management, offering the ability to make dynamic changes and ensure that your campaign remains relevant and up-to-date even after its initial creation.

## DeleteBeam

The `DeleteBeam` mutation is used to delete an existing Enjin Beam from the system. It allows you to remove a Beam and all of its associated data based on its unique identifier code.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation DeleteBeam {
  DeleteBeam(code: "cd6443f822cf6e89c03edd4f6fbc6e55")
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "DeleteBeam": true
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

- **You** can use the `DeleteBeam` mutation in various scenarios, including:
  - **Campaign Closure**: When a promotional campaign or event ends, and the Beam is no longer needed, you can delete it to prevent clutter and confusion in your system.
  - **Mistake Rectification**: If a Beam was created by mistake or no longer aligns with your campaign strategy, you can remove it to maintain a clean and relevant campaign portfolio.
  - **Resource Management**: Deleting unused Beams is essential for efficient resource management and keeping your system organized.

This mutation is a critical component of Beam lifecycle management, allowing you to maintain a streamlined and efficient system by removing obsolete or unwanted Beams.
