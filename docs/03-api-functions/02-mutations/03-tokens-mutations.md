---
title: "Tokens"
slug: "tokens"
description: "Use the Enjin API to perform tokens mutations, including minting new tokens, burning existing ones, and modifying token metadata."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Please note: This is an introductory reference
For the most up-to-date information, refer to the [API Reference](/01-getting-started/04-using-enjin-api/02-api-reference.md).\
🚧 The information provided in this section cannot be programmatically updated and may be subject to inconsistencies over time.
:::

:::tip Core Endpoints
- **Testnet:** `http://platform.canary.enjin.io/graphql`
- **Mainnet:** `http://platform.enjin.io/graphql`
:::

This is a detailed reference guide that explains the most commonly used operations.

## CreateToken

The `CreateToken` mutation enables you to create a new token within an existing collection. This operation is essential for introducing new digital assets, and it allows you to define various attributes and characteristics for the newly created token.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateToken {
    CreateToken(
        recipient: "0xc4571a3720604eb1901dad5444376f91409814a2806686c6e6c4f2d664b422a3"
        collectionId: "10941"
        params: {
          tokenId:{integer:1}
          initialSupply:10
          cap: {
            type:INFINITE
          }
          metadata: {name: "Gold Coins", symbol: "GOLD", decimalCount: 2}
        }
    ) {
        id
        transactionId
        transactionHash
        method
        state
        encodedData
        wallet {
            account {
                publicKey
                address
            }
        }
    }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "CreateToken": {
      "id": 14060,
      "transactionId": null,
      "transactionHash": null,
      "method": "CreateToken",
      "state": "PENDING",
      "encodedData": "0x280400c4571a3720604eb1901dad5444376f91409814a2806686c6e6c4f2d664b422a3f5aa00042800010000c16ff28623000000000000000000000000000000",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

:::info
For Token ID management, head to [Advamced Mechanics → TokenID Structure](/02-guides/03-advanced-mechanics/01-tokenid-structure.md)
:::
### Use Case:

You can use the `CreateToken` mutation in various scenarios, including:

- **Digital Collectibles**: Create unique digital collectible tokens within a collection, each with distinct characteristics.
- **Digital Currencies**: Create tokens with dynamic supplies, such as "INFINITE," allowing flexibility in your token economy, and support for decimals with "decimalCount", for in-game "Currency" tokens, such as Gold Coins. [Read more on Currency Tokens](/02-guides/01-managing-tokens/02-creating-tokens/02-creating-a-currency-token.md).
- **Reward Tokens**: Issue reward tokens with predefined supply and pricing for loyalty programs or incentivizing user engagement.

By utilizing the `CreateToken` mutation, you can manage and control the issuance of tokens, enabling various use cases that require the creation of digital assets with specific attributes and supply policies.

## MintToken

The `MintToken` mutation allows you to increase the supply of an existing token. This operation is essential for managing the circulating supply of tokens and is typically used when you need to create additional units of a specific token.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation MintToken {
    MintToken(
        recipient: "0xaa89f9099742a928051c41eadba188ad4e863539ff96f16722ae7850271c2921"
        collectionId: "7154"
        params: {
          amount:1
          tokenId: {integer: 6533}
        }
    ) {
        id
        transactionId
        transactionHash
        method
        state
        encodedData
        wallet {
            account {
                publicKey
                address
            }
        }
    }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "MintToken": {
      "id": 14065,
      "transactionId": null,
      "transactionHash": null,
      "method": "MintToken",
      "state": "PENDING",
      "encodedData": "0x280400aa89f9099742a928051c41eadba188ad4e863539ff96f16722ae7850271c2921c96f01156604010000c16ff28623000000000000000000",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

You can use the `MintToken` mutation in various scenarios, including:

- **Token Rewards**: Mint additional tokens to reward users for specific actions or achievements application.
- **Supply Management**: Increase the supply of a token to accommodate growing demand in a tokenized ecosystem.
- **Inflation Control**: Adjust the supply of a token to maintain economic stability and control inflation.

By utilizing the `MintToken` mutation, you have the flexibility to manage the supply of existing tokens in a controlled and transparent manner, ensuring that your tokenized ecosystem operates effectively and efficiently.

## BatchMint

The `BatchMint` mutation enables you to efficiently create multiple tokens within a single blockchain transaction. This process, known as batch minting, simplifies the minting of multiple tokens, reducing transaction fees and processing time.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation BatchMint {
  BatchMint(
    collectionId: "7154"
    recipients: [
      {
        account: "0xaa89f9099742a928051c41eadba188ad4e863539ff96f16722ae7850271c2921"
        mintParams: {
          amount:1
          tokenId: {integer: 6533}
        }
      },
      {
        account: "0xaa89f9099742a928051c41eadba188ad4e863539ff96f16722ae7215a17f847"
        mintParams: {
          amount:5
          tokenId: {integer: 4422}
        }
    	}
    ]
  ) {
    id
    transactionId
    transactionHash
    method
    state
    encodedData
    wallet {
      account {
        publicKey
        address
      }
    }
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "BatchMint": {
      "id": 13928,
      "transactionId": null,
      "transactionHash": null,
      "method": "BatchMint",
      "state": "PENDING",
      "encodedData": "0x280dc96f04aa89f9099742a928051c41eadba188ad4e863539ff96f16722ae7850271c292101156604010000c16ff28623000000000000000000",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

You can use the `BatchMint` mutation in various scenarios, including:

- **Efficient Token Distribution**: When you need to distribute a large number of tokens to multiple recipients, batch minting reduces network congestion and minimizes transaction fees.
- **Mass Token Creation**: When you want to mint a significant quantity of tokens at once, such as for rewards, promotions, or in-game assets.
- **Resource Optimization**: To streamline the minting process and improve overall efficiency for both issuers and recipients.
- **Cost Savings**: By consolidating minting actions into a single transaction, you can save on cumulative transaction fees.

By utilizing the `BatchMint` mutation, you can efficiently manage the creation and distribution of multiple tokens, optimizing both time and resources.

## SetTokenAttribute

The `SetTokenAttribute` mutation allows you to assign or update attributes for a specific token within a collection. It is used to manage individual token metadata and properties.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation SetTokenAttribute{
  SetTokenAttribute(
    collectionId: "4741"
    tokenId: {integer:0}
    key: "test"
    value: "Hello"
  ) {
    id
    transactionId
    transactionHash
    method
    state
    encodedData
    wallet {
      account {
        publicKey
        address
      }
    }
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "SetTokenAttribute": {
      "id": 14073,
      "transactionId": null,
      "transactionHash": null,
      "method": "SetTokenAttribute",
      "state": "PENDING",
      "encodedData": "0x2809154a010000000000000000000000000000000010746573741448656c6c6f",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

You can utilize the `SetTokenAttribute` mutation in various scenarios, including:

- **Token Metadata Management**: When you need to update or assign specific attributes to tokens, affecting how they are displayed or interacted with in applications.
- **Non-Fungible Tokens (NFTs)**: Particularly important for NFTs, where each token represents a unique item or asset, and setting unique attributes ensures individuality.
- **Customization**: Enabling customization of tokens within a collection, allowing you to tailor their properties to specific use cases.

By using the `SetTokenAttribute` mutation, you can efficiently manage and customize the attributes of individual tokens, enhancing their utility and uniqueness.

## BatchSetAttribute

The `BatchSetAttribute` mutation allows you to efficiently set or update multiple attributes for a specific token within a collection in a single blockchain transaction. Attributes represent various properties, characteristics, or metadata associated with a token.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation BatchSetAttribute {
    BatchSetAttribute(
        collectionId: "7154"
        tokenId: {integer:6533}
        attributes: [
          {
          	key:"Name"
          	value:"John"
          },
          {
          	key:"Surname"
          	value:"Snow"
          },
          {
          	key:"House"
          	value:"Stark"
	        }
        ]
    ) {
        id
        transactionId
        transactionHash
        method
        encodedData
        state
        wallet {
            account {
                publicKey
                address
            }
        }
   }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "BatchSetAttribute": {
      "id": 13961,
      "transactionId": null,
      "transactionHash": null,
      "method": "BatchSetAttribute",
      "encodedData": "0x280ec96f01851900000000000000000000000000000410746573741468656c6c6f",
      "state": "PENDING",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

The `BatchSetAttribute` mutation is valuable for various use cases, including:

- **Efficient Metadata Management**: When you need to update or assign multiple attributes to a token within a collection, optimizing the metadata management process.
- **Bulk Attribute Updates**: Useful for applications where the same set of attributes needs to be applied to multiple tokens, such as gaming assets, collectibles, or NFTs.
- **Streamlined Token Customization**: When you want to customize the properties and features of tokens to suit specific use cases or user preferences.
- **Reducing Transaction Overhead**: By combining multiple attribute updates into a single transaction, you can save on transaction fees and processing time, enhancing overall efficiency.

The `BatchSetAttribute` mutation simplifies the process of updating token attributes within a collection, making it easier to manage and customize token properties.

## BatchTransfer

The `BatchTransfer` mutation streamlines the process of transferring multiple tokens to one or more recipients within a single blockchain transaction. This is particularly useful when you need to distribute tokens to various accounts, such as rewarding multiple users or dispersing assets to different stakeholders.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation BatchTransfer {
    BatchTransfer(
        collectionId: 36105
        recipients: [
          {
            account:"cxM1YqYERiNvuEKkZUiUFefCtTfdy2q4Bj7QuWDfSPJuiuDWy"
            simpleParams: {
              tokenId: {integer:1}
              amount:1
            }
          },
          {
            account:"cxKLTnnbsjsWQen47Sb73WfvCSsWAQfjNd6hRW86EqKC9Frhu"
            simpleParams: {
              tokenId: {integer:1}
              amount:2
            }
          },
          {
            account:"cxM1YqYERiNvuEKkZUiUFefCtTfdy2q4Bj7QuWDfSPJuiuDWy"
            simpleParams: {
              tokenId: {integer:4}
              amount:1
            }
        	}
        ]        
    ) {
        id
        transactionId
        transactionHash
        method
        state
        encodedData
        wallet {
            account {
                publicKey
                address
            }
        }
    }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "BatchTransfer": {
      "id": 13974,
      "transactionId": null,
      "transactionHash": null,
      "method": "BatchTransfer",
      "state": "PENDING",
      "encodedData": "0x280cc96f041013860712045df3393a7902eba3621115fdb7a6a4837349f7bc2fb676d57c000015660400",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

The `BatchTransfer` mutation is a powerful tool for various use cases, including:

- **Efficient Token Distribution**: When you need to distribute tokens to multiple recipients in a single transaction, reducing both transaction fees and processing time.
- **Bulk Asset Movements**: Handling bulk asset transfers, which is common in non-fungible token (NFT) platforms, where users may purchase or receive multiple assets at once.
- **Streamlining Operations**: Simplifying the process of transferring tokens in bulk, making it an essential function for managing tokens within a decentralized application (dApp).

The `BatchTransfer` mutation is distinct from `BatchMint`, which is used for creating multiple tokens, and `BatchSetAttribute`, which updates token attributes. Instead, `BatchTransfer` focuses on efficiently transferring existing tokens from one account to multiple recipients, making it a valuable tool for managing token distribution within your dApp.

## SimpleTransferToken

The `SimpleTransferToken` mutation simplifies the process of transferring a specific token from one wallet to another. It is a straightforward way to facilitate token transfers without the need for complex intermediary steps.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation SimpleTransferToken {
    SimpleTransferToken(
        collectionId: "7154"
        recipient: "0xc4571a3720604eb1901dad5444376f91409814a2806686c6e6c4f2d664b422a3"
        params: {
            tokenId: {integer:70468841277235617716769448539773927607}
            amount:1
        }
    ) {
        id
        transactionId
        transactionHash
        method
        state
        encodedData
        wallet {
            account {
                publicKey
                address
            }
        }
    }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "SimpleTransferToken": {
      "id": 14074,
      "transactionId": null,
      "transactionHash": null,
      "method": "SimpleTransferToken",
      "state": "PENDING",
      "encodedData": "0x280600c4571a3720604eb1901dad5444376f91409814a2806686c6e6c4f2d664b422a3c96f0033b7007b94fad4fa2fe1d6a5b71ece03350400",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

The `SimpleTransferToken` mutation is useful in various scenarios, including:

- **Peer-to-Peer Transactions**: Enabling direct transfers of tokens between two accounts without the need for intermediaries.
- **Token Ownership Transfer**: Facilitating the transfer of ownership of tokens, especially in marketplaces or when transferring assets between users.
- **Automated Token Distribution**: Streamlining the process of distributing tokens for purposes such as rewards, airdrops, or automated transactions.

You can use `SimpleTransferToken` when you want to initiate a straightforward token transfer from one account to another. It simplifies the process, making it an essential function for handling token transfers.

## ApproveToken

The `ApproveToken` mutation is a powerful tool for establishing fine-grained permission systems at the individual token level within a specific token collection. It enables a token owner to grant another account (the operator) the authority to transfer a defined number of tokens from their ownership to other accounts. This level of control is particularly valuable when managing tokens with varying values, attributes, or use cases within a collection.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation ApproveToken {
  ApproveToken(
    collectionId: "7154"
    tokenId: {integer:6533}
    operator: "0x965bcdbb46614cbd79869e2eb568825f6c038cbdf9085edb1b164607d3738fa6"
    amount: 1
    currentAmount: 1
    expiration: 445300
  ) {
    id
    transactionId
    transactionHash
    method
    state
    encodedData
    wallet {
      account {
        publicKey
        address
      }
    }
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "ApproveToken": {
      "id": 13855,
      "transactionId": null,
      "transactionHash": null,
      "method": "ApproveToken",
      "state": "PENDING",
      "encodedData": "0x2811c96f1566965bcdbb46614cbd79869e2eb568825f6c038cbdf9085edb1b164607d3738fa6040174cb060004",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

The `ApproveToken` mutation is exceptionally useful in various scenarios, including:

- **Fine-Grained Control**: Allowing token owners to delegate token management on a per-token basis, enabling precise control over who can transfer specific tokens and in what quantity.
- **Unique Token Management**: Facilitating the handling of tokens with varying values, attributes, or utilities within a collection.
- **Third-Party Management**: Enabling automated systems or trusted third parties to manage tokens without transferring ownership, a critical capability for various decentralized applications.

You can use `ApproveToken` when you need to establish highly specific permission structures for individual tokens. It offers a sophisticated level of control that is vital for scenarios where each token may have distinct permissions and use cases.

## UnapproveToken

The `UnapproveToken` mutation serves the purpose of revoking approval for a specific account (referred to as the "operator") to transfer a particular token from a token account. Unlike `UnapproveCollection`, which revokes permissions over an entire collection, `UnapproveToken` provides fine-grained control by targeting individual tokens within a collection. This level of precision is valuable when managing tokens with distinct values, attributes, or permissions within a collection.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation UnapproveToken{
    UnapproveToken(
        collectionId: 7154
        tokenId: {integer:70468841277235617716769448539773927607}
        operator: "0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d"
    ) {
        id
        transactionId
        transactionHash
        method
        state
        encodedData
        wallet {
            account {
                publicKey
                address
            }
        }
    }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "UnapproveToken": {
      "id": 14079,
      "transactionId": null,
      "transactionHash": null,
      "method": "UnapproveToken",
      "state": "PENDING",
      "encodedData": "0x2812c96f33b7007b94fad4fa2fe1d6a5b71ece0335d43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

The `UnapproveToken` mutation is particularly valuable in several scenarios, including:

- **Precise Permission Control**: Allowing token owners to meticulously manage permissions for individual tokens within their collection, ensuring that each token's transferability is controlled as needed.
- **Distinct Token Management**: Facilitating the management of tokens with varying values, attributes, or use cases within a collection.
- **Revoking Unauthorized Access**: Revoking approval for operators who should no longer have permission to transfer specific tokens.

You can utilize `UnapproveToken` when you need to maintain a high level of control over individual token permissions. It is especially essential when tokens within a collection have unique attributes, values, or permissions, and you want to ensure that unauthorized transfers are prevented.

## Freeze

The `Freeze` mutation is a powerful tool that enables the temporary suspension of token transfers on a collection, token, collection account, or token account. This freezing action effectively prevents any further transfers from occurring, which also results in marketplace listings being unpurchaseable. The primary purpose of freezing is to provide administrative control, enhance security, investigate suspicious activities, or respond to unforeseen events that require the temporary halt of operations.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation Freeze {
  Freeze(
    freezeType: COLLECTION
    collectionId: "10943"    
  ) {
    id
    transactionId
    transactionHash
    method
    state
    encodedData
    wallet {
      account {
        publicKey
        address
      }
    }
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "Freeze": {
      "id": 14064,
      "transactionId": null,
      "transactionHash": null,
      "method": "Freeze",
      "state": "PENDING",
      "encodedData": "0x2807fdaa00",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

The `Freeze` mutation serves various important use cases, including:

- **Security and Oversight**: You can use it to enhance the security of assets in the event of suspicious activities or during an investigation. Freezing prevents any further transfers that could compromise the assets.
- **Administrative Control**: It provides a means for administrative actions on assets, such as during maintenance or upgrades, allowing you to pause transfers temporarily to make necessary adjustments.
- **Emergency Response**: In unforeseen events that require an immediate response to prevent harm or loss, you can execute the freeze operation to halt all transfers and protect the assets from potential damage.

You can leverage the `Freeze` mutation when you need to exercise control, oversight, or emergency response capabilities over collections, tokens, or accounts, ensuring the safety and integrity of your assets.

## Thaw

The `Thaw` mutation is a vital operation that allows you to unfreeze a previously frozen collection or token. Freezing temporarily prevents any transfers from occurring. Thawing reverses this action, restoring the collection or token's ability to be traded and transferred.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation Thaw{
  Thaw(
    freezeType: TOKEN
    collectionId: 7154
    tokenId: {integer:70468841277235617716769448539773927607}
  ) {
    id
    transactionId
    transactionHash
    method
    state
    encodedData
    wallet {
      account {
        publicKey
        address
      }
    }
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "Thaw": {
      "id": 14075,
      "transactionId": null,
      "transactionHash": null,
      "method": "Thaw",
      "state": "PENDING",
      "encodedData": "0x2808c96f01b7007b94fad4fa2fe1d6a5b71ece03350101",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

The `Thaw` mutation is instrumental in the following scenarios:

- **Regaining Control**: If you own or administer a collection or token that was frozen for security, maintenance, or compliance reasons, you can use this mutation to regain full control and resume normal operations.
- **Resuming Transactions**: You can unfreeze tokens to allow trading and transferring to continue.
- **Dynamic Control**: It enables dynamic control over tokens, ensuring they remain compliant with external conditions or security protocols.

By executing the `Thaw` mutation, you can effectively restore the functionality of frozen tokens or collections, ensuring they remain responsive to your needs and operational requirements.

## MutateToken

The `MutateToken` mutation is a powerful tool for modifying specific properties of an individual token within a collection. It provides fine-grained control over token attributes, allowing you to make precise changes to a token's characteristics. In the provided example, the mutation is used to set the `listingForbidden` attribute to `true`, which effectively prohibits the token from being listed for sale or trade.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation MutateToken {
  MutateToken(
    collectionId: "7154"
    tokenId: {integer:6533}
    mutation: {
      listingForbidden:true
    }
  ) {
    id
    transactionId
    transactionHash
    method
    state
    encodedData
    wallet {
      account {
        publicKey
        address
      }
    }
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "MutateToken": {
      "id": 14067,
      "transactionId": null,
      "transactionHash": null,
      "method": "MutateToken",
      "state": "PENDING",
      "encodedData": "0x2803c96f15660100010100",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

The `MutateToken` mutation serves various essential purposes, including:

- **Fine-Grained Control**: You can make precise changes to individual token attributes, allowing for customized management of token properties.
- **Administrative Control**: It provides the ability to enforce restrictions or apply updates to a specific token, ensuring compliance with your platform's rules and policies.
- **Token Lifecycle Management**: This mutation is crucial for managing the lifecycle events of tokens, enabling actions like freezing, updating, or enforcing specific behaviors.

By executing the `MutateToken` mutation, you have the flexibility to tailor the attributes and behavior of individual tokens within your collection, ensuring they align with your specific requirements and use cases.

## OperatorTransferToken

The `OperatorTransferToken` mutation is designed for operators to transfer tokens on behalf of the token owner. It enables the transfer of a specified amount of tokens from a source address to a recipient address, with the operation performed by an authorized operator.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation OperatorTransferToken{
    OperatorTransferToken(
      	collectionId: "7154"    
        recipient: "0x50a1ba0a184c9aca3a2ac7d427e96a676fe988454b4b56a62dd6622e843e890d"
        params: {
          tokenId: {integer:6533}
          amount:1
          source:"0x1013860712045df3393a7902eba3621115fdb7a6a4837349f7bc2fb676d57c00"
        }
    ) {
        id
        transactionId
        transactionHash
        method
        state
        encodedData
        wallet {
            account {
                publicKey
                address
            }
        }
    }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "OperatorTransferToken": {
      "id": 14068,
      "transactionId": null,
      "transactionHash": null,
      "method": "OperatorTransferToken",
      "state": "PENDING",
      "encodedData": "0x28060050a1ba0a184c9aca3a2ac7d427e96a676fe988454b4b56a62dd6622e843e890dc96f0115661013860712045df3393a7902eba3621115fdb7a6a4837349f7bc2fb676d57c000400",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

- **You** can use the `OperatorTransferToken` mutation in various scenarios, including:
  - **Gaming Platforms**: In online games, players may need to exchange in-game assets or currency, and operators can assist in managing these transfers securely.
  - **Asset Management**: Trusted third-party services can help users manage and transfer their digital assets efficiently.

This mutation is essential for scenarios where third-party services or platforms need the ability to manage tokens on behalf of the user. It provides a secure and controlled way to handle asset transfers, ensuring that the operator has the necessary permissions and authorization to perform these actions on behalf of users.

## RemoveAllAttributes

Remove all attributes from a collection and token.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation RemoveAllAttributes {
  RemoveAllAttributes(
    collectionId: "7154"  
    tokenId: {integer:6533}
  ) {
    id
    transactionId
    transactionHash
    method
    state
    encodedData
    wallet {
      account {
        publicKey
        address
      }
    }
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "RemoveAllAttributes": {
      "id": 14069,
      "transactionId": null,
      "transactionHash": null,
      "method": "RemoveAllAttributes",
      "state": "PENDING",
      "encodedData": "0x280bc96f018519000000000000000000000000000001000000",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

The `OperatorTransferToken` mutation plays a pivotal role in various scenarios where third-party services or platforms need the capability to manage tokens on behalf of users. This functionality is particularly useful in the following use cases:

- **Marketplaces**: You can use this mutation to facilitate secure and trusted transfers of assets within online marketplaces, allowing operators to handle transactions.
- **Gaming Platforms**: In the gaming industry, it enables operators to manage in-game assets and perform transfers or trades on behalf of players.
- **Asset Management**: For any application where users' assets, such as tokens, need to be managed by trusted operators, this mutation ensures controlled and authorized asset management.

By executing the `OperatorTransferToken` mutation, you empower trusted operators to handle token transfers, which is vital for enhancing user experiences and enabling secure asset management.

## RemoveTokenAttribute

The `RemoveTokenAttribute` mutation provides the capability to remove a specific attribute from an individual token within a collection. This operation is distinct from the `RemoveCollectionAttribute` mutation, which removes an attribute from all tokens within a collection. It is a precise way to manage token metadata, allowing for the removal of attributes that are no longer needed or contain errors.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation RemoveTokenAttribute {
  RemoveTokenAttribute(
    collectionId: "4741"
    tokenId: {integer:0}
    key: "name"
  ) {
    id
    transactionId
    transactionHash
    method
    state
    encodedData
    wallet {
      account {
        publicKey
        address
      }
    }
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "RemoveTokenAttribute": {
      "id": 14071,
      "transactionId": null,
      "transactionHash": null,
      "method": "RemoveTokenAttribute",
      "state": "PENDING",
      "encodedData": "0x280a154a0100000000000000000000000000000000106e616d65",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

The `RemoveTokenAttribute` mutation is a valuable tool for token owners or administrators who need to manage the metadata of individual tokens with precision. Here are some scenarios where this mutation is useful:

- **Data Correction**: You can use it to correct errors in token attributes, ensuring the accuracy of metadata.
- **Attribute Deletion**: When certain attributes of a token become irrelevant or need to be removed for any reason, this mutation allows for their deletion.
- **Metadata Cleanup**: Over time, tokens may accumulate unnecessary attributes. This mutation aids in keeping token metadata clean and relevant.

By executing the `RemoveTokenAttribute` mutation, you have granular control over the attributes associated with individual tokens, which is essential for maintaining data integrity and ensuring that token metadata remains accurate and up-to-date.

## TransferBalance

The `TransferBalance` mutation is an operation designed for initiating the transfer of a specified amount of funds or balance from one account to another. It plays a fundamental role in enabling financial transactions by allowing users to send precise amounts of cryptocurrency or digital assets securely and transparently.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation TransferBalance {
    TransferBalance(
        recipient: "0xc4571a3720604eb1901dad5444376f91409814a2806686c6e6c4f2d664b422a3"
        amount: 1
    ) {
        id
        transactionId
        transactionHash
        method
        state
        encodedData
        wallet {
            account {
                publicKey
                address
            }
        }
    }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "TransferBalance": {
      "id": 14077,
      "transactionId": null,
      "transactionHash": null,
      "method": "TransferBalance",
      "state": "PENDING",
      "encodedData": "0x0a0300c4571a3720604eb1901dad5444376f91409814a2806686c6e6c4f2d664b422a304",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

The `TransferBalance` mutation is a critical component for various financial and asset transfer scenarios. Here are some common use cases:

- **Peer-to-Peer Transactions**: You can use this mutation to enable users to send specific amounts of cryptocurrency or digital assets to others on your platform.
- **Payment Processing**: For merchants and e-commerce platforms, this mutation facilitates secure and precise payments from customers.
- **Budget Management**: In scenarios where users need to allocate specific amounts for specific purposes or budgeting, this mutation allows them to transfer precise amounts.

By executing the `TransferBalance` mutation, you, as a developer, empower users to conduct accurate and secure financial transactions. It ensures the movement of assets between parties is conducted with the required precision and control.

## TransferAllBalance

The `TransferAllBalance` mutation is designed for the purpose of transferring the entire balance from one account to another. It simplifies the process of moving all available funds from a sender's account to a recipient's account. This mutation is particularly useful for scenarios where you need to empty an account, consolidate funds from multiple accounts into one, or transfer ownership of an account by moving all assets to the new owner.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation TransferAllBalance {
    TransferAllBalance(
        recipient: "0xc4571a3720604eb1901dad5444376f91409814a2806686c6e6c4f2d664b422a3"
    ) {
        id
        transactionId
        transactionHash
        method
        state
        encodedData
        wallet {
            account {
                publicKey
                address
            }
        }
    }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "TransferAllBalance": {
      "id": 14076,
      "transactionId": null,
      "transactionHash": null,
      "method": "TransferAllBalance",
      "state": "PENDING",
      "encodedData": "0x0a0400c4571a3720604eb1901dad5444376f91409814a2806686c6e6c4f2d664b422a301",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

The `TransferAllBalance` mutation is a versatile operation with various practical use cases, including:

- **Emptying an Account**: You can use this mutation to completely empty a sender's account, ensuring that all available funds are transferred to another account.
- **Consolidating Funds**: When you need to consolidate funds from multiple accounts into a single account, this mutation simplifies the process.
- **Transferring Ownership**: In scenarios where you want to transfer ownership of an account, you can use `TransferAllBalance` to move all assets to the new owner's account, making it a seamless transition.

By executing the `TransferAllBalance` mutation, you, as a developer, provide users with a powerful tool for efficiently managing their account balances. It simplifies asset transfer operations by moving all available funds, eliminating the need for users to specify the exact amount, and ensuring that accounts remain operational as needed.

## Infuse

The Infuse mutation allows you to embed Enjin Coin (ENJ) into an existing token. This operation is crucial for enhancing the intrinsic value of digital assets, ensuring that they carry a guaranteed ENJ backing. By infusing ENJ, you provide tangible value to the token, which can only be retrieved through the process of "<GlossaryTerm id="melt" />ing" the token.

:::warning Important Note
The `amount` argument is denoted in `u128`. This means that the number you specify is divided by 10^18 to determine the actual amount of ENJ to be infused.
e.g.: to infuse a token with 5 ENJ, the infusion argument should be set to `5000000000000000000`, which is `5*(10^18)`.
:::

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation Infuse{
  Infuse(
    collectionId: 3298 #Specify the collection ID
    tokenId: {integer: 1} #Specify the token ID
    amount: 5000000000000000000 #Specify the amount of ENJ to infuse
  ){
    id
    method
    state
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "Infuse": {
      "id": 386279,
      "method": "Infuse",
      "state": "PENDING"
    }
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

The `Infuse` mutation can be utilized in various scenarios, including:

- **Enhancing Asset Value**: Infuse ENJ into tokens to provide a base value, making them more attractive to collectors and investors.
- **Gaming and Virtual Worlds**: Game developers can infuse ENJ into in-game items, ensuring they have real-world value and appeal to players.
- **Loyalty Programs**: Businesses can issue tokens with infused ENJ, adding tangible value to customer loyalty points.
- **Crowdfunding**: Projects can offer tokens infused with ENJ to backers, ensuring their contributions hold inherent value.

By using the `Infuse` mutation, you can effectively increase the perceived and actual value of tokens, fostering trust and interest in your digital assets. Note that infusing is permitted only if you are the collection owner or if the token's `anyoneCanInfuse` state is set to true.
