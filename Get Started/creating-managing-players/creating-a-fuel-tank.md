---
title: "Using Fuel Tanks"
slug: "creating-a-fuel-tank"
excerpt: "Subsidize fees for your players while reducing overall costs."
hidden: false
createdAt: "Mon Nov 06 2023 03:58:03 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Sun Dec 03 2023 08:44:32 GMT+0000 (Coordinated Universal Time)"
---
These are Managed Wallets that hold Enjin Coin (ENJ) that is used to cover transaction fees for approved users. Each <<glossary:Fuel Tank>> is designed to minimize transaction costs, resulting in lower expenses for platform operations.

Fuel Tanks are flexible and dynamic, allowing customization based on specific rules and requirements. They operate based on a set of rules, making it possible to target specific actions or accounts meeting specific criteria.

> 📘 What you'll need:
> 
> - Some [Enjin Coin](doc:using-enjin-coin) on Enjin Matrixchain to pay for <<glossary:Transaction Fees>>.
> - An [Enjin Platform Account](/docs/using-the-enjin-platform).

Fuel Tanks offer versatile rule sets for various use cases, allowing customization:

- **`Whitelisted Callers`**: Select which wallets can receive subsidized transactions, ideal for rewarding users.
- **`Whitelisted Collections`**: Choose collections with covered transaction fees to boost their activity.
- **`Require Token`**: Users must hold a specific NFT for free transactions access.
- **`Permitted Extrinsics`**: Subsidize specific transaction types, e.g., marketplace transactions.
- **`Permitted Calls`**: Define transactions based on inputs and parameters, promoting certain trades.
- **`User Fuel Budget`**: Set limits on individual fuel consumption for security.
- **`Tank Fuel Budget`**: Define collective fuel usage to extend Fuel Tank lifespan.
- **`Max Fuel Burn`**: Control fuel consumption per transaction for predictability.
- **`Freezing`**: Pause Fuel Tank usage as a safety measure.

These rules enhance the Enjin Blockchain experience, sparking new products and business models.

This tutorial guides you through setting up a Fuel Tank with specific functionality, including creating rules and customizing it to fit your needs, enabling you to reduce transaction costs for your users.

**There are two ways to create a Fuel Tank:**

- [Using the Platform User Interface](#option-a-using-the-platform-user-interface)
- [Using the GraphQL API](#option-b-using-the-graphql-api--sdks)

## Option A. Using the Platform User Interface

> 🚧 `PermittedExtrinsics` is Only Available via GraphQL
> 
> Please note that while creating a Fuel Tank is possible through the Enjin Platform User Interface, the specific rule required for this tutorial, `PermittedExtrinsics`, is currently only available via the GraphQL API or SDKs.
> 
> Therefore, this tutorial will only cover instructions for setting up a Fuel Tank with `PermittedExtrinsics` rule using the GraphQL API or SDKs.

In the Platform menu, navigate to "**[Fuel Tanks](https://platform.canary.enjin.io/fuel-tanks)**". Then, click the "**[Create Fuel Tank](https://platform.canary.enjin.io/create/fuel-tank)**" button.

## Option B. Using the GraphQL API / SDKs

> 📘 Make sure to use the Fuel Tank Endpoint
> 
> - Testnet: `http://platform.canary.enjin.io/graphql/fuel-tanks`
> - Mainnet: `http://platform.enjin.io/graphql/fuel-tanks`
> 
> **Try the Beam Playground here:**
> 
> - Testnet: <http://platform.canary.enjin.io/graphiql/fuel-tanks>
> - Mainnet: <http://platform.enjin.io/graphiql/fuel-tanks>

This mutation will set up a new transaction that once finalized on-chain will create the new fuel tank on-chain. 

```graphql
mutation CreateFuelTank{
  CreateFuelTank(
    name: "Collection Token Transfers" #Specify the Fuel Tank name
    providesDeposit: false #This is set to false since we don't need to provide token deposits for token transfer transactions
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
      mutation CreateFuelTank
      (
        $name: String!
        $provide_deposit: Boolean!
      ) {
        CreateFuelTank(
          name: $name
          providesDeposit: $provide_deposit
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
    `,
    variables: {
      name: "Collection Token Transfers", //Specify the Fuel Tank name
      provide_deposit: false //This is set to false since we don't need to provide token deposits for token transfer transactions
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
    mutation CreateFuelTank
    (
      $name: String!
      $provide_deposit: Boolean!
    ) {
      CreateFuelTank(
        name: $name
        providesDeposit: $provide_deposit
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
  `,
  variables: {
    name: "Collection Token Transfers", //Specify the Fuel Tank name
    provide_deposit: false //This is set to false since we don't need to provide token deposits for token transfer transactions
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
mutation CreateFuelTank
(
  $name: String!
  $provide_deposit: Boolean!
) {
  CreateFuelTank(
    name: $name
    providesDeposit: $provide_deposit
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
'''

variables = {
  'name': "Collection Token Transfers", #Specify the Fuel Tank name
  'provide_deposit': False #This is set to false since we don't need to provide token deposits for token transfer transactions
}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```

A WebSocket event will also be fired so you can pick up the Fuel Tank creation in real time by listening to the app channel on the WebSocket.

> 📘 More Fields and Arguments Available!
> 
> The examples here illustrate basic uses of the `CreateFuelTank` mutation. However, this mutation supports many more arguments and settings not shown in these examples.
> 
> For a comprehensive overview of all available settings and their descriptions for the `CreateFuelTank` mutation, please refer to our GraphQL Schema on Apollo. 
> 
> - [Detailed `CreateFuelTank` mutation Information on Apollo](https://studio.apollographql.com/public/EnjinPlatform/variant/fuel-tanks/schema/reference/objects/Mutation?query=CreateFuelTank).
> 
> This resource will help you to fully utilize the capabilities of the `CreateFuelTank` mutation and tailor it to your specific needs.
> 
> For instance, you'll find settings such as allowing the fuel tank to provide <<glossary:Storage Deposit>>s with the `providesDeposit` flag, or setting various account rules and dispatch rules with the [accountRules](https://studio.apollographql.com/public/EnjinPlatform/variant/fuel-tanks/schema/reference/inputs/AccountRuleInputType) and [dispatchRules](https://studio.apollographql.com/public/EnjinPlatform/variant/fuel-tanks/schema/reference/inputs/DispatchRuleInputType) objects.