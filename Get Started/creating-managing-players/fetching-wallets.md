---
title: "Reading Wallets"
slug: "fetching-wallets"
excerpt: "Fetch a wallet's data and see what tokens are inside."
hidden: false
createdAt: "Tue Oct 31 2023 02:40:11 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Nov 27 2023 14:07:02 GMT+0000 (Coordinated Universal Time)"
---
Fetching wallets is crucial because it allows you to see the contents of a wallet, including all tokens held within. 

This is especially important in gaming and app development as it enables you to assign specific utilities or benefits to certain tokens. 

For example, if a user has a particular token in their wallet, they might gain access to exclusive in-game items or features within an app, enhancing the user experience and adding value to the tokens.

> 📘 What you'll need:
> 
> - An [Enjin Platform Account](/docs/using-the-enjin-platform).

# Fetching a wallet with the [GraphiQL API](/docs/using-the-api-playground)

## Fetching wallet's Enjin Coin balance

Use the `GetWallet` query and include the the `balances` in the query response to see how much ENJ a wallet holds.

**Query:**

```graphql
query FetchWalletBalance{
  GetWallet(account: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"){ #Specify the account address
    balances{
      free
      reserved
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
      query FetchWalletBalance($account: String!) {
        GetWallet(account: $account) {
          balances{
            free
            reserved
          }
        }
      }
    `,
    variables: {
      account: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f" //Specify the account address
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
    query FetchWalletBalance($account: String!) {
      GetWallet(account: $account) {
        balances{
          free
          reserved
        }
      }
    }
  `,
  variables: {
    account: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f" //Specify the account address
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
query FetchWalletBalance($account: String!) {
  GetWallet(account: $account) {
    balances{
      free
      reserved
    }
  }
}
'''

variables = {
  'account': "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f" #Specify the account address
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
    "GetWallet": {
      "balances": {
        "free": "86010842630734264894", //~86.01084...  ENJ
        "reserved": "13900475000000000000" //~13.90047...  ENJ
      }
    }
  }
}
```

> 📘 Balances Format
> 
> API balances fields are formatted as u128 number type.  
> to get decimal value, divide the value by 10^18.

## Fetch a wallet's collections

Use the `GetWallet` query and include the the `collectionAccounts` in the query response to see what collections a wallet holds.

> 🚧 Reading Third-Party Tokens
> 
> The Cloud Platform is set up to show only the collections and tokens you've created. This helps to simplify your management of these items. 
> 
> If you need to access collections or tokens not made through your cloud account, use the [Open-Source Platform](https://github.com/enjin/platform).

**Query:**

```graphql
query FetchingWalletCollections{
  GetWallet(account: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"){ #Specify the account address
    collectionAccounts{
      edges{
        node{
          collection{
            collectionId
            attributes{
              key
              value
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
      query FetchingWalletCollections($account: String!) {
        GetWallet(account: $account) {
          collectionAccounts{
            edges{
              node{
                collection{
                  collectionId
                  attributes{
                    key
                    value
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      account: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f" //Specify the account address
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
    query FetchingWalletCollections($account: String!) {
      GetWallet(account: $account) {
        collectionAccounts{
          edges{
            node{
              collection{
                collectionId
                attributes{
                  key
                  value
                }
              }
            }
          }
        }
      }
    }
  `,
  variables: {
    account: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f" //Specify the account address
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
query FetchingWalletCollections($account: String!) {
  GetWallet(account: $account) {
    collectionAccounts{
      edges{
        node{
          collection{
            collectionId
            attributes{
              key
              value
            }
          }
        }
      }
    }
  }
}
'''

variables = {
  'account': "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f" #Specify the account address
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
    "GetWallet": {
      "collectionAccounts": {
        "edges": [
          {
            "node": {
              "collection": {
                "collectionId": "33866",
                "attributes": []
              }
            }
          },
          {
            "node": {
              "collection": {
                "collectionId": "36105",
                "attributes": [
                  {
                    "key": "name",
                    "value": "My test collection"
                  }
                ]
              }
            }
          },
          {
            "node": {
              "collection": {
                "collectionId": "36623",
                "attributes": [
                  {
                    "key": "name",
                    "value": "Docs Testing Collection"
                  }
                ]
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

## Fetch a wallet's tokens

Use the `GetWallet` query and include the the `tokenAccounts` in the query response to see what tokens a wallet holds.

**Query:**

```graphql
query FetchingWalletTokens{
  GetWallet(account: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"){ #Specify the account address
    tokenAccounts{
      edges{
        node{
          balance
          token{
            tokenId
            collection{
              collectionId
            }
            attributes{
              key
              value
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
      query FetchingWalletTokens($account: String!) {
        GetWallet(account: $account) {
          tokenAccounts{
            edges{
              node{
                balance
                token{
                  tokenId
                  collection{
                    collectionId
                  }
                  attributes{
                    key
                    value
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      account: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f" //Specify the account address
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
    query FetchingWalletTokens($account: String!) {
      GetWallet(account: $account) {
        tokenAccounts{
          edges{
            node{
              balance
              token{
                tokenId
                collection{
                  collectionId
                }
                attributes{
                  key
                  value
                }
              }
            }
          }
        }
      }
    }
  `,
  variables: {
    account: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f" //Specify the account address
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
query FetchingWalletTokens($account: String!) {
  GetWallet(account: $account) {
    tokenAccounts{
      edges{
        node{
          balance
          token{
            tokenId
            collection{
              collectionId
            }
            attributes{
              key
              value
            }
          }
        }
      }
    }
  }
}
'''

variables = {
  'account': "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f" #Specify the account address
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
    "GetWallet": {
      "tokenAccounts": {
        "edges": [
          {
            "node": {
              "balance": "1",
              "token": {
                "tokenId": "0",
                "collection": {
                  "collectionId": "33866"
                },
                "attributes": []
              }
            }
          },
          {
            "node": {
              "balance": "1",
              "token": {
                "tokenId": "0",
                "collection": {
                  "collectionId": "36105"
                },
                "attributes": [
                  {
                    "key": "Name",
                    "value": "Awesome Token!"
                  }
                ]
              }
            }
          },
          {
            "node": {
              "balance": "6",
              "token": {
                "tokenId": "1",
                "collection": {
                  "collectionId": "36105"
                },
                "attributes": [
                  {
                    "key": "name",
                    "value": "Awesome Token 2!"
                  }
                ]
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
> The examples here illustrate basic uses of the `GetWallet` query. However, this query supports many more arguments and settings not shown in these examples.
> 
> For a comprehensive overview of all available settings and their descriptions for the `GetWallet` query, please refer to our GraphQL Schema on Apollo. 
> 
> - [Detailed `GetWallet`/`GetWallets` queries Information on Apollo](https://studio.apollographql.com/public/EnjinPlatform/variant/core/schema/reference/objects/Query?query=GetWallet).
> 
> These resources will help you to fully utilize the capabilities of the `GetWallet` query and tailor it to your specific needs.