---
title: "Running a Node"
slug: "running-a-node"
excerpt: ""
hidden: false
metadata: 
image: []
robots: "index"
createdAt: "Tue Oct 31 2023 22:53:58 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Sat Nov 11 2023 22:20:18 GMT+0000 (Coordinated Universal Time)"
---
Running an Enjin node allows you to connect to the Enjin network, expose the RPC endpoint, and author Matrixchain blocks. This guide walks you through the process of running your own node locally and on a remote server.

> 🚧 Currently, the functionality of running a collator node and the associated rewards system is not available. Please bear this in mind as you read through the following documentation. We will be sure to provide updates as soon as these features become available.

# Types of Nodes

Enjin supports three types of nodes, RPC, collator, and archive. Choosing the type of node that best suits your use case is crucial since each type has specific requirements and uses. The good news is that you only need to compile the node once, and then you can run it as an RPC node, collator, or archive node.

# RPC Node

An RPC node is a type of node that can connect to the Enjin network and participate in it. Typically, it is hosted on a remote server and accessed by client-side applications as an RPC or WS endpoint, serving as a connection interface to the Matrixchain. However, RPC nodes do not store the entire history of the chain, meaning they cannot provide historical data. It is important to consider this limitation when choosing an RPC node for your use case.

# Collator Node

A collator node is responsible for maintaining a Matrixchain by collecting transactions from users and producing state transition proofs for Relaychain validators. Collators also maintain a full node for the Relaychain and a full node for their particular Matrixchain. This means they retain all the necessary information to author new blocks and execute transactions the same way as validators do on current PoS blockchains. Typically, collators will collate and execute transactions to create a block, then broadcast it to other collators and Relaychain validators on the network.

# Archive Node

An archive node stores the complete history of the network and is typically used by developers for testing applications and running analytics. It is also used by blockchain explorers to enable users to explore the entire state of the chain, as well as by collators to verify the network's state. However, running an archive node requires significantly more disk space compared to other node types.

# Network Participation

Users can earn rewards by running a collator node to participate in the Enjin network. However, it's essential to understand that collators do not secure the network. In Enjin, PoA (Proof of Authority) consensus is used, and block producers or collators are chosen from the list of authorized validators. More collators do not necessarily mean a better or more secure network since Relaychain validators will reject an invalid Matrixchain block.  
Having too many collators can also slow down the network. The only power that collators possess is transaction censorship. To avoid censorship, a Matrixchain must have some neutral collators, but not necessarily a majority. In theory, the censorship problem can be solved by having only one honest collator.

# Staking

The management of collators on the Enjin Matrixchain is handled by the collator staking pallet. This pallet selects and rewards block producers for each round. Two types of rewards are generated for every block created, which are collected from transaction tips and fees. These fees are then transferred to the fee distribution account at the end of every block. The accumulated fees are then distributed at the end of every session by the Pools pallet to registered pools. Currently, the collator <<glossary:Pool>> receives a 70% share from the fee distribution. The collator staking pallet then distributes these rewards to collators at the end of each session using the funds received in the collator pool account.

# Rewards

The formula for calculating the block reward is:  
reward = `blocks_authored_by_collator \* reward_per_block`  
where `reward_per_block = total_reward_per_session / total_blocks_in_session`  
The rewards are then distributed depending on the type of collator:

- Invulnerable Collators: the fees are transferred back to the fee distribution account
- Other Collators: fees are transferred to collator accounts

# Collator selection

Collators are selected for each session based on the following criteria:

- Invulnerable nodes are always selected as collators
- The remaining number of collators (`MaxCollators - Invulnerables`) is filled with the top candidates ordered by total stake (Collator's own funds and nominators' funds).

Invulnerable nodes can only be set by governance or <<glossary:sudo>>.

# Requirements

In general, requirements for running an Enjin node are quite similar to running a Substrate node.

Therefore, if you are not sure about specific details, you can always refer to the [official Substrate documentation](https://substrate.dev/docs/en/knowledgebase/getting-started/). However, building a Matrixchain Node, i.e. Enjin Matrixchain node, requires a little more time and resources, since Matrixchain nodes also run a full Relaychain node.

## Hardware

For building and running an Enjin node, the recommended hardware is:

| Component  | Requirement           |
| :--------- | :-------------------- |
| OS         | Ubuntu 20.04 or newer |
| CPU        | 4 cores               |
| RAM        | 16 GB                 |
| Disk Space | 256 GB SSD            |

> 📘 It is recommended to have more disk space available (512 GB+) if you are running an Archive Node.

## Ports

This table shows the default ports that are used by the Enjin Matrixchain node and embedded Relaychain node:

[block:parameters]
{
  "data": {
    "h-0": "Description",
    "h-1": "Ingress Port",
    "h-2": "Egress Port",
    "0-0": "WS (Relaychain Only)",
    "0-1": "TCP 9944",
    "0-2": "-",
    "1-0": "RPC (HTTP & WS)",
    "1-1": "TCP 9933 -",
    "1-2": "",
    "2-0": "P2P",
    "2-1": "TCP 30333 - 30334",
    "2-2": "TCP 443  \nTCP 30333 -30334",
    "3-0": "Prometheus",
    "3-1": "TCP 9615",
    "3-2": "-"
  },
  "cols": 3,
  "rows": 4,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


This table shows the ports that are recommended to be exposed depending on the type of node you are running:

| Description | Archive  | Collator | RPC      |
| :---------- | :------- | :------- | :------- |
| WS          | ✅        | ❗        | ✅        |
| RPC         | ✅        | ❗        | ✅        |
| P2P         | required | required | required |
| Prometheus  | ✅        | ✅        | ✅        |

# Advanced

This section covers advanced topics associated with running the Enjin node.

## Node Key

Substrate nodes use node keys for identification in peer-to-peer communication. To generate a node key, use the [subkey tool](https://docs.substrate.io/reference/command-line-tools/subkey/), which can be downloaded using the following command:

`cargo install --force --git https://github.com/paritytech/substrate subkey`

After installing the [subkey tool](https://docs.substrate.io/reference/command-line-tools/subkey/), you can generate the node key using the following command:

`subkey generate-node-key --file ./node.key # or any other path`

## Purging the chain

To begin anew, without any chain history, you may want to purge the chain.

> ❗️ The following will command will purge the chain data for the Enjin Matrixchain

`./target/release/matrixchain purge-chain --chain mainnet`