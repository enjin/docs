---
title: "View Token Holders"
slug: "fetching-token-holders"
excerpt: "Fetch a complete list of wallets holding your tokens."
hidden: false
createdAt: "Wed Nov 08 2023 17:58:28 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Nov 30 2023 17:36:22 GMT+0000 (Coordinated Universal Time)"
---
Fetching token holders is a vital process that allows you to obtain a list of all wallets addresses that hold a specific token. 

> 📘 What you'll need:
> 
> - An [Enjin Platform Account](/docs/using-the-enjin-platform).

This is useful for several reasons:

- **User Base Identification: **You can easily identify your user base by fetching token holders.
- **Loyalty Rewards:** Reward your loyal users by selectively minting new tokens for them.
- **Valuable Insights:** Analyze user behavior and interactions to gain valuable insights.
- **Engage Power Users:** Recognize and engage with influential power users who hold a significant amount of tokens.
- **Improved User Experience:** By retrieving token holder data, you can enhance the overall user experience and make informed, data-driven decisions.

> 🚧 Reading Third-Party Tokens
> 
> The Cloud Platform is set up to show only the collections and tokens you've created. This helps to simplify your management of these items. 
> 
> If you need to access collections or tokens not made through your cloud account, use the [Open-Source Platform](https://github.com/enjin/platform).

## Fetching Token Holders with the [GraphiQL API](/docs/using-the-api-playground)

To get holders of a specific token, we use the `GetToken` query and include the the `accounts` in the query response:

**Query:**

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
```cplusplus C++ SDK

```
```csharp C# SDK

```
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
```javascript Node.js
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

**Response:**

```json JSON
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

> 🚧 Using Pagination
> 
> The response may be displayed on several pages. To view all of it, you may need to follow steps for [pagination](doc:using-graphql#pagination) which allows you to flip through the pages.

## Fetching Collection Holders with the [GraphiQL API](/docs/using-the-api-playground)

For an [NFT collection](doc:enforced-token-economics#nft-colllection), we can use the `GetCollection` query and include the the `accounts` in the query response to find out how many NFTs from the collection are owned by each address.

**Query:**

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
```cplusplus C++ SDK

```
```csharp C# SDK

```
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
```javascript Node.js
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

**Response:**

```json JSON
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

> 🚧 Using Pagination
> 
> The response may be displayed on several pages. To view all of it, you may need to follow steps for [pagination](doc:using-graphql#pagination) which allows you to flip through the pages.

> 📘 More Fields and Arguments Available!
> 
> The `GetToken` and `GetCollection` queries have a range of options beyond the simple examples shown. For full details on these queries, consult the GraphQL Schema on Apollo:
> 
> - For `GetToken` query specifics: [Apollo GraphQL Schema - GetToken](https://studio.apollographql.com/public/EnjinPlatform/variant/core/schema/reference/objects/Query?query=GetToken).
> - For `GetCollection` query specifics: [Apollo GraphQL Schema - GetCollection](https://studio.apollographql.com/public/EnjinPlatform/variant/core/schema/reference/objects/Query?query=GetCollection).
> 
> These links provide the information you need to customize the queries for your needs, including selecting different information about tokens such as attributes and supply details.