---
title: "Enjin Blockchain Nodes"
slug: "enjin-blockchain"
excerpt: "The perfect blockchain for Web3 gaming."
hidden: false
createdAt: "Tue Oct 31 2023 22:51:51 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Nov 30 2023 13:56:28 GMT+0000 (Coordinated Universal Time)"
---
> 📘 [Enjin Console](https://console.enjin.io/) is a visual interface used to interact with the Enjin Blockchain

# What is Enjin Blockchain?

The Enjin Blockchain is a Layer 1 protocol designed with native NFT functionalities embedded within the protocol layer. The network is scalable and efficient because it is governed by a delegated Proof-of-Stake (<<glossary:PoS>>) consensus protocol. At the time of writing the Enjin <<glossary:Relaychain>> is able to process over 5,000 transactions per second (<<glossary:TPS>>).

This documentation provides technical details and guidance for developers aiming to integrate with or leverage the Enjin Blockchain's capabilities.

Enjin Blockchain is made up of the Enjin Relaychain and the Enjin <<glossary:Matrixchain>>. 

![](https://files.readme.io/a99688a-image.png)

# Enjin Relaychain

The Enjin Relaychain serves as the central backbone of the Enjin ecosystem. It acts as a hub where each <<glossary:Validator>> can <<glossary:Stake>> their holdings in ENJ and undergo validation processes. The Relaychain primarily focuses on a limited set of transaction types, which encompass various ways to engage with the governance mechanism. Its purpose is deliberately streamlined, purposely omitting support for smart contracts. The primary function of the Relaychain revolves around system coordination, encompassing both itself and the interconnected Matrixchains. Meanwhile, specific tasks and functionalities are delegated to the Matrixchains, each with unique implementations and features.

In essence, a Matrixchain represents an application-specific data structure that possesses global coherence and can be validated by the validators participating in the Relaychain. These Matrixchains are specifically designed to cater to the needs of different projects, offering specialized functionalities tailored to non-fungible tokens (NFTs). This allows for customization options and isolated data storage, empowering various projects to establish their own distinctive internal economies.

# Enjin Matrixchain

The Enjin Matrixchain, on the other hand, stands as a decentralized, permissionless, and trustless network that provides opportunities for anyone to operate a <<glossary:Node>> and actively participate in the network's activities. The network's underlying architecture aims to create a scalable and secure platform dedicated to NFTs at the protocol level. Leveraging the Substrate framework, the Enjin Matrixchain endeavors to deliver a robust infrastructure that ensures the seamless functioning and growth of the NFT ecosystem.