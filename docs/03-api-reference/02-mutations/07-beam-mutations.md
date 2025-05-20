---
title: "Beam"
slug: "beam"
description: "Perform Beam mutations in the Enjin API to manage QR code activations, enabling blockchain asset distribution via QR code scans."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Please note: This is an introductory reference
For the most up-to-date information, refer to the [API Reference](/03-api-reference/03-api-reference.md).\
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
