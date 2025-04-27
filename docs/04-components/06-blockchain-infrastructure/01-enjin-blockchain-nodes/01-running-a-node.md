---
title: "Hosting an Enjin Node"
slug: "running-a-node"
excerpt: "Running an Enjin node allows you to connect to the Enjin network, expose the RPC endpoint, and author blocks. This guide walks you through the process of running your own node locally and on a remote server."
hidden: false
createdAt: "Sun Jul 14 2024 16:45:39 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Sep 19 2024 10:07:44 GMT+0000 (Coordinated Universal Time)"
---
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

:::tip
It is recommended to have more disk space available (512 GB+) if you are running an Archive Node.
:::

## Ports

This table shows the default ports that are used by the Enjin Matrixchain node and embedded Relaychain node:

| Description     | Ingress Port         | Egress Port               |
| :-------------- | :------------------- | :------------------------ |
| P2P             | **TCP** 30333, 30334 | **TCP** 443, 30333, 30334 |
| RPC (HTTP & WS) | **TCP** 9933         | -                         |
| Prometheus      | **TCP** 9615         | -                         |

This table shows the ports that are recommended to be exposed depending on the type of node you are running:

| Description     | Archive / RPC | Collator / Validator |
| :-------------- | :------------ | :------------------- |
| P2P             | **required**  | **required**         |
| RPC (HTTP & WS) | ✅             | ❌                    |
| Prometheus      | ✅             | ✅                    |

# Advanced

This section covers advanced topics associated with running the Enjin node.

## Node Key

Substrate nodes use node keys for identification in peer-to-peer communication. To generate a node key, use the [subkey tool](https://docs.substrate.io/reference/command-line-tools/subkey/), which can be downloaded using the following command:

`cargo install --force --git https://github.com/paritytech/substrate subkey`

After installing the [subkey tool](https://docs.substrate.io/reference/command-line-tools/subkey/), you can generate the node key using the following command:

`subkey generate-node-key --file ./node.key # or any other path`

## Purging the chain

To begin anew, without any chain history, you may want to purge the chain.

:::danger
The following will command will purge the chain data for the Enjin Matrixchain
:::

`./target/release/matrixchain purge-chain --chain mainnet`
