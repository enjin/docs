---
title: "Using Fuel Tanks"
slug: "using-fuel-tanks"
description: "Use a fuel tank to pay transaction fees on your players' behalf, so they can transact without ever holding ENJ."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A <GlossaryTerm id="fuel_tank" /> is an on-chain pool of <GlossaryTerm id="enjin_coin" /> (ENJ) that pays <GlossaryTerm id="transaction_fees" /> — and, optionally, <GlossaryTerm id="storage_deposit" />s — on behalf of other accounts. With a fuel tank, your players can transact without ever holding ENJ or worrying about gas.

Dispatching a transaction through a tank takes a single optional argument: add `fuelTank` to any `CreateTransaction` (or `CreateBatchTransaction`) and the platform routes that transaction through the tank.

A tank decides which transactions it pays for using a set of rules. When a transaction is dispatched through a tank, all of the following must hold:

- The tank is not frozen.
- The tank holds enough ENJ.
- The dispatching account is allowed to use the tank.
- The tank's rules allow this particular transaction.

:::info What you'll need
- An [Enjin Platform Account](/01-getting-started/04-using-the-enjin-platform.md) with an API token, used to authenticate the requests below.
- Some ENJ on Enjin / Canary Matrixchain to fund the tank. You can get cENJ (Canary ENJ) for testing from the [built-in Canary faucet](/01-getting-started/04-using-the-enjin-platform.md#canary-faucet) in the Platform UI.
:::

:::tip Prefer a UI?
Fuel tanks can also be created and configured visually in the [Enjin Platform UI](https://platform.beta.enjin.io/fuel-tanks). This page uses the Platform API so the setup is scriptable and reproducible.
:::

## Cover transaction fees for your players {#recommended-setup}

The most common use of a fuel tank is paying fees for players who never touch ENJ themselves.

A tank decides which transactions it pays for through a set of **rules**, which you can tailor to many different use cases — for example, a tank that only subsidizes transactions involving tokens from a specific collection, or one that covers fees only for a fixed list of whitelisted accounts. ([How fuel tanks work](#how-fuel-tanks-work) covers the full list.)

The setup below uses the most common rule, **Require Signature**, to build a tank that only your own application can dispatch through. That keeps the tank from being drained or used to subsidize unrelated apps, while your players transact without ever holding ENJ.

Most games onboard players with [managed wallets](/02-guides/01-platform/02-managing-users/03-using-managed-wallets.md): the game creates and operates a wallet for each player. To cover those players' fees, you configure the tank with:

- **User account management** enabled, with the tank reserving the account-creation deposit, so players are added to the tank automatically and never pre-fund anything.
- **Coverage policy** set to **Fees and Deposit**, so the tank pays both transaction fees and any storage deposit a call needs (for example, listing a token).
- **One rule set** with **Require account** enabled and a single **Require signature** rule set to your daemon wallet address.

Then you fund the tank with ENJ. The rest of this section walks through it.

### 1. Create the tank {#create-tank}

Fuel tanks are created on-chain, so you create one by dispatching the `createFuelTank` action through `CreateTransaction`. The call below builds the tank described above: user account management on (with the tank reserving the account-creation deposit), coverage policy **Fees and Deposit**, and one rule set with **Require account** enabled and a single **Require Signature** rule pointing at your Wallet Daemon address.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateManagedWalletFuelTank($network: Network!, $chain: Chain!, $name: String!, $daemonAddress: String!) {
  CreateTransaction(
    network: $network
    chain: $chain
    transaction: {
      createFuelTank: {
        name: $name
        coveragePolicy: FEES_AND_DEPOSIT
        userAccountManagement: { tankReservesAccountCreationDeposit: true }
        ruleSets: [
          {
            id: 0
            requireAccount: true
            rules: [{ requireSignature: $daemonAddress }]
          }
        ]
      }
    }
  ) {
    uuid
    action
    state
  }
}
```

Variables:

```json
{
  "network": "CANARY",
  "chain": "MATRIX",
  "name": "My Game Fuel Tank",
  "daemonAddress": "INSERT_WALLET_DAEMON_ADDRESS"
}
```
  </TabItem>
  <TabItem value="curl" label="cURL">
```
curl --location 'https://platform.beta.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer enjin_api_key' \
-d '{"query":"mutation CreateManagedWalletFuelTank($network: Network!, $chain: Chain!, $name: String!, $daemonAddress: String!) {\r\n  CreateTransaction(network: $network, chain: $chain, transaction: { createFuelTank: { name: $name, coveragePolicy: FEES_AND_DEPOSIT, userAccountManagement: { tankReservesAccountCreationDeposit: true }, ruleSets: [{ id: 0, requireAccount: true, rules: [{ requireSignature: $daemonAddress }] }] } }) {\r\n    uuid\r\n    action\r\n    state\r\n  }\r\n}","variables":{"network":"CANARY","chain":"MATRIX","name":"My Game Fuel Tank","daemonAddress":"INSERT_WALLET_DAEMON_ADDRESS"}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System;
using Enjin.Platform.Sdk;

// Create and authenticate the client
using var client = new PlatformClient();
client.Auth("<your-platform-token>");

var mutation = new MutationQueryBuilder()
    .WithCreateTransaction(
        new TransactionQueryBuilder().WithUuid().WithState(),
        network: Network.Canary,
        chain: Chain.Matrix,
        transaction: new TransactionInput
        {
            CreateFuelTank = new CreateFuelTankInput
            {
                Name = "My Game Fuel Tank",
                CoveragePolicy = CoveragePolicy.FeesAndDeposit,
                UserAccountManagement = new UserAccountManagementInput
                {
                    TankReservesAccountCreationDeposit = true,
                },
                RuleSets = new[]
                {
                    new RuleSetEntryInput
                    {
                        Id = 0,
                        RequireAccount = true,
                        Rules = new[]
                        {
                            new DispatchRuleInput { RequireSignature = "INSERT_WALLET_DAEMON_ADDRESS" },
                        },
                    },
                },
            },
        });

var response = await client.SendMutation(mutation);
Console.WriteLine(response.Result.Data?.CreateTransaction?.Uuid);
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.beta.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      mutation CreateManagedWalletFuelTank($network: Network!, $chain: Chain!, $name: String!, $daemonAddress: String!) {
        CreateTransaction(
          network: $network
          chain: $chain
          transaction: {
            createFuelTank: {
              name: $name
              coveragePolicy: FEES_AND_DEPOSIT
              userAccountManagement: { tankReservesAccountCreationDeposit: true }
              ruleSets: [
                { id: 0, requireAccount: true, rules: [{ requireSignature: $daemonAddress }] }
              ]
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
      network: "CANARY",
      chain: "MATRIX",
      name: "My Game Fuel Tank",
      daemonAddress: "INSERT_WALLET_DAEMON_ADDRESS"
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
    mutation CreateManagedWalletFuelTank($network: Network!, $chain: Chain!, $name: String!, $daemonAddress: String!) {
      CreateTransaction(
        network: $network
        chain: $chain
        transaction: {
          createFuelTank: {
            name: $name
            coveragePolicy: FEES_AND_DEPOSIT
            userAccountManagement: { tankReservesAccountCreationDeposit: true }
            ruleSets: [
              { id: 0, requireAccount: true, rules: [{ requireSignature: $daemonAddress }] }
            ]
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
    network: "CANARY",
    chain: "MATRIX",
    name: "My Game Fuel Tank",
    daemonAddress: "INSERT_WALLET_DAEMON_ADDRESS"
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
mutation CreateManagedWalletFuelTank($network: Network!, $chain: Chain!, $name: String!, $daemonAddress: String!) {
  CreateTransaction(
    network: $network
    chain: $chain
    transaction: {
      createFuelTank: {
        name: $name
        coveragePolicy: FEES_AND_DEPOSIT
        userAccountManagement: { tankReservesAccountCreationDeposit: true }
        ruleSets: [
          { id: 0, requireAccount: true, rules: [{ requireSignature: $daemonAddress }] }
        ]
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
  'network': 'CANARY',
  'chain': 'MATRIX',
  'name': 'My Game Fuel Tank',
  'daemonAddress': 'INSERT_WALLET_DAEMON_ADDRESS'
}

response = requests.post('https://platform.beta.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Bearer Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

Sign the returned transaction — the Wallet Daemon does this for you. Once it reaches `FINALIZED`, the tank exists on-chain with its own address, which you'll need in order to fund it and dispatch through it.

:::tip Finding your daemon wallet address
The Require Signature rule must point at the address your Platform [Wallet Daemon](/01-getting-started/06-using-wallet-daemon.md) signs with — that's what lets the platform authorize dispatches through this tank automatically. The quickest way to find it is the **Daemon address** field on your [Platform settings page](https://platform.beta.enjin.io/settings), where you can copy it directly.
:::

### 2. Fund the tank {#fund-tank}

A tank can only pay fees while it holds ENJ. [Send ENJ](/02-guides/01-platform/01-managing-tokens/05-transferring-tokens.md#transferring-enj-token) to the tank's address (returned by the create call, and shown on the [Fuel Tanks page](https://platform.beta.enjin.io/fuel-tanks) in the Platform UI). On Canary, top it up with cENJ from the [faucet](/01-getting-started/04-using-the-enjin-platform.md#canary-faucet).

### 3. Dispatch transactions through the tank {#dispatch-through-tank}

Now any action you perform on a player's behalf can be paid for by the tank. Sign the transaction as the player's managed wallet with `signerExternalId`, and add `fuelTank` set to your tank's address:

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation DispatchThroughTank($network: Network!, $chain: Chain!, $signerExternalId: String, $fuelTank: String) {
  CreateTransaction(
    network: $network
    chain: $chain
    signerExternalId: $signerExternalId
    fuelTank: $fuelTank
    transaction: {
      transferToken: {
        recipient: "cxLf6yvvtscKrHRfKDphnzsT3eoRY45VbJvqXKub5pmj5mdbQ" #The recipient of the transfer
        collectionId: 36105 #Specify the collection ID
        tokenId: 1 #Token ID to transfer
        amount: 1 #Amount to transfer
      }
    }
  ) {
    uuid
    action
    state
  }
}
```

Variables:

```json
{
  "network": "CANARY",
  "chain": "MATRIX",
  "signerExternalId": "docs-example-player",
  "fuelTank": "INSERT_FUEL_TANK_ADDRESS"
}
```
  </TabItem>
  <TabItem value="curl" label="cURL">
```
curl --location 'https://platform.beta.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer enjin_api_key' \
-d '{"query":"mutation DispatchThroughTank($network: Network!, $chain: Chain!, $signerExternalId: String, $fuelTank: String) {\r\n  CreateTransaction(network: $network, chain: $chain, signerExternalId: $signerExternalId, fuelTank: $fuelTank, transaction: { transferToken: { recipient: \"cxLf6yvvtscKrHRfKDphnzsT3eoRY45VbJvqXKub5pmj5mdbQ\", collectionId: 36105, tokenId: 1, amount: 1 } }) {\r\n    uuid\r\n    action\r\n    state\r\n  }\r\n}","variables":{"network":"CANARY","chain":"MATRIX","signerExternalId":"docs-example-player","fuelTank":"INSERT_FUEL_TANK_ADDRESS"}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System;
using Enjin.Platform.Sdk;

using var client = new PlatformClient();
client.Auth("<your-platform-token>");

var mutation = new MutationQueryBuilder()
    .WithCreateTransaction(
        new TransactionQueryBuilder().WithUuid().WithState(),
        network: Network.Canary,
        chain: Chain.Matrix,
        transaction: new TransactionInput
        {
            TransferToken = new TransferTokenInput
            {
                Recipient = "cxLf6yvvtscKrHRfKDphnzsT3eoRY45VbJvqXKub5pmj5mdbQ",
                CollectionId = 36105,
                TokenId = 1,
                Amount = 1,
            },
        },
        signerExternalId: "docs-example-player", // the player's managed wallet
        fuelTank: "INSERT_FUEL_TANK_ADDRESS");    // your tank's address

var response = await client.SendMutation(mutation);
Console.WriteLine(response.Result.Data?.CreateTransaction?.Uuid);
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.beta.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      mutation DispatchThroughTank($network: Network!, $chain: Chain!, $signerExternalId: String, $fuelTank: String) {
        CreateTransaction(
          network: $network
          chain: $chain
          signerExternalId: $signerExternalId
          fuelTank: $fuelTank
          transaction: {
            transferToken: {
              recipient: "cxLf6yvvtscKrHRfKDphnzsT3eoRY45VbJvqXKub5pmj5mdbQ"
              collectionId: 36105
              tokenId: 1
              amount: 1
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
      network: "CANARY",
      chain: "MATRIX",
      signerExternalId: "docs-example-player", // the player's managed wallet
      fuelTank: "INSERT_FUEL_TANK_ADDRESS"     // your tank's address
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
    mutation DispatchThroughTank($network: Network!, $chain: Chain!, $signerExternalId: String, $fuelTank: String) {
      CreateTransaction(
        network: $network
        chain: $chain
        signerExternalId: $signerExternalId
        fuelTank: $fuelTank
        transaction: {
          transferToken: {
            recipient: "cxLf6yvvtscKrHRfKDphnzsT3eoRY45VbJvqXKub5pmj5mdbQ"
            collectionId: 36105
            tokenId: 1
            amount: 1
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
    network: "CANARY",
    chain: "MATRIX",
    signerExternalId: "docs-example-player",
    fuelTank: "INSERT_FUEL_TANK_ADDRESS"
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
mutation DispatchThroughTank($network: Network!, $chain: Chain!, $signerExternalId: String, $fuelTank: String) {
  CreateTransaction(
    network: $network
    chain: $chain
    signerExternalId: $signerExternalId
    fuelTank: $fuelTank
    transaction: {
      transferToken: {
        recipient: "cxLf6yvvtscKrHRfKDphnzsT3eoRY45VbJvqXKub5pmj5mdbQ"
        collectionId: 36105
        tokenId: 1
        amount: 1
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
  'network': 'CANARY',
  'chain': 'MATRIX',
  'signerExternalId': 'docs-example-player',
  'fuelTank': 'INSERT_FUEL_TANK_ADDRESS'
}

response = requests.post('https://platform.beta.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Bearer Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

The player's managed wallet signs the action, and the tank covers the fee and any storage deposit. Because the tank's Require Signature rule points at your daemon wallet, the platform attaches the required signature for you — there is nothing extra to sign.

Once the transaction reaches `FINALIZED`, the chain emits the usual events for the action (here, `MultiTokens.Transferred`). See [Working with Events](/05-enjin-platform/03-working-with-events.md).

## Dispatching through a fuel tank {#dispatching}

`fuelTank` is available on both `CreateTransaction` and `CreateBatchTransaction`. Set it to a tank's address and the platform dispatches the transaction through that tank instead of paying the fee from the signing account. The transaction runs exactly as it normally would — the only difference is who pays for it.

A dispatch succeeds only if the signing account is allowed by the tank's rules and the tank can cover the cost; otherwise the transaction fails. If you need help choosing the right tank for a given call, see [Selecting a fuel tank to dispatch with](/04-enjin-blockchain/03-enjin-matrixchain/02-fuel-tank-pallet.md#selecting-a-fuel-tank-to-dispatch-with).

## How fuel tanks work {#how-fuel-tanks-work}

A tank decides what to pay for, and for whom, through two kinds of rules: **dispatch rules**, evaluated on every call, and **account rules**, evaluated when an account is added to the tank. Both are set when you create the tank (see [Create the tank](#create-tank)).

### Dispatch rules and rule sets

A tank can have one or more **rule sets**, each a group of individual dispatch rules. A dispatched call must satisfy a rule set to be paid for. Each rule set has its own ID, so you can grant different callers different access by giving them different rule sets.

When you dispatch through the tank, `fuelTankRuleSetId` chooses which rule set the call is evaluated against. It defaults to `0`, so a tank with a single rule set needs nothing extra; set it to another rule set's ID to dispatch against that one instead.

Available dispatch rules:

- **`Whitelisted Callers`**: Subsidize <GlossaryTerm id="transaction" />s dispatched from specific <GlossaryTerm id="wallet_account" />s.
- **`Whitelisted Collections`**: Subsidize <GlossaryTerm id="transaction" />s involving a specific <GlossaryTerm id="collection" />.
- **`Require Token`**: Subsidize <GlossaryTerm id="transaction" />s only if the caller holds a specific NFT.
- **`Whitelisted Pallets`**: Subsidize <GlossaryTerm id="transaction" />s involving a specific <GlossaryTerm id="pallet" />.
- **`Permitted Extrinsics`**: Subsidize <GlossaryTerm id="transaction" />s involving specific <GlossaryTerm id="extrinsic" />s (for example, marketplace listing calls).
- **`Permitted Calls`**: Subsidize <GlossaryTerm id="transaction" />s involving specific <GlossaryTerm id="extrinsic" />s and parameters.
- **`User Fuel Budget`**: Cap how much fuel each user account can spend in a period.
- **`Tank Fuel Budget`**: Cap the tank's total fuel spend over a period to extend its lifespan.
- **`Max Fuel Burn Per Transaction`**: Cap fuel spent on any single transaction.
- **`Require Signature`**: Subsidize only <GlossaryTerm id="transaction" />s carrying a valid signature from a specific <GlossaryTerm id="wallet_account" />. This is the rule behind the [recommended setup](#recommended-setup) above.

### Require Account

A rule set can also require that the dispatching account already has a user account in the tank before it will pay for a call, by enabling **Require account** on the rule set.

### Account rules

Account rules decide who is allowed to be added to the tank's user accounts. Two are available:

- **`Whitelisted Callers`**: Only listed accounts may be added to the tank's user accounts.
- **`Require Token`**: Only accounts that hold the specified token may be added.

An account is added either ahead of time by the tank owner, or automatically the first time it dispatches — the latter requires user account management to be enabled.

### User account management

By default, only the tank owner can add accounts to the tank's user accounts. Enabling **user account management** lets accounts be added automatically. You also choose whether the tank covers each new user account's <GlossaryTerm id="storage_deposit" />:

- **Tank reserves the deposit** — accounts are added without pre-funding anything. This is what the [recommended setup](#recommended-setup) uses, so players never need ENJ.
- **Tank does not reserve the deposit** — accounts can add themselves, but must cover their own user-account storage deposit.

### Coverage policy

The coverage policy controls what the tank pays for:

- **Fees** — transaction fees only.
- **Fees and Deposit** — transaction fees plus any storage deposit a call requires (for example, listing a token locks a deposit until the listing is filled or cancelled).

## Other configurations {#other-configurations}

The recommended setup above is one combination of rules. By mixing the [dispatch rules](#how-fuel-tanks-work) you can build tanks for many other use cases. Each is created the same way — dispatch `createFuelTank` through `CreateTransaction`, changing only the `ruleSets`/`accountRules`. For the complete rule reference, see the [Fuel Tank pallet](/04-enjin-blockchain/03-enjin-matrixchain/02-fuel-tank-pallet.md) documentation.

### Subsidize token transfers for a collection

Pays fees only for **transfer** calls involving tokens from a single collection — a good fit for a game that wants to cover its players' item transfers and nothing else. It combines the **Permitted Extrinsics** and **Whitelisted Collections** dispatch rules.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateCollectionTransferTank($network: Network!, $chain: Chain!, $name: String!, $collectionId: BigInt!) {
  CreateTransaction(
    network: $network
    chain: $chain
    transaction: {
      createFuelTank: {
        name: $name
        coveragePolicy: FEES
        ruleSets: [
          {
            id: 0
            requireAccount: false
            rules: [
              {
                permittedExtrinsics: [BATCH_TRANSFER] # only subsidize transfers
                whitelistedCollections: [$collectionId] # only for this collection
              }
            ]
          }
        ]
      }
    }
  ) {
    uuid
    action
    state
  }
}
```

Variables:

```json
{
  "network": "CANARY",
  "chain": "MATRIX",
  "name": "Collection Token Transfers",
  "collectionId": 36105
}
```
  </TabItem>
  <TabItem value="curl" label="cURL">
```
curl --location 'https://platform.beta.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer enjin_api_key' \
-d '{"query":"mutation CreateCollectionTransferTank($network: Network!, $chain: Chain!, $name: String!, $collectionId: BigInt!) {\r\n  CreateTransaction(network: $network, chain: $chain, transaction: { createFuelTank: { name: $name, coveragePolicy: FEES, ruleSets: [{ id: 0, requireAccount: false, rules: [{ permittedExtrinsics: [BATCH_TRANSFER], whitelistedCollections: [$collectionId] }] }] } }) {\r\n    uuid\r\n    action\r\n    state\r\n  }\r\n}","variables":{"network":"CANARY","chain":"MATRIX","name":"Collection Token Transfers","collectionId":36105}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System;
using Enjin.Platform.Sdk;

using var client = new PlatformClient();
client.Auth("<your-platform-token>");

var mutation = new MutationQueryBuilder()
    .WithCreateTransaction(
        new TransactionQueryBuilder().WithUuid().WithState(),
        network: Network.Canary,
        chain: Chain.Matrix,
        transaction: new TransactionInput
        {
            CreateFuelTank = new CreateFuelTankInput
            {
                Name = "Collection Token Transfers",
                CoveragePolicy = CoveragePolicy.Fees,
                RuleSets = new[]
                {
                    new RuleSetEntryInput
                    {
                        Id = 0,
                        RequireAccount = false,
                        Rules = new[]
                        {
                            new DispatchRuleInput
                            {
                                PermittedExtrinsics = new[] { FuelTankPermittedMethod.BatchTransfer },
                                WhitelistedCollections = new[] { 36105 },
                            },
                        },
                    },
                },
            },
        });

var response = await client.SendMutation(mutation);
Console.WriteLine(response.Result.Data?.CreateTransaction?.Uuid);
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.beta.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      mutation CreateCollectionTransferTank($network: Network!, $chain: Chain!, $name: String!, $collectionId: BigInt!) {
        CreateTransaction(
          network: $network
          chain: $chain
          transaction: {
            createFuelTank: {
              name: $name
              coveragePolicy: FEES
              ruleSets: [
                { id: 0, requireAccount: false, rules: [{ permittedExtrinsics: [BATCH_TRANSFER], whitelistedCollections: [$collectionId] }] }
              ]
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
      network: "CANARY",
      chain: "MATRIX",
      name: "Collection Token Transfers",
      collectionId: 36105
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
    mutation CreateCollectionTransferTank($network: Network!, $chain: Chain!, $name: String!, $collectionId: BigInt!) {
      CreateTransaction(
        network: $network
        chain: $chain
        transaction: {
          createFuelTank: {
            name: $name
            coveragePolicy: FEES
            ruleSets: [
              { id: 0, requireAccount: false, rules: [{ permittedExtrinsics: [BATCH_TRANSFER], whitelistedCollections: [$collectionId] }] }
            ]
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
    network: "CANARY",
    chain: "MATRIX",
    name: "Collection Token Transfers",
    collectionId: 36105
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
mutation CreateCollectionTransferTank($network: Network!, $chain: Chain!, $name: String!, $collectionId: BigInt!) {
  CreateTransaction(
    network: $network
    chain: $chain
    transaction: {
      createFuelTank: {
        name: $name
        coveragePolicy: FEES
        ruleSets: [
          { id: 0, requireAccount: false, rules: [{ permittedExtrinsics: [BATCH_TRANSFER], whitelistedCollections: [$collectionId] }] }
        ]
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
  'network': 'CANARY',
  'chain': 'MATRIX',
  'name': 'Collection Token Transfers',
  'collectionId': 36105
}

response = requests.post('https://platform.beta.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Bearer Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

### Subsidize any transaction involving a collection's tokens

Broader than the previous example: pays fees for **any** call involving tokens from a given collection (transfers, listings, burns, and so on), using just the **Whitelisted Collections** dispatch rule.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateCollectionTank($network: Network!, $chain: Chain!, $name: String!, $collectionId: BigInt!) {
  CreateTransaction(
    network: $network
    chain: $chain
    transaction: {
      createFuelTank: {
        name: $name
        coveragePolicy: FEES_AND_DEPOSIT
        ruleSets: [
          {
            id: 0
            requireAccount: false
            rules: [{ whitelistedCollections: [$collectionId] }]
          }
        ]
      }
    }
  ) {
    uuid
    action
    state
  }
}
```

Variables:

```json
{
  "network": "CANARY",
  "chain": "MATRIX",
  "name": "Whole Collection",
  "collectionId": 36105
}
```
  </TabItem>
  <TabItem value="curl" label="cURL">
```
curl --location 'https://platform.beta.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer enjin_api_key' \
-d '{"query":"mutation CreateCollectionTank($network: Network!, $chain: Chain!, $name: String!, $collectionId: BigInt!) {\r\n  CreateTransaction(network: $network, chain: $chain, transaction: { createFuelTank: { name: $name, coveragePolicy: FEES_AND_DEPOSIT, ruleSets: [{ id: 0, requireAccount: false, rules: [{ whitelistedCollections: [$collectionId] }] }] } }) {\r\n    uuid\r\n    action\r\n    state\r\n  }\r\n}","variables":{"network":"CANARY","chain":"MATRIX","name":"Whole Collection","collectionId":36105}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System;
using Enjin.Platform.Sdk;

using var client = new PlatformClient();
client.Auth("<your-platform-token>");

var mutation = new MutationQueryBuilder()
    .WithCreateTransaction(
        new TransactionQueryBuilder().WithUuid().WithState(),
        network: Network.Canary,
        chain: Chain.Matrix,
        transaction: new TransactionInput
        {
            CreateFuelTank = new CreateFuelTankInput
            {
                Name = "Whole Collection",
                CoveragePolicy = CoveragePolicy.FeesAndDeposit,
                RuleSets = new[]
                {
                    new RuleSetEntryInput
                    {
                        Id = 0,
                        RequireAccount = false,
                        Rules = new[]
                        {
                            new DispatchRuleInput { WhitelistedCollections = new[] { 36105 } },
                        },
                    },
                },
            },
        });

var response = await client.SendMutation(mutation);
Console.WriteLine(response.Result.Data?.CreateTransaction?.Uuid);
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.beta.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      mutation CreateCollectionTank($network: Network!, $chain: Chain!, $name: String!, $collectionId: BigInt!) {
        CreateTransaction(
          network: $network
          chain: $chain
          transaction: {
            createFuelTank: {
              name: $name
              coveragePolicy: FEES_AND_DEPOSIT
              ruleSets: [
                { id: 0, requireAccount: false, rules: [{ whitelistedCollections: [$collectionId] }] }
              ]
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
      network: "CANARY",
      chain: "MATRIX",
      name: "Whole Collection",
      collectionId: 36105
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
    mutation CreateCollectionTank($network: Network!, $chain: Chain!, $name: String!, $collectionId: BigInt!) {
      CreateTransaction(
        network: $network
        chain: $chain
        transaction: {
          createFuelTank: {
            name: $name
            coveragePolicy: FEES_AND_DEPOSIT
            ruleSets: [
              { id: 0, requireAccount: false, rules: [{ whitelistedCollections: [$collectionId] }] }
            ]
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
    network: "CANARY",
    chain: "MATRIX",
    name: "Whole Collection",
    collectionId: 36105
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
mutation CreateCollectionTank($network: Network!, $chain: Chain!, $name: String!, $collectionId: BigInt!) {
  CreateTransaction(
    network: $network
    chain: $chain
    transaction: {
      createFuelTank: {
        name: $name
        coveragePolicy: FEES_AND_DEPOSIT
        ruleSets: [
          { id: 0, requireAccount: false, rules: [{ whitelistedCollections: [$collectionId] }] }
        ]
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
  'network': 'CANARY',
  'chain': 'MATRIX',
  'name': 'Whole Collection',
  'collectionId': 36105
}

response = requests.post('https://platform.beta.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Bearer Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

### Subsidize all transactions for whitelisted accounts, with a budget

Covers **all** transactions, but only for a fixed list of accounts, and caps how much fuel each account can spend per period. It pairs a **Whitelisted Callers** account rule (who may join the tank) with **Require account** and a **User Fuel Budget** dispatch rule.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateWhitelistedBudgetTank($network: Network!, $chain: Chain!, $name: String!, $account: String!, $budgetAmount: BigInt!, $resetPeriod: Int!) {
  CreateTransaction(
    network: $network
    chain: $chain
    transaction: {
      createFuelTank: {
        name: $name
        coveragePolicy: FEES
        accountRules: { whitelistedCallers: [$account] } # only these accounts may join the tank
        ruleSets: [
          {
            id: 0
            requireAccount: true # caller must be a user account in the tank
            rules: [{ userFuelBudget: { amount: $budgetAmount, resetPeriod: $resetPeriod } }]
          }
        ]
      }
    }
  ) {
    uuid
    action
    state
  }
}
```

Variables:

```json
{
  "network": "CANARY",
  "chain": "MATRIX",
  "name": "Whitelisted Accounts With Budget",
  "account": "cxKy7aqhQTtoJYUjpebxFK2ooKhcvQ2FQj3FePrXhDhd9nLfu",
  "budgetAmount": 5000000000000000000,
  "resetPeriod": 432000
}
```
  </TabItem>
  <TabItem value="curl" label="cURL">
```
curl --location 'https://platform.beta.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer enjin_api_key' \
-d '{"query":"mutation CreateWhitelistedBudgetTank($network: Network!, $chain: Chain!, $name: String!, $account: String!, $budgetAmount: BigInt!, $resetPeriod: Int!) {\r\n  CreateTransaction(network: $network, chain: $chain, transaction: { createFuelTank: { name: $name, coveragePolicy: FEES, accountRules: { whitelistedCallers: [$account] }, ruleSets: [{ id: 0, requireAccount: true, rules: [{ userFuelBudget: { amount: $budgetAmount, resetPeriod: $resetPeriod } }] }] } }) {\r\n    uuid\r\n    action\r\n    state\r\n  }\r\n}","variables":{"network":"CANARY","chain":"MATRIX","name":"Whitelisted Accounts With Budget","account":"cxKy7aqhQTtoJYUjpebxFK2ooKhcvQ2FQj3FePrXhDhd9nLfu","budgetAmount":5000000000000000000,"resetPeriod":432000}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System;
using Enjin.Platform.Sdk;

using var client = new PlatformClient();
client.Auth("<your-platform-token>");

var mutation = new MutationQueryBuilder()
    .WithCreateTransaction(
        new TransactionQueryBuilder().WithUuid().WithState(),
        network: Network.Canary,
        chain: Chain.Matrix,
        transaction: new TransactionInput
        {
            CreateFuelTank = new CreateFuelTankInput
            {
                Name = "Whitelisted Accounts With Budget",
                CoveragePolicy = CoveragePolicy.Fees,
                AccountRules = new AccountRuleInput
                {
                    WhitelistedCallers = new[] { "cxKy7aqhQTtoJYUjpebxFK2ooKhcvQ2FQj3FePrXhDhd9nLfu" },
                },
                RuleSets = new[]
                {
                    new RuleSetEntryInput
                    {
                        Id = 0,
                        RequireAccount = true,
                        Rules = new[]
                        {
                            new DispatchRuleInput
                            {
                                UserFuelBudget = new FuelBudgetRuleInput { Amount = 5000000000000000000, ResetPeriod = 432000 },
                            },
                        },
                    },
                },
            },
        });

var response = await client.SendMutation(mutation);
Console.WriteLine(response.Result.Data?.CreateTransaction?.Uuid);
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.beta.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      mutation CreateWhitelistedBudgetTank($network: Network!, $chain: Chain!, $name: String!, $account: String!, $budgetAmount: BigInt!, $resetPeriod: Int!) {
        CreateTransaction(
          network: $network
          chain: $chain
          transaction: {
            createFuelTank: {
              name: $name
              coveragePolicy: FEES
              accountRules: { whitelistedCallers: [$account] }
              ruleSets: [
                { id: 0, requireAccount: true, rules: [{ userFuelBudget: { amount: $budgetAmount, resetPeriod: $resetPeriod } }] }
              ]
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
      network: "CANARY",
      chain: "MATRIX",
      name: "Whitelisted Accounts With Budget",
      account: "cxKy7aqhQTtoJYUjpebxFK2ooKhcvQ2FQj3FePrXhDhd9nLfu",
      budgetAmount: 5000000000000000000,
      resetPeriod: 432000
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
    mutation CreateWhitelistedBudgetTank($network: Network!, $chain: Chain!, $name: String!, $account: String!, $budgetAmount: BigInt!, $resetPeriod: Int!) {
      CreateTransaction(
        network: $network
        chain: $chain
        transaction: {
          createFuelTank: {
            name: $name
            coveragePolicy: FEES
            accountRules: { whitelistedCallers: [$account] }
            ruleSets: [
              { id: 0, requireAccount: true, rules: [{ userFuelBudget: { amount: $budgetAmount, resetPeriod: $resetPeriod } }] }
            ]
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
    network: "CANARY",
    chain: "MATRIX",
    name: "Whitelisted Accounts With Budget",
    account: "cxKy7aqhQTtoJYUjpebxFK2ooKhcvQ2FQj3FePrXhDhd9nLfu",
    budgetAmount: 5000000000000000000,
    resetPeriod: 432000
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
mutation CreateWhitelistedBudgetTank($network: Network!, $chain: Chain!, $name: String!, $account: String!, $budgetAmount: BigInt!, $resetPeriod: Int!) {
  CreateTransaction(
    network: $network
    chain: $chain
    transaction: {
      createFuelTank: {
        name: $name
        coveragePolicy: FEES
        accountRules: { whitelistedCallers: [$account] }
        ruleSets: [
          { id: 0, requireAccount: true, rules: [{ userFuelBudget: { amount: $budgetAmount, resetPeriod: $resetPeriod } }] }
        ]
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
  'network': 'CANARY',
  'chain': 'MATRIX',
  'name': 'Whitelisted Accounts With Budget',
  'account': 'cxKy7aqhQTtoJYUjpebxFK2ooKhcvQ2FQj3FePrXhDhd9nLfu',
  'budgetAmount': 5000000000000000000,
  'resetPeriod': 432000
}

response = requests.post('https://platform.beta.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Bearer Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>
