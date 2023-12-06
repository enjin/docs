---
title: "Self Hosting"
slug: "overview"
excerpt: "Taking complete control of the Enjin Platform."
hidden: false
createdAt: "Wed Nov 01 2023 00:15:25 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Nov 30 2023 00:30:56 GMT+0000 (Coordinated Universal Time)"
---
There are two version of the Enjin Platform

- The [Cloud Platform](http://platform.enjin.io/) is a cloud-hosted version that you can start using straight away.
- The [Open-Source Platform](https://github.com/enjin/platform)  is a self-hosted solution that offers customization and full control over the software.

# Choosing the Right Platform for You

Deciding between the Enjin Platform and Enjin Platform Cloud depends on your needs and skills.

- **Enjin Platform Cloud**: Ideal if you're new to Enjin or don't want to manage your own infrastructure. It's user-friendly, easy to learn and allows you to process up to 100,000 operations per day. 

- **Self-Hosted Enjin Platform**: Best for those who are more tech-savvy. It gives you full control over the data and source code, allowing you to customize the platform extensively, including adding new features. However, running it requires systems administration skills. You'll need to handle backups, updates, server maintenance, and set up internet access and SSL certificates for the platform.

> 🚧 Reading Third-Party Tokens
> 
> The Cloud Platform is set up to show only the collections and tokens you've made using its services. 
> 
> This helps to simplify your view and management of these items. 
> 
> If you need to access collections or tokens not made through your cloud account, you use the [Open-Source Platform](https://github.com/enjin/platform).

# Advantages of Self-Hosting the Enjin Platform

Self-hosting offers significant benefits for app development:

- **Seamless Transactions**: Includes transaction retries, wallet nonce management, and gas estimation for smooth operations.
- **Comprehensive Web3 Tools**: Offers a blockchain indexer, GraphQL API, and other vital infrastructure for efficient blockchain interaction.
- **Reliable Server Performance**: Features a production-grade HTTP server, ensuring robust app hosting.
- **Scalability and Flexibility**: Highly scalable, supports millions of users, and fully customizable to meet specific needs.
- **Efficient Data Handling**: Fast blockchain data retrieval with advanced filtering, and real-time updates through subscriptions to events.
- **Automated Processes**: Supports automated wallet management and asset transfers, streamlining user interactions.
- **Enhanced Data Integrity**: Includes quick sync and auto-healing features for maintaining up-to-date and accurate database information.

# Real-time Platform Architecture

The package consists of three main components:

## Indexer

Our package includes a blockchain indexer that quickly retrieves blockchain data, speeding up the process compared to direct chain queries. It also allows for creating relationships and filtering data in ways not possible with direct queries.

## APIs

Our GraphQL API offers a server-based interface for a variety of queries and mutations, enabling easy access to information and transaction execution on the blockchain.

## Events

The Enjin Platform allows developers to subscribe to events for real-time updates on blockchain activities, reducing the need for constant API checks. This simplifies blockchain interactions by eliminating complex tasks like encoding and transaction signing.

# Understandig the API and Indexer

The Enjin Platform uses an indexer for fast blockchain data retrieval, bypassing slower direct queries. It employs GraphQL as its main API, allowing developers to efficiently access only the data they need, which enhances performance and reduces bandwidth.

Enabled Automation

- Request for user proof;
- Authentication request;
- Creating managed wallets;
- Wallet linking and switching;
- Asset transfer and management;
- Enjin Beam support;
- Fuel Tanks support;
- Marketplace support.

The Enjin Platform indexer is designed to minimize the blockchain's storage and database growth. Indexers organize data, making it easier for developers to retrieve the necessary information.

### Data Management Tool

The Data Management Tool from Indexers organizes and structures blockchain data. 

It creates a centralized database, making it easier for game developers to access specific data they need without sorting through all blockchain data.

### Quick Sync Method

The Enjin Platform features a quick sync method allowing developers to rapidly update and store the latest blockchain state using a pre-packaged index. 

This method saves time by avoiding full blockchain syncing. 

A "Worker" service manages and processes all blockchain blocks and their associated events.

### Auto-Healing Feature

The Enjin Platform has an auto-healing feature that constantly checks the database's health. 

If it finds problems like corruption or mismatches, it automatically updates to match the current blockchain state, keeping data accurate and current.

### Events & WebSockets

The Enjin Platform sends notifications through WebSocket channels about activities on the platform. 

For instance, it alerts when a new collection is created. Clients can get these updates by subscribing their wallets to the WebSocket channel via the Enjin Wallet Daemon. 

This daemon not only checks for transactions to sign but also listens for these event notifications, enabling real-time interaction and dynamic experiences on the platform.

> 👍 [Download the Self-Hosted Platform](https://github.com/enjin/platform)