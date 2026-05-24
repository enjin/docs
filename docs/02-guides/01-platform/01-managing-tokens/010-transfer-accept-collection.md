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

:::warning SDKs are not yet available
The C# and C++ SDK examples below are out of date and **will not work against the current Enjin Platform API**. This section will be updated once new SDKs are published. Until then, use the GraphQL, cURL, Javascript, Node.js, or Python examples.
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
curl --location 'https://platform.beta.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer YOUR_API_TOKEN' \
-d '{"query":"mutation SendTransferOwnershipRequest($collectionId: BigInt!, $newOwner: String!) {\r\n  CreateTransaction(\r\n    network: ENJIN\r\n    chain: MATRIX\r\n    transaction: { mutateCollection: { collectionId: $collectionId, owner: $newOwner } }\r\n  ) {\r\n    uuid\r\n    action\r\n    state\r\n  }\r\n}","variables":{"collectionId":36105,"newOwner":"cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;

// Set up the collection mutation input.
var collectionMutationInput = new CollectionMutationInput()
    .SetOwner("cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"); // Set the new owner account of the collection.

// Set up the mutation
var mutateCollection = new MutateCollection()
    .SetCollectionId(36105) // Specify the collection ID.
    .SetMutation(collectionMutationInput); // Specify the mutation input.

// Define and assign the return data fragment to the mutation
var transactionFragment = new TransactionFragment()
    .WithId()
    .WithMethod()
    .WithState();

mutateCollection.Fragment(transactionFragment);

// Create and auth a client to send the request to the platform
var client = PlatformClient.Builder()
    .SetBaseAddress("https://platform.beta.enjin.io")
    .Build();
client.Auth("Your_Platform_Token_Here");

// Send the request and write the output to the console.
// Only the fields that were requested in the fragment will be filled in,
// other fields which weren't requested in the fragment will be set to null.
var response = await client.SendMutateCollection(mutateCollection);
Console.WriteLine(JsonSerializer.Serialize(response.Result.Data));
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
Work in progress
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.beta.enjin.io/graphql', {
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

axios.post('https://platform.beta.enjin.io/graphql', {
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

response = requests.post('https://platform.beta.enjin.io/graphql',
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
curl --location 'https://platform.beta.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer YOUR_API_TOKEN' \
-d '{"query":"mutation AcceptTransferOwnershipRequest($id: BigInt!) {\r\n  CreateTransaction(\r\n    network: ENJIN\r\n    chain: MATRIX\r\n    transaction: { acceptCollectionTransfer: { id: $id } }\r\n  ) {\r\n    uuid\r\n    action\r\n    state\r\n  }\r\n}","variables":{"id":36105}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;

// Set up the mutation
var acceptCollectionTransfer = new AcceptCollectionTransfer()
    .SetCollectionId(36105); // Specify the collection ID.

// Define and assign the return data fragment to the mutation
var transactionFragment = new TransactionFragment()
    .WithId()
    .WithMethod()
    .WithState();

acceptCollectionTransfer.Fragment(transactionFragment);

// Create and auth a client to send the request to the platform
var client = PlatformClient.Builder()
    .SetBaseAddress("https://platform.beta.enjin.io")
    .Build();
client.Auth("Your_Platform_Token_Here");

// Send the request and write the output to the console.
// Only the fields that were requested in the fragment will be filled in,
// other fields which weren't requested in the fragment will be set to null.
var response = await client.SendAcceptCollectionTransfer(acceptCollectionTransfer);
Console.WriteLine(JsonSerializer.Serialize(response.Result.Data));
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
Work in progress
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.beta.enjin.io/graphql', {
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

axios.post('https://platform.beta.enjin.io/graphql', {
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

response = requests.post('https://platform.beta.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Bearer YOUR_API_TOKEN'}
)
print(response.json())
```
  </TabItem>
</Tabs>

Once the transaction is confirmed, the collection ownership will be transferred to the new owner.
