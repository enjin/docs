---
title: "Enjin Platform"
slug: "../enjin-platform"
description: "The Enjin Platform is a cloud-based GraphQL API for building, managing, and integrating blockchain-based assets in your applications."
---

The Enjin Platform is the bridge between your application and the Enjin Blockchain.

## What is the Enjin Platform?

The Enjin Platform is a cloud-based GraphQL API for building NFT-powered applications. It removes the complexity of encoding extrinsics, managing nonces, and signing transactions — letting you mint, transfer, and manage on-chain assets through clean, high-level mutations.

Both Enjin Mainnet and Canary Testnet are reached through a single endpoint, selected per request. Whether you're prototyping on Canary or shipping on Mainnet, you use the same API token and the same queries.

Think of the platform as your digital interpreter — simplifying communication with the chain so your application can focus on its product (game mechanics, marketplace UX, or whatever your project does best).

## How does it work?

The platform comprises three main components, each handling a different layer of the integration.

<p align="center">
  <img src={require('/img/components/5.png').default} width="700" />
</p>

### GraphQL API

Our [GraphQL API](/01-getting-started/05-using-enjin-api/05-using-enjin-api.md) is the entry point for every interaction. It provides:

- **Queries** for reading blockchain state — accounts, tokens, collections, marketplace listings, nomination pools, and transactions.
- **Mutations** for building and broadcasting transactions. All on-chain actions go through a single `CreateTransaction` mutation, with the specific action selected via the `transaction` input (e.g. `createCollection`, `mintToken`, `transferToken`).
- **Events** for real-time updates — subscribe to receive on-chain events as they fire, instead of polling. See [Working with Events](/05-enjin-platform/03-working-with-events.md) for the current event-reading flow.

### Wallet Daemon

The [Wallet Daemon](/01-getting-started/06-using-wallet-daemon.md) is the signing service for your project. It runs on your own infrastructure, polls the platform for queued transactions, signs them with your private key, and submits them to the chain. Because it tracks nonce locally, it can submit multiple transactions per block.

### SDKs

SDKs make integrating the platform into your application easier by wrapping the GraphQL API in native libraries. The first releases are the [C# SDK](https://github.com/enjin/platform-csharp-sdk) and [C++ SDK](https://github.com/enjin/platform-cpp-sdk) — see the [Software Development Kits page](/02-guides/01-platform/04-software-development-kit/04-software-development-kit.md) for usage.

## Notable Platform Features

The Enjin Platform is packed with features designed to make your life as a developer easier. Here's a glimpse of what's in store:

- **Single endpoint, multi-chain routing** — reach both Enjin Mainnet and Canary Testnet, and target either the Matrixchain or the Relaychain, through one URL by changing a single argument on the request.
- **Managed wallet creation** — create platform-side wallets for your end users with [`CreateManagedWallet`](/02-guides/01-platform/02-managing-users/03-using-managed-wallets.md), and have your project's Wallet Daemon sign on their behalf.
- **Wallet linking and transaction requests** — link a player's Enjin Wallet to your application and send transaction-signing prompts directly to it. Use it for ownership verification, in-app authentication, or approving in-game actions like consuming items, listing on the marketplace, or staking ENJ.
- **Asset transfer and management** — transfer, mint, freeze, burn, and infuse tokens through the API. Bundle multiple actions into a single `CreateBatchTransaction` to commit them atomically.
- **Marketplace** — create [fixed-price, auction, and offer listings](/03-api-reference/02-mutations/06-marketplace-mutations.md), place bids, and answer counter-offers.
- **Fuel Tank dispatching** — dispatch transactions through an existing [Fuel Tank](/04-enjin-blockchain/03-enjin-matrixchain/02-fuel-tank-pallet.md) to subsidize transaction fees for your users.
- **Token Groups** — organize tokens within a collection into named groups for in-game categorization or access control. See [Token Groups mutations](/03-api-reference/02-mutations/07-token-groups-mutations.md).
- **Relaychain support** — stake ENJ into [nomination pools](/03-api-reference/02-mutations/08-nomination-pool-mutations.md) for staking rewards, directly through the platform.

### Platform Dashboard

The Enjin Platform comes with a [browser-based dashboard](/01-getting-started/04-using-the-enjin-platform.md) for creating, viewing, and managing collections, tokens, marketplace listings, and transactions — all without writing code. It's a fast way to prototype before committing to API integration, and stays useful as an admin tool once your application is live.

### Relaychain ENJ Auto-teleport

The Enjin Ecosystem is composed of two distinct chains: the Enjin Relaychain (which handles staking and governance) and the Enjin Matrixchain (a hub for NFTs and marketplace functionality). When users purchase ENJ on an exchange and deposit it into a Dapp's managed wallet, they sometimes send it to the Relaychain address — even though the Dapp expects the deposit on the Matrixchain. The Auto-teleport feature solves this: any Relaychain ENJ received in a managed wallet is automatically teleported to the corresponding Matrixchain address, removing room for error and the need for manual teleportation.

## Enjin Platform Cloud

The Enjin Platform is fully hosted, so there's nothing to install, deploy, or maintain on your side. Sign up, generate an API token, and start building — the platform handles node connectivity, indexing, scaling, and reliability for you.

Each project runs in its own isolated context on Enjin's infrastructure, with your API token scoping access. Signing stays under your control: a [Wallet Daemon](/01-getting-started/06-using-wallet-daemon.md) that you run holds your private keys and signs transactions before submitting them through the platform — keys never leave your environment.

[Create an account](https://platform.beta.enjin.io/register) to get started.
