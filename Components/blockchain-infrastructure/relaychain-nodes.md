---
title: "Running Relaychain Nodes"
slug: "relaychain-nodes"
excerpt: ""
hidden: false
metadata: 
image: []
robots: "index"
createdAt: "Tue Oct 31 2023 03:25:55 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Nov 01 2023 00:38:57 GMT+0000 (Coordinated Universal Time)"
---
There are two different ways in which you can a Node, the first one being through Docker, and the second one through a Binary (either precompiled or [Built from Source](/docs/building-from-source)).

# Docker

> 📘 The Docker Image can be found on Docker Hub at: [enjin/relaychain](https://hub.docker.com/r/enjin/relaychain)

You can use the following `docker-compose.yml` file:

```
services:  
  relaychain:  
    container_name: relaychain  
    image: enjin/relaychain:latest  
    ports:  
      - 9933:9933  
      - 9944:9944  
      - 9615:9615  
      - 30333:30333  
      - 30334:30334  
    volumes:  
      - /MY/LOCAL/DIRECTORY:/chainstate  
    command: [  
      "--name=enjin-relay-docker",  
      "--ws-external",  
      "--rpc-external",  
      "--rpc-cors=all",  
      "--chain=enjin",  
      "--base-path=/chainstate"  
    ]
```

Simply run the command docker-compose up -d to run the container.

# Binary

## Command

`$ ./enjin --name "enjin-relay-docker" --ws-external --rpc-external --chain enjin`

Connecting to your node

Depending on the use case, there are a couple of ways to connect to the node:

- WebSocket Connection: ws://localhost:9944
- RPC (HTTP) Connection: http\://localhost:9933

# Archive Node

In order to run an archive node, the following argument needs to be passed to either the binary or added to the command section of the `docker-compose.yml` file:

`--pruning=archive`

This should be appended after line 19 in the `docker-compose.yml` file, or at the end of the Binary execution command.