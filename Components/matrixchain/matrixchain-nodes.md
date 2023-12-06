---
title: "Running Matrixchain Nodes"
slug: "matrixchain-nodes"
excerpt: ""
hidden: false
metadata: 
image: []
robots: "index"
createdAt: "Tue Oct 31 2023 03:26:08 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Nov 01 2023 00:39:10 GMT+0000 (Coordinated Universal Time)"
---
There are two different ways in which you can a Node, the first one being through Docker, and the second one through a Binary (either precompiled or [Built from Source](/docs/building-from-source)).

> 🚧 Currently, it is not possible to run a Enjin Matrixchain collator node.
> 
> This guide will be updated once that option is available.

# Docker

> 📘 The Docker Image can be found on Docker Hub at: [enjin/matrixchain](https://hub.docker.com/r/enjin/matrixchain)

You can use the following `docker-compose.yml` file:

```
services:  
  matrixchain:  
    container_name: matrxichain  
    image: enjin/matrixchain:latest  
    ports:  
      - 9933:9933  
      - 9615:9615  
      - 30333:30333  
      - 30334:30334  
    volumes:  
      - /MY/LOCAL/DIRECTORY:/chainstate  
    command: [  
      "--name=enjin-matrix-docker",  
      "--rpc-external",  
      "--rpc-cors=all",  
      "--chain=mainnet",  
      "--base-path=/chainstate",  
      "--",  
      "--name=enjin-matrix-docker",  
      "--port=30334",  
      "--chain=enjin",  
      "--base-path=/chainstate"  
    ]
```

Simply run the command `docker-compose up -d` to run the container.

# Binary

## Command

```
$ ./matrix --name "enjin-matrix-docker" --rpc-external --chain mainnet  
    -- --name="enjin-matrix-docker" --port 30334 --chain enjin
```

## Connecting to your node

Depending on the use case, there are a couple of ways to connect to the node:

- WebSocket Connection: `ws://localhost:9933`
- HTTP Connection: `http://localhost:9933`

# Archive Node

In order to run an archive node, the following argument needs to be passed to either the binary or added to the command section of the `docker-compose.yml` file:

`--state-pruning archive`  
`--blocks-pruning archive`

These two arguments should be appended after line 19 in the `docker-compose.yml` file, or just before the backslash (`\`) on line 1 (end of line) of the Binary execution command.