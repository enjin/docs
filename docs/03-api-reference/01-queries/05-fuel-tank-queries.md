---
title: "Fuel Tanks"
slug: "fuel-tanks"
description: "Query the Enjin API for fuel tanks data, which helps cover transaction costs for users within the blockchain ecosystem."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Please note: This is an introductory reference
For the most up-to-date information, refer to the [API Reference](/03-api-reference/03-api-reference.md).\
🚧 The information provided in this section cannot be programmatically updated and may be subject to inconsistencies over time.
:::

:::tip Fuel Tanks Endpoints
- **Testnet:** `http://platform.canary.enjin.io/graphql/fuel-tanks`
- **Mainnet:** `http://platform.enjin.io/graphql/fuel-tanks`
:::

This is a detailed reference guide that explains the most commonly used operations.

## GetAccounts

The `GetAccounts` query allows you to retrieve a comprehensive list of account details associated with a specific fuel tank in the Enjin API. Fuel tanks are a feature used to subsidize transaction fees on the Enjin Blockchain. This query provides a detailed overview of all accounts participating in the specified fuel tank.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetAccounts {
  GetAccounts(tankId: "cxNC9WmJa55k3EoXS3Fm4Bc69NaMGuY7qarchqPPn6jcWMA92") {
    totalCount
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
    }
    edges {
      node {
        id
        externalId
        account {
          publicKey
          address
        }
      }
    }
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetFuelTanks": {
      "totalCount": 1,
      "pageInfo": {
        "startCursor": "",
        "endCursor": "",
        "hasPreviousPage": false,
        "hasNextPage": false
      },
      "edges": [
        {
          "node": {
            "name": "lhjb4xu2",
            "providesDeposit": false,
            "tankId": {
              "publicKey": "0xa6b0ba89304439830fa19e0523ad8afa4180bb0960d35a80b7423836dd7b1276",
              "address": "cxNC9WmJa55k3EoXS3Fm4Bc69NaMGuY7qarchqPPn6jcWMA92"
            },
            "owner": {
              "account": {
                "publicKey": "0x087c3fdc6566230578362759d99e42ed300f5560c305262843b2c61aa2f1d11e",
                "address": "cxJciMkfdBqR8C9ftA8qmgzP9bAQNzMzXZmwUDZ2qW5mFVgvm"
              }
            },
            "accounts": [
              {
                "id": 8177,
                "account": {
                  "publicKey": "0x087c3fdc6566230578362759d99e42ed300f5560c305262843b2c61aa2f1d11e",
                  "address": "cxJciMkfdBqR8C9ftA8qmgzP9bAQNzMzXZmwUDZ2qW5mFVgvm"
                },
                "externalId": null
              }
            ],
            "accountRules": [],
            "dispatchRules": []
          }
        }
      ]
    }
  }
}
```
  </TabItem>
</Tabs>

## GetFuelTank

The `GetFuelTank` query allows you to retrieve detailed information about a specific fuel tank within the Enjin API. Fuel tanks are utilized for subsidizing transaction fees on the Enjin Blockchain. This query provides an extensive overview of the fuel tank's configuration, ownership, and associated rules.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetFuelTank {
  GetFuelTank(tankId: "cxNC9WmJa55k3EoXS3Fm4Bc69NaMGuY7qarchqPPn6jcWMA92") {
    name
    providesDeposit
    tankId {
      publicKey
      address
    }
    owner {
      account {
        publicKey
        address
      }
    }
    accounts {
      id
      account {
        publicKey
        address
      }
      externalId
    }
    accountRules {
      rule
      value
    }
    dispatchRules {
      rule
      value
      isFrozen
    }
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetFuelTank": {
      "name": "lhjb4xu2",
      "providesDeposit": false,
      "tankId": {
        "publicKey": "0xa6b0ba89304439830fa19e0523ad8afa4180bb0960d35a80b7423836dd7b1276",
        "address": "cxNC9WmJa55k3EoXS3Fm4Bc69NaMGuY7qarchqPPn6jcWMA92"
      },
      "owner": {
        "account": {
          "publicKey": "0x087c3fdc6566230578362759d99e42ed300f5560c305262843b2c61aa2f1d11e",
          "address": "cxJciMkfdBqR8C9ftA8qmgzP9bAQNzMzXZmwUDZ2qW5mFVgvm"
        }
      },
      "accounts": [
        {
          "id": 8177,
          "account": {
            "publicKey": "0x087c3fdc6566230578362759d99e42ed300f5560c305262843b2c61aa2f1d11e",
            "address": "cxJciMkfdBqR8C9ftA8qmgzP9bAQNzMzXZmwUDZ2qW5mFVgvm"
          },
          "externalId": null
        }
      ],
      "accountRules": [],
      "dispatchRules": []
    }
  }
}
```
  </TabItem>
</Tabs>

## GetFuelTanks

The `GetFuelTanks` query allows you to retrieve detailed information about multiple fuel tanks within the Enjin API simultaneously. This query is particularly useful when you need to obtain an overview or compare details of various fuel tanks within a system.

:::warning This query might return items in multiple pages using Connections
To learn how to use GraphQL cursors for pagination, head to [Using the API → Pagination](/01-getting-started/05-using-enjin-api/01-how-to-use-graphql.md#pagination).
:::

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetFuelTanks{
  GetFuelTanks(tankIds: ["0xa6b0ba89304439830fa19e0523ad8afa4180bb0960d35a80b7423836dd7b1276"]) {
    totalCount
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
    }
    edges {
      node {
        name
        providesDeposit
        tankId {
          publicKey
          address
        }
        owner {
          account {
            publicKey
            address
          }
        }
        accounts {
          id
          account {
            publicKey
            address
          }
          externalId
        }
        accountRules {
          rule
          value
        }
        dispatchRules {
          rule
          value
          isFrozen
        }
      }
    }
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetFuelTanks": {
      "totalCount": 1,
      "pageInfo": {
        "startCursor": "",
        "endCursor": "",
        "hasPreviousPage": false,
        "hasNextPage": false
      },
      "edges": [
        {
          "node": {
            "name": "lhjb4xu2",
            "providesDeposit": false,
            "tankId": {
              "publicKey": "0xa6b0ba89304439830fa19e0523ad8afa4180bb0960d35a80b7423836dd7b1276",
              "address": "cxNC9WmJa55k3EoXS3Fm4Bc69NaMGuY7qarchqPPn6jcWMA92"
            },
            "owner": {
              "account": {
                "publicKey": "0x087c3fdc6566230578362759d99e42ed300f5560c305262843b2c61aa2f1d11e",
                "address": "cxJciMkfdBqR8C9ftA8qmgzP9bAQNzMzXZmwUDZ2qW5mFVgvm"
              }
            },
            "accounts": [
              {
                "id": 8177,
                "account": {
                  "publicKey": "0x087c3fdc6566230578362759d99e42ed300f5560c305262843b2c61aa2f1d11e",
                  "address": "cxJciMkfdBqR8C9ftA8qmgzP9bAQNzMzXZmwUDZ2qW5mFVgvm"
                },
                "externalId": null
              }
            ],
            "accountRules": [],
            "dispatchRules": []
          }
        }
      ]
    }
  }
}
```
  </TabItem>
</Tabs>