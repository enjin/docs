---
title: "Beam"
slug: "beam-1"
excerpt: "Operations to help you create and manage QR Drops."
hidden: false
createdAt: "Wed Nov 08 2023 02:48:11 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Nov 20 2023 22:14:03 GMT+0000 (Coordinated Universal Time)"
---
> 📘 Please note: This is an introductory reference
> 
> For the most up-to-date information, refer to the [GraphQL Playground](https://platform.canary.enjin.io/graphiql) and [Apollo API Reference](https://studio.apollographql.com/public/EnjinPlatform/variant/core/home).
> 
> 🚧 The information provided in this section cannot be programmatically updated and may be subject to inconsistencies over time.

> 👍 Beam Endpoints
> 
> - **Testnet:** `http://platform.canary.enjin.io/graphql/beam`
> - **Mainnet:** `http://platform.enjin.io/graphql/beam`

This is a detailed reference guide that explains the most commonly used operations. 

# Queries

## GetBeam

The `GetBeam` query retrieves detailed information about a specific <<glossary:Enjin Beam>>. A Beam is a feature provided by Enjin that allows users to claim blockchain assets via QR codes. This query is essential for applications that need to access and display information about a particular Beam or track its usage.

```graphql
query GetBeam {
  GetBeam(code: "0dd3694f2c4599179f08686539cd73dc") {
    id
    code
    name
    description
    image
    start
    end
    isClaimable
    claimsRemaining    
    qr {
      url
      payload
    }
    message {
      walletPublicKey
      message
    }
    collection {
      collectionId
      maxTokenCount
      maxTokenSupply
      forceSingleMint
      frozen
      network
    }    
  }
}

```
```json Response
{
  "data": {
    "GetBeam": {
      "id": 1,
      "code": "0dd3694f2c4599179f08686539cd73dc",
      "name": "236",
      "description": "This is the most awesome Beam ever.",
      "image": "https://en.wikipedia.org/wiki/Firefox#/media/File:Firefox_logo,_2019.svg",
      "start": "2022-11-14T00:00:00+00:00",
      "end": "2028-11-14T00:00:00+00:00",
      "isClaimable": true,
      "claimsRemaining": 10,
      "qr": {
        "url": "https://platform.enjin.io/claim/0dd3694f2c4599179f08686539cd73dc",
        "payload": "https://platform.enjin.io/claim/0dd3694f2c4599179f08686539cd73dc"
      },
      "message": null,
      "collection": null
    }
  }
}
```

### Use Case:

Here's how you can use the `GetBeam` query in your application:

- **Display Beam Information**: You can retrieve and display detailed information about a specific Beam to your users or audience. This can be especially useful during promotional campaigns or when presenting users with opportunities to claim assets.

- **Check Claim Availability**: Before attempting to claim a Beam, you can use this query to check whether the Beam is currently claimable (`isClaimable`) and how many claims remain available (`claimsRemaining`). This helps you manage user expectations and ensure they can claim the asset.

- **QR Code Generation**: If your application involves generating QR codes for Beam claims, you can extract the QR code URL and payload from the response to facilitate the QR code creation process.

- **Embed Beam Details**: You can embed Beam details into your application or website, making it convenient for users to learn about and interact with Beams as part of your blockchain asset distribution strategy.

- **Real-time Monitoring**: You can use this query to monitor the real-time usage of a Beam, allowing you to gather analytics and track the effectiveness of your promotional campaigns and asset distribution efforts.

Overall, the `GetBeam` query is a valuable tool for managing and presenting information about Beams within your blockchain-based application, enabling a seamless and informative experience for your users.

## GetBeams

The `GetBeams` query is used to retrieve an array of beam details, optionally filtered by codes or names. This query is particularly useful for applications that need to fetch information about multiple Beams at once, making it easier to manage and display Beam data.

```graphql
query GetBeams {
  GetBeams(codes: ["0dd3694f2c4599179f08686539cd73dc"]) {
    totalCount
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        code
        name
        description
        image
        start
        end
        isClaimable
        qr {
          url
          payload
        }
        collection {
          collectionId
          maxTokenCount
          maxTokenSupply
          forceSingleMint
          frozen
          network
        }
        claims {
          totalCount
          pageInfo {
            hasPreviousPage
            hasNextPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              claimedAt
              claimStatus
              quantity
              code
              wallet {
                account {
                  publicKey
                  address
                }
              }
              collection {
                collectionId
                maxTokenCount
                maxTokenSupply
                forceSingleMint
                frozen
                network
              }
            }
          }
        }
      }
    }
  }
}
```
```json Response
{
  "data": {
    "GetBeams": {
      "totalCount": 1,
      "pageInfo": {
        "hasPreviousPage": false,
        "hasNextPage": false,
        "startCursor": "",
        "endCursor": ""
      },
      "edges": [
        {
          "node": {
            "id": 1,
            "code": "0dd3694f2c4599179f08686539cd73dc",
            "name": "236",
            "description": "This is the most awesome Beam ever.",
            "image": "https://en.wikipedia.org/wiki/Firefox#/media/File:Firefox_logo,_2019.svg",
            "start": "2022-11-14T00:00:00+00:00",
            "end": "2028-11-14T00:00:00+00:00",
            "isClaimable": true,
            "qr": {
              "url": "https://platform.enjin.io/claim/0dd3694f2c4599179f08686539cd73dc",
              "payload": "https://platform.enjin.io/claim/0dd3694f2c4599179f08686539cd73dc"
            },
            "collection": null,
            "claims": {
              "totalCount": 10,
              "pageInfo": {
                "hasPreviousPage": false,
                "hasNextPage": false,
                "startCursor": "",
                "endCursor": ""
              },
              "edges": [
                {
                  "node": {
                    "id": 1,
                    "claimedAt": null,
                    "claimStatus": null,
                    "quantity": 10,
                    "code": "eyJpdiI6IllGcEg0L0lRL0x5c1BQeWIyVXdCL0E9PSIsInZhbHVlIjoiVmhtcTRqcUhoeFBPTGQ2QTNWOTQ5aWhOR3poVlJrOFo0QTVHeUpVSUZWcTFwaGR1YW1KMmN5YWJLZ2xKbW1WSSIsIm1hYyI6ImRiMGIyMTAyNjEwOTNkNWUwNTUxZWVkMDhlZGEyZjQ2YmQwMGY5MzhhYjA5ZjBmZmE4MDk4NmNiYTkzM2FiNWQiLCJ0YWciOiIifQ==",
                    "wallet": null,
                    "collection": null
                  }
                },
                {
                  "node": {
                    "id": 2,
                    "claimedAt": null,
                    "claimStatus": null,
                    "quantity": 10,
                    "code": "eyJpdiI6ImllVllKclNObjk4QXdtZnRjVitLWmc9PSIsInZhbHVlIjoiQlozZzVQSHZWOTZibWxGSkkzcWxBMVNiMkFaZGcxcERGNitBOE1sMFVwZFJsdkE5OXBMVlNlRVZxOGN4eGZaRyIsIm1hYyI6IjI1NzQ5ZjRkOGMzMzBjMWRkNjY1YWZhYjllYjliYmE0OThmYmQ1MGFiMjhhYjhiNTA0ZDlkYWM2OTU5YzJmN2YiLCJ0YWciOiIifQ==",
                    "wallet": null,
                    "collection": null
                  }
                },
                {
                  "node": {
                    "id": 3,
                    "claimedAt": null,
                    "claimStatus": null,
                    "quantity": 10,
                    "code": "eyJpdiI6IjZYdUVWeTYwK0czRjM2THNHNVBJWFE9PSIsInZhbHVlIjoialhHbS93YkhnNldJa2JHeDFBMCt2V3ZLRDZkVi9INXgvdG1sOGxhSTJwWk12RE1HMEN2ZFZyY2d3dzRDQ0loNCIsIm1hYyI6IjVjOGE0ZGEyYzUzYWQzODgwZDJkNmNlZjM4YjY0YmZmOTcwNTVhNGIyNzUzYWNlYjMxOWNiNGE5OWZhY2NiNmYiLCJ0YWciOiIifQ==",
                    "wallet": null,
                    "collection": null
                  }
                },
                {
                  "node": {
                    "id": 4,
                    "claimedAt": null,
                    "claimStatus": null,
                    "quantity": 10,
                    "code": "eyJpdiI6Ik9TeDE3ZGMxODFHdXRwUTM4QXp3OUE9PSIsInZhbHVlIjoiaC9mUGtjTkd5RjNFdEk4WGFnNW5QOWJhVFVBR3ZrOXE3bTMrTm9GT01SVVV5NVpVRSt2RGtnQndnTld3TFRlZyIsIm1hYyI6IjdhNjgzYTJhMWQ2NzZlZWM1NTIyZWVkNjFkNzNjNzNlN2JhNmMyZTAyYzhmYTE2M2M1NzNlMTAxNTNlMDI3OGQiLCJ0YWciOiIifQ==",
                    "wallet": null,
                    "collection": null
                  }
                },
                {
                  "node": {
                    "id": 5,
                    "claimedAt": null,
                    "claimStatus": null,
                    "quantity": 10,
                    "code": "eyJpdiI6IlhYVVF0c0l0ZDNzS2g3a0hLU3JaeVE9PSIsInZhbHVlIjoiWWltZjlvMjJ1M0psRHJPUG1QRmUvVlZnR2RiREQyTWxYVU9pSUtNb2N2MWxqbzFmTVYxM0xiV3cxZWJ4NFg4TyIsIm1hYyI6IjdlOTExYTg5OTIwMDMxMTZkYmJlNGYwZjU5MjhkOWJlMzgyZWVhYzcyMDEwYzRkNzk5Zjk2OWU5YjZjODExNmYiLCJ0YWciOiIifQ==",
                    "wallet": null,
                    "collection": null
                  }
                },
                {
                  "node": {
                    "id": 6,
                    "claimedAt": null,
                    "claimStatus": null,
                    "quantity": 10,
                    "code": "eyJpdiI6IlVlUjBKeUhrZ092clBqMDVNaTNwOXc9PSIsInZhbHVlIjoiOUNhcUxaQkVDVlZFdnlBM3ZtTUJmWnl0bjN6YVNuUmRXbmoxWXZiOFpZOUFqaW9Od2Z0ZGdWMjF0S2llRHZEUyIsIm1hYyI6Ijg0YjY1ZWEzZGFjOWE5NjI2OTIwMjExNzc2NTNhZWZiMDI3OGQwZGQyZDEzYWJhMjg2OGExZWQyMzJiMmJlM2EiLCJ0YWciOiIifQ==",
                    "wallet": null,
                    "collection": null
                  }
                },
                {
                  "node": {
                    "id": 7,
                    "claimedAt": null,
                    "claimStatus": null,
                    "quantity": 10,
                    "code": "eyJpdiI6InAxU1I4QzlXcGp2RXRuSENCTkVzcnc9PSIsInZhbHVlIjoiL2J2a0UyK0trd0pJMVJ0QVI0NU9TanFuZmVCcUY3dG5TNW50YURzbXdwUkhBSVIyQTlnQnZHK0trTjh1am9pbiIsIm1hYyI6ImMzYzVkZDZmOTQ2OWRiODBmOTMwMWJkYzZhZTE0ZTkwZTczOGFlZjJkMmYzOTQzZjA1ZGMxNjExMmU5MjRiYjQiLCJ0YWciOiIifQ==",
                    "wallet": null,
                    "collection": null
                  }
                },
                {
                  "node": {
                    "id": 8,
                    "claimedAt": null,
                    "claimStatus": null,
                    "quantity": 10,
                    "code": "eyJpdiI6InVaRWlMYk1HSjdkZFRhWVlGQlRMK3c9PSIsInZhbHVlIjoidUJjTWpPODZRMThNeUF1T0hHaWJlUTB0a0thTXl5VnZFSHN4UjYzQk5uZ1NQR0lrNWR1NlY1VG5sU2cyZ0R6diIsIm1hYyI6ImZiZjhkY2JhOTY3MmUwZGI2YzYyZmQ4MGFkYmVjMzI2NzRiYWZmOWI4ZjgzMjNkYTRlZTc5MmEyNzZmN2E0MzciLCJ0YWciOiIifQ==",
                    "wallet": null,
                    "collection": null
                  }
                },
                {
                  "node": {
                    "id": 9,
                    "claimedAt": null,
                    "claimStatus": null,
                    "quantity": 10,
                    "code": "eyJpdiI6Ik14U2ZndlJiLzdsQktMckdQTGQxeHc9PSIsInZhbHVlIjoiUDBEWGNYcDk1ZExlZlMzNzRPWEdFeFliYmIwWWIxUElzaEpHSkQxb05xN2EyVVVucnd2dWQzTC9Ic3JzYnlSeSIsIm1hYyI6ImY4ODI0OGU0Mzc3NjVkMzZlODljYTI2YzhkNDU3N2MyMmNiZTM0YjZkMWQ3YjU2NjE0NmZlZjkyYjk0NjllOGQiLCJ0YWciOiIifQ==",
                    "wallet": null,
                    "collection": null
                  }
                },
                {
                  "node": {
                    "id": 10,
                    "claimedAt": null,
                    "claimStatus": null,
                    "quantity": 10,
                    "code": "eyJpdiI6InhiYWZqWlM3YTRhc01EYXZaR2pwRFE9PSIsInZhbHVlIjoiZXlwVytJbWNRT29VOThrR28wWldBa1l3Y3ZPMW5oUmdwUE02Snh1M2FDek4wOXpsS1FEVEFjNU9GV2psNWZCMyIsIm1hYyI6ImI3NTU3YTJjNWQzODQyNjllOGJmZTA5MjBlMjBhYTI3ZTA1Yjg1MmYzN2RiOWQ2MDJjMGRlMmY3Y2YxMDk2ODkiLCJ0YWciOiIifQ==",
                    "wallet": null,
                    "collection": null
                  }
                }
              ]
            }
          }
        }
      ]
    }
  }
}
```

### Use Case:

Here's how you can use the `GetBeams` query in your application:

- **Retrieve Multiple Beam Details**: You can use this query to fetch details about multiple Beams at once, making it efficient for managing a collection of Beams.

- **Filter Beams**: You can optionally filter Beams by their unique codes or names to retrieve specific subsets of Beams that match your criteria.

- **Display Beam Information**: You can display the retrieved Beam details in your application, providing users with information about available Beams, their descriptions, and whether they are currently claimable.

- **Track Claims**: By accessing the `claims` information, you can track the claims made on each Beam, including claim status, quantity, and wallet details. This can be valuable for monitoring the distribution of digital assets.

- **Generate QR Codes**: You can use the URL provided in the `qr` object to generate QR codes for users to claim Beams directly from your application.

- **Analyze Beam Usage**: The query allows you to gather data on how many claims have been made on each Beam and when they were claimed, enabling you to analyze user engagement and the effectiveness of promotional campaigns.

Overall, the `GetBeams` query is a versatile tool for managing and presenting information about Beams in your blockchain-based application, offering insights into asset distribution and user interactions.

## GetClaims

The `GetClaims` query is used to retrieve an array of claim details from a system, and it allows for optional filtering based on claim IDs, codes, accounts, or states. This query is typically used to track and manage claims associated with specific assets or codes in a system.

```graphql
query GetClaims {
  GetClaims(
    codes: ["0dd3694f2c4599179f08686539cd73dc"]
  ) {
    edges {
      cursor
      node {
        id
        claimedAt
        claimStatus
        quantity
        wallet {
          account {
            publicKey
            address
          }
        }
        collection {
          collectionId
          maxTokenCount
          maxTokenSupply
          forceSingleMint
          frozen
          network
        }
        beam {
          id
          code          
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
```json Response
{
  "data": {
    "GetClaims": {
      "edges": [
        {
          "cursor": "eyJpZCI6MTAsIl9wb2ludHNUb05leHRJdGVtcyI6dHJ1ZX0",
          "node": {
            "id": 10,
            "claimedAt": null,
            "claimStatus": null,
            "quantity": 10,
            "wallet": null,
            "collection": null,
            "beam": {
              "id": 1,
              "code": "0dd3694f2c4599179f08686539cd73dc"
            }
          }
        },
        {
          "cursor": "eyJpZCI6OSwiX3BvaW50c1RvTmV4dEl0ZW1zIjp0cnVlfQ",
          "node": {
            "id": 9,
            "claimedAt": null,
            "claimStatus": null,
            "quantity": 10,
            "wallet": null,
            "collection": null,
            "beam": {
              "id": 1,
              "code": "0dd3694f2c4599179f08686539cd73dc"
            }
          }
        },
        {
          "cursor": "eyJpZCI6OCwiX3BvaW50c1RvTmV4dEl0ZW1zIjp0cnVlfQ",
          "node": {
            "id": 8,
            "claimedAt": null,
            "claimStatus": null,
            "quantity": 10,
            "wallet": null,
            "collection": null,
            "beam": {
              "id": 1,
              "code": "0dd3694f2c4599179f08686539cd73dc"
            }
          }
        },
        {
          "cursor": "eyJpZCI6NywiX3BvaW50c1RvTmV4dEl0ZW1zIjp0cnVlfQ",
          "node": {
            "id": 7,
            "claimedAt": null,
            "claimStatus": null,
            "quantity": 10,
            "wallet": null,
            "collection": null,
            "beam": {
              "id": 1,
              "code": "0dd3694f2c4599179f08686539cd73dc"
            }
          }
        },
        {
          "cursor": "eyJpZCI6NiwiX3BvaW50c1RvTmV4dEl0ZW1zIjp0cnVlfQ",
          "node": {
            "id": 6,
            "claimedAt": null,
            "claimStatus": null,
            "quantity": 10,
            "wallet": null,
            "collection": null,
            "beam": {
              "id": 1,
              "code": "0dd3694f2c4599179f08686539cd73dc"
            }
          }
        },
        {
          "cursor": "eyJpZCI6NSwiX3BvaW50c1RvTmV4dEl0ZW1zIjp0cnVlfQ",
          "node": {
            "id": 5,
            "claimedAt": null,
            "claimStatus": null,
            "quantity": 10,
            "wallet": null,
            "collection": null,
            "beam": {
              "id": 1,
              "code": "0dd3694f2c4599179f08686539cd73dc"
            }
          }
        },
        {
          "cursor": "eyJpZCI6NCwiX3BvaW50c1RvTmV4dEl0ZW1zIjp0cnVlfQ",
          "node": {
            "id": 4,
            "claimedAt": null,
            "claimStatus": null,
            "quantity": 10,
            "wallet": null,
            "collection": null,
            "beam": {
              "id": 1,
              "code": "0dd3694f2c4599179f08686539cd73dc"
            }
          }
        },
        {
          "cursor": "eyJpZCI6MywiX3BvaW50c1RvTmV4dEl0ZW1zIjp0cnVlfQ",
          "node": {
            "id": 3,
            "claimedAt": null,
            "claimStatus": null,
            "quantity": 10,
            "wallet": null,
            "collection": null,
            "beam": {
              "id": 1,
              "code": "0dd3694f2c4599179f08686539cd73dc"
            }
          }
        },
        {
          "cursor": "eyJpZCI6MiwiX3BvaW50c1RvTmV4dEl0ZW1zIjp0cnVlfQ",
          "node": {
            "id": 2,
            "claimedAt": null,
            "claimStatus": null,
            "quantity": 10,
            "wallet": null,
            "collection": null,
            "beam": {
              "id": 1,
              "code": "0dd3694f2c4599179f08686539cd73dc"
            }
          }
        },
        {
          "cursor": "eyJpZCI6MSwiX3BvaW50c1RvTmV4dEl0ZW1zIjp0cnVlfQ",
          "node": {
            "id": 1,
            "claimedAt": null,
            "claimStatus": null,
            "quantity": 10,
            "wallet": null,
            "collection": null,
            "beam": {
              "id": 1,
              "code": "0dd3694f2c4599179f08686539cd73dc"
            }
          }
        }
      ],
      "totalCount": 10,
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

### Use Case:

- **You** can use the `GetClaims` query to retrieve claim details associated with specific codes, allowing you to:
  - Track the status of claims for particular assets or codes in your system.
  - Monitor the progress of claim processing.
  - Provide updates to users or administrators regarding claim statuses.
  - Perform audits and manage the distribution of assets based on claim information.

By filtering claims based on codes, you can efficiently manage and track claims for different assets or products in your system. This query is valuable for administrative purposes, customer support, and ensuring the smooth processing of claims within your platform.

## GetSingleUseCodes

The `GetClaims` query retrieves an array of claim details, optionally filtered by claim IDs, claim codes, accounts, or claim states. It is designed to provide information about claims associated with a specific code.

```graphql
query GetSingleUseCodes {
  GetSingleUseCodes(code: "7cd390ab3d56c42b818d0a1aa2221c8f") {
    edges {
      cursor
      node {
        code
        qr {
          url
          payload
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
```
```json Response
{
  "data": {
    "GetSingleUseCodes": {
      "edges": [
        {
          "cursor": "eyJpZCI6ODAsIl9wb2ludHNUb05leHRJdGVtcyI6dHJ1ZX0",
          "node": {
            "code": "eyJpdiI6IlNFM2tRZzgxaU5pZi9hVXBVZTBCeVE9PSIsInZhbHVlIjoicDdsSmlCU1JHNnd6QUtHU1FRV2pNQ2twaDNPT2YreFVrK3Jrb1VXL0NPc2tOeFBVdTZFM2J1Ykp5NTlRNlNwZXg0d1JTbHo1N1BHMDJqaG11WDhDTGIxRVlVenBoTWVwT3ZrL3RwR2pZTzA9IiwibWFjIjoiYWI3ZjdhY2RmMzE2NGM1MjAxMWVmYTk2ZWNjNWQyNTY4MWQ4NGZhY2ZhN2M5Y2FmMmM0MzU5MDM1N2Q1NDFiYSIsInRhZyI6IiJ9",
            "qr": {
              "url": "https://platform.enjin.io/claim/eyJpdiI6ImVMNTEybWEwSnZ6WlF3QjUvQW15Wmc9PSIsInZhbHVlIjoiVklOcCtCYVpGTG1aRjQyY0FZb3RmS1JSd1JGT0dka05rT1NQUnZoMXZ4UGsxVklzVmNoejhEUDQ5TjVMc0picjR4MmEzQUJTaWMrUVYxb21yMExZRWVjUGp1T2Rnb0owMHcwWmxXWCtGMnM9IiwibWFjIjoiMjUyNzdlODkyMTRkZmViM2M1OWY5MWNlYjgxYjUzOGE3NTA4NmU0NjY3MjIwOGY0ZDkxNTg3ZTJjOWM5NjUxMSIsInRhZyI6IiJ9",
              "payload": "https://platform.enjin.io/claim/eyJpdiI6IkJJWVNYb3lFVGRpaUNEemNJQ20xamc9PSIsInZhbHVlIjoic1ZXMzNGN1FnbWVRc1Z2S2IrYThIT0Rpd2JpeGhza2wxSG1FSlVqTUhzN3UrYmozaXNnZ2dSTU5HTmluZ2laY3JWNUcyemcyaDJZT1VGdGx6SjgxdGVwdUIvN1JhRHRVSnd2RFRYZVhOOUk9IiwibWFjIjoiNzllYmQ1MjFlODBmMWEzOTdjOTc0YWM0YjQ4M2ExZmEyOWZhNzQyY2RlNGJjMzcxNDdkOTQxOWJlYmYyMmUwMSIsInRhZyI6IiJ9"
            }
          }
        },
        {
          "cursor": "eyJpZCI6NzEsIl9wb2ludHNUb05leHRJdGVtcyI6dHJ1ZX0",
          "node": {
            "code": "eyJpdiI6Imp5R0xzNC9aVWZlT090SGVsL3RyVlE9PSIsInZhbHVlIjoiemJiWmsrZEl2TXVzc2R1c2svalhIRjdGVUFXRThPOTg2RnZJVCtMNEE1UENxN3FLeURhL1J4UXhBakduekduRmxRQTJwdmRCeXZqQi9rbVVyVnRmK2V4c2xDZU9jUW15N0xNSkRiUyt2ZlE9IiwibWFjIjoiNTZlOGQ4NjdmNDNmOTQ3NWYwM2M2MzRlMGRmODlmNmQwZmM2ZDllNjdmMTk4ZTA0ZWJiYTliZTZkZTJhOTM3MyIsInRhZyI6IiJ9",
            "qr": {
              "url": "https://platform.enjin.io/claim/eyJpdiI6IlhtTHdEdlM5bXlQNnVEaGZpejkrR3c9PSIsInZhbHVlIjoidlh3dVhuTVhOVEQvcElBM0drMVhBQ2Z1SFdob3BtNmJnYVQwWExoVmlUYWdPTUhkUzJ1QS9JL25yeHVPSnBQb2VyM3lJWXd3aEMySVd1MjkwellTdW50UVl1YTJRdmNCV3lzdXVLaE9Wckk9IiwibWFjIjoiOGNhNmY1MzZlZWRjMmE0ZjMwYjQ0ODY0Nzg5MTk5MDU4OTAwYmZhYjYzODI4OGQ3ZDIyNTQ5MjA2Zjc2MTczYiIsInRhZyI6IiJ9",
              "payload": "https://platform.enjin.io/claim/eyJpdiI6IkN4OHZzUDdGc1AwUG9wdXpQSDVGYXc9PSIsInZhbHVlIjoiOTJJRHQ3VjdoZHR0WVpqajVoSGZIZFNoZHJtVE1iRjR0ZndLQXRQYVE1TS8zaGd1WEZDdDQrckNzUXExdnFvZDVVcE5PMVU1bklFRWhqSnVXVi96WVB4RE5CMk1qTFhHYVIvVWdscFljUTA9IiwibWFjIjoiYWIyY2U4YmIzMjJmNjY0ZmE2NzZjMTZhYTE0YjJlMTEwNDQxMjJlY2Y3NzZlYzZkMDNhMGI3NGQ2MDEyYTZlZSIsInRhZyI6IiJ9"
            }
          }
        }
      ],
      "totalCount": 10,
      "pageInfo": {
        "hasPreviousPage": false,
        "hasNextPage": false,
        "startCursor": "",
        "endCursor": ""
      }
    }
  }
}
```

### Use Case:

- **You** can use the `GetClaims` query to track the status of claims associated with a specific code in your system.
- This query is helpful for administrative purposes, such as auditing, claim processing, or customer service.
- **You** can provide updates on claim statuses to users, ensuring that claims are being processed correctly.
- By retrieving the quantity and potential wallet information, **you** can manage the distribution of assets and identify any issues with claims.
- This information allows **you** to monitor the progress of claim processing and take appropriate actions as needed.

# Mutations

## CreateBeam

The `CreateBeam` mutation is used to create a new Enjin Beam distribution campaign. Enjin Beam is a method for distributing tokens via QR codes. This mutation sets up the details and parameters of the Beam campaign.

```graphql
mutation CreateBeam {
  CreateBeam(
    name: "My Beam"
    description: "This is a test beam."
    image: "https://assets-global.website-files.com/60f57c496975b84c29335fb7/60f58bd888a6e86e3ff69551_Enjin.svg"
    start: "20230101"
    end: "20240101"
    collectionId: 7153
    tokens: [
      {tokenIds:"1..10" tokenQuantityPerClaim:1 claimQuantity:1 type:MINT_ON_DEMAND}
    ]
  )
}
```
```json Response
{
  "data": {
    "CreateBeam": "cd6443f822cf6e89c03edd4f6fbc6e55"
  }
}
```

### Use Case:

- **You** can use the `CreateBeam` mutation to set up Enjin Beam campaigns for various purposes:
  - **Marketing and Promotions**: Distribute promotional items, rewards, or collectibles to engage users effectively.
  - **Event Tie-ins**: Create time-limited Beam campaigns to coincide with events or special occasions.
  - **Controlled Distribution**: Precisely control the distribution of tokens by specifying token IDs, claim quantities, and distribution types.
  - **Flexibility**: Opt for the "MINT_ON_DEMAND" distribution type to mint tokens only when they are claimed, optimizing resource usage and ensuring tokens are created as needed.

This mutation is a fundamental step in launching a new Enjin Beam campaign, allowing **you** to efficiently distribute tokens and interact with users through QR code-based token distribution.

## ClaimBeam

The `ClaimBeam` is used to claim a specific Enjin Beam using a unique code. Enjin Beam is a method for distributing tokens, and this mutation allows users to claim their allocated tokens by providing the necessary code and cryptographic signature.

```graphql
mutation ClaimBeam {
  ClaimBeam(
    code: "cd6443f822cf6e89c03edd4f6fbc6e55"
    account: "cxMsNPRk7Ek5V76NC4o2HTBrnxcUnxLA9btuKPcuPkmYi84Ts"    
    signature:"0x1d670c35a76efa984fa2bd655d21eb28af0ee470e359848d2105845e170bb589fd6b7c2cbe97c9acce1eb205d4ade39cae75c619230cf44b64b25ec8677d7f0f"
    cryptoSignatureType:SR25519
  )
}
```
```json Response
{
  "data": {
    "ClaimBeam": true
  }
}
```

### Use Case:

- **You** can use the `ClaimBeam` mutation in various scenarios, including:
  - **Digital Rewards**: Players can claim rewards for in-game achievements by entering a provided code within the game's interface. The mutation handles the claiming process in the background.
  - **Promotional Campaigns**: Special promotions can distribute codes via email, social media, or partnerships, allowing users to redeem them for special in-game items or bonuses.
  - **Cross-Platform Bonuses**: Players can claim rewards earned on one platform and use them on another platform by utilizing the `ClaimBeam` mutation.
  - **Gifts and Trades**: Players can trade items or send gifts to others using codes. The recipient claims the item with the mutation, ensuring secure and authorized transfers.

This mutation simplifies the asset claim process, making it convenient and secure for users. It eliminates the need for QR code scanning, which can be particularly advantageous in scenarios where scanning is not feasible or convenient. Additionally, it enables automated claiming processes within the game ecosystem, streamlining asset distribution.

## UpdateBeam

The `UpdateBeam` mutation is used to modify the properties of an existing Enjin Beam. It allows you to update specific attributes of a Beam, such as its name, to ensure that the campaign remains accurate and adaptable.

```graphql
mutation UpdateBeam {
  UpdateBeam(
    code: "ca8524349abab1cc20994841a8e0f175"
    name: "My beam UPDATED"
  )
}
```
```json Response
{
  "data": {
    "UpdateBeam": true
  }
}
```

### Use Case:

- You can use the `UpdateBeam` mutation in various scenarios, including:
  - **Campaign Adaptation**: If your marketing campaign evolves or changes its theme, you can use this mutation to update the Beam's name to reflect the new direction.
  - **Error Correction**: If there was an error or typo in the original Beam name or any other updatable detail, you can correct it without the need to create a new Beam.
  - **Dynamic Campaign Management**: As your campaign progresses, you have the flexibility to manage and update the Beam's details to keep them aligned with your campaign strategy.

This mutation is a valuable tool for campaign management, offering the ability to make dynamic changes and ensure that your campaign remains relevant and up-to-date even after its initial creation.

## DeleteBeam

The `DeleteBeam` mutation is used to delete an existing Enjin Beam from the system. It allows you to remove a Beam and all of its associated data based on its unique identifier code.

```graphql
mutation DeleteBeam {
  DeleteBeam(code: "cd6443f822cf6e89c03edd4f6fbc6e55")
}
```
```json Response
{
  "data": {
    "DeleteBeam": true
  }
}
```

### Use Case:

- **You** can use the `DeleteBeam` mutation in various scenarios, including:
  - **Campaign Closure**: When a promotional campaign or event ends, and the Beam is no longer needed, you can delete it to prevent clutter and confusion in your system.
  - **Mistake Rectification**: If a Beam was created by mistake or no longer aligns with your campaign strategy, you can remove it to maintain a clean and relevant campaign portfolio.
  - **Resource Management**: Deleting unused Beams is essential for efficient resource management and keeping your system organized.

This mutation is a critical component of Beam lifecycle management, allowing you to maintain a streamlined and efficient system by removing obsolete or unwanted Beams.