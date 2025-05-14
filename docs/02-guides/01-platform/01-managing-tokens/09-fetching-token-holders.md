---
title: "Fetching Token Holders"
slug: "fetching-token-holders"
description: "Learn how to fetch token holder data using the Enjin API, giving you insights into who holds your blockchain assets."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info What you'll need:
- An [Enjin Platform Account](/01-getting-started/04-using-the-enjin-platform.md).
:::

This is useful for several reasons:

- **User Base Identification:** You can easily identify your user base by fetching token holders.
- **Loyalty Rewards:** Reward your loyal users by selectively minting new tokens for them.
- **Valuable Insights:** Analyze user behavior and interactions to gain valuable insights.
- **Engage Power Users:** Recognize and engage with influential power users who hold a significant amount of tokens.
- **Improved User Experience:** By retrieving token holder data, you can enhance the overall user experience and make informed, data-driven decisions.

## Fetching Token Holders with the [Enjin API](/02-guides/01-platform/01-managing-tokens/02-creating-tokens/02-creating-tokens.md)

:::warning Fetching Tokens Limitations
Please note that the `GetToken` query is limited to tokens from collections that were created via the auth-ed Enjin Platform account.  
To get a token that was created elsewhere (via a different Enjin Platform account / [NFT.io](https://nft.io) / [Enjin Console](https://console.enjin.io) / etc.) the collection must be "Tracked" first, or the query response will return an error.  
Learn more about tracking a collection in the [Tracking Collections section below](#tracking-collections).
:::

To get holders of a specific token, we use the `GetToken` query and include the the `accounts` in the query response:

**Query:**

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query FetchingTokenHolders{
  GetToken(
    collectionId: 36105 #Specify the collection ID
    tokenId: {integer: 0} #Specify the token ID
  ){
    accounts{
      edges{
        node{
          balance
          wallet{
            account{
              address
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
curl --location 'https://platform.canary.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: enjin_api_key' \
-d '{"query":"query FetchingTokenHolders($collection_id: BigInt!, $token_id: BigInt!) {\r\n  GetToken(collectionId: $collection_id, tokenId: { integer: $token_id }) {\r\n    accounts {\r\n      edges {\r\n        node {\r\n          balance\r\n          wallet {\r\n            account {\r\n              address\r\n            }\r\n          }\r\n        }\r\n      }\r\n    }\r\n  }\r\n}","variables":{"collection_id":36105,"token_id":0}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;

// Setup the query
var getToken = new GetToken()
    .SetCollectionId(36105)
    .SetTokenId(new EncodableTokenIdInput().SetInteger(0));

// Define and assign the return data fragment to the query
var tokenFragment = new TokenFragment()
    .WithAccounts(new ConnectionFragment<TokenAccountFragment>()
        .WithEdges(new EdgeFragment<TokenAccountFragment>()
            .WithNode(new TokenAccountFragment()
                .WithBalance()
                .WithWallet(new WalletFragment()
                    .WithAccount(new AccountFragment()
                        .WithAddress()
                    )
                )
            )
        )
    );

getToken.Fragment(tokenFragment);

// Create and auth a client to send the request to the platform
var client = PlatformClient.Builder()
    .SetBaseAddress("https://platform.canary.enjin.io")
    .Build();
client.Auth("Your_Platform_Token_Here");

// Send the request and write the output to the console.
// Only the fields that were requested in the fragment will be filled in,
// other fields which weren't requested in the fragment will be set to null.
var response = await client.SendGetToken(getToken);
Console.WriteLine(JsonSerializer.Serialize(response.Result.Data));
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include "EnjinPlatformSdk/CoreQueries.hpp"
#include <iostream>

using namespace enjin::platform::sdk;
using namespace std;

int main() {

    // Setup an Encodable Token ID
    EncodableTokenIdInput tokenId = EncodableTokenIdInput()
            .SetInteger(make_shared<SerializableString>("0"));

    // Set up the query
    GetToken getToken = GetToken()
            .SetCollectionId(make_shared<SerializableString>("36105"))
            .SetTokenId(make_shared<EncodableTokenIdInput>(tokenId));

    // Define and assign the return data fragments to the query
    AccountFragment accountFragment = AccountFragment()
            .WithAddress();
    WalletFragment walletFragment = WalletFragment()
            .WithAccount(make_shared<AccountFragment>(accountFragment));
    TokenAccountFragment tokenAccountFragment = TokenAccountFragment()
            .WithBalance()
            .WithWallet(make_shared<WalletFragment>(walletFragment));
    EdgeFragment<TokenAccountFragment> edgeFragment = EdgeFragment<TokenAccountFragment>()
            .WithNode(make_shared<TokenAccountFragment>(tokenAccountFragment));
    ConnectionFragment<TokenAccountFragment> connectionFragment = ConnectionFragment<TokenAccountFragment>()
            .WithEdges(make_shared<EdgeFragment<TokenAccountFragment>>(edgeFragment));

    TokenFragment tokenFragment = TokenFragment()
            .WithAccounts(make_shared<ConnectionFragment<TokenAccountFragment>>(connectionFragment));

    getToken.SetFragment(make_shared<TokenFragment>(tokenFragment));

    // Create and auth a client to send the request to the platform
    unique_ptr<PlatformClient> client = PlatformClient::Builder()
            .SetBaseAddress("https://platform.canary.enjin.io")
            .Build();
    client->Auth("Your_Platform_Token_Here");

    // Send the request then get the response and write the output to the console.
    // Only the fields that were requested in the fragment will be filled in,
    // other fields which weren't requested in the fragment will be set to null.
    future<PlatformResponsePtr<GraphQlResponse<Token>>> futureResponse = SendGetToken(*client, getToken);

    // Get the platform response holding the HTTP data
    PlatformResponsePtr<GraphQlResponse<Token>> response = futureResponse.get();

    // Get the result, a GraphQL response, holding the GraphQL data
    const optional<GraphQlResponse<Token>>& gqlResult = response->GetResult();

    // Write the result data to the console
    if (gqlResult.has_value() && gqlResult->IsSuccess())
    {
        const optional<Token>& getTokenResult = gqlResult->GetData()->GetResult();

        std::cout << getTokenResult->GetMinimumBalance().value() << std::endl;
    }

    // Write any error messages to the console
    if (gqlResult.has_value() && gqlResult->HasErrors())
    {
        const optional<vector<GraphQlError>>& errors = gqlResult->GetErrors();

        for (const GraphQlError& error : errors.value()) {
            std::cout << error.GetMessage().value() << std::endl;
        }
    }

    client.reset();

    return 0;
}
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.canary.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      query FetchingTokenHolders
      (
        $collection_id: BigInt!
        $token_id: BigInt!
      ) {
        GetToken(
          collectionId: $collection_id
          tokenId: {integer: $token_id}
        ){
          accounts{
            edges{
              node{
                balance
                wallet{
                  account{
                    address
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      collection_id: 36105, //Specify the collection ID
      token_id: 0 //Specify the token ID
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
    query FetchingTokenHolders
    (
      $collection_id: BigInt!
      $token_id: BigInt!
    ) {
      GetToken(
        collectionId: $collection_id
        tokenId: {integer: $token_id}
      ){
        accounts{
          edges{
            node{
              balance
              wallet{
                account{
                  address
                }
              }
            }
          }
        }
      }
    }
  `,
  variables: {
    collection_id: 36105, //Specify the collection ID
    token_id: 0 //Specify the token ID
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
query FetchingTokenHolders
(
  $collection_id: BigInt!
  $token_id: BigInt!
) {
  GetToken(
    collectionId: $collection_id
    tokenId: {integer: $token_id}
  ){
    accounts{
      edges{
        node{
          balance
          wallet{
            account{
              address
            }
          }
        }
      }
    }
  }
}
'''

variables = {
  'collection_id': 36105, #Specify the collection ID
  'token_id': 0 #Specify the token ID
}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

**Response:**

```json
{
  "data": {
    "GetToken": {
      "accounts": {
        "edges": [
          {
            "node": {
              "balance": "4",
              "wallet": {
                "account": {
                  "address": "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"
                }
              }
            }
          },
          {
            "node": {
              "balance": "2",
              "wallet": {
                "account": {
                  "address": "cxJXQKFB4ZWJzutwEtZvTQ9KLucdsaWgzyef5pv9R7x98Dmwp"
                }
              }
            }
          }
        ]
      }
    }
  }
}
```

:::tip Using Pagination
The response may be displayed on several pages. To view all of it, you may need to follow steps for [pagination](/01-getting-started/05-using-enjin-api/01-how-to-use-graphql.md#pagination) which allows you to flip through the pages.
:::

## Fetching Collection Holders with the [Enjin API](/01-getting-started/05-using-enjin-api/05-using-enjin-api.md)

:::warning Fetching Collections Limitations
Please note that the `GetCollections` query is limited to collections that were created via the auth-ed Enjin Platform Cloud account.  
To get a collection that was created elsewhere (via a different Enjin Platform Cloud account / [NFT.io](https://nft.io) / [Enjin Console](https://console.enjin.io) / etc.) the collection must be "Tracked" first, or the query response will return an error.  
Learn more about tracking a collection in the [Tracking Collections section below](#tracking-collections).
:::

For an [NFT collection](/02-guides/01-platform/03-advanced-mechanics/03-enforced-rarity.md#nft-collection), we can use the `GetCollection` query and include the the `accounts` in the query response to find out how many NFTs from the collection are owned by each address.

**Query:**

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query FetchingCollectionHolders{
  GetCollection(collectionId: 36105){ #Specify the collection ID
    accounts{
      edges{
        node{
          accountCount
          wallet{
            account{
              address
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
curl --location 'https://platform.canary.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: enjin_api_key' \
-d '{"query":"query FetchingCollectionHolders($collection_id: BigInt!) {\r\n  GetCollection(collectionId: $collection_id) {\r\n    accounts {\r\n      edges {\r\n        node {\r\n          accountCount\r\n          wallet {\r\n            account {\r\n              address\r\n            }\r\n          }\r\n        }\r\n      }\r\n    }\r\n  }\r\n}","variables":{"collection_id":36105}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;

// Setup the query
var getCollection = new GetCollection()
    .SetCollectionId(36105);

// Define and assign the return data fragment to the query
var collectionFragment = new CollectionFragment()
    .WithAccounts(new ConnectionFragment<CollectionAccountFragment>()
        .WithEdges(new EdgeFragment<CollectionAccountFragment>()
            .WithNode(new CollectionAccountFragment()
                .WithAccountCount()
                .WithWallet(new WalletFragment()
                    .WithAccount(new AccountFragment()
                        .WithAddress()
                    )
                )
            )
        )
    );

getCollection.Fragment(collectionFragment);

// Create and auth a client to send the request to the platform
var client = PlatformClient.Builder()
    .SetBaseAddress("https://platform.canary.enjin.io")
    .Build();
client.Auth("Your_Platform_Token_Here");

// Send the request and write the output to the console.
// Only the fields that were requested in the fragment will be filled in,
// other fields which weren't requested in the fragment will be set to null.
var response = await client.SendGetCollection(getCollection);
Console.WriteLine(JsonSerializer.Serialize(response.Result.Data)); CC
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include "EnjinPlatformSdk/CoreQueries.hpp"
#include <iostream>

using namespace enjin::platform::sdk;
using namespace std;

int main() {

    // Set up the query
    GetCollection getCollection = GetCollection()
            .SetCollectionId(make_shared<SerializableString>("36105"));

    // Define and assign the return data fragments to the query
    CollectionAccountFragment collectionAccountFragment = CollectionAccountFragment()
            .WithAccountCount()
            .WithWallet(make_shared<WalletFragment>(WalletFragment()
                    .WithAccount(make_shared<AccountFragment>(AccountFragment()
                            .WithAddress()
                        )
                    )
                )
            );

    EdgeFragment<CollectionAccountFragment> edgeFragment = EdgeFragment<CollectionAccountFragment>()
            .WithNode(make_shared<CollectionAccountFragment>(collectionAccountFragment));

    ConnectionFragment<CollectionAccountFragment> connectionFragment = ConnectionFragment<CollectionAccountFragment>()
            .WithEdges(make_shared<EdgeFragment<CollectionAccountFragment>>(edgeFragment));

    CollectionFragment collectionFragment = CollectionFragment()
            .WithAccounts(make_shared<ConnectionFragment<CollectionAccountFragment>>(connectionFragment));


    getCollection.SetFragment(make_shared<CollectionFragment>(collectionFragment));

    // Create and auth a client to send the request to the platform
    unique_ptr<PlatformClient> client = PlatformClient::Builder()
            .SetBaseAddress("https://platform.canary.enjin.io")
            .Build();
    client->Auth("Your_Platform_Token_Here");

    // Send the request then get the response and write the output to the console.
    // Only the fields that were requested in the fragment will be filled in,
    // other fields which weren't requested in the fragment will be set to null.
    future<PlatformResponsePtr<GraphQlResponse<Collection>>> futureResponse = SendGetCollection(*client, getCollection);

    // Get the platform response holding the HTTP data
    PlatformResponsePtr<GraphQlResponse<Collection>> response = futureResponse.get();

    // Get the result, a GraphQL response, holding the GraphQL data
    const optional<GraphQlResponse<Collection>>& gqlResult = response->GetResult();

    // Write the result data to the console
    if (gqlResult.has_value() && gqlResult->IsSuccess())
    {
        const optional<Collection>& getCollectionResult = gqlResult->GetData()->GetResult();

        std::cout << getCollectionResult->GetCollectionId().value() << std::endl;
    }

    // Write any error messages to the console
    if (gqlResult.has_value() && gqlResult->HasErrors())
    {
        const optional<vector<GraphQlError>>& errors = gqlResult->GetErrors();

        for (const GraphQlError& error : errors.value()) {
            std::cout << error.GetMessage().value() << std::endl;
        }
    }

    client.reset();

    return 0;
}
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.canary.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      query FetchingCollectionHolders
      (
        $collection_id: BigInt!
      ) {
        GetCollection(collectionId: $collection_id){
          accounts{
            edges{
              node{
                accountCount
                wallet{
                  account{
                    address
                  }
                }
              }
            }
          }
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
    query FetchingCollectionHolders
    (
      $collection_id: BigInt!
    ) {
      GetCollection(collectionId: $collection_id){
        accounts{
          edges{
            node{
              accountCount
              wallet{
                account{
                  address
                }
              }
            }
          }
        }
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
query FetchingCollectionHolders
(
  $collection_id: BigInt!
) {
  GetCollection(collectionId: $collection_id){
    accounts{
      edges{
        node{
          accountCount
          wallet{
            account{
              address
            }
          }
        }
      }
    }
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

**Response:**

```json
{
  "data": {
    "GetCollection": {
      "accounts": {
        "edges": [
          {
            "node": {
              "accountCount": 3,
              "wallet": {
                "account": {
                  "address": "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"
                }
              }
            }
          },
          {
            "node": {
              "accountCount": 2,
              "wallet": {
                "account": {
                  "address": "cxJXQKFB4ZWJzutwEtZvTQ9KLucdsaWgzyef5pv9R7x98Dmwp"
                }
              }
            }
          }
        ]
      }
    }
  }
}
```

:::tip Using Pagination
The response may be displayed on several pages. To view all of it, you may need to follow steps for [pagination](/01-getting-started/05-using-enjin-api/01-how-to-use-graphql.md#pagination) which allows you to flip through the pages.
:::

:::info Explore More Arguments
For a comprehensive view of all available arguments for queries and mutations, please refer to our [API Reference](/03-api-reference/03-api-reference.md). This resource will guide you on how to use the GraphiQL Playground to explore the full structure and functionality of our API.
:::

## Tracking Collections

The `GetToken`, `GetTokens`, `GetCollection`, and `GetCollections` queries are limited only to collections and tokens that were created via the auth-ed Enjin Platform account. To use these queries with collections / tokens created externally (via a different Enjin Platform account / [NFT.io](https://nft.io) / [Enjin Console](https://console.enjin.io) / etc.) the collection must be "Tracked" first, or the query response will return an error.

To track a collection, head over to the collections page on Enjin Platform: https://platform.enjin.io/collections, click on the "Track" button, insert the collection ID of the collection you want to track and click "Track".

![Track Collection](/img/guides/managing-tokens/track-collection.png)

:::tip Need to track collections programmatically?
You can use the `AddToTracked` mutation to track a collection programmatically.
:::
