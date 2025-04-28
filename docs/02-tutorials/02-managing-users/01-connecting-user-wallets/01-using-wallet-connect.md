---
title: "Using WalletConnect"
slug: "using-wallet-connect"
excerpt: "Learn how to send transaction request to user's wallet using WalletConnect"
hidden: false
metadata: 
  title: "Using WalletConnect - Enable Easy Wallet Connections"
  description: "Find out how to use WalletConnect to seamlessly connect user wallets to your application, enhancing blockchain integration and accessibility."
  image: []
  robots: "index"
createdAt: "Tue Apr 30 2024 14:54:55 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Nov 05 2024 15:38:15 GMT+0000 (Coordinated Universal Time)"
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[WalletConnect](https://docs.walletconnect.com/) is an open-source protocol that connects your mobile wallet to decentralized applications.  
Using the Platform API and WalletConnect you can send any transaction request directly to your user's wallet app.

:::info What you'll need:
- Node.js 18+ and yarn installed
- A mobile device with [Enjin Wallet app](https://enjin.io/wallet) installed
- A Canary wallet with at least 6.5 ENJ in it to cover for <GlossaryTerm id="storage_deposit" /> and <GlossaryTerm id="transaction_fees" />.  
You can obtain cENJ for testing from the [Canary faucet](https://faucet.canary.enjin.io/).
- An [Enjin Platform Account](/01-getting-started/03-using-the-enjin-platform.md) (Canary).
:::

## Install and configure the sample project

On production apps, you will need [WalletConnect's SDK](https://docs.walletconnect.com/web3wallet/about), but for this guide we'll be using a sample project called [polkadot-onboard](https://github.com/enjin-forks/polkadot-onboard.git).

Start by cloning the polkadot-onboard repository: https://github.com/enjin-forks/polkadot-onboard.git

Once cloned, install the packages, install the workspace, build the workspace, and start the example project.  
To do that, navigate to the cloned repository folder and run the following commands:

:::info **Note:**
The commands below are Bash commands, which are commonly run in a Unix-like environment (such as macOS, or Linux).  
Windows users may encounter errors if they try running these commands directly in Command Prompt or PowerShell.  
To run them successfully on Windows, use a Bash-compatible terminal, like [Git Bash](https://gitforwindows.org/).
:::

```bash
yarn
yarn install:workspace
yarn build:workspace
```

Now, let's run the project and test it. You can do that by running the following command inside the root folder of the project:

```bash
yarn start:react-next
```

Navigate to http://localhost:3000 using your browser. If everything went well, a sample page should load up.

:::info Configured Chain
The sample project is set to broadcast transaction on the Canary Matrixchain Testnet.  
To configure a different blockchain, you can adjust the `chainIds` in the `examples/react-next/components/ConnectContainer.tsx` file.

Chain IDs on Enjin Chains:
- Mainnet Matrixchain: `polkadot:3af4ff48ec76d2efc8476730f423ac07`
- Mainnet Relaychain: `polkadot:d8761d3c88f26dc12875c00d3165f7d6`
- Canary Matrixchain: `polkadot:a37725fd8943d2a524cb7ecc65da438f`
- Canary Relaychain: `polkadot:735d8773c63e74ff8490fee5751ac07e`
:::

## Connect user's wallet

To send transactions to your user, he must be connected to your dapp.  
Clicking `Get Wallets`, followed by `Polkadot Demo 2.0`, initiates a connection between your user and your dapp.

<p align="center">
  <img src={require('./img/connect-wallet-qr-modal.png').default} width="600" alt="Connect Wallet Modal" />
</p>

Once the user scans the QR code with his Enjin wallet app (or any other wallet with WalletConnect & Enjin Blockchain support) he will be asked to approve the connection:

<p align="center">
  <img src={require('./img/approve-connection-request.jpg').default} width="600" alt="Approve Connection Request" />
</p>

Once a connection was made, you'll receive a list of all addresses connected from your user's wallet.  
Now you are able to send any transaction request to your user's wallet.  
To demonstrate a sample transaction request, click the "**Submit Transaction with Polkadot.JS**" button on one of the displayed addresses.

<p align="center">
  <img src={require('./img/connected-wallets.png').default} width="600" alt="Connected Wallets" />
</p>

A Transaction Request dialog will pop up on user's connected wallet app, asking for approval.

<p align="center">
  <img src={require('./img/confirm-txn-request.jpg').default} width="600" alt="Confirm Transaction Request" />
</p>

Once the transaction request is confirmed by the user, his wallet will sign and broadcast a message saying "I am signing this transaction!".

In the next section, you'll learn how to construct your own transaction requests using Enjin Platform API

## How to construct a custom transaction?

In the example above, we have sent a request to broadcast a transaction that was already constructed for us.  
But how was that transaction constructed and how can we send any transaction we want? Let's find out!

At `examples/react-next/pages/api`, there's two endpoints we'll be using:

- `transaction.tsx` endpoint which constructs the transaction
- `send.tsx` which broadcasts the transaction request to the blockchain using Enjin Platform API.

First, we need to insert our Enjin platform API key to be able to interact with it.  
If you haven't created an api key yet, you can do so in https://platform.canary.enjin.io/settings.

In both `examples/react-next/pages/api/transaction.tsx` and `examples/react-next/pages/api/send.tsx` files, replace `your-api-key` with your api key (note, there's three different api key fields that needs to be updated).

Once we've configured the Enjin Platform API key, rebuild and restart the project:

:::info **Note:**
The commands below are Bash commands, which are commonly run in a Unix-like environment (such as macOS, or Linux).  
Windows users may encounter errors if they try running these commands directly in Command Prompt or PowerShell.  
To run them successfully on Windows, use a Bash-compatible terminal, like [Git Bash](https://gitforwindows.org/).
:::

```bash
yarn build:workspace
yarn start:react-next
```

Now that the project is authenticated with the Enjin Platform, we can go ahead and press the "**Submit Transaction with Platform**" button.  
A `CreateCollection` request will be sent to your wallet, and once confirmed, the transaction will be signed and broadcasted to the blockchain.  
Now it's time to break it down and understand how it works:

### Step #1: Constructing the transaction call

We are constructing the transaction using the `transaction.tsx` endpoint.  
First, we make a query to the user's address to get its nonce:

```javascript
  const walletResponse = await fetch('https://platform.canary.enjin.io/graphql', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-key',
    },
    body: JSON.stringify({
      query: `query GetWallet($account: String!) {
        GetWallet(account: $account) {
            nonce
        }
    }`,
      variables: {
        account: req.query.address
      }
    })
  });
```

Once we get the nonce, we prepare the `CreateCollection` transaction call using Enjin Platform API.  
You can use any other mutation Enjin Platform API offers, but for this example we're using CreateCollection.

```javascript
  const response = await fetch('https://platform.canary.enjin.io/graphql', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-key',
    },
    body: JSON.stringify({
      query: `mutation CreateCollection($nonce: Int!, $signingAccount: String!) {
        CreateCollection(
            mintPolicy: { forceSingleMint: false },
            signingAccount: $signingAccount
        ) {
            id
            signingPayloadJson(nonce: $nonce)
        }
    }`,
      variables: {
        signingAccount: req.query.address,
        nonce: nonce
      }
    })
  });
```

We are also passing the `signingAccount`. This is necessary so your daemon doesn't sign the transaction.  
In the mutation response, we're asking for the `id` and `signingPayloadJson`, which we will use in the next step.

### Step #2: Sending the Transaction Request to user's wallet

With the payload in hand we pass that to our WalletConnect signer and ask it to sign. In the example project, this is done at: `examples/react-next/components/AccountBox.tsx` 

```javascript
const txId = data?.data?.CreateCollection?.id;
const payload = data?.data?.CreateCollection?.signingPayloadJson;
const { signature } = await signer?.signPayload(payload)
```

The above will trigger the Transaction Request dialog you saw previously, asking for the user to confirm signing the transaction.

### Step #3: Broadcasting the signed transaction

Finally, we received the `txId`, `signature`, and `payload` from the user's wallet.  
We can now broadcast the signed transaction to the blockchain using the Enjin Platform API `SendTransaction` mutation.  
This is done at: `examples/react-next/pages/api/send.tsx`

```javascript
  const response = await fetch('https://platform.canary.enjin.io/graphql', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-key',
    },
    body: JSON.stringify({
      query: `mutation SendTransaction($id: Int!, $signingPayloadJson: Object!, $signature: String!) {
        SendTransaction(id: $id, signingPayloadJson: $signingPayloadJson, signature: $signature)
    }`,
      variables: {
        id: Number.parseInt(req.query.id),
        signingPayloadJson: JSON.parse(req.query.signingPayloadJson),
        signature: req.query.signature
      }
    })
  });
```

The Enjin Platform will broadcast the transaction to the blockchain and keep track of it.  
You can see the transaction status in Enjin Platform: https://platform.canary.enjin.io/transactions

***

**Congratulations!** you can now send any transaction request to your user's wallets.
