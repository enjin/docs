---
title: "Using Fuel Tanks"
slug: "using-fuel-tanks"
excerpt: "Subsidize fees for your players while reducing overall costs."
hidden: false
metadata: 
  title: "Using Fuel Tanks - Power Blockchain Transactions Without Fees"
  description: "Discover how to use fuel tanks to cover blockchain transaction fees, creating a seamless and cost-free experience for users within your application."
  image: []
  robots: "index"
createdAt: "Mon Nov 06 2023 03:58:03 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Mar 24 2025 16:38:17 GMT+0000 (Coordinated Universal Time)"
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A Fuel tank is a pool that holds Enjin Coins (ENJ) which is used to cover transaction fees for eligible users. Each <GlossaryTerm id="fuel_tank" /> is designed to minimize transaction costs, resulting in lower expenses for platform operations.

Fuel Tanks are flexible and dynamic, allowing customization based on specific rules and requirements. They operate based on a set of rules, making it possible to target specific actions or accounts meeting specific criteria.

When dispatching a transaction via a Fuel Tank, the following checks must pass:

- The Fuel Tank is not frozen.
- The Fuel Tank is funded with enough <GlossaryTerm id="enjin_coin" />s.
- The dispatcher account is allowed to use the Fuel Tank.
- The Fuel Tank allows dispatching this transaction.

:::info What you'll need:
- Some [Enjin Coin](/01-getting-started/02-using-enjin-coin.md) on Enjin / Canary Matrixchain to pay for <GlossaryTerm id="transaction_fees" />, and for funding the tank.  
You can obtain cENJ (Canary ENJ) for testing from the [Canary faucet](https://faucet.canary.enjin.io/).
- An [Enjin Platform Account](/01-getting-started/03-using-the-enjin-platform.md).
:::

## Tank Rules

Fuel Tanks offer versatile rules for various use cases, allowing customization.

### Dispatch Rules

#### Rule Set

When a call is made to a fuel tank (also known as "Dispatching"), it must be made in accordance with a set of rules. These rules, known as rule sets, can include multiple individual Dispatch Rules that determine the validity of the call. A fuel tank can have multiple rule sets, each of which controls access and permissions to the fuel tank's functionality and resources.

#### Types of Dispatch Rules:

- **`Whitelisted Callers`**: Subsidize <GlossaryTerm id="transaction" />s dispatched from certain <GlossaryTerm id="wallet_account" />s.
- **`Whitelisted Collections`**: Subsidize <GlossaryTerm id="transaction" />s involving specific <GlossaryTerm id="collection" />.
- **`Require Token`**: Subsidize <GlossaryTerm id="transaction" />s only if the user holds a specific NFT.
- **`WhitelistedPallets`**: Subsidize <GlossaryTerm id="transaction" />s involving specific <GlossaryTerm id="pallet" />.
- **`Permitted Extrinsics`**: Subsidize <GlossaryTerm id="transaction" />s involving specific <GlossaryTerm id="extrinsic" />s, e.g. marketplace CreateListing transactions.
- **`Permitted Calls`**: Subsidize <GlossaryTerm id="transaction" />s involving specific <GlossaryTerm id="extrinsic" />s and parameters.
- **`User Fuel Budget`**: Set limits on individual fuel consumption for security.
- **`Tank Fuel Budget`**: Define collective fuel usage to extend Fuel Tank lifespan.
- **`Max Fuel Burn Per Transaction`**: Control fuel consumption per transaction for predictability.
- **`Require Signature`**: Subsidize <GlossaryTerm id="transaction" />s which were signed by a specific <GlossaryTerm id="wallet_account" />.

These rules enhance the Enjin Blockchain experience, sparking new products and business models.

#### RequireAccount Parameter

In addition to Dispatch Rules, a Rule Set may require the dispatching account to have an existing Fuel Tank User Account in order to dispatch a call. This is configured by setting the Rule Set's `requireAccount` parameter to true.

### Account Rules

Adding an account to the Fuel Tank User Accounts can be done in two ways:

1. In advance with the `add_account` extrinsic.
2. When dispatching a call with the `dispatch_and_touch` extrinsic.

In both ways, the account is added to the tank's User Accounts only if it's successfully validated by the tank's Account Rules.

Note: if the dispatcher is not the tank owner, he may add itself to the User Accounts only if [UserAccountManagement](#user-account-management) is configured

#### Types of Account Rules:

- **`Whitelisted Callers`**: Only listed accounts are able to add their account to the Fuel Tank's User Accounts.
- **`Require Token`**: Only accounts that hold the specified token are able to add their account to the Fuel Tank's User Accounts.

### User Account Management

By default, only the Fuel Tank owner has the permission to add accounts to the Fuel Tank User Accounts. However, the Fuel Tank can be configured to allow accounts to add themselves by setting the `tankReservesAccountCreationDeposit` argument.

- **Default Behavior**: If the `tankReservesAccountCreationDeposit` argument is not provided, only the Fuel Tank owner can add accounts to the Fuel Tank User Accounts.
- **Self-Addition without Deposit Funding**: If the `tankReservesAccountCreationDeposit` argument is set to `false`, the Fuel Tank allows accounts to add themselves to the Fuel Tank User Accounts. However, the Fuel Tank will not provide the funds required for the Tank User Account <GlossaryTerm id="storage_deposit" />.
- **Self-Addition with Deposit Funding**: If the `tankReservesAccountCreationDeposit` argument is set to `true`, the Fuel Tank allows accounts to add themselves to the Fuel Tank User Accounts, and it also covers the necessary funds required for the Tank User Account <GlossaryTerm id="storage_deposit" />.

### Coverage Policy

By default, the fuel tank will subsidize only <GlossaryTerm id="transaction_fees" />.  
To cover both <GlossaryTerm id="transaction_fees" /> and any <GlossaryTerm id="storage_deposit" /> the dispatched call may require, set the Coverage Policy to `FEES_AND_DEPOSIT`

## Creating Fuel Tanks

Now that we have a basic understanding of how Fuel Tanks are structured, let's go through setting up some Fuel Tanks with specific functionality, including creating rules and customizing it to fit your needs, enabling you to reduce transaction costs for your users.

:::info User Interface
This guide will demonstrate how to create various fuel tanks with the GraphQL API.  
Note that you may also use the User Interface to create Fuel Tanks.

To create a Fuel Tank using the Platform's User Interface, navigate to "**[Fuel Tanks](https://platform.canary.enjin.io/fuel-tanks)**" in the Platform Menu. Then, click the "**[Create Fuel Tank](https://platform.canary.enjin.io/create/fuel-tank)**" button.
:::

:::warning **Feature Availability Notice**
Please be aware that the following arguments are currently unavailable on the Enjin Platform:
- `PermittedExtrinsics` cannot be set via the Enjin Platform UI.
- `WhitelistedPallets` is not supported on the Enjin Platform, both on the UI and API.
- `requireAccount` is also not supported on the Enjin Platform, both on the UI and API.
We will update the documentation once these options are available.  
Code snippets with these arguments are provided for illustrative purposes only. If you wish to create a fuel tank with these options now, please use the Enjin Console at [console.enjin.io](https://console.enjin.io).
:::

:::info Make sure to use the Fuel Tank Endpoint
- Testnet: `http://platform.canary.enjin.io/graphql/fuel-tanks`
- Mainnet: `http://platform.enjin.io/graphql/fuel-tanks`
**Try the Beam Playground here:**
- Testnet: http://platform.canary.enjin.io/graphiql/fuel-tanks
- Mainnet: http://platform.enjin.io/graphiql/fuel-tanks
:::

### Subsidize Token Transfers For A Collection

The following mutation will set up a fuel tank that only subsidizes transactions that contain a `BatchTransfer` extrinsic, and only if it involves a token from the collection with ID 36,105.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateFuelTank{
  CreateFuelTank(
    name: "Collection Token Transfers" #Specify the Fuel Tank name
    coveragePolicy: FEES #This is set to FEES since we only want to subsidize transaction fees, and we don't need to provide storage deposits for token transfer transactions
    reservesAccountCreationDeposit: null #This is set to null since we don't want to allow tank account creations
    dispatchRules: [{
      permittedExtrinsics: [BatchTransfer] #This rule specifies that only batch transfers are subsidized
      whitelistedCollections: [36105] #This rule ensures that only the specified collection is subsidized
    }]
  ){
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
-d '{"query":"mutation CreateFuelTank(\r\n  $name: String!\r\n  $coveragePolicy: CoveragePolicy\r\n  $permittedExtrinsics: [TransactionMethod!]\r\n  $whitelistedCollections: [BigInt!]\r\n) {\r\n  CreateFuelTank(\r\n    name: $name\r\n    coveragePolicy: $coveragePolicy\r\n    dispatchRules: [\r\n      {\r\n        permittedExtrinsics: $permittedExtrinsics #This rule specifies that only batch transfers are subsidized\r\n        whitelistedCollections: $whitelistedCollections #This rule ensures that only the specified collection is subsidized\r\n      }\r\n    ]\r\n  ) {\r\n    id\r\n    method\r\n    state\r\n  }\r\n}\r\n","variables":{"name":"Collection Token Transfers","coveragePolicy":"FEES","permittedExtrinsics":["BatchTransfer"],"whitelistedCollections":[36105]}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;
using Enjin.Platform.Sdk.FuelTanks;

// Create the array of dispatch rules for the fuel tank
var dispatchRules = new List<DispatchRuleInputType>()
{
    new DispatchRuleInputType()
        .SetPermittedExtrinsics(TransactionMethod.BatchTransfer) // This rule specifies that only batch transfers are subsidized
        .SetWhitelistedCollections(36105) // This rule ensures that only the specified collection is subsidized
};

// Setup the mutation
var createFuelTank = new CreateFuelTank()
    .SetName("Collection Token Transfers") // Set the name of the fuel tank
    .SetCoveragePolicy(CoveragePolicy.Fees) // This is set to FEES since we only want to subsidize transaction fees, and we don't need to provide storage deposits for token transfer transactions
    .SetReservesAccountCreationDeposit(null) // This is set to null since we don't want to allow tank account creations
    .SetDispatchRules(dispatchRules.ToArray());

// Define and assign the return data fragment to the mutation
var transactionFragment = new TransactionFragment()
    .WithId()
    .WithMethod()
    .WithState();

createFuelTank.Fragment(transactionFragment);

// Create and auth a client to send the request to the platform
var client = PlatformClient.Builder()
    .SetBaseAddress("https://platform.canary.enjin.io")
    .Build();
client.Auth("Your_Platform_Token_Here");

// Send the request and write the output to the console.
// Only the fields that were requested in the fragment will be filled in,
// other fields which weren't requested in the fragment will be set to null.
var response = await client.SendCreateFuelTank(createFuelTank);
Console.WriteLine(JsonSerializer.Serialize(response.Result.Data));
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
// Coming Soon!
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.canary.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      mutation CreateFuelTank
        (
        $name: String!
        $coveragePolicy: CoveragePolicy
        $permittedExtrinsics: [TransactionMethod!]
        $whitelistedCollections: [BigInt!]
        ) {
        CreateFuelTank(
          name: $name
          coveragePolicy: $coveragePolicy
          dispatchRules: [{
          permittedExtrinsics: $permittedExtrinsics #This rule specifies that only batch transfers are subsidized
          whitelistedCollections: $whitelistedCollections #This rule ensures that only the specified collection is subsidized
          }]
        ){
          id
          method
          state
          }
        }
    `,
    variables: {
      name: "Collection Token Transfers", //Specify the Fuel Tank name
      coveragePolicy: "FEES", //This is set to FEES since we only want to subsidize transaction fees, and we don't need to provide storage deposits for token transfer transactions
      permittedExtrinsics: ["BatchTransfer"], //This rule specifies that only batch transfers are subsidized
      whitelistedCollections: [36105] //This rule ensures that only the specified collection is subsidized
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
    mutation CreateFuelTank
      (
      $name: String!
      $coveragePolicy: CoveragePolicy
      $permittedExtrinsics: [TransactionMethod!]
      $whitelistedCollections: [BigInt!]
      ) {
      CreateFuelTank(
        name: $name
        coveragePolicy: $coveragePolicy
        dispatchRules: [{
        permittedExtrinsics: $permittedExtrinsics #This rule specifies that only batch transfers are subsidized
        whitelistedCollections: $whitelistedCollections #This rule ensures that only the specified collection is subsidized
        }]
      ){
        id
        method
        state
        }
      }
  `,
  variables: {
    name: "Collection Token Transfers", //Specify the Fuel Tank name
    coveragePolicy: "FEES", //This is set to FEES since we only want to subsidize transaction fees, and we don't need to provide storage deposits for token transfer transactions
    permittedExtrinsics: ["BatchTransfer"], //This rule specifies that only batch transfers are subsidized
    whitelistedCollections: [36105] //This rule ensures that only the specified collection is subsidized
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
mutation CreateFuelTank
  (
	$name: String!
	$coveragePolicy: CoveragePolicy
	$permittedExtrinsics: [TransactionMethod!]
	$whitelistedCollections: [BigInt!]
  ) {
	CreateFuelTank(
	  name: $name
	  coveragePolicy: $coveragePolicy
	  dispatchRules: [{
		permittedExtrinsics: $permittedExtrinsics #This rule specifies that only batch transfers are subsidized
		whitelistedCollections: $whitelistedCollections #This rule ensures that only the specified collection is subsidized
	  }]
	){
	  id
	  method
	  state
		}
  }
'''

variables = {
  'name': "Collection Token Transfers", #Specify the Fuel Tank name
  'coveragePolicy': "FEES", #This is set to FEES since we only want to subsidize transaction fees, and we don't need to provide storage deposits for token transfer transactions
  'permittedExtrinsics': ["BatchTransfer"], #This rule specifies that only batch transfers are subsidized
  'whitelistedCollections': [36105] #This rule ensures that only the specified collection is subsidized
}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

### Subsidize Any Transaction Involving <GlossaryTerm id="multitoken" />s From A Certain Collection

:::warning Upcoming Feature Notice: `WhitelistedPallets` Option
The `WhitelistedPallets` argument is not yet supported on the Enjin Platform.  
The following code snippet is provided for illustrative purposes only.  
If you wish to create a fuel tank with this option now, please use the Enjin Console at [console.enjin.io](https://console.enjin.io).  
We will update the documentation once this option is available.
:::

The following mutation will set up a fuel tank that only subsidizes transactions that involves any token from the collection with ID 36,105. To achieve this, we are using the same dispatch rule from the previous example (`whitelistedCollections`) and the `WhitelistedPallets` rule, allowing only extrinsics from the `MultiTokens` pallet (for actions such as `send`, `mint`, `transfer`, etc.) and `Marketplace` pallet (for actions such as `list`, `buy`, `offer`, etc. ).

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateFuelTank{
  CreateFuelTank(
    name: "Collection Token Actions" #Specify the Fuel Tank name
    coveragePolicy: FEES_AND_DEPOSIT #This is set to FEES_AND_DEPOSIT since we want the tank to provide ENJ for both transaction fees, and storage deposits for transactions that require it (such as listing a token for sale).
    reservesAccountCreationDeposit: true #This is set to true since we want to allow tank account creations, and we want the tank to subsidize the ENJ required for the required for the Tank User Account storage deposit
    dispatchRules: [{
      WhitelistedPallets: [MultiTokens, Marketplace] #This rule specifies that only extrinsics from the MultiTokens and Marketplace pallets are subsidized
      whitelistedCollections: [36105] #This rule ensures that only the specified collection is subsidized
    }]
  ){
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
-d '{"query":"mutation CreateFuelTank(\r\n  $name: String!\r\n  $coveragePolicy: CoveragePolicy\r\n  $reserveAccountCreationDeposit: Boolean\r\n  $whitelistedPallets: [String!]\r\n  $whitelistedCollections: [BigInt!]\r\n) {\r\n  CreateFuelTank(\r\n    name: $name\r\n    coveragePolicy: $coveragePolicy\r\n    reservesAccountCreationDeposit: $reserveAccountCreationDeposit\r\n    dispatchRules: [\r\n      {\r\n        whitelistedPallets: $whitelistedPallets\r\n        whitelistedCollections: $whitelistedCollections\r\n      }\r\n    ]\r\n  ) {\r\n    id\r\n    method\r\n    state\r\n  }\r\n}\r\n","variables":{"name":"Collection Token Actions","coveragePolicy":"FEES_AND_DEPOSIT","reserveAccountCreationDeposit":true,"whitelistedPallets":["MultiTokens","Marketplace"],"whitelistedCollections":[36105]}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;
using Enjin.Platform.Sdk.FuelTanks;

// Create the array of dispatch rules for the fuel tank
var dispatchRules = new List<DispatchRuleInputType>()
{
    new DispatchRuleInputType()
        .SetWhitelistedPallets(Pallets.MultiTokens, Pallets.Marketplace) // Note: This is not yet implemented in the Platform API. This rule specifies that only extrinsics from the MultiTokens and Marketplace pallets are subsidized.
        .SetWhitelistedCollections(36105) // This rule ensures that only the specified collection is subsidized.
};

// Setup the mutation
var createFuelTank = new CreateFuelTank()
    .SetName("Collection Token Actions") // Set the name of the fuel tank
    .SetCoveragePolicy(CoveragePolicy.FeesAndDeposit) // This is set to FEES_AND_DEPOSIT since we want the tank to provide ENJ for both transaction fees, and storage deposits for transactions that require it (such as listing a token for sale).
    .SetReservesAccountCreationDeposit(true) // This is set to true since we want to allow tank account creations, and we want the tank to subsidize the ENJ required for the required for the Tank User Account storage deposit.
    .SetDispatchRules(dispatchRules.ToArray());

// Define and assign the return data fragment to the mutation
var transactionFragment = new TransactionFragment()
    .WithId()
    .WithMethod()
    .WithState();

createFuelTank.Fragment(transactionFragment);

// Create and auth a client to send the request to the platform
var client = PlatformClient.Builder()
    .SetBaseAddress("https://platform.canary.enjin.io")
    .Build();
client.Auth("Your_Platform_Token_Here");

// Send the request and write the output to the console.
// Only the fields that were requested in the fragment will be filled in,
// other fields which weren't requested in the fragment will be set to null.
var response = await client.SendCreateFuelTank(createFuelTank);
Console.WriteLine(JsonSerializer.Serialize(response.Result.Data));
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
// Coming Soon!
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.canary.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      mutation CreateFuelTank(
        $name: String!
        $coveragePolicy: CoveragePolicy
        $reserveAccountCreationDeposit: Boolean
        $whitelistedPallets: [String!]
        $whitelistedCollections: [BigInt!]
      ) {
        CreateFuelTank(
          name: $name
          coveragePolicy: $coveragePolicy
          reservesAccountCreationDeposit: $reserveAccountCreationDeposit
          dispatchRules: [
            {
              whitelistedPallets: $whitelistedPallets
              whitelistedCollections: $whitelistedCollections
            }
          ]
        ) {
          id
          method
          state
        }
      }
    `,
    variables: {
      name: "Collection Token Actions", //Specify the Fuel Tank name
      coveragePolicy: "FEES_AND_DEPOSIT", //This is set to FEES_AND_DEPOSIT since we want the tank to provide ENJ for both transaction fees, and storage deposits for transactions that require it (such as listing a token for sale).
      reserveAccountCreationDeposit: true, //This is set to true since we want to allow tank account creations, and we want the tank to subsidize the ENJ required for therequired for the Tank User Account storage deposit
      whitelistedPallets: ["MultiTokens", "Marketplace"], //This rule specifies that only extrinsics from the MultiTokens and Marketplace pallets are subsidized
      whitelistedCollections: [36105] //This rule ensures that only the specified collection is subsidized
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
    mutation CreateFuelTank(
      $name: String!
      $coveragePolicy: CoveragePolicy
      $reserveAccountCreationDeposit: Boolean
      $whitelistedPallets: [String!]
      $whitelistedCollections: [BigInt!]
    ) {
      CreateFuelTank(
        name: $name
        coveragePolicy: $coveragePolicy
        reservesAccountCreationDeposit: $reserveAccountCreationDeposit
        dispatchRules: [
          {
            whitelistedPallets: $whitelistedPallets
            whitelistedCollections: $whitelistedCollections
          }
        ]
      ) {
        id
        method
        state
      }
    }
  `,
  variables: {
    name: "Collection Token Actions", //Specify the Fuel Tank name
    coveragePolicy: "FEES_AND_DEPOSIT", //This is set to FEES_AND_DEPOSIT since we want the tank to provide ENJ for both transaction fees, and storage deposits for transactions that require it (such as listing a token for sale).
    reserveAccountCreationDeposit: true, //This is set to true since we want to allow tank account creations, and we want the tank to subsidize the ENJ required for therequired for the Tank User Account storage deposit
    whitelistedPallets: ["MultiTokens", "Marketplace"], //This rule specifies that only extrinsics from the MultiTokens and Marketplace pallets are subsidized
    whitelistedCollections: [36105] //This rule ensures that only the specified collection is subsidized
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
mutation CreateFuelTank(
  $name: String!
  $coveragePolicy: CoveragePolicy
  $reserveAccountCreationDeposit: Boolean
  $whitelistedPallets: [String!]
  $whitelistedCollections: [BigInt!]
) {
  CreateFuelTank(
    name: $name
    coveragePolicy: $coveragePolicy
    reservesAccountCreationDeposit: $reserveAccountCreationDeposit
    dispatchRules: [
      {
        whitelistedPallets: $whitelistedPallets
        whitelistedCollections: $whitelistedCollections
      }
    ]
  ) {
    id
    method
    state
  }
}
'''

variables = {
  'name': "Collection Token Actions", #Specify the Fuel Tank name
  'coveragePolicy': "FEES_AND_DEPOSIT", #This is set to FEES_AND_DEPOSIT since we want the tank to provide ENJ for both transaction fees, and storage deposits for transactions that require it (such as listing a token for sale).
  'reserveAccountCreationDeposit': True, #This is set to true since we want to allow tank account creations, and we want the tank to subsidize the ENJ required for therequired for the Tank User Account storage deposit
  'whitelistedPallets': ["MultiTokens", "Marketplace"], #This rule specifies that only extrinsics from the MultiTokens and Marketplace pallets are subsidized
  'whitelistedCollections': [36105] #This rule ensures that only the specified collection is subsidized
}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

### Subsidize All Transactions For Whitelisted Accounts With Budget Limitations

The following mutation will set up a fuel tank that subsidizes any transaction, the tank is allowed to subsidize up to 5 ENJ per 30 days for each User Account in the tank, which can be created only if the account is within the whitelisted callers list.

:::warning Upcoming Feature Notice: `requireAccount` Option
The `requireAccount` argument is not yet supported on the Enjin Platform.  
The following code snippet is provided for illustrative purposes only.  
If you wish to create a fuel tank with this option now, please use the Enjin Console at [console.enjin.io](https://console.enjin.io).  
We will update the documentation once this option is available.
:::

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateFuelTank{
  CreateFuelTank(
    name: "Only Specific Accounts Allowed" #Specify the Fuel Tank name
    coveragePolicy: FEES_AND_DEPOSIT #This is set to FEES_AND_DEPOSIT since we want the tank to provide ENJ for both transaction fees, and storage deposits for transactions that require it.
    accountRules: {
      whitelistedCallers: [ #This will validate that the caller is whitelisted at the time of adding the caller's account to the tank's User Accounts.
        "cxKy7aqhQTtoJYUjpebxFK2ooKhcvQ2FQj3FePrXhDhd9nLfu",
        "cxKRcxyqEuj8qwS4qAmxZMLKNoMJPMhQBLhoQdKekubbo3BtP"
      ]
    }
    dispatchRules: [{
      requireAccount: true #This is set to true since we want the tank to allow dispatching only if the caller has a User Account in the tank.
      userFuelBudget: { #In here we configure how much ENJ to subsidize for each User Account.
        amount: 5000000000000000000 #This will allow the tank to subsidize up to 5 ENJ from the Tank's pool per period for each User Account.
        resetPeriod: 432000 #This sets the period to 432,000 blocks, which is 30 days on average with 6 seconds average block time. Meaning the tank will be able to subsidize up to 5 ENJ per 30 days for each User Account.
      }
    }]
  ){
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
-d '{"query":"mutation CreateFuelTank(\r\n  $name: String!\r\n  $coveragePolicy: CoveragePolicy\r\n  $whitelistedCallers: [String!]\r\n  $requireAccount: Boolean\r\n  $userFuelBudget: FuelBudgetInputType\r\n) {\r\n  CreateFuelTank(\r\n    name: $name\r\n    coveragePolicy: $coveragePolicy\r\n    accountRules: { whitelistedCallers: $whitelistedCallers }\r\n    dispatchRules: [\r\n      { requireAccount: $requireAccount, userFuelBudget: $userFuelBudget }\r\n    ]\r\n  ) {\r\n    id\r\n    method\r\n    state\r\n  }\r\n}\r\n","variables":{"name":"Only Specific Accounts Allowed","coveragePolicy":"FEES","whitelistedCallers":["cxKy7aqhQTtoJYUjpebxFK2ooKhcvQ2FQj3FePrXhDhd9nLfu","cxKRcxyqEuj8qwS4qAmxZMLKNoMJPMhQBLhoQdKekubbo3BtP"],"requireAccount":true,"userFuelBudget":{"amount":5000000000000000000,"resetPeriod":432000}}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;
using Enjin.Platform.Sdk.FuelTanks;

// Create an array of whitelisted callers and assign to accountRules.whitelistedCallers
var whitelistedCallers = new List<string>()
{
    "cxKy7aqhQTtoJYUjpebxFK2ooKhcvQ2FQj3FePrXhDhd9nLfu",
    "cxKRcxyqEuj8qwS4qAmxZMLKNoMJPMhQBLhoQdKekubbo3BtP"
};
var accountRules = new AccountRuleInputType()
    .SetWhitelistedCallers(whitelistedCallers.ToArray());

// Create the user fuel budget input type
var userFuelBudget = new FuelBudgetInputType()
    .SetAmount(5000000000000000000) // Set the amount of ENJ that the fuel tank will provide to users.
    .SetResetPeriod(432000); // Set the reset period to 432000 blocks (approximately 30 days).

// Create the array of dispatch rules for the fuel tank
var dispatchRules = new List<DispatchRuleInputType>()
{
    new DispatchRuleInputType()
        .SetRequireAccount(true) // Note: This property has yet to be implemented on the platform.  This is set to true since we want the tank to allow dispatching only if the caller has a User Account in the tank.
        .SetUserFuelBudget(userFuelBudget) // Set the user fuel budget for the dispatch rule.
};

// Set up the mutation
var createFuelTank = new CreateFuelTank()
    .SetName("Only Specific Accounts Allowed") // Set the name of the fuel tank.
    .SetCoveragePolicy(CoveragePolicy.FeesAndDeposit) // This is set to FEES_AND_DEPOSIT since we want the tank to provide ENJ for both transaction fees, and storage deposits for transactions that require it (such as listing a token for sale).
    .SetAccountRules(accountRules) // Set the account rules for the fuel tank.
    .SetDispatchRules(dispatchRules.ToArray());

// Define and assign the return data fragment to the mutation
var transactionFragment = new TransactionFragment()
    .WithId()
    .WithMethod()
    .WithState();

createFuelTank.Fragment(transactionFragment);

// Create and auth a client to send the request to the platform
var client = PlatformClient.Builder()
    .SetBaseAddress("https://platform.canary.enjin.io")
    .Build();
client.Auth("Your_Platform_Token_Here");

// Send the request and write the output to the console.
// Only the fields that were requested in the fragment will be filled in,
// other fields which weren't requested in the fragment will be set to null.
var response = await client.SendCreateFuelTank(createFuelTank);
Console.WriteLine(JsonSerializer.Serialize(response.Result.Data));
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
// Coming Soon!
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.canary.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      mutation CreateFuelTank(
        $name: String!
        $coveragePolicy: CoveragePolicy
        $whitelistedCallers: [String!]
        $requireAccount: Boolean
        $userFuelBudget: FuelBudgetInputType
      ) {
        CreateFuelTank(
          name: $name
          coveragePolicy: $coveragePolicy
          accountRules: { whitelistedCallers: $whitelistedCallers }
          dispatchRules: [
            { requireAccount: $requireAccount, userFuelBudget: $userFuelBudget }
          ]
        ) {
          id
          method
          state
        }
      }
    `,
    variables: {
      name: "Only Specific Accounts Allowed", //Specify the Fuel Tank name
      coveragePolicy: "FEES", //This is set to FEES_AND_DEPOSIT since we want the tank to provide ENJ for both transaction fees, and storage deposits for transactions that require it.
      whitelistedCallers: [ //This will validate that the caller is whitelisted at the time of adding the caller's account to the tank's User Accounts.
        "cxKy7aqhQTtoJYUjpebxFK2ooKhcvQ2FQj3FePrXhDhd9nLfu",
        "cxKRcxyqEuj8qwS4qAmxZMLKNoMJPMhQBLhoQdKekubbo3BtP"
      ],
      requireAccount: true, //This is set to true since we want the tank to allow dispatching only if the caller has a User Account in the tank.
      userFuelBudget: { //In here we configure how much ENJ to subsidize for each User Account.
        amount: 5000000000000000000, //This will allow the tank to subsidize up to 5 ENJ from the Tank's pool per period for each User Account.
        resetPeriod: 432000 //This sets the period to 432,000 blocks, which is 30 days on average with 6 seconds average block time. Meaning the tank will be able to subsidize up to 5 ENJ per 30 days for each User Account.
      }
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
    mutation CreateFuelTank(
      $name: String!
      $coveragePolicy: CoveragePolicy
      $whitelistedCallers: [String!]
      $requireAccount: Boolean
      $userFuelBudget: FuelBudgetInputType
    ) {
      CreateFuelTank(
        name: $name
        coveragePolicy: $coveragePolicy
        accountRules: { whitelistedCallers: $whitelistedCallers }
        dispatchRules: [
          { requireAccount: $requireAccount, userFuelBudget: $userFuelBudget }
        ]
      ) {
        id
        method
        state
      }
    }
  `,
  variables: {
    name: "Only Specific Accounts Allowed", //Specify the Fuel Tank name
    coveragePolicy: "FEES", //This is set to FEES_AND_DEPOSIT since we want the tank to provide ENJ for both transaction fees, and storage deposits for transactions that require it.
    whitelistedCallers: [ //This will validate that the caller is whitelisted at the time of adding the caller's account to the tank's User Accounts.
      "cxKy7aqhQTtoJYUjpebxFK2ooKhcvQ2FQj3FePrXhDhd9nLfu",
      "cxKRcxyqEuj8qwS4qAmxZMLKNoMJPMhQBLhoQdKekubbo3BtP"
    ],
    requireAccount: true, //This is set to true since we want the tank to allow dispatching only if the caller has a User Account in the tank.
    userFuelBudget: { //In here we configure how much ENJ to subsidize for each User Account.
    	amount: 5000000000000000000, //This will allow the tank to subsidize up to 5 ENJ from the Tank's pool per period for each User Account.
    	resetPeriod: 432000 //This sets the period to 432,000 blocks, which is 30 days on average with 6 seconds average block time. Meaning the tank will be able to subsidize up to 5 ENJ per 30 days for each User Account.
    }
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
mutation CreateFuelTank(
  $name: String!
  $coveragePolicy: CoveragePolicy
  $whitelistedCallers: [String!]
  $requireAccount: Boolean
  $userFuelBudget: FuelBudgetInputType
) {
  CreateFuelTank(
    name: $name
    coveragePolicy: $coveragePolicy
    accountRules: { whitelistedCallers: $whitelistedCallers }
    dispatchRules: [
      { requireAccount: $requireAccount, userFuelBudget: $userFuelBudget }
    ]
  ) {
    id
    method
    state
  }
}
'''

variables = {
  'name': "Only Specific Accounts Allowed", #Specify the Fuel Tank name
  'coveragePolicy': "FEES", #This is set to FEES_AND_DEPOSIT since we want the tank to provide ENJ for both transaction fees, and storage deposits for transactions that require it.
  'whitelistedCallers': [ #This will validate that the caller is whitelisted at the time of adding the caller's account to the tank's User Accounts.
    "cxKy7aqhQTtoJYUjpebxFK2ooKhcvQ2FQj3FePrXhDhd9nLfu",
    "cxKRcxyqEuj8qwS4qAmxZMLKNoMJPMhQBLhoQdKekubbo3BtP"
  ],
  'requireAccount': True, #This is set to true since we want the tank to allow dispatching only if the caller has a User Account in the tank.
  'userFuelBudget': { #In here we configure how much ENJ to subsidize for each User Account.
    'amount': 5000000000000000000, #This will allow the tank to subsidize up to 5 ENJ from the Tank's pool per period for each User Account.
    'resetPeriod': 432000 #This sets the period to 432,000 blocks, which is 30 days on average with 6 seconds average block time. Meaning the tank will be able to subsidize up to 5 ENJ per 30 days for each User Account.
  }
}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

A WebSocket event will also be fired so you can pick up the Fuel Tank creation in real time by listening to the app channel on the WebSocket.

:::info Explore More Arguments
For a comprehensive view of all available arguments for queries and mutations, please refer to our [API Reference](/01-getting-started/04-using-enjin-api/02-api-reference.md). This resource will guide you on how to use the GraphiQL Playground to explore the full structure and functionality of our API.
:::

## Dispatching a Call Using a Fuel Tank

To broadcast a transaction call using a fuel tank, use the `Dispatch`/`DispatchAndTouch` mutation.

:::tip The Fuel Tank requires a UserAccount to dispatch?
Use the `DispatchAndTouch` mutation to create a `UserAccount` and `Dispatch` at the same time in a single transaction.
:::

:::tip Not sure which Fuel Tank to select?
If you need help figuring out the best fuel tank to use for a transaction, check out this page: [Selecting a fuel tank to dispatch with](/04-components/05-enjin-matrixchain/02-fuel-tank-pallet.md#selecting-a-fuel-tank-to-dispatch-with).
:::

### Step #1: Prepare The Mutation

First, prepare the mutation you wish to dispatch, with the `id` and `encodedData` fields in the response.  
In this example, we'll dispatch a call to send a <GlossaryTerm id="multitoken" /> from one account to another:

:::danger Ask for the `id` and `encodedData` fields!
Make sure to add the `id` and `encodedData` fields in the response, or the mutation will fail with an error.
:::

```graphql
mutation TransferNFT{
  SimpleTransferToken(
    collectionId: 3298
    recipient: "efQh8FzLm6oH3dmTU3HWqGrtm6Xcuu1WG33N2Ka9fzo5MFFAr"
    params: {tokenId: {integer: 1} amount: 1}
  ){
    id
    encodedData
  }
}
```

### Step #2: Prepare The Dispatch Mutation

Next, you need to convert the mutation call into a String. Remove all new lines and escape double quotation marks:

```
mutation TransferNFT{SimpleTransferToken(collectionId: 3298 recipient: \"efQh8FzLm6oH3dmTU3HWqGrtm6Xcuu1WG33N2Ka9fzo5MFFAr\" params: {tokenId: {integer: 1} amount: 1}){id encodedData}}
```

To escape quotation marks you can use online tools such as https://tools.knowledgewalls.com/online-escape-single-or-double-quotes-from-string.

### Step #3: Send the Dispatch Call

Insert the mutation String from Step #2 into a Dispatch mutation call "query" parameter and send it:

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation Dispatch {
  Dispatch(
    tankId: "efQqqMFeDXMSQ43rShznQQ5Aq5pnMUKBfvTQHntatMmF4JZou" #Specify the Fuel Tank ID to dispatch with
    ruleSetId: 0  #Specify the ruleset to dispatch with
    dispatch: {
      call: MULTI_TOKENS  #Specify the pallet to use for the transaction
      query: "mutation TransferNFT{SimpleTransferToken(collectionId: 3298 recipient: \"efQh8FzLm6oH3dmTU3HWqGrtm6Xcuu1WG33N2Ka9fzo5MFFAr\" params: {tokenId: {integer: 1} amount: 1}){id encodedData}}" #Insert the mutation to dispatch.
      variables: null #If the mutation has variables, insert them here.
    }
  ){
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
-d '{"query":"mutation Dispatch(\r\n  $tankId: String!\r\n  $ruleSetId: BigInt!\r\n  $call: DispatchCall!\r\n  $query: String!\r\n  $variables: Object\r\n) {\r\n  Dispatch(\r\n    tankId: $tankId\r\n    ruleSetId: $ruleSetId\r\n    dispatch: { call: $call, query: $query, variables: $variables }\r\n  ) {\r\n    id\r\n    method\r\n    state\r\n  }\r\n}\r\n","variables":{"tankId":"efQqqMFeDXMSQ43rShznQQ5Aq5pnMUKBfvTQHntatMmF4JZou","ruleSetId":0,"call":"MULTI_TOKENS","query":"mutation TransferNFT{SimpleTransferToken(collectionId: 3298 recipient: \"efQh8FzLm6oH3dmTU3HWqGrtm6Xcuu1WG33N2Ka9fzo5MFFAr\" params: {tokenId: {integer: 1} amount: 1}){id encodedData}}","variables":null}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;
using Enjin.Platform.Sdk.FuelTanks;

// Create an array of whitelisted callers and assign to accountRules.whitelistedCallers
var dispatchInput = new DispatchInputType()
    .SetCall(DispatchCall.MultiTokens)
    .SetQuery("mutation TransferNFT{SimpleTransferToken(collectionId: 3298 recipient: \\\"efQh8FzLm6oH3dmTU3HWqGrtm6Xcuu1WG33N2Ka9fzo5MFFAr\\\" params: {tokenId: {integer: 1} amount: 1}){id encodedData}") // Insert the mutation to dispatch.
    .SetVariables(null);

// Set up the mutation
var dispatch = new Dispatch()
    .SetTankId("efQqqMFeDXMSQ43rShznQQ5Aq5pnMUKBfvTQHntatMmF4JZou")
    .SetRuleSetId(0)
    .SetDispatch(dispatchInput);

// Define and assign the return data fragment to the mutation
var transactionFragment = new TransactionFragment()
    .WithId()
    .WithMethod()
    .WithState();

dispatch.Fragment(transactionFragment);

// Create and auth a client to send the request to the platform
var client = PlatformClient.Builder()
    .SetBaseAddress("https://platform.canary.enjin.io")
    .Build();
client.Auth("Your_Platform_Token_Here");

// Send the request and write the output to the console.
// Only the fields that were requested in the fragment will be filled in,
// other fields which weren't requested in the fragment will be set to null.
var response = await client.SendDispatch(dispatch);
Console.WriteLine(JsonSerializer.Serialize(response.Result.Data));
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
// Coming Soon!
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.canary.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      mutation Dispatch(
        $tankId: String!
        $ruleSetId: BigInt!
        $call: DispatchCall!
        $query: String!
        $variables: Object
      ) {
        Dispatch(
          tankId: $tankId
          ruleSetId: $ruleSetId
          dispatch: { call: $call, query: $query, variables: $variables }
        ) {
          id
          method
          state
        }
      }
    `,
    variables: {
      tankId: "efQqqMFeDXMSQ43rShznQQ5Aq5pnMUKBfvTQHntatMmF4JZou", //Specify the Fuel Tank ID to dispatch with
      ruleSetId: 0, //Specify the ruleset to dispatch with
      call: "MULTI_TOKENS", //Specify the pallet to use for the transaction
      query: "mutation TransferNFT{SimpleTransferToken(collectionId: 3298 recipient: \"efQh8FzLm6oH3dmTU3HWqGrtm6Xcuu1WG33N2Ka9fzo5MFFAr\" params: {tokenId: {integer: 1} amount: 1}){id encodedData}}", //Insert the mutation to dispatch.
      variables: null //If the mutation has variables, insert them here as an object.
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
    mutation Dispatch(
      $tankId: String!
      $ruleSetId: BigInt!
      $call: DispatchCall!
      $query: String!
      $variables: Object
    ) {
      Dispatch(
        tankId: $tankId
        ruleSetId: $ruleSetId
        dispatch: { call: $call, query: $query, variables: $variables }
      ) {
        id
        method
        state
      }
    }
  `,
  variables: {
    tankId: "efQqqMFeDXMSQ43rShznQQ5Aq5pnMUKBfvTQHntatMmF4JZou", //Specify the Fuel Tank ID to dispatch with
    ruleSetId: 0, //Specify the ruleset to dispatch with
    call: "MULTI_TOKENS", //Specify the pallet to use for the transaction
    query: "mutation TransferNFT{SimpleTransferToken(collectionId: 3298 recipient: \"efQh8FzLm6oH3dmTU3HWqGrtm6Xcuu1WG33N2Ka9fzo5MFFAr\" params: {tokenId: {integer: 1} amount: 1}){id encodedData}}", //Insert the mutation to dispatch.
    variables: null //If the mutation has variables, insert them here as an object.
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
mutation Dispatch(
  $tankId: String!
  $ruleSetId: BigInt!
  $call: DispatchCall!
  $query: String!
  $variables: Object
) {
  Dispatch(
    tankId: $tankId
    ruleSetId: $ruleSetId
    dispatch: { call: $call, query: $query, variables: $variables }
  ) {
    id
    method
    state
  }
}
'''

variables = {
  'tankId': "efQqqMFeDXMSQ43rShznQQ5Aq5pnMUKBfvTQHntatMmF4JZou", #Specify the Fuel Tank ID to dispatch with
  'ruleSetId': 0, #Specify the ruleset to dispatch with
  'call': "MULTI_TOKENS", #Specify the pallet to use for the transaction
  'query': "mutation TransferNFT{SimpleTransferToken(collectionId: 3298 recipient: \"efQh8FzLm6oH3dmTU3HWqGrtm6Xcuu1WG33N2Ka9fzo5MFFAr\" params: {tokenId: {integer: 1} amount: 1}){id encodedData}}", #Insert the mutation to dispatch.
  'variables': None #If the mutation has variables, insert them here as an object.
}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

Once the mutation is sent, signed and broadcasted, If the transaction is eligible, the fuel tank will subsidize the transaction fees; otherwise, the transaction will fail.

:::info Need to broadcast from Managed Wallet?
To broadcast the transaction from a managed wallet account, add the `signingAccount` argument as instructed in the [Using Managed Wallets](/02-tutorials/02-managing-users/03-using-managed-wallets.md#transferring-tokens-from-managed-wallets) page.  
It's important to note that the `signingAccount` argument should be added on the `Dispatch` mutation level, and **NOT** in the dispatch argument.  
In the above example, to transfer the token from a managed wallet via a fuel tank:

```graphql
mutation Dispatch {
  Dispatch(
    tankId: "efQqqMFeDXMSQ43rShznQQ5Aq5pnMUKBfvTQHntatMmF4JZou" #Specify the Fuel Tank ID to dispatch with
    ruleSetId: 0  #Specify the ruleset to dispatch with
    signingAccount: "Managed Wallet Address Here"
    dispatch: {
      call: MULTI_TOKENS  #Specify the pallet to use for the transaction
      query: "mutation TransferNFT{SimpleTransferToken(collectionId: 3298 recipient: \"efQh8FzLm6oH3dmTU3HWqGrtm6Xcuu1WG33N2Ka9fzo5MFFAr\" params: {tokenId: {integer: 1} amount: 1}){id encodedData}}" #Insert the mutation to dispatch.
      variables: null #If the mutation has variables, insert them here.
    }
  ){
    id
    method
    state
  }
}
```
:::