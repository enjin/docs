---
title: "Quick Start Guide"
slug: "quick-start-guide"
description: "Begin your journey with Enjin's blockchain ecosystem using our Quick Start Guide. Learn how to integrate blockchain items into your projects seamlessly"
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';

# Enjin Quick Start Guide

Welcome! This guide provides the essential steps to quickly integrate the <GlossaryTerm id="enjin_blockchain" /> and <GlossaryTerm id="nft" />s into your game or application using the <GlossaryTerm id="enjin_platform" />. We'll use the <GlossaryTerm id="canary" /> testnet for a safe and free development environment.

:::info **By the end of this guide, you will have:**

- Set up your developer account on the <GlossaryTerm id="enjin_platform_cloud" />.
- Set up the <GlossaryTerm id="wallet_daemon" /> to sign your transactions automatically.
- Funded your daemon's wallet with cENJ from the built-in Canary faucet.
- Created your first blockchain <GlossaryTerm id="collection" /> and <GlossaryTerm id="nft" />.
- Sent a token to a wallet address.
- Read the tokens held by a wallet address.
:::

## 1. Create Your Enjin Platform Account

### What is the Enjin Platform?

The Enjin Platform is your central hub for managing blockchain projects, collections, and digital items (NFTs and Fungible Tokens). We'll start by creating an account on the Enjin Platform. We'll use the Canary testnet throughout this guide so you can experiment without using real funds or affecting the main network.

### Steps to Create an Account:

1.  Navigate to the Enjin Platform: https://platform.beta.enjin.io/
2.  Click on the "Create an account" button.
3.  Fill in your account credentials and click on the "Register" button.
4.  Verify your email address by clicking the link sent to your inbox.
5.  Log in to your newly created Enjin Platform account.

## 2. Set Up the Wallet Daemon for Signing Transactions

### Why a Wallet Daemon?

Every on-chain action you initiate through the Platform — creating a collection, minting a token, transferring — needs to be signed by an account that holds funds. The **Enjin <GlossaryTerm id="wallet_daemon" />** is a small service that runs alongside the Platform and signs your transactions automatically as you submit them, so you don't have to approve each one manually.

### Steps to Set Up:

1. On the [Account Settings](https://platform.beta.enjin.io/settings) page, click **Create API Token** and copy the new token somewhere safe.
2. Follow the [Wallet Daemon Setup guide](/01-getting-started/06-using-wallet-daemon.md) to download, configure, and run the daemon. It will use the API token from step 1 to know which Platform account to sign for.

Once the daemon is running and connected, every transaction you submit from this Platform account is signed automatically.

:::tip Get cENJ for testing
To create or transact on Canary, your daemon's wallet needs some cENJ to cover fees and deposits. See [Get Test Funds (Canary Faucet)](/01-getting-started/04-using-the-enjin-platform.md#canary-faucet) — one click in the dashboard drops 250 cENJ into your daemon's wallet.
:::

## 3. Create Your First Collection and Token

### What are Collections and Tokens?
Let's define the core building blocks for your digital items on the <GlossaryTerm id="enjin_blockchain" />:

- **Collection:** Think of a <GlossaryTerm id="collection" /> as a container or category for your digital items. It helps organize items related to your specific game, application, or a particular series. All items within a collection share certain base properties defined when you create the collection.
- **Token (`multiToken`):** A **Token** represents the actual digital item that users can own within a Collection. On the Enjin Blockchain, all tokens fundamentally exist as **<GlossaryTerm id="multitoken" />s**. This is a core feature built directly into the blockchain protocol itself.

:::tip Structuring Your Project
A common approach is to create:
-   **One Collection** for your entire game or application.
-   **Multiple Tokens** within that collection, representing the various items, characters, achievements, or currencies your users can own.
:::

### Steps for creating a collection and token:

:::info **Ways to Create Blockchain Requests:**
You can interact with the Enjin Platform and initiate blockchain requests in several ways:
-   **Manually:** Using the user interface of the Enjin Platform Cloud.
-   **Programmatically:**
    -   Sending **direct HTTP requests** to the [Enjin GraphQL API](/01-getting-started/05-using-enjin-api/05-using-enjin-api.md).
    -   Using the [**official Enjin SDKs**](/02-guides/01-platform/04-software-development-kit/04-software-development-kit.md):
        -   [C# SDK](https://github.com/enjin/platform-csharp-sdk)
        -   [C++ SDK](https://github.com/enjin/platform-cpp-sdk)
    - **Other Languages:** The [Guides section](/category/integration-guides) provides code snippets for GraphQL, cURL, JavaScript, Node.JS, and Python for most operations.
    - **AI Assistant:** Utilize the [Enjin Platform AI assistant](https://chatgpt.com/g/g-678f70643d2c8191a78baff699e46e5f-enjin-platform-ai) to help construct API calls.
:::

1.  **Create Collection:**
    -   In the Platform menu, navigate to **[Collections](https://platform.beta.enjin.io/collections)** and click the "**Create Collection**" button.
    -   Customize your collection — you can specify its Mint Policy, Royalties, Explicit Royalty Currencies, and Attributes.
    To learn more about collection configuration, see the [Create Collections guide](/02-guides/01-platform/01-managing-tokens/01-creating-collections.md).
    -   Click **Create** to submit. The Wallet Daemon signs and broadcasts the transaction automatically — watch it move from `PENDING` → `BROADCAST` → `FINALIZED` on the [Transactions page](https://platform.beta.enjin.io/transactions).
    -   Once finalized, the new collection appears on the [Collections page](https://platform.beta.enjin.io/collections) with its assigned `id`. Keep that id handy for the next step.
    ![A collection with the collection ID next to it](/img/getting-started/v3-collection-card.png)
2.  **Create Token:**
    -   Open the [Collections page](https://platform.beta.enjin.io/collections), click the collection you just created, then click the "**Create Token**" button at the top of the collection's page.
    -   Customize your token — Token ID, initial supply, cap, royalty behavior, and attributes.
    To learn more about token configuration, see the [Create Tokens guide](/02-guides/01-platform/01-managing-tokens/02-creating-tokens/02-creating-tokens.md).
    -   In the **Recipient** input field, paste the <GlossaryTerm id="address" /> of the wallet that should receive the token's initial supply. To send the supply to your own daemon's wallet, copy its address from the [Settings page](https://platform.beta.enjin.io/settings).
    -   Click **Create** to submit. The Wallet Daemon signs and broadcasts the transaction automatically; track it on the [Transactions page](https://platform.beta.enjin.io/transactions).

:::tip Programmatic Creation
You can also create collections and tokens using the API or SDKs.

➡️ **See Guides:**
-   [Guide: Create Collections Programmatically](/02-guides/01-platform/01-managing-tokens/01-creating-collections.md#option-b-using-the-enjin-api--sdks)
-   [Guide: Create Tokens Programmatically](/02-guides/01-platform/01-managing-tokens/02-creating-tokens/02-creating-tokens.md#option-b-using-the-enjin-api--sdks)
:::

## 4. Link a User's Wallet to Your Application

### Why Link User Wallets?

To interact with a specific user's blockchain items (check their holdings, send them items), you need to know their public wallet address and have proof they control it. This process involves **verifying** the user's ownership of their wallet and then **associating** that verified wallet address with their account within your application's database. This association is what allows you to connect their in-app identity with their blockchain identity.

The typical flow for this is:

1.  Your application requests a unique wallet verification challenge from the Enjin API.
2.  Your application surfaces the challenge to the user (for example, via a QR code or a deep link).
3.  The user approves the request in their wallet, securely providing your application with their public wallet address.
4.  Your application then saves this verified wallet address and **associates** it with the user's internal ID in your database.

Once this association (or "link") is established, you can:

  - Grant in-game perks based on NFT ownership.
  - Airdrop or transfer items directly to the user's associated wallet.
  - Display their relevant blockchain inventory within your app.

### Implementation

A native wallet linking flow is currently in development. Once it ships, this section will document the end-to-end implementation. In the meantime, you can have users share their wallet address directly (for example, by pasting it into a form) and use that address in the steps below.

:::info Reference
The [Linking User Wallets](/02-guides/01-platform/02-managing-users/01-connecting-user-wallets/02-verifying-wallets.md) page will become the full in-depth guide once the flow ships.
:::

## 5. Send a Token to a User

### Why Send Tokens?

This is a core interaction — transferring an NFT from your project's wallet (or another source) to a user's wallet. Common scenarios include:
-   Rewarding achievements.
-   In-app purchases.
-   Airdrops or giveaways.

### Implementation (GraphQL Example):

Sending a token uses the same `CreateTransaction` mutation as the rest of the Platform, with the `transferToken` field set on the `transaction` input. You'll need the recipient's address, the collection id, the token id, and the amount.

Run the following from the [Enjin Platform GraphiQL Playground](https://platform.beta.enjin.io/graphiql) — or from your own GraphQL client (in which case add `Authorization: Bearer <YOUR_API_TOKEN>` to your request headers):

```graphql
mutation TransferToken {
  CreateTransaction(
    network: CANARY
    chain: MATRIX
    transaction: {
      transferToken: {
        recipient: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"  # any wallet address you control for testing
        collectionId: 36105
        tokenId: 0
        amount: 1
      }
    }
  ) {
    uuid
    action
    state
  }
}
```

The Wallet Daemon signs and broadcasts automatically. The response includes the transaction's `uuid` — use it to poll status with `GetTransaction(network: CANARY, chain: MATRIX, uuid: "<returned-uuid>")` or watch the row on the [Transactions page](https://platform.beta.enjin.io/transactions).

Once finalized, the transfer event is emitted with the recipient and amount — see [Working with Events](/05-enjin-platform/03-working-with-events.md) for how to read it.

:::tip Learn more about sending tokens
Check the full in-depth guide: [Sending Tokens](/02-guides/01-platform/01-managing-tokens/05-transferring-tokens.md).
:::

## 6. Reading a User's Tokens

### Why Read User Tokens?

Once you know a user's wallet address, you'll often need to check which tokens they hold. This lets you:

-   Display their relevant inventory in your game or app interface.
-   Verify ownership of specific NFTs to grant access, perks, or abilities.
-   Trigger game logic based on the items they hold.

### Implementation (GraphQL Example):

Use the `GetAccount` query to read an address's holdings. Run this from the [GraphiQL Playground](https://platform.beta.enjin.io/graphiql) or your own GraphQL client:

```graphql
query FetchingWalletTokens {
  GetAccount(
    network: CANARY
    chain: MATRIX
    address: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"
  ) {
    address
    balance
    tokens {
      tokenId
      collection {
        id
      }
      attributes {
        key
        value
      }
    }
  }
}
```

`balance` is the address's total ENJ balance in base units — divide by 10^18 for ENJ. `tokens` lists every token the wallet currently holds across all collections.

:::info Per-token amount support is being added
`GetAccount` currently tells you *which* tokens a wallet holds (and each token's metadata), but not *how many* units of each. Per-holder balance support is in development — this query will include amount information once it ships.
:::

:::tip Learn more about reading user wallet balances
Check the full in-depth guide: [Reading User Wallet Balances](/02-guides/01-platform/02-managing-users/02-reading-user-wallets.md).
:::

## 7. Next Steps and Advanced Features

Congratulations! You've covered the basics of setting up your project on the Enjin Platform, creating items, and reading and transferring tokens.

:::warning **Ready for Production?**
Remember, this guide used the **Canary testnet** for development and testing. When you are ready to launch your application live, you will need to:
1.  Switch the network selector to **Enjin (mainnet)** in the [Enjin Platform Cloud](https://platform.beta.enjin.io/).
2.  Update your application's API calls or SDKs to target [**mainnet**](/01-getting-started/05-using-enjin-api/05-using-enjin-api.md#selecting-a-network-and-chain) by passing `network: ENJIN` on each query and mutation.
:::

Now you can explore more advanced integrations:

-   **On-Demand Minting:** Programmatically create *new* tokens directly into users' wallets based on real-time application events (e.g., crafting an item, completing a quest). This avoids pre-minting large supplies.
    ➡️ [Learn about On-Demand Minting](/02-guides/01-platform/01-managing-tokens/04-minting-a-token.md#option-b-using-the-enjin-api--sdks)
-   **Managed Wallets:** Simplify onboarding for users unfamiliar with crypto wallets. You can create and manage wallets for your users within the platform. Users can interact with blockchain features seamlessly, and later choose to export their items to their own self-custody Enjin Wallet if they wish. This significantly lowers the barrier to entry for Web2 users.
    ➡️ [Explore Managed Wallets](/02-guides/01-platform/02-managing-users/03-using-managed-wallets.md)
