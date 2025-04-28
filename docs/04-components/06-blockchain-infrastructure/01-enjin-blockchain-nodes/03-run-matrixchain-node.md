---
title: "Run a Matrixchain Node"
slug: "../run-matrixchain-node"
excerpt: ""
hidden: false
createdAt: "Sun Jul 14 2024 16:14:36 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Aug 09 2024 10:54:59 GMT+0000 (Coordinated Universal Time)"
---
There are two different ways in which you can a Node, the first one being through Docker, and the second one through a Binary (either precompiled or [Built from Source](/docs/building-from-source)).

:::warning Currently, it is not possible to run a Enjin Matrixchain collator node.
This guide will be updated once that option is available.
:::

# Docker

:::info
The Docker Image can be found on Docker Hub at: [enjin/matrixchain](https://hub.docker.com/r/enjin/matrixchain)  
In this example, we demonstrate using the version `latest`. However, in practice, we recommend statically setting this to a specific version (such as `v100`) and then performing manual upgrades to your nodes as and when appropriate. This is to ensure that your node doesn't inadvertently differ from one restart to the next. See the [Upgrading using Docker](https://docs.enjin.io/docs/matrixchain-nodes#upgrading-using-docker) section for more information.
:::

You can use the following `docker-compose.yml` file:

```yaml
services:
  matrixchain:
    container_name: matrxichain
    image: enjin/matrixchain:latest
    ports:
      - 9944:9944
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

```bash
$ ./matrix --name "enjin-matrix-docker" --rpc-external --chain mainnet  
    -- --name="enjin-matrix-docker" --port 30334 --chain enjin
```

## Connecting to your node

Depending on the use case, there are a couple of ways to connect to the node:

- WebSocket Connection: `ws://localhost:9944`
- HTTP Connection: `http://localhost:9944`

# Archive Node

In order to run an archive node, the following argument needs to be passed to either the binary or added to the command section of the `docker-compose.yml` file:

`--pruning archive`

These two arguments should be appended after line 19 in the `docker-compose.yml` file, or just before the backslash (`\`) on line 1 (end of line) of the Binary execution command.

# Upgrading

:::warning It is not always possible to downgrade a node.
In the event the node incurred a database upgrade, it is no longer possible to downgrade the node to an older version without first re-syncing the node.

Additionally, in the event an on-chain upgrade has been enacted that requires a newer node minimum version, it will not be possible to downgrade below that version as new blocks following the upgrade will fail to import.  
**Always keep your node version up-to-date.**
:::

In order to ensure compatibility with the chain at all times, and to ensure the best security, it is imperative that node operators keep their nodes up-to-date with each release that is published. The process of upgrading is incredibly simple, and in almost all cases, requires very little involvement by the node operator. This is because, the node will automatically detect when it's using an older version of the database and automatically upgrade it to the latest one that is compatible with the 

We recommend that node operators subscribe to our mailing list [mailing-list-node-operators@enjin.io](https://groups.google.com/a/enjin.io/g/mailing-list-node-operators)  in order to be informed when we publish a new node version. However, for those who don't want to subscribe, you can query our [Docker Hub repository](https://hub.docker.com/r/enjin/matrixchain/tags) to check for new versions. All versions are automatically pushed to Docker Hub, so you will always be able to find the latest version there.

## Upgrading using Docker

Open your `docker-compose.yml` in a text editor and locate the `image` line, in the below example it is line 4:

```yaml
services:  
  matrixchain:  
    container_name: matrixchain  
    image: enjin/matrixchain:latest  # <-- this line
    ports:  
      - ...
```

If you are using the version `latest` (as in the above example), simply restarting that node at any point will ensure you're automatically updated to the very latest stable version. However, if you have statically set an image version, simply alter the line to specify the latest versioned release that appears on [Docker Hub](https://hub.docker.com/r/enjin/matrixchain/tags).

For example, if you are running `enjin/matrixchain:v100` and the latest version is `enjin/matrixchain:v200` you would simply need to make the following change:

```yaml
services:  
  matrixchain:  
    container_name: matrixchain  
+    image: enjin/matrixchain:v200 # add this line
-    image: enjin/matrixchain:v100 # remove this line
    ports:  
      - ...
```

Once updated, simply restart the node by first stopping the existing node and then repeating the steps to start the node using the command `docker-compose up -d` in the directory where the `docker-compose.yml`file is located.

## Upgrading using Binary

Simply download the latest binary and run it as you have always done as per the [Binary, Command](https://docs.enjin.io/docs/matrixchain-nodes#command) section. It's as simple as that!

### Upgrading from Source

If you are upgrading based on a build you've produced from the source code, you must navigate to the directory containing the source code in a terminal. Once you have built the binary, simply follow the instruction [Upgrading using Binary](https://docs.enjin.io/docs/matrixchain-nodes#upgrading-using-binary) to complete the upgrade. 

#### Git-cloned Repository

You should then fetch the latest changes using `git fetch` and then retrieve the source code of the latest tagged version `git checkout <tag>`. Once you have swapped to the latest source code for that release, you can simply run `cargo build --release` (as guided in [Building From Source](https://docs.enjin.io/docs/building-from-source)) to produce a new binary using the latest version.

#### Downloaded Repository

In the event that the repository was directly downloaded, and not cloned via `git`, you will first need to download the source code for the latest version. Once done, extract the source code and navigate to the directory in a terminal. You can then run `cargo build --release` (as guided in [Building From Source](https://docs.enjin.io/docs/building-from-source)) to produce a new binary.
