---
title: "Reading User Wallets"
slug: "reading-user-wallets"
description: "Explore how to read user wallet data, providing insights into user transactions, holdings, and interactions within the blockchain."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Fetching wallets is crucial because it allows you to see the contents of a wallet, including all tokens held within. 

This is especially important in gaming and app development as it enables you to assign specific utilities or benefits to certain tokens. 

For example, if a user has a particular token in their wallet, they might gain access to exclusive in-game items or features within an app, enhancing the user experience and adding value to the tokens.

:::info What you'll need:
- An [Enjin Platform Account](/01-getting-started/04-using-the-enjin-platform.md).
:::

:::tip Best Practices
- Only pull data from the collections you need. This will improve performance and ensure your backend infrastructure remains scalable.
- Always read and check the balance. Sometimes, the player may appear to hold the token but the balance is actually zero, for instance, if the token has been burned. These burned tokens should not have in-game utility.
- Consider whether you want NFTs that are listed on a marketplace to have utility in your game. Items that are listed for sale don't show up in regular token balance and show up in reserved balance instead. If you want them to have utility, you can check the reserved balance and include the reserved supply.
- Consider if you need to use pagination. Users can have hundreds of tokens, in this situation you will need to read them in multiple calls.
- If you plan to utilize metadata from on-chain or external sources, it's important to also read the token's attributes. Typically, you'll find a "uri" attribute that points to the external location of this metadata.
- When accessing external metadata or media, make sure to do so asynchronously and think about storing it in a local cache for faster retrieval.
:::

## Fetching a wallet with the [Enjin API](/01-getting-started/05-using-enjin-api/05-using-enjin-api.md)

### Fetching wallet's Enjin Coin balance

Use the `GetWallet` query and include the the `balances` in the query response to see how much ENJ a wallet holds.

**Query:**

<Tabs>
  <TabItem value="graphql" label="GraphQL">
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
  </TabItem>
  <TabItem value="curl" label="cURL">
```
curl --location 'https://platform.canary.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: enjin_api_key' \
-d '{"query":"query FetchWalletBalance($account: String!) {\r\n  GetWallet(account: $account) {\r\n    balances {\r\n      free\r\n      reserved\r\n    }\r\n  }\r\n}","variables":{"account":"cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;

// Setup the query
var getWallet = new GetWallet()
    .SetAccount("cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f");

// Define and assign the return data fragment to the query
var walletFragment = new WalletFragment()
    .WithBalances(new BalancesFragment()
        .WithFree()
        .WithReserved()
    );

getWallet.Fragment(walletFragment);

// Create and auth a client to send the request to the platform
var client = PlatformClient.Builder()
    .SetBaseAddress("https://platform.canary.enjin.io")
    .Build();
client.Auth("Your_Platform_Token_Here");

// Send the request and write the output to the console.
// Only the fields that were requested in the fragment will be filled in,
// other fields which weren't requested in the fragment will be set to null.
var response = await client.SendGetWallet(getWallet);
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

    // Set up the query
    GetWallet getWallet = GetWallet()
            .SetAccount(make_shared<SerializableString>("cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"));

    // Define and assign the return data fragments to the query
    WalletFragment walletFragment = WalletFragment();
    BalancesFragment balancesFragment = BalancesFragment()
            .WithFree()
            .WithReserved();

    walletFragment.WithBalances(make_shared<BalancesFragment>(balancesFragment));

    getWallet.SetFragment(make_shared<WalletFragment>(walletFragment));

    // Create and auth a client to send the request to the platform
    unique_ptr<PlatformClient> client = PlatformClient::Builder()
            .SetBaseAddress("https://platform.canary.enjin.io")
            .Build();
    client->Auth("Your_Platform_Token_Here");

    // Send the request then get the response and write the output to the console.
    // Only the fields that were requested in the fragment will be filled in,
    // other fields which weren't requested in the fragment will be set to null.
    future<PlatformResponsePtr<GraphQlResponse<Wallet>>> futureResponse = SendGetWallet(*client, getWallet);

    // Get the platform response holding the HTTP data
    PlatformResponsePtr<GraphQlResponse<Wallet>> response = futureResponse.get();

    // Get the result, a GraphQL response, holding the GraphQL data
    const optional<GraphQlResponse<Wallet>>& gqlResult = response->GetResult();

    // Write the result data to the console
    if (gqlResult.has_value() && gqlResult->IsSuccess())
    {
        const optional<Wallet>& getWalletResult = gqlResult->GetData()->GetResult();

        std::cout << getWalletResult->GetBalances()->GetFree().value() << std::endl;
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
  </TabItem>
  <TabItem value="nodejs" label="Node.js">
```javascript
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
  </TabItem>
  <TabItem value="python" label="Python">
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
  </TabItem>
</Tabs>

**Response:**

```json
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

:::info Balances Format
API balances fields are formatted as u128 number type.  
to get decimal value, divide the value by 10^18.
:::

### Fetch a wallet's collections

Use the `GetWallet` query and include the the `collectionAccounts` in the query response to see what collections a wallet holds.

**Query:**

<Tabs>
  <TabItem value="graphql" label="GraphQL">
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
  </TabItem>
  <TabItem value="curl" label="cURL">
```
curl --location 'https://platform.canary.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: enjin_api_key' \
-d '{"query":"query FetchingWalletCollections($account: String!) {\r\n  GetWallet(account: $account) {\r\n    collectionAccounts {\r\n      edges {\r\n        node {\r\n          collection {\r\n            collectionId\r\n            attributes {\r\n              key\r\n              value\r\n            }\r\n          }\r\n        }\r\n      }\r\n    }\r\n  }\r\n}","variables":{"account":"cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;

// Setup the query
var getWallet = new GetWallet()
    .SetAccount("cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f");

// Define and assign the return data fragment to the query
var walletFragment = new WalletFragment()
    .WithCollectionAccounts(new ConnectionFragment<CollectionAccountFragment>()
        .WithEdges(new EdgeFragment<CollectionAccountFragment>()
            .WithNode(new CollectionAccountFragment()
                .WithCollection(new CollectionFragment()
                    .WithCollectionId()
                    .WithAttributes(new AttributeFragment()
                        .WithKey()
                        .WithValue()
                    )
                )
            )
        )
    );

getWallet.Fragment(walletFragment);

// Create and auth a client to send the request to the platform
var client = PlatformClient.Builder()
    .SetBaseAddress("https://platform.canary.enjin.io")
    .Build();
client.Auth("Your_Platform_Token_Here");

// Send the request and write the output to the console.
// Only the fields that were requested in the fragment will be filled in,
// other fields which weren't requested in the fragment will be set to null.
var response = await client.SendGetWallet(getWallet);
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

    // Set up the query
    GetWallet getWallet = GetWallet()
            .SetAccount(make_shared<SerializableString>("cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"));

    // Define and assign the return data fragments to the query
    AccountFragment accountFragment = AccountFragment()
            .WithAddress();
    WalletFragment walletFragment = WalletFragment()
            .WithAccount(make_shared<AccountFragment>(accountFragment));
    AttributeFragment attributeFragment = AttributeFragment()
            .WithKey()
            .WithValue();
    CollectionFragment collectionFragment = CollectionFragment()
            .WithCollectionId()
            .WithAttributes(make_shared<AttributeFragment>(attributeFragment));
    CollectionAccountFragment collectionAccountFragment = CollectionAccountFragment()
            .WithCollection(make_shared<CollectionFragment>(collectionFragment));
    EdgeFragment<CollectionAccountFragment> edgeFragment = EdgeFragment<CollectionAccountFragment>()
            .WithNode(make_shared<CollectionAccountFragment>(collectionAccountFragment));

    ConnectionFragment<CollectionAccountFragment> connectionFragment = ConnectionFragment<CollectionAccountFragment>()
            .WithEdges(make_shared<EdgeFragment<CollectionAccountFragment>>(edgeFragment));

    walletFragment.WithCollectionAccounts(make_shared<ConnectionFragment<CollectionAccountFragment>>(connectionFragment));

    getWallet.SetFragment(make_shared<WalletFragment>(walletFragment));

    // Create and auth a client to send the request to the platform
    unique_ptr<PlatformClient> client = PlatformClient::Builder()
            .SetBaseAddress("https://platform.canary.enjin.io")
            .Build();
    client->Auth("Your_Platform_Token_Here");

    // Send the request then get the response and write the output to the console.
    // Only the fields that were requested in the fragment will be filled in,
    // other fields which weren't requested in the fragment will be set to null.
    future<PlatformResponsePtr<GraphQlResponse<Wallet>>> futureResponse = SendGetWallet(*client, getWallet);

    // Get the platform response holding the HTTP data
    PlatformResponsePtr<GraphQlResponse<Wallet>> response = futureResponse.get();

    // Get the result, a GraphQL response, holding the GraphQL data
    const optional<GraphQlResponse<Wallet>>& gqlResult = response->GetResult();

    // Write the result data to the console
    if (gqlResult.has_value() && gqlResult->IsSuccess())
    {
        const optional<Wallet>& getWalletResult = gqlResult->GetData()->GetResult();

        std::cout << getWalletResult->GetAccount()->GetAddress().value() << std::endl;
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
  </TabItem>
  <TabItem value="nodejs" label="Node.js">
```javascript
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
  </TabItem>
  <TabItem value="python" label="Python">
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
  </TabItem>
</Tabs>

**Response:**

```json
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

:::tip Using Pagination
The response may be displayed on several pages. To view all of it, you may need to follow steps for [pagination](/01-getting-started/05-using-enjin-api/01-how-to-use-graphql.md#pagination) which allows you to flip through the pages.
:::

### Fetch a wallet's tokens

Use the `GetWallet` query and include the the `tokenAccounts` in the query response to see what tokens a wallet holds.

**Query:**

<Tabs>
  <TabItem value="graphql" label="GraphQL">
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
  </TabItem>
  <TabItem value="curl" label="cURL">
```
curl -X POST "https://platform.enjin.io/graphql" \
-H "Content-Type: application/json" \
-H "Authorization: enjin_api_key" \
-d '{"query": "query FetchingWalletTokens { GetWallet(account: \"cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f\") { tokenAccounts { edges { node { balance token { tokenId collection { collectionId } attributes { key value } } } } } } }"}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;

// Setup the query
var getWallet = new GetWallet()
    .SetAccount("cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f");

// Define and assign the return data fragment to the query
var walletFragment = new WalletFragment()
    .WithTokenAccounts(new ConnectionFragment<TokenAccountFragment>()
        .WithEdges(new EdgeFragment<TokenAccountFragment>()
            .WithNode(new TokenAccountFragment()
                .WithBalance()
                .WithToken(new TokenFragment()
                    .WithTokenId()
                    .WithCollection(new CollectionFragment()
                        .WithCollectionId()
                    )
                    .WithAttributes(new AttributeFragment()
                        .WithKey()
                        .WithValue()
                    )
                )
            )
        )
    );

getWallet.Fragment(walletFragment);

// Create and auth a client to send the request to the platform
var client = PlatformClient.Builder()
    .SetBaseAddress("https://platform.canary.enjin.io")
    .Build();
client.Auth("Your_Platform_Token_Here");

// Send the request and write the output to the console.
// Only the fields that were requested in the fragment will be filled in,
// other fields which weren't requested in the fragment will be set to null.
var response = await client.SendGetWallet(getWallet);
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

    // Set up the query
    GetWallet getWallet = GetWallet()
            .SetAccount(make_shared<SerializableString>("cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"));

    // Define and assign the return data fragments to the query
    AccountFragment accountFragment = AccountFragment()
            .WithAddress();
    WalletFragment walletFragment = WalletFragment()
            .WithAccount(make_shared<AccountFragment>(accountFragment));
    AttributeFragment attributeFragment = AttributeFragment()
            .WithKey()
            .WithValue();
    CollectionFragment collectionFragment = CollectionFragment()
            .WithCollectionId();
    TokenFragment tokenFragment = TokenFragment()
            .WithTokenId()
            .WithCollection(make_shared<CollectionFragment>(collectionFragment))
            .WithAttributes(make_shared<AttributeFragment>(attributeFragment));
    TokenAccountFragment tokenAccountFragment = TokenAccountFragment()
            .WithBalance()
            .WithToken(make_shared<TokenFragment>(tokenFragment));

    EdgeFragment<TokenAccountFragment> edgeFragment = EdgeFragment<TokenAccountFragment>()
            .WithNode(make_shared<TokenAccountFragment>(tokenAccountFragment));

    ConnectionFragment<TokenAccountFragment> connectionFragment = ConnectionFragment<TokenAccountFragment>()
            .WithEdges(make_shared<EdgeFragment<TokenAccountFragment>>(edgeFragment));

    walletFragment.WithTokenAccounts(make_shared<ConnectionFragment<TokenAccountFragment>>(connectionFragment));

    getWallet.SetFragment(make_shared<WalletFragment>(walletFragment));

    // Create and auth a client to send the request to the platform
    unique_ptr<PlatformClient> client = PlatformClient::Builder()
            .SetBaseAddress("https://platform.canary.enjin.io")
            .Build();
    client->Auth("Your_Platform_Token_Here");

    // Send the request then get the response and write the output to the console.
    // Only the fields that were requested in the fragment will be filled in,
    // other fields which weren't requested in the fragment will be set to null.
    future<PlatformResponsePtr<GraphQlResponse<Wallet>>> futureResponse = SendGetWallet(*client, getWallet);

    // Get the platform response holding the HTTP data
    PlatformResponsePtr<GraphQlResponse<Wallet>> response = futureResponse.get();

    // Get the result, a GraphQL response, holding the GraphQL data
    const optional<GraphQlResponse<Wallet>>& gqlResult = response->GetResult();

    // Write the result data to the console
    if (gqlResult.has_value() && gqlResult->IsSuccess())
    {
        const optional<Wallet>& getWalletResult = gqlResult->GetData()->GetResult();

        std::cout << getWalletResult->GetAccount()->GetAddress().value() << std::endl;
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
  </TabItem>
  <TabItem value="nodejs" label="Node.js">
```javascript
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
  </TabItem>
  <TabItem value="python" label="Python">
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
  </TabItem>
</Tabs>

**Response:**

```json
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

:::tip Using Pagination
The response may be displayed on several pages. To view all of it, you may need to follow steps for [pagination](/01-getting-started/05-using-enjin-api/01-how-to-use-graphql.md#pagination) which allows you to flip through the pages.
:::

:::info Explore More Arguments
For a comprehensive view of all available arguments for queries and mutations, please refer to our [API Reference](/03-api-reference/03-api-reference.md). This resource will guide you on how to use the GraphiQL Playground to explore the full structure and functionality of our API.
:::
