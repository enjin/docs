---
title: "Enjin Platform"
slug: "../enjin-platform"
description: "Discover the Enjin Platform, a comprehensive suite of tools for building, managing, and integrating blockchain-based assets in your projects."
---
:::info There are three versions of the Enjin Platform to choose from:
- The [Enjin Platform Cloud (Testnet)](https://platform.canary.enjin.io/login), connected to Enjin Canary Testnet
- The [Enjin Platform Cloud (Mainnet)](http://platform.enjin.io/), connected to Enjin Blockchain Mainnet
- The [Enterprise On-Prem Enjin Platform](https://github.com/enjin/platform) where you can choose to connect to either network.
:::

## What is the Enjin Platform?

The Enjin Platform is the world’s most powerful and advanced open-source framework for building NFT platforms and integrations. It allows developers and their projects to easily communicate with the Enjin Blockchain, forming a light-weight and modular layer between the blockchain, and their applications.

It's the bridge between the complex world of blockchain and user-friendly applications, minimizing the technical barriers usually associated with blockchain integration. This is achieved through a lightweight, modular layer that uses a modern, flexible GraphQL API. This layer manages all blockchain interactions, thus removing the necessity of engaging with traditional smart contracts directly.

Consider the Enjin Platform as your digital interpreter, simplifying your communication with the blockchain. It enables you to create collections, mint and transfer blockchain tokens, and even administer blockchain collections and wallets with ease.

The Enjin Platform works much like a customizable building set. It has a modular design, which means you can add or take away pieces as needed. These pieces come in the form of optional add-on packages. They provide extra tools, such as managing Fuel Tanks, handling marketplace listings (through the marketplace package), or generating Enjin Beams via the API (with the Enjin Beam package). In other words, with the Enjin Platform, you get a customized setup that fits your specific needs.

This versatile platform offers two versions to cater to different needs. The [Enterprise On-Prem](https://github.com/enjin/platform), self-hosted version provides you with comprehensive control over your data, eliminating dependence on any third-party servers or services. Enjin also offers a hosted version, the Enjin Platform Cloud ([mainnet ](https://platform.enjin.io/)\|[ canary](https://platform.canary.enjin.io/)), tailored for users seeking rapid integration. You can choose the version that best fits your requirements.

![](/img/components/4.png)

## How does it work?

How does Enjin Platform bring all these functionalities together? The answer lies in its structure. The platform comprises distinct components each designed to offer a unique solution for developers and creators. 

<p align="center">
  <img src={require('/img/components/5.png').default} width="700" />
</p>

### API & Schema

The [Open-Source Enjin Platform](https://github.com/enjin/platform) also provides a ready-made application that simplifies blockchain actions for developers by removing the need for encoding, signing transactions, and understanding complex technical details. 

The project has two key components:

- **Enjin API:** Our GraphQL API provides a server-based interface that allows you to execute a range of queries and mutations. In other words, you can easily retrieve necessary information or execute transactions on the blockchain.
- **Events:** With the Enjin Platform, developers can subscribe to events and receive real-time updates on any on-chain activities, eliminating the need to constantly poll the API for changes.

### Wallet Daemon

The [Wallet Daemon](https://github.com/enjin/wallet-daemon) is the component responsible for automatically signing and broadcasting transactions to the Enjin Blockchain. Running on your own secure server, the Wallet Daemon removes the need for manual signing of each transaction by polling the Enjin Platform in 6-second intervals, fetching new transaction requests, signing them with your private key, and submitting them to a blockchain node. As the Wallet Daemon keeps track of the nonce locally, it can process and submit more than one transaction per block.

### SDKs

With the release of the Enjin Platform, we’re preparing multiple SDKs to further streamline integration into your projects. Our first release includes the open-source [C# SDK](https://github.com/enjin/platform-csharp-sdk) for connecting and interacting with the Enjin Platform.

Want to learn more about our SDKs? Dive into our documentation [here](/02-guides/01-platform/04-software-development-kit/04-software-development-kit.md).

## Notable Platform Features

The Enjin Platform is packed with features designed to make your life as a developer easier. Here's a glimpse of what's in store:

### Enabled Automation

- **User-validation requests:** A swift way to establish user identities
- **Authentication requests:** Seamless process to secure sessions
- **Managed wallet creation:** Forget the complex coding, create wallets with a few clicks
- **Wallet linking and switching:** Easily manage multiple wallets and switch between them
- **Asset transfer and management:** Smoothly transfer and manage your digital assets
- **Enjin Beam support:** Leverage Enjin Beams for unique offerings
- **Fuel Tanks support:** Efficiently manage your fuel tanks for subsidizing transaction fees
- **Marketplace support:** Create and manage marketplace listings with ease
- **Relaychain auto-teleport:** Any Relaychain ENJ mistakenly sent to managed wallet will be automatically teleported to Matrixchain

### Data Management Tool

Simplify data organization with our Data Management Tool. Provided by Indexers, it structures and organizes blockchain data by creating a centralized database from blockchain inputs. This means you, as a developer, can access specific data without sifting through the entire blockchain database.

### Quick Sync Method

The Enjin Platform offers a quick sync method that enables developers to fetch and store the most recent state of the blockchain in a pre-packaged index. This saves time and effort that would otherwise be spent on syncing the entire blockchain. The "Worker" service oversees and manages all the blocks produced in the blockchain and parses all extrinsic events in each block.

### Auto-Healing Feature

The Enjin Platform includes an auto-healing feature that continuously monitors the health of the database. If any issues arise, such as corruption or a saving mismatch, the platform automatically re-syncs with the current chain state to ensure that all data is correct and up-to-date.

### Relaychain ENJ Auto-teleport

The Enjin Ecosystem is composed of two distinct chains: the Enjin Relaychain, which handles Staking and Governance, and the Enjin Matrixchain, a hub for NFTs and marketplace functionalities. There can be a potential misunderstanding when users purchase ENJ on an exchange and deposit it into a Dapp's managed wallet on the Relaychain. This is because the Dapp creator anticipates the deposit on the Matrixchain, not the Relaychain. To address this, we've introduced the Auto-Teleport feature. This feature automatically teleports any Relaychain ENJ received in a managed wallet to the corresponding Matrixchain. It streamlines the process, eliminates room for error and the need for manual teleportation.

### Modular Design

The Enjin Platform is designed with a light, modular structure, allowing developers to custom-fit the integration depending on their requirements and design philosophy. The Platform and Platform Core provide fundamental functionality, while multiple optional packages are available to expand your integration. You can enhance the Platform's capabilities without modifying the core codebase.

Developers may further augment their Enjin Platform configuration by integrating [Laravel Horizon](https://laravel.com/docs/10.x/horizon), translating all Platform data into a visually appealing dashboard.

Everyone is welcome to contribute to the codebase and build upon the framework. Don’t forget to [Follow Enjin on GitHub](https://github.com/enjin)!

### Platform User Interface

The Enjin Platform comes with a lightweight and easy-to-use user interface. The graphical interface comes with GUI forms for creating, viewing, managing collections & NFTs. You can also extend the UI with additional components like Beams and Fuel Tanks, depending on their availability and installation.

![](/img/components/6.png)

The user interface is available as a [standalone application](https://github.com/enjin/platform-ui) for the Enterprise On-Prem Enjin Platform, but comes standard when using the Enjin-hosted implementation of the [Enjin Platform](https://platform.enjin.io/).

## Enjin Platform Cloud

The modularity and flexibility of the Enjin Platform can be daunting for first-timers - which is exactly why we’ve rolled out the Enjin Platform Cloud!

This user-friendly version allows you to kickstart your next NFT project in just a few minutes. Ran on Enjin's robust servers, yet fully secure and isolated to your unique project instance, you can launch your NFT game with a few simple steps. Just create an account, set it up, generate your first API key, and voila! Your NFT game is operational. The [Wallet Daemon](https://github.com/enjin/wallet-daemon) on your own server securely handles the signing and broadcasting of all transactions, ensuring the utmost integrity of your project's security.

Get started today on [mainnet](https://platform.enjin.io/register) or [canary](https://platform.canary.enjin.io/register).
