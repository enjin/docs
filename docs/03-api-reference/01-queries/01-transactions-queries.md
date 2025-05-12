---
title: "Transactions"
slug: "transactions"
description: "Use the Enjin API to query transaction data, including blockchain transactions history, status, and details."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Please note: This is an introductory reference
For the most up-to-date information, refer to the [API Reference](/03-api-reference/03-api-reference.md).\
🚧 The information provided in this section cannot be programmatically updated and may be subject to inconsistencies over time.
:::

:::tip Core Endpoints
- **Testnet:** `http://platform.canary.enjin.io/graphql`
- **Mainnet:** `http://platform.enjin.io/graphql`
:::

This is an overview of some of the most commonly used operations in the Enjin Platform Schema. 

## GetBlocks

The `GetBlocks` query allows you to retrieve an array of blocks(<GlossaryTerm id="block" />), which can be filtered based on specific block numbers, transaction IDs, or hashes. It is designed to fetch detailed data on a set of blocks, providing valuable insights.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetBlocks {
  GetBlocks(numbers: ["402865"]) {
    totalCount
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
    }
    edges {
      cursor
      node {
        id
        number
        hash
        synced
        failed
        exception
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
    "GetBlocks": {
      "totalCount": 1,
      "pageInfo": {
        "startCursor": "",
        "endCursor": "",
        "hasPreviousPage": false,
        "hasNextPage": false
      },
      "edges": [
        {
          "cursor": "eyJudW1iZXIiOjQwMjg2NSwiX3BvaW50c1RvTmV4dEl0ZW1zIjp0cnVlfQ",
          "node": {
            "id": 51507,
            "number": 402865,
            "hash": "0xf0b3cee1c36a99e24aaef7da06aec2ecd79a599c19ad4ae6fb4b40b3e497a322",
            "synced": true,
            "failed": false,
            "exception": null
          }
        }
      ]
    }
  }
}
```
  </TabItem>
</Tabs>

### Use Case

This query is highly useful for obtaining a snapshot of data at specific points defined by block numbers. It serves various purposes:

- Tracking the progress of block synchronization.
- Identifying any failures in processing.
- Providing a clear audit trail for the blocks processed by the system.
- Efficiently managing and navigating through large sets of data.

By using the `GetBlocks` query, you can systematically access and analyze block data, essential for maintaining the integrity and transparency of on-chain operations.

## GetTransaction

The `GetTransaction` query allows you to retrieve detailed information about a specific transaction. It provides comprehensive details about the transaction, including its state, associated wallet, and related events.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetTransaction {
    GetTransaction(
        id: 11300
    ) {
        id
        idempotencyKey
        transactionId
        transactionHash
        method
        state
        result
        encodedData
        signedAtBlock
        createdAt
        updatedAt
        wallet {
            account {
                publicKey
                address
            }
        }
        events {
            edges {
                cursor
                node {
                    phase
                    lookUp
                    moduleId
                    eventId
                    params {
                        type
                        value
                    }
                }
            }
            totalCount
            pageInfo {
                hasPreviousPage
                hasNextPage
                startCursor
                endCursor
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
    "GetTransaction": {
      "id": 11300,
      "idempotencyKey": "61f0b8e1-e0b9-4ecd-b445-84dc4cd2b495",
      "transactionId": "402811-2",
      "transactionHash": "0xbafe459e8248b802f3aef98d2e4a695bbb238899edf40519b082366e3ff8b98f",
      "method": "BatchMint",
      "state": "FINALIZED",
      "result": "EXTRINSIC_SUCCESS",
      "encodedData": "0x280dc56f04985e66eaff2d50e6635942b20efb5690191c5da56adc3a2720e64b8bf534d05000180400010000c16ff2862300000000000000000001000000000000",
      "signedAtBlock": 402809,
      "createdAt": "2023-06-23T05:20:52+00:00",
      "updatedAt": "2023-06-23T05:21:26+00:00",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      },
      "events": {
        "edges": [
          {
            "cursor": "eyJpZCI6Njk3MTEsIl9wb2ludHNUb05leHRJdGVtcyI6dHJ1ZX0",
            "node": {
              "phase": 2,
              "lookUp": "unknown",
              "moduleId": "Balances",
              "eventId": "Withdraw",
              "params": [
                {
                  "type": "who",
                  "value": "68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160"
                },
                {
                  "type": "amount",
                  "value": "19981763653182275"
                }
              ]
            }
          },
          {
            "cursor": "eyJpZCI6Njk3MTIsIl9wb2ludHNUb05leHRJdGVtcyI6dHJ1ZX0",
            "node": {
              "phase": 2,
              "lookUp": "unknown",
              "moduleId": "Balances",
              "eventId": "Reserved",
              "params": [
                {
                  "type": "who",
                  "value": "68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160"
                },
                {
                  "type": "amount",
                  "value": "10000000000000000"
                }
              ]
            }
          },
          {
            "cursor": "eyJpZCI6Njk3MTMsIl9wb2ludHNUb05leHRJdGVtcyI6dHJ1ZX0",
            "node": {
              "phase": 2,
              "lookUp": "unknown",
              "moduleId": "MultiTokens",
              "eventId": "TokenCreated",
              "params": [
                {
                  "type": "collection_id",
                  "value": "7153"
                },
                {
                  "type": "token_id",
                  "value": "6"
                },
                {
                  "type": "issuer",
                  "value": "68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160"
                },
                {
                  "type": "initial_supply",
                  "value": "1"
                }
              ]
            }
          },
          {
            "cursor": "eyJpZCI6Njk3MTQsIl9wb2ludHNUb05leHRJdGVtcyI6dHJ1ZX0",
            "node": {
              "phase": 2,
              "lookUp": "unknown",
              "moduleId": "MultiTokens",
              "eventId": "TokenAccountCreated",
              "params": [
                {
                  "type": "collection_id",
                  "value": "7153"
                },
                {
                  "type": "token_id",
                  "value": "6"
                },
                {
                  "type": "account",
                  "value": "985e66eaff2d50e6635942b20efb5690191c5da56adc3a2720e64b8bf534d050"
                },
                {
                  "type": "balance",
                  "value": "1"
                }
              ]
            }
          },
          {
            "cursor": "eyJpZCI6Njk3MTUsIl9wb2ludHNUb05leHRJdGVtcyI6dHJ1ZX0",
            "node": {
              "phase": 2,
              "lookUp": "unknown",
              "moduleId": "MultiTokens",
              "eventId": "Minted",
              "params": [
                {
                  "type": "collection_id",
                  "value": "7153"
                },
                {
                  "type": "token_id",
                  "value": "6"
                },
                {
                  "type": "issuer",
                  "value": "68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160"
                },
                {
                  "type": "recipient",
                  "value": "985e66eaff2d50e6635942b20efb5690191c5da56adc3a2720e64b8bf534d050"
                },
                {
                  "type": "amount",
                  "value": "1"
                }
              ]
            }
          },
          {
            "cursor": "eyJpZCI6Njk3MTYsIl9wb2ludHNUb05leHRJdGVtcyI6dHJ1ZX0",
            "node": {
              "phase": 2,
              "lookUp": "unknown",
              "moduleId": "Balances",
              "eventId": "Deposit",
              "params": [
                {
                  "type": "who",
                  "value": "6d6f646c65662f66656469730000000000000000000000000000000000000000"
                },
                {
                  "type": "amount",
                  "value": "19981763653182275"
                }
              ]
            }
          },
          {
            "cursor": "eyJpZCI6Njk3MTcsIl9wb2ludHNUb05leHRJdGVtcyI6dHJ1ZX0",
            "node": {
              "phase": 2,
              "lookUp": "unknown",
              "moduleId": "TransactionPayment",
              "eventId": "TransactionFeePaid",
              "params": [
                {
                  "type": "who",
                  "value": "68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160"
                },
                {
                  "type": "actual_fee",
                  "value": "19981763653182275"
                },
                {
                  "type": "tip",
                  "value": "0"
                }
              ]
            }
          },
          {
            "cursor": "eyJpZCI6Njk3MTgsIl9wb2ludHNUb05leHRJdGVtcyI6dHJ1ZX0",
            "node": {
              "phase": 2,
              "lookUp": "unknown",
              "moduleId": "System",
              "eventId": "ExtrinsicSuccess",
              "params": [
                {
                  "type": "dispatch_info",
                  "value": "{\"weight\":{\"ref_time\":\"848559950\",\"proof_size\":\"10283\"},\"class\":\"Normal\",\"pays_fee\":\"Yes\"}"
                }
              ]
            }
          }
        ],
        "totalCount": 8,
        "pageInfo": {
          "hasPreviousPage": false,
          "hasNextPage": false,
          "startCursor": "",
          "endCursor": ""
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>


### Use Case:

By utilizing the `GetTransaction` query with the specified parameters, you can obtain detailed information about any transaction. This aids in tracking, verifying, and analyzing transactions, making it a valuable tool for development and monitoring.

## GetTransactions

The `GetTransactions` query in allows you to retrieve an array of transactions. You can optionally filter these transactions based on various parameters such as transaction IDs, transaction hashes, methods, states, results, or accounts.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetTransactions {
    GetTransactions(
        ids: [11300]
    ) {
        edges {
            cursor
            node {
                id
                idempotencyKey
                transactionId
                transactionHash
                method
                state
                result
                encodedData
                signedAtBlock
                createdAt
                updatedAt
                wallet {
                    account {
                        publicKey
                        address
                    }
                }
                events {
                    edges {
                        cursor
                        node {
                            phase
                            lookUp
                            moduleId
                            eventId
                            params {
                                type
                                value
                            }
                        }
                    }
                    totalCount
                    pageInfo {
                        hasPreviousPage
                        hasNextPage
                        startCursor
                        endCursor
                    }
                }
            }
        }
        totalCount
        pageInfo {
            startCursor
            endCursor
            hasPreviousPage
            hasNextPage
        }
    }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetTransactions": {
      "edges": [
        {
          "cursor": "eyJpZCI6MTEzMDAsIl9wb2ludHNUb05leHRJdGVtcyI6dHJ1ZX0",
          "node": {
            "id": 11300,
            "idempotencyKey": "61f0b8e1-e0b9-4ecd-b445-84dc4cd2b495",
            "transactionId": "402811-2",
            "transactionHash": "0xbafe459e8248b802f3aef98d2e4a695bbb238899edf40519b082366e3ff8b98f",
            "method": "BatchMint",
            "state": "FINALIZED",
            "result": "EXTRINSIC_SUCCESS",
            "encodedData": "0x280dc56f04985e66eaff2d50e6635942b20efb5690191c5da56adc3a2720e64b8bf534d05000180400010000c16ff2862300000000000000000001000000000000",
            "signedAtBlock": 402809,
            "createdAt": "2023-06-23T05:20:52+00:00",
            "updatedAt": "2023-06-23T05:21:26+00:00",
            "wallet": {
              "account": {
                "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
                "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
              }
            },
            "events": {
              "edges": [
                {
                  "cursor": "eyJpZCI6Njk3MTEsIl9wb2ludHNUb05leHRJdGVtcyI6dHJ1ZX0",
                  "node": {
                    "phase": 2,
                    "lookUp": "unknown",
                    "moduleId": "Balances",
                    "eventId": "Withdraw",
                    "params": [
                      {
                        "type": "who",
                        "value": "68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160"
                      },
                      {
                        "type": "amount",
                        "value": "19981763653182275"
                      }
                    ]
                  }
                },
                {
                  "cursor": "eyJpZCI6Njk3MTIsIl9wb2ludHNUb05leHRJdGVtcyI6dHJ1ZX0",
                  "node": {
                    "phase": 2,
                    "lookUp": "unknown",
                    "moduleId": "Balances",
                    "eventId": "Reserved",
                    "params": [
                      {
                        "type": "who",
                        "value": "68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160"
                      },
                      {
                        "type": "amount",
                        "value": "10000000000000000"
                      }
                    ]
                  }
                },
                {
                  "cursor": "eyJpZCI6Njk3MTMsIl9wb2ludHNUb05leHRJdGVtcyI6dHJ1ZX0",
                  "node": {
                    "phase": 2,
                    "lookUp": "unknown",
                    "moduleId": "MultiTokens",
                    "eventId": "TokenCreated",
                    "params": [
                      {
                        "type": "collection_id",
                        "value": "7153"
                      },
                      {
                        "type": "token_id",
                        "value": "6"
                      },
                      {
                        "type": "issuer",
                        "value": "68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160"
                      },
                      {
                        "type": "initial_supply",
                        "value": "1"
                      }
                    ]
                  }
                },
                {
                  "cursor": "eyJpZCI6Njk3MTQsIl9wb2ludHNUb05leHRJdGVtcyI6dHJ1ZX0",
                  "node": {
                    "phase": 2,
                    "lookUp": "unknown",
                    "moduleId": "MultiTokens",
                    "eventId": "TokenAccountCreated",
                    "params": [
                      {
                        "type": "collection_id",
                        "value": "7153"
                      },
                      {
                        "type": "token_id",
                        "value": "6"
                      },
                      {
                        "type": "account",
                        "value": "985e66eaff2d50e6635942b20efb5690191c5da56adc3a2720e64b8bf534d050"
                      },
                      {
                        "type": "balance",
                        "value": "1"
                      }
                    ]
                  }
                },
                {
                  "cursor": "eyJpZCI6Njk3MTUsIl9wb2ludHNUb05leHRJdGVtcyI6dHJ1ZX0",
                  "node": {
                    "phase": 2,
                    "lookUp": "unknown",
                    "moduleId": "MultiTokens",
                    "eventId": "Minted",
                    "params": [
                      {
                        "type": "collection_id",
                        "value": "7153"
                      },
                      {
                        "type": "token_id",
                        "value": "6"
                      },
                      {
                        "type": "issuer",
                        "value": "68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160"
                      },
                      {
                        "type": "recipient",
                        "value": "985e66eaff2d50e6635942b20efb5690191c5da56adc3a2720e64b8bf534d050"
                      },
                      {
                        "type": "amount",
                        "value": "1"
                      }
                    ]
                  }
                },
                {
                  "cursor": "eyJpZCI6Njk3MTYsIl9wb2ludHNUb05leHRJdGVtcyI6dHJ1ZX0",
                  "node": {
                    "phase": 2,
                    "lookUp": "unknown",
                    "moduleId": "Balances",
                    "eventId": "Deposit",
                    "params": [
                      {
                        "type": "who",
                        "value": "6d6f646c65662f66656469730000000000000000000000000000000000000000"
                      },
                      {
                        "type": "amount",
                        "value": "19981763653182275"
                      }
                    ]
                  }
                },
                {
                  "cursor": "eyJpZCI6Njk3MTcsIl9wb2ludHNUb05leHRJdGVtcyI6dHJ1ZX0",
                  "node": {
                    "phase": 2,
                    "lookUp": "unknown",
                    "moduleId": "TransactionPayment",
                    "eventId": "TransactionFeePaid",
                    "params": [
                      {
                        "type": "who",
                        "value": "68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160"
                      },
                      {
                        "type": "actual_fee",
                        "value": "19981763653182275"
                      },
                      {
                        "type": "tip",
                        "value": "0"
                      }
                    ]
                  }
                },
                {
                  "cursor": "eyJpZCI6Njk3MTgsIl9wb2ludHNUb05leHRJdGVtcyI6dHJ1ZX0",
                  "node": {
                    "phase": 2,
                    "lookUp": "unknown",
                    "moduleId": "System",
                    "eventId": "ExtrinsicSuccess",
                    "params": [
                      {
                        "type": "dispatch_info",
                        "value": "{\"weight\":{\"ref_time\":\"848559950\",\"proof_size\":\"10283\"},\"class\":\"Normal\",\"pays_fee\":\"Yes\"}"
                      }
                    ]
                  }
                }
              ],
              "totalCount": 8,
              "pageInfo": {
                "hasPreviousPage": false,
                "hasNextPage": false,
                "startCursor": "",
                "endCursor": ""
              }
            }
          }
        }
      ],
      "totalCount": 1,
      "pageInfo": {
        "startCursor": "",
        "endCursor": "",
        "hasPreviousPage": false,
        "hasNextPage": false
      }
    }
  }
}
```
  </TabItem>
</Tabs>


### Use Case:

By using the `GetTransactions` query with the specified parameters, you can retrieve and filter transactions based on your application's requirements. This query is valuable for applications that need to display transaction histories to users, perform transaction analysis, or maintain transaction records. The flexibility to filter transactions by various criteria makes it a versatile tool for querying and managing transactions.

## GetPendingEvents

The `GetPendingEvents` query is designed to retrieve a list of events that have been broadcast by the system but not yet acknowledged by the client. This is useful for ensuring that no events are missed or unprocessed, particularly in systems that rely on event-driven architectures or asynchronous processing. 

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetPendingEvents{
  GetPendingEvents(
    acknowledgeEvents: false
  ) {
    totalCount
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
    edges {
      cursor
      node {
        id
        uuid
        name
        sent
        channels
        data
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
    "GetPendingEvents": {
      "totalCount": 95151,
      "pageInfo": {
        "startCursor": "",
        "endCursor": "eyJpZCI6NjA3LCJfcG9pbnRzVG9OZXh0SXRlbXMiOnRydWV9",
        "hasNextPage": true,
        "hasPreviousPage": false
      },
      "edges": [
        {
          "cursor": "eyJpZCI6NTkzLCJfcG9pbnRzVG9OZXh0SXRlbXMiOnRydWV9",
          "node": {
            "id": 593,
            "uuid": "b7678fd9-8447-453b-8821-172d6b84397b",
            "name": "platform:beam-claims-complete",
            "sent": "2023-05-28 15:08:07",
            "channels": [
              "collection;101729",
              "platform",
              "beam;platform"
            ],
            "data": {
              "id": 11,
              "beam": {
                "id": 2,
                "end": "2028-11-14 00:00:00",
                "code": "aa9c8deb3549e635ef2fc40a7285596a",
                "name": "373",
                "image": "https://en.wikipedia.org/wiki/Firefox#/media/File:Firefox_logo,_2019.svg",
                "start": "2022-11-14 00:00:00",
                "flags_mask": 0,
                "description": "This is the most awesome Beam ever.",
                "collection_chain_id": "101729"
              },
              "type": "MINT_ON_DEMAND",
              "state": "COMPLETED",
              "quantity": 10,
              "attributes": [],
              "claimed_at": "2023-05-28 15:07:37",
              "ip_address": "172.69.58.64",
              "token_chain_id": "1283",
              "wallet_public_key": "0x83800dc53431f36f0aaaad573eded3394c2c976d28d528111f82968f0a601bc2"
            }
          }
        },
        {
          "cursor": "eyJpZCI6NTk0LCJfcG9pbnRzVG9OZXh0SXRlbXMiOnRydWV9",
          "node": {
            "id": 594,
            "uuid": "50859a2b-574e-4d0d-8577-e8e53f9eee1d",
            "name": "platform:transaction-created",
            "sent": "2023-05-28 15:08:10",
            "channels": [
              "rf67pPeLYBJRfrehJzzAPVypSCUpPYE62v1gT3f6isBC2EXYe"
            ],
            "data": {
              "id": 98,
              "state": "PENDING",
              "method": "CreateCollection",
              "idempotencyKey": "575992c4-911a-4d59-8ccf-7958d46e605b"
            }
          }
        },
        {
          "cursor": "eyJpZCI6NTk1LCJfcG9pbnRzVG9OZXh0SXRlbXMiOnRydWV9",
          "node": {
            "id": 595,
            "uuid": "63c4c28d-463c-4455-bb9b-43ccbf89b53a",
            "name": "platform:transaction-created",
            "sent": "2023-05-28 15:08:10",
            "channels": [
              "rf67pPeLYBJRfrehJzzAPVypSCUpPYE62v1gT3f6isBC2EXYe"
            ],
            "data": {
              "id": 99,
              "state": "PENDING",
              "method": "BatchSetAttribute",
              "idempotencyKey": "0134b2af-b92d-4999-8900-3f8124172247"
            }
          }
        },
        {
          "cursor": "eyJpZCI6NTk2LCJfcG9pbnRzVG9OZXh0SXRlbXMiOnRydWV9",
          "node": {
            "id": 596,
            "uuid": "fe37740b-cb5b-4605-940a-d2b6927ca2d6",
            "name": "platform:beam-claim-pending",
            "sent": "2023-05-28 15:08:13",
            "channels": [
              "collection;101729",
              "platform",
              "beam;platform"
            ],
            "data": {
              "beam": {
                "id": 2,
                "end": "2028-11-14 00:00:00",
                "code": "aa9c8deb3549e635ef2fc40a7285596a",
                "name": "373",
                "image": "https://en.wikipedia.org/wiki/Firefox#/media/File:Firefox_logo,_2019.svg",
                "start": "2022-11-14 00:00:00",
                "flags_mask": 0,
                "description": "This is the most awesome Beam ever.",
                "collection_chain_id": "101729"
              },
              "state": "PENDING",
              "extras": [],
              "beam_id": 2,
              "claimed_at": "2023-05-28T15:08:13.679083Z",
              "ip_address": "172.70.126.55",
              "idempotency_key": "0b193cff-8c97-4a72-881b-1adb4432da1d",
              "wallet_public_key": "0x66f522f1e17f25b3942916dcc60d92f0f8bc27d40083fadf5d65e9dd5f646009"
            }
          }
        },
        {
          "cursor": "eyJpZCI6NTk3LCJfcG9pbnRzVG9OZXh0SXRlbXMiOnRydWV9",
          "node": {
            "id": 597,
            "uuid": "b3923e2b-3f46-4166-951d-d074c05255a1",
            "name": "platform:transaction-updated",
            "sent": "2023-05-28 15:08:16",
            "channels": [
              "rf67pPeLYBJRfrehJzzAPVypSCUpPYE62v1gT3f6isBC2EXYe"
            ],
            "data": {
              "id": 99,
              "state": "PROCESSING",
              "method": "BatchSetAttribute",
              "result": null,
              "transactionId": null,
              "idempotencyKey": "0134b2af-b92d-4999-8900-3f8124172247",
              "transactionHash": null
            }
          }
        },
        {
          "cursor": "eyJpZCI6NTk4LCJfcG9pbnRzVG9OZXh0SXRlbXMiOnRydWV9",
          "node": {
            "id": 598,
            "uuid": "9f4911be-3b0e-4604-8248-01db2f6c9255",
            "name": "platform:transaction-updated",
            "sent": "2023-05-28 15:08:16",
            "channels": [
              "rf67pPeLYBJRfrehJzzAPVypSCUpPYE62v1gT3f6isBC2EXYe"
            ],
            "data": {
              "id": 98,
              "state": "PROCESSING",
              "method": "CreateCollection",
              "result": null,
              "transactionId": null,
              "idempotencyKey": "575992c4-911a-4d59-8ccf-7958d46e605b",
              "transactionHash": null
            }
          }
        },
        {
          "cursor": "eyJpZCI6NTk5LCJfcG9pbnRzVG9OZXh0SXRlbXMiOnRydWV9",
          "node": {
            "id": 599,
            "uuid": "b6cfd3bc-5850-415b-9db6-06f7ebea6f50",
            "name": "platform:transaction-created",
            "sent": "2023-05-28 15:08:16",
            "channels": [
              "rf67pPeLYBJRfrehJzzAPVypSCUpPYE62v1gT3f6isBC2EXYe"
            ],
            "data": {
              "id": 100,
              "state": "PENDING",
              "method": "BatchMint",
              "idempotencyKey": "b09251c5-7911-4d0c-ac02-89ab049aa713"
            }
          }
        },
        {
          "cursor": "eyJpZCI6NjAwLCJfcG9pbnRzVG9OZXh0SXRlbXMiOnRydWV9",
          "node": {
            "id": 600,
            "uuid": "2de8a2b2-10e7-4769-a432-53c6258e8721",
            "name": "platform:beam-claim-in-progress",
            "sent": "2023-05-28 15:08:16",
            "channels": [
              "collection;101729",
              "platform",
              "beam;platform"
            ],
            "data": {
              "id": 20,
              "beam": {
                "id": 2,
                "end": "2028-11-14 00:00:00",
                "code": "aa9c8deb3549e635ef2fc40a7285596a",
                "name": "373",
                "image": "https://en.wikipedia.org/wiki/Firefox#/media/File:Firefox_logo,_2019.svg",
                "start": "2022-11-14 00:00:00",
                "flags_mask": 0,
                "description": "This is the most awesome Beam ever.",
                "collection_chain_id": "101729"
              },
              "quantity": 10,
              "attributes": [],
              "collection": {
                "id": 98684,
                "owner": {
                  "id": 2,
                  "address": "rf67pPeLYBJRfrehJzzAPVypSCUpPYE62v1gT3f6isBC2EXYe",
                  "managed": 0,
                  "network": "developer",
                  "created_at": "2023-05-28T14:47:39.000000Z",
                  "public_key": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
                  "updated_at": "2023-05-28T14:47:39.000000Z",
                  "external_id": null,
                  "verification_id": null
                },
                "network": "developer",
                "is_frozen": 0,
                "created_at": "2023-05-28T15:06:30.000000Z",
                "updated_at": "2023-05-28T15:06:30.000000Z",
                "token_count": "0",
                "total_deposit": "25000000000000000000",
                "attribute_count": "0",
                "max_token_count": "100",
                "owner_wallet_id": 2,
                "max_token_supply": "100",
                "force_single_mint": 0,
                "royalty_wallet_id": null,
                "royalty_percentage": null,
                "collection_chain_id": "101729"
              },
              "token_chain_id": "1283",
              "wallet_public_key": "0x66f522f1e17f25b3942916dcc60d92f0f8bc27d40083fadf5d65e9dd5f646009"
            }
          }
        },
        {
          "cursor": "eyJpZCI6NjAxLCJfcG9pbnRzVG9OZXh0SXRlbXMiOnRydWV9",
          "node": {
            "id": 601,
            "uuid": "50d2f458-0565-41c7-94d3-c011f7528c9e",
            "name": "platform:transaction-updated",
            "sent": "2023-05-28 15:08:16",
            "channels": [
              "rf67pPeLYBJRfrehJzzAPVypSCUpPYE62v1gT3f6isBC2EXYe"
            ],
            "data": {
              "id": 99,
              "state": "BROADCAST",
              "method": "BatchSetAttribute",
              "result": null,
              "transactionId": null,
              "idempotencyKey": "0134b2af-b92d-4999-8900-3f8124172247",
              "transactionHash": "0xd4e253623bc8170eef9cbe4537c08e063bd421ebb18b9943b9db7b75c5a0c03e"
            }
          }
        },
        {
          "cursor": "eyJpZCI6NjAyLCJfcG9pbnRzVG9OZXh0SXRlbXMiOnRydWV9",
          "node": {
            "id": 602,
            "uuid": "10b155ce-e514-4db8-9702-d1df475903a9",
            "name": "platform:transaction-updated",
            "sent": "2023-05-28 15:08:16",
            "channels": [
              "rf67pPeLYBJRfrehJzzAPVypSCUpPYE62v1gT3f6isBC2EXYe"
            ],
            "data": {
              "id": 98,
              "state": "BROADCAST",
              "method": "CreateCollection",
              "result": null,
              "transactionId": null,
              "idempotencyKey": "575992c4-911a-4d59-8ccf-7958d46e605b",
              "transactionHash": "0xafecedea403e28722fb454b9be9bca5c55a9d0d7a62c30d80f2e2e64f78c4436"
            }
          }
        },
        {
          "cursor": "eyJpZCI6NjAzLCJfcG9pbnRzVG9OZXh0SXRlbXMiOnRydWV9",
          "node": {
            "id": 603,
            "uuid": "a6f22ab2-fd62-45a0-9c24-99b5c814f6b1",
            "name": "platform:token-burned",
            "sent": "2023-05-28 15:08:19",
            "channels": [
              "collection;101728",
              "rf67pPeLYBJRfrehJzzAPVypSCUpPYE62v1gT3f6isBC2EXYe",
              "token;70468841277235617716769448539773927607",
              "68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
              "platform"
            ],
            "data": {
              "amount": "1",
              "wallet": "68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
              "tokenId": "70468841277235617716769448539773927607",
              "collectionId": "101728",
              "idempotencyKey": "4259ee51-f38e-4e57-907d-3da671340917"
            }
          }
        },
        {
          "cursor": "eyJpZCI6NjA0LCJfcG9pbnRzVG9OZXh0SXRlbXMiOnRydWV9",
          "node": {
            "id": 604,
            "uuid": "c7703b9d-08cd-4350-b342-2c263975cde0",
            "name": "platform:collection-created",
            "sent": "2023-05-28 15:08:19",
            "channels": [
              "rf67pPeLYBJRfrehJzzAPVypSCUpPYE62v1gT3f6isBC2EXYe",
              "platform"
            ],
            "data": {
              "owner": "rf67pPeLYBJRfrehJzzAPVypSCUpPYE62v1gT3f6isBC2EXYe",
              "collectionId": "101732",
              "idempotencyKey": "7c909267-1ff3-45c8-9651-b87a1697042a"
            }
          }
        },
        {
          "cursor": "eyJpZCI6NjA1LCJfcG9pbnRzVG9OZXh0SXRlbXMiOnRydWV9",
          "node": {
            "id": 605,
            "uuid": "2b8ac300-d970-4a56-8db5-e979d0827f47",
            "name": "platform:collection-created",
            "sent": "2023-05-28 15:08:19",
            "channels": [
              "rf67pPeLYBJRfrehJzzAPVypSCUpPYE62v1gT3f6isBC2EXYe",
              "platform"
            ],
            "data": {
              "owner": "rf67pPeLYBJRfrehJzzAPVypSCUpPYE62v1gT3f6isBC2EXYe",
              "collectionId": "101733",
              "idempotencyKey": "492af562-c4e9-418d-9707-5ce4a24680e1"
            }
          }
        },
        {
          "cursor": "eyJpZCI6NjA2LCJfcG9pbnRzVG9OZXh0SXRlbXMiOnRydWV9",
          "node": {
            "id": 606,
            "uuid": "cfeca74d-b0cf-42d9-bb5a-b8bf553b3127",
            "name": "platform:transaction-updated",
            "sent": "2023-05-28 15:08:19",
            "channels": [
              "rf67pPeLYBJRfrehJzzAPVypSCUpPYE62v1gT3f6isBC2EXYe"
            ],
            "data": {
              "id": 97,
              "state": "FINALIZED",
              "method": "Burn",
              "result": "EXTRINSIC_SUCCESS",
              "transactionId": "865545-2",
              "idempotencyKey": "4259ee51-f38e-4e57-907d-3da671340917",
              "transactionHash": "0xd6f47b7c9ef3479b788ecaf76a203ebbefdb96f74fce3cac75ad84b0fc49f191"
            }
          }
        },
        {
          "cursor": "eyJpZCI6NjA3LCJfcG9pbnRzVG9OZXh0SXRlbXMiOnRydWV9",
          "node": {
            "id": 607,
            "uuid": "98a3449f-ccba-4f73-9a33-d4d9d55f979f",
            "name": "platform:transaction-updated",
            "sent": "2023-05-28 15:08:19",
            "channels": [
              "rf67pPeLYBJRfrehJzzAPVypSCUpPYE62v1gT3f6isBC2EXYe"
            ],
            "data": {
              "id": 95,
              "state": "FINALIZED",
              "method": "CreateCollection",
              "result": "EXTRINSIC_SUCCESS",
              "transactionId": "865545-3",
              "idempotencyKey": "7c909267-1ff3-45c8-9651-b87a1697042a",
              "transactionHash": "0x6b1cdfaafcc5b343c02ce4593d56e0ad3bf2ffc814baac5e699a43e73c147a21"
            }
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

You can use the `GetPendingEvents` query to ensure that all events are accounted for and processed in your system, even in the presence of network issues or disruptions. This query is crucial for:

- Reconciling transaction records.
- Updating user interfaces in real-time.
- Triggering downstream processes that depend on event data.

Developers and system administrators can use this query to monitor and handle event-driven systems effectively, maintaining their reliability and consistency. To acknowledge the outputted events (and therefore remove them from pending events), set the `acknowledgeEvents` parameter to `true` (default is false).  
To filter outputted pending events on specific channels, use the `channelFilters` parameter

```graphql
query geFilteredtPendingEvents {
  GetPendingEvents(
    channelFilters:[
    {type:OR filter:"cxKy7aqhQTtoJYUjpebxFK2ooKhcvQ2FQj3FePrXhDhd9nLfu"}
    {type:OR filter:"cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"}
  ]){
    edges {
      node {
        id
        uuid
        data
        channels
			}
		}
  }
}
```

This example will output pending events broadcasted in either `cxKy7aqhQTtoJYUjpebxFK2ooKhcvQ2FQj3FePrXhDhd9nLfu` and `cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f` channels.  
Using the `Type` argument, you, can construct advanced filters like `'channel_1' AND ('channel_2' OR 'channel_3')`  
Note, The default type is "**AND**".
