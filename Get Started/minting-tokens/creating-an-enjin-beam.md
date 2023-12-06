---
title: "Create QR Drops"
slug: "creating-an-enjin-beam"
excerpt: "Send tokens to your players via QR codes."
hidden: false
createdAt: "Mon Nov 06 2023 03:58:17 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Sun Dec 03 2023 08:43:53 GMT+0000 (Coordinated Universal Time)"
---
<<glossary:Enjin Beam>> is a QR code-based distribution system that allows users to claim tokens directly into their Enjin Wallet. 

By scanning a Beam QR code, users can receive promotional items, collectibles, or other tokens as part of marketing campaigns or events.

This is a great way for you to onboard new users.

> 📘 What you'll need:
> 
> - Some [Enjin Coin](doc:using-enjin-coin) on Enjin Matrixchain to pay for <<glossary:Transaction Fees>>.
> - An [Enjin Platform Account](/docs/using-the-enjin-platform).
> - A [Collection](doc:create-a-collection) and a [Token](doc:create-a-token) to send.

**There are two ways to create an Enjin Beam:**

1. [Using the Platform User Interface](#option-a-using-the-platform-user-interface)
2. [Using the GraphQL API](#option-b-using-the-graphql-api--sdks)

## Option A. Using the Platform User Interface

In the Platform menu, navigate to "**[Beams](https://platform.canary.enjin.io/beams/list)**". Then, click the "**[Create Enjin Beam](https://platform.canary.enjin.io/create/beam)**" button.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b9dc714-Animation.gif",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


Fill in the beam settings and optional arguments in the corresponding fields.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/53c9bff-image.png",
        null,
        "Create Enjin Beam form on Enjin Platform"
      ],
      "align": "center",
      "sizing": "800px",
      "caption": "Create Enjin Beam form on Enjin Platform"
    }
  ]
}
[/block]


Fill the tokens that you want to include in this Beam (You can add more tokens by adding the "**Add Token**" button)

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/41ec895-image.png",
        null,
        ""
      ],
      "align": "center",
      "sizing": "800px"
    }
  ]
}
[/block]


Once you're satisfied with the options, click on the "**Create**" button at the bottom right corner to create the request.  
If a signature request is needed, approve it.

Once the Beam is created, locate it in the "**Beams**" menu, click the **3 vertical dots** (**⋮**) to it's right, then click the "**Claim**" button to view the QR code.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/30f0459-Animation2.gif",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


> 📘 Need to view multiple "Single-Use" QR codes?
> 
> Please note, viewing multiple "Single-Use" QR codes is currently not available in the Platform User Interface.  
> For the time being, it can be viewed programmatically only via [GraphQL API / SDKs](#option-b-using-the-graphql-api--sdks)

The Enjin Beam is now ready to be shared to distribute tokens. Users can scan the QR code and instantly receive your token!  
Next skillset to learn is mutating a collection / token.  
Proceed to the [Freezing & Thawing](doc:freezing-thawing) tutorial to learn more.

## Option B. Using the GraphQL API / SDKs

> 📘 Make sure to use the the Beam Endpoint
> 
> - Testnet: `http://platform.canary.enjin.io/graphql/beam`
> - Mainnet: `http://platform.enjin.io/graphql/beam`
> 
> **Try the Beam Playground here:**
> 
> - Testnet: <http://platform.canary.enjin.io/graphiql/beam>
> - Mainnet: <http://platform.enjin.io/graphiql/beam>

First, create the Beam with the parameters of your choice, such as name, description, image, begin and end date & the number of assets that you would like to distribute.

**Mutation:**

```graphql
mutation CreateBeam {
  CreateBeam(
    name: "My Beam" #Specify beam name
    description: "This is a test beam." #Specify beam description
    image: "https://assets-global.website-files.com/60f57c496975b84c29335fb7/60f58bd888a6e86e3ff69551_Enjin.svg"  #Specify url for beam image - shows during claim process
    start: "20230101" #Specify start date
    end: "20240101" #Specify end date
    collectionId: 36623 #Select the collection ID
    tokens: [{
      tokenIds: "123" #Select the Token IDs. Use comma for multiple tokenIds(123,234), 2 dots for range: (123,234..345)
      tokenQuantityPerClaim:1 #Specify the number of tokens a user can receive per claim
      claimQuantity:1 #Specify the number of times a user can claim
      type:MINT_ON_DEMAND #Select token distribution type
    }]
  )
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
      mutation CreateBeam
      (
        $name: String!
        $description: String!
        $image: String!
        $start: DateTime!
        $end: DateTime!
        $collection_id: BigInt!
      ) {
        CreateBeam(
          name: $name
          description: $description
          image: $image
          start: $start
          end: $end
          collectionId: $collection_id
          tokens: [{
            tokenIds: "123" #Select the Token IDs. Use comma for multiple tokenIds(123,234), 2 dots for range: (123,234..345)
            tokenQuantityPerClaim:1 #Specify the number of tokens a user can receive per claim
            claimQuantity:1 #Specify the number of times a user can claim
            type:MINT_ON_DEMAND #Select token distribution type
          }]
        )
      }
    `,
    variables: {
      name: "My Beam", //Specify beam name
      description: "This is a test beam.", //Specify beam description
      image: "https://assets-global.website-files.com/60f57c496975b84c29335fb7/60f58bd888a6e86e3ff69551_Enjin.svg", //Specify url for beam image - shows during claim process
      start: "20230101", //Specify start date
      end: "20240101", //Specify end date
      collection_id: 36623 //Select the collection ID
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
    mutation CreateBeam
    (
      $name: String!
      $description: String!
      $image: String!
      $start: DateTime!
      $end: DateTime!
      $collection_id: BigInt!
    ) {
      CreateBeam(
        name: $name
        description: $description
        image: $image
        start: $start
        end: $end
        collectionId: $collection_id
        tokens: [{
          tokenIds: "123" #Select the Token IDs. Use comma for multiple tokenIds(123,234), 2 dots for range: (123,234..345)
          tokenQuantityPerClaim:1 #Specify the number of tokens a user can receive per claim
          claimQuantity:1 #Specify the number of times a user can claim
          type:MINT_ON_DEMAND #Select token distribution type
        }]
      )
    }
  `,
  variables: {
    name: "My Beam", //Specify beam name
    description: "This is a test beam.", //Specify beam description
    image: "https://assets-global.website-files.com/60f57c496975b84c29335fb7/60f58bd888a6e86e3ff69551_Enjin.svg", //Specify url for beam image - shows during claim process
    start: "20230101", //Specify start date
    end: "20240101", //Specify end date
    collection_id: 36623 //Select the collection ID
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
mutation CreateBeam
(
  $name: String!
  $description: String!
  $image: String!
  $start: DateTime!
  $end: DateTime!
  $collection_id: BigInt!
) {
  CreateBeam(
    name: $name
    description: $description
    image: $image
    start: $start
    end: $end
    collectionId: $collection_id
    tokens: [{
      tokenIds: "123" #Select the Token IDs. Use comma for multiple tokenIds(123,234), 2 dots for range: (123,234..345)
      tokenQuantityPerClaim:1 #Specify the number of tokens a user can receive per claim
      claimQuantity:1 #Specify the number of times a user can claim
      type:MINT_ON_DEMAND #Select token distribution type
    }]
  )
}
'''

variables = {
  'name': "My Beam", #Specify beam name
  'description': "This is a test beam.", #Specify beam description
  'image': "https://assets-global.website-files.com/60f57c496975b84c29335fb7/60f58bd888a6e86e3ff69551_Enjin.svg", #Specify url for beam image - shows during claim process
  'start': "20230101", #Specify start date
  'end': "20240101", #Specify end date
  'collection_id': 36623 #Select the collection ID
}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```

Next you will need to send a query to get one of the two different code types.

- **Multi-Use Codes: **Useful for advertising.
- **Single-Use Codes: **Useful for rewarding individuals.

**Query: Multi-Use Codes**

```graphql
query GetBeam {
  GetBeam(code: "abad7ac8bda71c2e2bf8a3228f0a435f") { #Set the beam code
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
      query GetBeam
      (
        $code: String!
      ) {
        GetBeam(code: $code) {
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
    `,
    variables: {
      code: "abad7ac8bda71c2e2bf8a3228f0a435f" //Set the beam code
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
    query GetBeam
    (
      $code: String!
    ) {
      GetBeam(code: $code) {
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
  `,
  variables: {
    code: "abad7ac8bda71c2e2bf8a3228f0a435f" //Set the beam code
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
query GetBeam
(
  $code: String!
) {
  GetBeam(code: $code) {
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
'''

variables = {
  'code': "abad7ac8bda71c2e2bf8a3228f0a435f" #Set the beam code
}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```

**Query: Single-Use Codes**

```graphql
query GetSingleUseCodes {
  GetSingleUseCodes(code: "abad7ac8bda71c2e2bf8a3228f0a435f") { #Set the beam code
    edges {
      cursor
      node {
        qr {
          url
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
      query GetSingleUseCodes
      (
        $code: String!
      ) {
        GetSingleUseCodes(code: $code) {
          edges {
            cursor
            node {
              qr {
                url
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
    `,
    variables: {
      code: "abad7ac8bda71c2e2bf8a3228f0a435f" //Set the beam code
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
    query GetSingleUseCodes
    (
      $code: String!
    ) {
      GetSingleUseCodes(code: $code) {
        edges {
          cursor
          node {
            qr {
              url
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
  `,
  variables: {
    code: "abad7ac8bda71c2e2bf8a3228f0a435f" //Set the beam code
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
query GetSingleUseCodes
(
  $code: String!
) {
  GetSingleUseCodes(code: $code) {
    edges {
      cursor
      node {
        qr {
          url
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
'''

variables = {
  'code': "abad7ac8bda71c2e2bf8a3228f0a435f" #Set the beam code
}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```

> 🚧 This query might return items in different pages using Connections
> 
> To learn how to use GraphQL cursors for pagination, head to [Using the API --> Pagination](doc:using-graphql#pagination).

The Enjin Beam is now ready to be shared to distribute tokens. Users can scan the QR code and instantly receive your token!

> 📘 More Fields and Arguments Available!
> 
> The examples here illustrate basic uses of Beam related queries & mutations. However, these operations supports many more arguments and settings not shown in these examples.
> 
> For a comprehensive overview of all available settings and their descriptions for Beams, please refer to our GraphQL Schema on Apollo. 
> 
> - [Detailed `CreateBeam` mutation Information on Apollo](https://studio.apollographql.com/public/EnjinPlatform/variant/beam/schema/reference/objects/Mutation?query=CreateBeam).
> - [Detailed `GetBeam`/`GetBeams` queries Information on Apollo](https://studio.apollographql.com/public/EnjinPlatform/variant/beam/schema/reference/objects/Query?query=GetBeam).
> - [Detailed `GetSingleUseCodes` query Information on Apollo](https://studio.apollographql.com/public/EnjinPlatform/variant/beam/schema/reference/objects/Query?query=GetSingleUseCodes).
> 
> These resources will help you to fully utilize the capabilities of Beams related operations and tailor them to your specific needs.
> 
> For instance, you'll find settings such as different Beam flags types with the [Flags](https://studio.apollographql.com/public/EnjinPlatform/variant/beam/schema/reference/inputs/BeamFlagInputType) object, or claim conditions with the [ ClaimCondition](https://studio.apollographql.com/public/EnjinPlatform/variant/beam/schema/reference/inputs/ClaimConditionInputType) object.

> 👍 Proceed to the [Freezing & Thawing](doc:freezing-thawing) tutorial to learn more