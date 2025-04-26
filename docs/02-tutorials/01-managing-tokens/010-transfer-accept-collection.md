---
title: "Transfer / Accept collection ownership"
slug: "transfer-accept-collection"
excerpt: ""
hidden: false
metadata: 
  title: "Transfer / Accept Collection - Securely Move Blockchain Collections"
  description: "Explore how to transfer and accept entire blockchain collections, allowing for seamless movement of grouped assets within the Enjin ecosystem."
  image: []
  robots: "index"
createdAt: "Wed Apr 17 2024 15:02:20 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Nov 04 2024 12:51:42 GMT+0000 (Coordinated Universal Time)"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info What you'll need:
- An [Enjin Platform Account](doc:using-the-enjin-platform).
- If you are transferring collection ownership, you also need to own a [Collection](doc:creating-collections).
:::

Transferring collection ownership is done in two steps:

## Step #1: Sending a transfer ownership request with the [Enjin API](https://docs.enjin.io/docs/using-enjin-api)

To send a transfer ownership request, we use the `MutateCollection` mutation:

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation SendTransferOwnershipRequest {
  MutateCollection(
    collectionId: 36105 #Specify the collection ID
    mutation: {
      owner: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f" #Specify the new owner
    }
  ) {
    id
    method
    state
  }
}
```
  </TabItem>
  <TabItem value="curl" label="cURL">
```
curl --location 'https://platform.canary.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: enjin_api_key' \
-d '{"query":"mutation SendTransferOwnershipRequest(\r\n  $collection_id: BigInt!\r\n  $new_owner: String\r\n) {\r\n  MutateCollection(\r\n    collectionId: $collection_id\r\n    mutation: { owner: $new_owner }\r\n  ) {\r\n    id\r\n    method\r\n    state\r\n  }\r\n}","variables":{"collection_id":36105,"new_owner":"cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"}}'
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
    .SetBaseAddress("https://platform.canary.enjin.io")
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
fetch('https://platform.canary.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      mutation SendTransferOwnershipRequest(
        $collection_id: BigInt!
        $new_owner: String
      ) {
        MutateCollection(
          collectionId: $collection_id
          mutation: {
            owner: $new_owner
          }
        ) {
          id
          method
          state
        }
      }
    `,
    variables: {
      collection_id: 36105, //Specify the collection ID
      new_owner: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f" //Specify the new owner
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

axios.post('https://platform.canary.enjin.io/graphql', {
  query: `
    mutation SendTransferOwnershipRequest(
      $collection_id: BigInt!
      $new_owner: String
    ) {
      MutateCollection(
        collectionId: $collection_id
        mutation: {
          owner: $new_owner
        }
      ) {
        id
        method
        state
      }
    }
  `,
  variables: {
    collection_id: 36105, //Specify the collection ID
    new_owner: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f" //Specify the new owner
  }
}, {
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'}
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```
  </TabItem>
  <TabItem value="python" label="Python">
```python
import requests

query = '''
mutation SendTransferOwnershipRequest(
  $collection_id: BigInt!
  $new_owner: String
) {
  MutateCollection(
    collectionId: $collection_id
    mutation: {
      owner: $new_owner
    }
  ) {
    id
    method
    state
  }
}
'''

variables = {
  'collection_id': 36105, #Specify the collection ID
  'new_owner': 'cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f' #Specify the new owner

}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

Once the transaction is confirmed, the new owner needs to approve the ownership transfer request, for the collection ownership to be executed

## Step #2: Accepting a transfer ownership request with the [Enjin API](https://docs.enjin.io/docs/using-enjin-api)

To accept a transfer ownership request, we call the `AcceptCollectionTransfer` mutation from the new collection owner account:

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation AcceptTransferOwnershipRequest {
  AcceptCollectionTransfer(
    collectionId: 36105 #Specify the collection ID
  ) {
    id
    method
    state
  }
}
```
  </TabItem>
  <TabItem value="curl" label="cURL">
```
curl --location 'https://platform.canary.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: enjin_api_key' \
-d '{"query":"mutation AcceptTransferOwnershipRequest($collection_id: BigInt!) {\r\n  AcceptCollectionTransfer(collectionId: $collection_id) {\r\n    id\r\n    method\r\n    state\r\n  }\r\n}","variables":{"collection_id":36105}}'
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
    .SetBaseAddress("https://platform.canary.enjin.io")
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
fetch('https://platform.canary.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      mutation AcceptTransferOwnershipRequest(
        $collection_id: BigInt!
      ) {
        AcceptCollectionTransfer(
          collectionId: $collection_id
        ) {
          id
          method
          state
        }
      }
    `,
    variables: {
      collection_id: 36105 //Specify the collection ID
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

axios.post('https://platform.canary.enjin.io/graphql', {
  query: `
    mutation AcceptTransferOwnershipRequest(
      $collection_id: BigInt!
    ) {
      AcceptCollectionTransfer(
        collectionId: $collection_id
      ) {
        id
        method
        state
      }
    }
  `,
  variables: {
    collection_id: 36105 //Specify the collection ID
  }
}, {
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'}
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```
  </TabItem>
  <TabItem value="python" label="Python">
```python
import requests

query = '''
mutation AcceptTransferOwnershipRequest(
  $collection_id: BigInt!
) {
  AcceptCollectionTransfer(
    collectionId: $collection_id
  ) {
    id
    method
    state
  }
}
'''

variables = {
  'collection_id': 36105 #Specify the collection ID

}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

Once the transaction is confirmed, the collection ownership will be transferred to the new owner.
