---
title: "Fuel Tanks"
slug: "fuel-tanks"
description: "Query the Enjin API for fuel tanks data, which helps cover transaction costs for users within the blockchain ecosystem."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Please note: This is an introductory reference
For the most up-to-date information, refer to the [API Reference](/01-getting-started/05-using-enjin-api/02-api-reference.md).\
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

### Use Case:

- **Account Overview**: You can utilize the `GetAccounts` query to obtain a comprehensive overview of all accounts participating in a specific fuel tank. This information is valuable for monitoring usage patterns, conducting transaction audits, and efficiently managing the fuel tank.
- **Administrative Tasks**: As an administrator, you can use this query to gain insights into the accounts within the fuel tank, facilitating effective account management and maintenance.
- **Transaction Analysis**: The query provides essential data for analyzing transactions associated with the fuel tank's accounts, ensuring transparency and accountability in transaction fee subsidization.

To make use of this query, provide the `tankId` of the desired fuel tank for which you want to retrieve account details. The response will include a structured list of participating accounts, allowing you to work with the data as needed.

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

### Use Case:

- **Fuel Tank Management**: The `GetFuelTank` query is essential for managing and overseeing the configuration of a specific fuel tank. It provides detailed insights into the tank's name, ownership, deposit policies, associated accounts, and rule sets.
- **Strategic Decision-Making**: Users, especially administrators, can use this query to make strategic decisions about how the fuel tank operates. It helps in assessing security, compliance, and overall functionality.
- **Comprehensive Overview**: Unlike the `GetAccounts` query, which primarily focuses on the accounts within the fuel tank, `GetFuelTank` offers a broader and more configuration-centric overview of the entire fuel tank setup. It is valuable for understanding not only who is participating but also how the tank is configured and managed.

To utilize this query, provide the `tankId` of the desired fuel tank for which you want to retrieve detailed information. The response will provide a comprehensive snapshot of the specified fuel tank's configuration and operation, aiding in effective management and decision-making.

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

### Use Case:

- **Fuel Tank Management**: The `GetFuelTanks` query is valuable for managing and overseeing multiple fuel tanks within a system. It allows you to retrieve comprehensive data for multiple tanks in a single request, providing an efficient way to monitor and compare their configurations, rules, and ownership.
- **Comparison and Analysis**: Users, especially administrators, can use this query to compare configurations and rules across different fuel tanks, making it easier to assess similarities and differences. It is particularly useful for analyzing and auditing multiple fuel tanks in bulk.

To utilize this query, provide an array of `tankIds` representing the fuel tanks for which you want to retrieve detailed information. The response will provide a comprehensive snapshot of each specified fuel tank's configuration and operation, allowing you to efficiently manage and analyze multiple tanks in your system.
