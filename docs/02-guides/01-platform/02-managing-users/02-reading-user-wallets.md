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
- A token appears in a wallet's `tokens` list only while the wallet holds a balance of it, so the list always reflects the wallet's current holdings.
- If you plan to utilize metadata from on-chain or external sources, it's important to also read the token's attributes. Typically, you'll find a `uri` attribute that points to the external location of this metadata.
:::

## Fetching a wallet with the [Enjin API](/01-getting-started/05-using-enjin-api/05-using-enjin-api.md)

Wallet data is read with the `GetAccount` query. It takes the `network` and `chain` to look up, along with the wallet's `address`.

:::info C++ SDK coming soon
The C++ examples on this page target an older version of the Enjin Platform and won't work against the current API. An updated C++ SDK is on the way — for now, use the C# SDK or the GraphQL examples.
:::

### Fetching a wallet's Enjin Coin balance

Include the `balance` field in the `GetAccount` response to see how much ENJ a wallet holds.

**Query:**

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query FetchWalletBalance{
  GetAccount(network: ENJIN, chain: MATRIX, address: "efQh8FzLm6oH3dmTU3HWqGrtm6Xcuu1WG33N2Ka9fzo5MFFAr"){ #Specify the network, chain, and account address
    balance
  }
}
```
  </TabItem>
  <TabItem value="curl" label="cURL">
```
curl --location 'https://platform.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer enjin_api_key' \
-d '{"query":"query FetchWalletBalance($address: String!) {\r\n  GetAccount(network: ENJIN, chain: MATRIX, address: $address) {\r\n    balance\r\n  }\r\n}","variables":{"address":"efQh8FzLm6oH3dmTU3HWqGrtm6Xcuu1WG33N2Ka9fzo5MFFAr"}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System;
using Enjin.Platform.Sdk;

// Create and authenticate the client
using var client = new PlatformClient();
client.Auth("<your-platform-token>");

// Build the GetAccount query, selecting the wallet's ENJ balance
var query = new QueryQueryBuilder()
    .WithGetAccount(
        new AccountQueryBuilder().WithBalance(),
        network: Network.Enjin, // or Network.Canary for testnet
        chain: Chain.Matrix,
        address: "efQh8FzLm6oH3dmTU3HWqGrtm6Xcuu1WG33N2Ka9fzo5MFFAr");

// Send the query and read the result
var response = await client.SendQuery(query);
Console.WriteLine(response.Result.Data?.GetAccount?.Balance);
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
            .SetBaseAddress("https://platform.enjin.io")
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
fetch('https://platform.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Bearer Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      query FetchWalletBalance($address: String!) {
        GetAccount(network: ENJIN, chain: MATRIX, address: $address) {
          balance
        }
      }
    `,
    variables: {
      address: "efQh8FzLm6oH3dmTU3HWqGrtm6Xcuu1WG33N2Ka9fzo5MFFAr" //Specify the account address
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
    query FetchWalletBalance($address: String!) {
      GetAccount(network: ENJIN, chain: MATRIX, address: $address) {
        balance
      }
    }
  `,
  variables: {
    address: "efQh8FzLm6oH3dmTU3HWqGrtm6Xcuu1WG33N2Ka9fzo5MFFAr" //Specify the account address
  }
}, {
  headers: {'Content-Type': 'application/json','Authorization': 'Bearer Your_Platform_Token_Here'}
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```
  </TabItem>
  <TabItem value="python" label="Python">
```python
import requests

query = '''
query FetchWalletBalance($address: String!) {
  GetAccount(network: ENJIN, chain: MATRIX, address: $address) {
    balance
  }
}
'''

variables = {
  'address': "efQh8FzLm6oH3dmTU3HWqGrtm6Xcuu1WG33N2Ka9fzo5MFFAr" #Specify the account address
}

response = requests.post('https://platform.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Bearer Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

**Response:**

```json
{
  "data": {
    "GetAccount": {
      "balance": "11799982990638599996" //~11.79998...  ENJ
    }
  }
}
```

:::info **Formatting Balances**
The API returns the `balance` field in the **base unit** (u128), meaning it appears as a large integer without decimals. To obtain the readable ENJ amount, **divide the returned value by 10^18**.
- **Formula:** `Base Unit Value` / `1,000,000,000,000,000,000` = `ENJ Amount`
- **Example:** A value of `11799982990638599996` converts to approximately **11.80 ENJ**.
:::

### Fetching the tokens a wallet holds

Include the `tokens` field in the `GetAccount` response to list every token the wallet currently holds. Each token also carries its parent `collection`, so this single query tells you which collections the wallet holds items in as well.

**Query:**

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query FetchWalletTokens{
  GetAccount(network: ENJIN, chain: MATRIX, address: "efQh8FzLm6oH3dmTU3HWqGrtm6Xcuu1WG33N2Ka9fzo5MFFAr"){ #Specify the network, chain, and account address
    tokens{
      id
      tokenId
      collection{
        id
      }
      attributes{
        key
        value
      }
    }
  }
}
```
  </TabItem>
  <TabItem value="curl" label="cURL">
```
curl --location 'https://platform.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer enjin_api_key' \
-d '{"query":"query FetchWalletTokens($address: String!) {\r\n  GetAccount(network: ENJIN, chain: MATRIX, address: $address) {\r\n    tokens {\r\n      id\r\n      tokenId\r\n      collection {\r\n        id\r\n      }\r\n      attributes {\r\n        key\r\n        value\r\n      }\r\n    }\r\n  }\r\n}","variables":{"address":"efQh8FzLm6oH3dmTU3HWqGrtm6Xcuu1WG33N2Ka9fzo5MFFAr"}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System;
using Enjin.Platform.Sdk;

// Create and authenticate the client
using var client = new PlatformClient();
client.Auth("<your-platform-token>");

// Build the GetAccount query, selecting the tokens the wallet holds.
// Each held token is an AccountToken (its balance) wrapping the Token itself.
var query = new QueryQueryBuilder()
    .WithGetAccount(
        new AccountQueryBuilder()
            .WithTokens(
                new AccountTokenQueryBuilder()
                    .WithBalance()
                    .WithToken(new TokenQueryBuilder()
                        .WithId()
                        .WithTokenId()
                        .WithCollection(new CollectionQueryBuilder().WithId())
                        .WithAttributes(new AttributeQueryBuilder().WithKey().WithValue())),
                limit: 100),
        network: Network.Enjin, // or Network.Canary for testnet
        chain: Chain.Matrix,
        address: "efQh8FzLm6oH3dmTU3HWqGrtm6Xcuu1WG33N2Ka9fzo5MFFAr");

// Send the query; the wallet's current holdings are on the returned account
var response = await client.SendQuery(query);
var account = response.Result.Data?.GetAccount;
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
            .SetBaseAddress("https://platform.enjin.io")
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
fetch('https://platform.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Bearer Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      query FetchWalletTokens($address: String!) {
        GetAccount(network: ENJIN, chain: MATRIX, address: $address) {
          tokens{
            id
            tokenId
            collection{
              id
            }
            attributes{
              key
              value
            }
          }
        }
      }
    `,
    variables: {
      address: "efQh8FzLm6oH3dmTU3HWqGrtm6Xcuu1WG33N2Ka9fzo5MFFAr" //Specify the account address
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
    query FetchWalletTokens($address: String!) {
      GetAccount(network: ENJIN, chain: MATRIX, address: $address) {
        tokens{
          id
          tokenId
          collection{
            id
          }
          attributes{
            key
            value
          }
        }
      }
    }
  `,
  variables: {
    address: "efQh8FzLm6oH3dmTU3HWqGrtm6Xcuu1WG33N2Ka9fzo5MFFAr" //Specify the account address
  }
}, {
  headers: {'Content-Type': 'application/json','Authorization': 'Bearer Your_Platform_Token_Here'}
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```
  </TabItem>
  <TabItem value="python" label="Python">
```python
import requests

query = '''
query FetchWalletTokens($address: String!) {
  GetAccount(network: ENJIN, chain: MATRIX, address: $address) {
    tokens{
      id
      tokenId
      collection{
        id
      }
      attributes{
        key
        value
      }
    }
  }
}
'''

variables = {
  'address': "efQh8FzLm6oH3dmTU3HWqGrtm6Xcuu1WG33N2Ka9fzo5MFFAr" #Specify the account address
}

response = requests.post('https://platform.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Bearer Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

**Response:**

```json
{
  "data": {
    "GetAccount": {
      "tokens": [
        {
          "id": "2100-23",
          "tokenId": "23",
          "collection": {
            "id": "2100"
          },
          "attributes": [
            {
              "key": "uri",
              "value": "https://etherscapegame.com/crypto/Detritus.json?ver=2"
            }
          ]
        },
        {
          "id": "4265-1",
          "tokenId": "1",
          "collection": {
            "id": "4265"
          },
          "attributes": [
            {
              "key": "name",
              "value": "test 1"
            }
          ]
        },
        {
          "id": "4001-3",
          "tokenId": "3",
          "collection": {
            "id": "4001"
          },
          "attributes": []
        }
      ]
    }
  }
}
```

Each token's canonical `id` (for example `2100-23`) combines its `collection` id and `tokenId`.

:::info Explore More Arguments
For a comprehensive view of all available arguments for queries and mutations, please refer to our [API Reference](/03-api-reference/03-api-reference.md). This resource will guide you on how to use the GraphiQL Playground to explore the full structure and functionality of our API.
:::
