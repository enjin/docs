---
title: "Transfer / Accept collection ownership"
slug: "transfer-accept-collection"
description: "Explore how to transfer and accept entire blockchain collections, allowing for seamless movement of grouped assets within the Enjin ecosystem."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info What you'll need:
- An [Enjin Platform Account](/01-getting-started/04-using-the-enjin-platform.md).
- If you are transferring collection ownership, you also need to own a [Collection](/02-guides/01-platform/01-managing-tokens/01-creating-collections.md).
:::

Collection ownership on the Enjin Blockchain grants specific permissions and control over a collection and its tokens.
The collection owner is the only account authorized to make changes to the collection or any tokens within it. This includes the exclusive ability to mint new tokens or mint additional supply of existing tokens in the collection.

Transferring collection ownership is a two-step process: the current owner submits a transfer request, and the new owner accepts it.

:::info C++ SDK coming soon
The C++ examples on this page target an older version of the Enjin Platform and won't work against the current API. An updated C++ SDK is on the way — for now, use the C# SDK or the GraphQL examples.
:::

## Step #1: Sending a transfer ownership request with the [Enjin API](/01-getting-started/05-using-enjin-api/05-using-enjin-api.md)

To send a transfer ownership request, use the `mutateCollection` discriminator action on `CreateTransaction` and set the `owner` field to the new owner's address:

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation SendTransferOwnershipRequest {
  CreateTransaction(
    network: ENJIN  # or CANARY for testnet
    chain: MATRIX
    transaction: {
      mutateCollection: {
        collectionId: 36105
        owner: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"
      }
    }
  ) {
    uuid
    action
    state
  }
}
```
  </TabItem>
  <TabItem value="curl" label="cURL">
```
curl --location 'https://platform.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer YOUR_API_TOKEN' \
-d '{"query":"mutation SendTransferOwnershipRequest($collectionId: BigInt!, $newOwner: String!) {\r\n  CreateTransaction(\r\n    network: ENJIN\r\n    chain: MATRIX\r\n    transaction: { mutateCollection: { collectionId: $collectionId, owner: $newOwner } }\r\n  ) {\r\n    uuid\r\n    action\r\n    state\r\n  }\r\n}","variables":{"collectionId":36105,"newOwner":"cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System;
using Enjin.Platform.Sdk;

// Create and authenticate the client
using var client = new PlatformClient();
client.Auth("<your-platform-token>");

// Build the CreateTransaction mutation (one action set on TransactionInput)
// Initiating a collection-ownership transfer is done via the mutateCollection
// action by setting the new owner's address on the Owner field.
var mutation = new MutationQueryBuilder()
    .WithCreateTransaction(
        new TransactionQueryBuilder().WithUuid().WithState(),
        network: Network.Enjin, // or Network.Canary for testnet
        chain: Chain.Matrix,
        transaction: new TransactionInput
        {
            MutateCollection = new MutateCollectionInput
            {
                CollectionId = 36105,
                Owner = "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f", // the new owner
            },
        });

var response = await client.SendMutation(mutation);
Console.WriteLine(response.Result.Data?.CreateTransaction?.Uuid);
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
Work in progress
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Bearer YOUR_API_TOKEN'},
  body: JSON.stringify({
    query: `
      mutation SendTransferOwnershipRequest($collectionId: BigInt!, $newOwner: String!) {
        CreateTransaction(
          network: ENJIN
          chain: MATRIX
          transaction: {
            mutateCollection: {
              collectionId: $collectionId
              owner: $newOwner
            }
          }
        ) {
          uuid
          action
          state
        }
      }
    `,
    variables: {
      collectionId: 36105,
      newOwner: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"
    }
  }),
})
.then(response => response.json())
.then(data => console.log(data));
```
  </TabItem>
  <TabItem value="nodejs" label="Node.js">
```javascript
const axios = require('axios');

axios.post('https://platform.enjin.io/graphql', {
  query: `
    mutation SendTransferOwnershipRequest($collectionId: BigInt!, $newOwner: String!) {
      CreateTransaction(
        network: ENJIN
        chain: MATRIX
        transaction: {
          mutateCollection: {
            collectionId: $collectionId
            owner: $newOwner
          }
        }
      ) {
        uuid
        action
        state
      }
    }
  `,
  variables: {
    collectionId: 36105,
    newOwner: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"
  }
}, {
  headers: {'Content-Type': 'application/json','Authorization': 'Bearer YOUR_API_TOKEN'}
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```
  </TabItem>
  <TabItem value="python" label="Python">
```python
import requests

query = '''
mutation SendTransferOwnershipRequest($collectionId: BigInt!, $newOwner: String!) {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      mutateCollection: {
        collectionId: $collectionId
        owner: $newOwner
      }
    }
  ) {
    uuid
    action
    state
  }
}
'''

variables = {
  'collectionId': 36105,
  'newOwner': 'cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f'
}

response = requests.post('https://platform.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Bearer YOUR_API_TOKEN'}
)
print(response.json())
```
  </TabItem>
</Tabs>

Once the transaction is confirmed, the new owner needs to approve the ownership transfer request for the collection ownership to actually move.

:::tip Cancelling a pending transfer
If you need to undo a pending transfer before the new owner has accepted it, submit a `cancelCollectionTransfer` action with the same collection `id`:

```graphql
mutation CancelTransferOwnershipRequest {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      cancelCollectionTransfer: { id: 36105 }
    }
  ) {
    uuid
    action
    state
  }
}
```
:::

## Step #2: Accepting a transfer ownership request with the [Enjin API](/01-getting-started/05-using-enjin-api/05-using-enjin-api.md)

To accept a transfer ownership request, the new owner calls the `acceptCollectionTransfer` discriminator action with the collection's `id`:

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation AcceptTransferOwnershipRequest {
  CreateTransaction(
    network: ENJIN  # or CANARY for testnet
    chain: MATRIX
    transaction: {
      acceptCollectionTransfer: { id: 36105 }
    }
  ) {
    uuid
    action
    state
  }
}
```
  </TabItem>
  <TabItem value="curl" label="cURL">
```
curl --location 'https://platform.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer YOUR_API_TOKEN' \
-d '{"query":"mutation AcceptTransferOwnershipRequest($id: BigInt!) {\r\n  CreateTransaction(\r\n    network: ENJIN\r\n    chain: MATRIX\r\n    transaction: { acceptCollectionTransfer: { id: $id } }\r\n  ) {\r\n    uuid\r\n    action\r\n    state\r\n  }\r\n}","variables":{"id":36105}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System;
using Enjin.Platform.Sdk;

// Create and authenticate the client
using var client = new PlatformClient();
client.Auth("<your-platform-token>");

// Build the CreateTransaction mutation (one action set on TransactionInput)
var mutation = new MutationQueryBuilder()
    .WithCreateTransaction(
        new TransactionQueryBuilder().WithUuid().WithState(),
        network: Network.Enjin, // or Network.Canary for testnet
        chain: Chain.Matrix,
        transaction: new TransactionInput
        {
            AcceptCollectionTransfer = new AcceptCollectionTransferInput
            {
                Id = 36105, // the collection id
            },
        });

var response = await client.SendMutation(mutation);
Console.WriteLine(response.Result.Data?.CreateTransaction?.Uuid);
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
Work in progress
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Bearer YOUR_API_TOKEN'},
  body: JSON.stringify({
    query: `
      mutation AcceptTransferOwnershipRequest($id: BigInt!) {
        CreateTransaction(
          network: ENJIN
          chain: MATRIX
          transaction: {
            acceptCollectionTransfer: { id: $id }
          }
        ) {
          uuid
          action
          state
        }
      }
    `,
    variables: { id: 36105 }
  }),
})
.then(response => response.json())
.then(data => console.log(data));
```
  </TabItem>
  <TabItem value="nodejs" label="Node.js">
```javascript
const axios = require('axios');

axios.post('https://platform.enjin.io/graphql', {
  query: `
    mutation AcceptTransferOwnershipRequest($id: BigInt!) {
      CreateTransaction(
        network: ENJIN
        chain: MATRIX
        transaction: {
          acceptCollectionTransfer: { id: $id }
        }
      ) {
        uuid
        action
        state
      }
    }
  `,
  variables: { id: 36105 }
}, {
  headers: {'Content-Type': 'application/json','Authorization': 'Bearer YOUR_API_TOKEN'}
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```
  </TabItem>
  <TabItem value="python" label="Python">
```python
import requests

query = '''
mutation AcceptTransferOwnershipRequest($id: BigInt!) {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      acceptCollectionTransfer: { id: $id }
    }
  ) {
    uuid
    action
    state
  }
}
'''

variables = {'id': 36105}

response = requests.post('https://platform.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Bearer YOUR_API_TOKEN'}
)
print(response.json())
```
  </TabItem>
</Tabs>

Once the transaction is confirmed, the collection ownership will be transferred to the new owner. An event is emitted on `FINALIZED` confirming the change — see [Working with Events](/05-enjin-platform/03-working-with-events.md) for how to read it.
