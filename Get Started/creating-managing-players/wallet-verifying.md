---
title: "Verifying Wallets"
slug: "wallet-verifying"
excerpt: "Substantiate each wallet address before sending it tokens and requests."
hidden: false
createdAt: "Mon Nov 06 2023 03:32:26 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Nov 27 2023 14:00:16 GMT+0000 (Coordinated Universal Time)"
---
The Enjin Platform offers a Wallet verifying process that you can use to verify the authenticity of a user's blockchain address. 

> 📘 What you'll need:
> 
> - An [Enjin Platform Account](/docs/using-the-enjin-platform).

By validating this address, you can:

- Ensure that any tokens sent will reach the intended recipient.
- Request actions from the user, like initiating transactions, with confidence that the requests are made to the correct party.

# Verifying Process

![](https://files.readme.io/4b26374-spaces_QNacTKEfL1BilhQnECr7_uploads_o1klcR0o7cUJF5R0k9wF_image.png)

# Wallet Verifying with the [GraphiQL API](/docs/using-the-api-playground)

## Step 1. Initiating an Account Request

To initiate the account request process, run the following query:

**Query:**

```graphql
query RequestAccount{
  RequestAccount{
    qrCode #Returns a QR code for your user to scan
    verificationId #Save this for next step
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
      query RequestAccount{
        RequestAccount{
          qrCode #Returns a QR code for your user to scan
          verificationId #Save this for next step
        }
      }
    `
  }),
})
.then(response => response.json())
.then(data => console.log(data));
```
```javascript Node.js
const axios = require('axios');

axios.post('https://platform.canary.enjin.io/graphql', {
  query: `
    query RequestAccount{
      RequestAccount{
        qrCode #Returns a QR code for your user to scan
        verificationId #Save this for next step
      }
    }
  `
}, {
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'}
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```
```python
import requests

query = `'''
query RequestAccount{
  RequestAccount{
    qrCode #Returns a QR code for your user to scan
    verificationId #Save this for next step
  }
}
'''`

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```

**Response:**

```json JSON
{
  "data": {
    "RequestAccount": {
      "qrCode": "https://platform.canary.enjin.io/qr?s=512&f=png&d=https://platform.canary.enjin.io/proof/MHg3OGFmYWIxYWQxMjk0YzFlZWY4MjdlNmFjNTM1MmJiOTVmNmFmNWJhNmUyNjk5ZGRkOTI3YjAwNmQ3ZDk0MzZjO2Vwc3I6QTIwMTBBSzlM",
      "verificationId": "0x78afab1ad1294c1eef827e6ac5352bb95f6af5ba6e2699ddd927b006d7d9436c"
    }
  }
}
```

The response provides you with a QR code that you will need to get your user to scan using the Enjin Wallet.  
When the user scans the QR they are asked to choose a wallet address to verify.  
Once verified, you can start safely sending tokens and requests to their wallet address via the API.

## Step 2: Verify Account

Once the user has scanned the QR code using the Enjin Wallet, you can retrieve the account using two methods.

### Option A: `GetWallet`

Using `GetWallet` and passing the `verificationId` from step 1, you will be able to get any information related to his wallet if the verification process succeeded.

**Query:**

```graphql
query GetWallet{
  GetWallet(verificationId: "0x78afab1ad1294c1eef827e6ac5352bb95f6af5ba6e2699ddd927b006d7d9436c"){ #Set the verificationId from the RequestAccount response
    account{
      address
    }
    balances{
      free
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
      query GetVerifiedWallet($verification_id: String!) {
        GetWallet(verificationId: $verification_id) {
          account{
            address
          }
          balances{
            free
          }
        }
      }
    `,
    variables: {
      verification_id: "0x78afab1ad1294c1eef827e6ac5352bb95f6af5ba6e2699ddd927b006d7d9436c" //Set the verificationId from the RequestAccount response
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
    query GetVerifiedWallet($verification_id: String!) {
      GetWallet(verificationId: $verification_id) {
        account{
          address
        }
        balances{
          free
        }
      }
    }
  `,
  variables: {
    verification_id: "0x78afab1ad1294c1eef827e6ac5352bb95f6af5ba6e2699ddd927b006d7d9436c" //Set the verificationId from the RequestAccount response
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
query GetVerifiedWallet($verification_id: String!) {
  GetWallet(verificationId: $verification_id) {
    account{
      address
    }
    balances{
      free
    }
  }
}
'''

variables = {
  'verification_id': "0x78afab1ad1294c1eef827e6ac5352bb95f6af5ba6e2699ddd927b006d7d9436c" #Set the verificationId from the RequestAccount response
}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```

**Response: If user has verified**

```json JSON
{
  "data": {
    "GetWallet": {
      "account": {
        "address": "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f" //The address of the verified account
      },
      "balances": {
        "free": "86010842630734264894" // The amount of free ENJ in the verified account - ~86.0108 ENJ
      }
    }
  }
}
```

> 📘 Balances Format
> 
> API balances fields are formatted as u128 number type.  
> to get decimal value, divide the value by 10^18.

**Response: If user has not verified**

```json JSON
{
  "data": {
    "GetWallet": null
  }
}
```

### Option B: `GetAccountVerified`

This query can be used to fetch the status of the verification, while you are showing the QR code to the player, for example, when the query returns `"verified": true` you could hide the QR code and proceed with your onboarding workflow.

**Query:**

```graphql
query GetAccountVerified{
  GetAccountVerified(verificationId: "0x78afab1ad1294c1eef827e6ac5352bb95f6af5ba6e2699ddd927b006d7d9436c"){ #Set the verificationId from the RequestAccount response
    verified
    account{
      publicKey
      address
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
      query GetAccountVerified($verification_id: String!) {
        GetAccountVerified(verificationId: $verification_id) {
          verified
          account{
            publicKey
            address
          }
        }
      }
    `,
    variables: {
      verification_id: "0x78afab1ad1294c1eef827e6ac5352bb95f6af5ba6e2699ddd927b006d7d9436c" //Set the verificationId from the RequestAccount response
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
    query GetAccountVerified($verification_id: String!) {
      GetAccountVerified(verificationId: $verification_id) {
        verified
        account{
          publicKey
          address
        }
      }
    }
  `,
  variables: {
    verification_id: "0x78afab1ad1294c1eef827e6ac5352bb95f6af5ba6e2699ddd927b006d7d9436c" //Set the verificationId from the RequestAccount response
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
query GetAccountVerified($verification_id: String!) {
  GetAccountVerified(verificationId: $verification_id) {
    verified
    account{
      publicKey
      address
    }
  }
}
'''

variables = {
  'verification_id': "0x78afab1ad1294c1eef827e6ac5352bb95f6af5ba6e2699ddd927b006d7d9436c" #Set the verificationId from the RequestAccount response
}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```

**Response: If user has verified**

```json JSON
{
  "data": {
    "GetAccountVerified": {
      "verified": true,
      "account": {
        "publicKey": "0x5a6aae294416f3e875d9a8975658905002cfd3e5e64105d76296c4b0adbfd77e", //The public key of the verified account
        "address": "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f" //The address of the verified account
      }
    }
  }
}
```

**Response: If user has not verified**

```json JSON
{
  "data": {
    "GetAccountVerified": {
      "verified": false,
      "address": null
    }
  }
}
```

> 📘 More Fields and Arguments Available!
> 
> While the examples here cover the core functionalities of the requesting accounts and getting their wallets, there are a few more settings you can adjust. 
> 
> To view and understand all the available settings for these operations, refer to our GraphQL Schema on Apollo. 
> 
> - [Detailed `RequestAccount` query Information on Apollo](https://studio.apollographql.com/public/EnjinPlatform/variant/core/schema/reference/objects/Query?query=RequestAccount).
> - [Detailed `GetWallet` query Information on Apollo](https://studio.apollographql.com/public/EnjinPlatform/variant/core/schema/reference/objects/Query?query=GetWallet).
> - [Detailed `GetAccountVerified` query Information on Apollo](https://studio.apollographql.com/public/EnjinPlatform/variant/core/schema/reference/objects/Query?query=GetAccountVerified).
> 
> These resources will guide you in tailoring these operations to your specific requirements.