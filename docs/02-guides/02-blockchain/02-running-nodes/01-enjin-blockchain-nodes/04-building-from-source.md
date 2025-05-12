---
title: "Build Node From Source"
slug: "build-node-from-source"
---
:::info This is an advanced guide
For pre-compiled binaries or for information on running a node via Docker, visit [Running a Node](/02-guides/02-blockchain/02-running-nodes/01-enjin-blockchain-nodes/01-running-a-node.md).
:::

## Building an Enjin Node

The process of building an Enjin node is time-consuming and can take up to 30 minutes, depending on your machine's specifications. Building the node locally is not required, but it is recommended.

First of all, the Enjin Matrixchain is written using the Substrate framework, which is written in Rust. Therefore, before compiling the code, you must ensure that your [Rust development environment](https://docs.substrate.io/install/) is set up.

:::note
This guide was tested in Ubuntu 20.04 and macOS 13 (Ventura).
:::

The following steps will build the latest version of the Enjin Matrixchain node from the master branch:

1. Install Rust and Substrate dependencies following the official [Substrate installation guide](https://docs.substrate.io/install/).
2. Clone the Enjin repository:  
   `git clone https://github.com/enjin/matrixchain.git`  
   `cd matrixchain`
3. Checkout the latest version of the code: `git checkout v3.1.4`
4. Build the node: `cargo build --release`

You will now find the compiled binary `at ./target/release/matrix`

You can follow [these instructions](/02-guides/02-blockchain/02-running-nodes/01-enjin-blockchain-nodes/02-run-relaychain-node.md#binary) on running the binary.
