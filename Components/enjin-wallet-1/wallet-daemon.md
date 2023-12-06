---
title: "Wallet Daemon"
slug: "wallet-daemon"
excerpt: ""
hidden: false
metadata: 
image: []
robots: "index"
createdAt: "Tue Oct 31 2023 03:46:23 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Nov 14 2023 08:44:59 GMT+0000 (Coordinated Universal Time)"
---
The Enjin Wallet Daemon provides a streamlined process for signing blockchain transactions, enabling seamless and efficient transactions between your game and the blockchain. This tool creates a persistent bridge between your game and the blockchain, ensuring a fluid gaming experience for players.

In the Enjin Platform context, the Wallet Daemon is a utility tool that manages a blockchain wallet address associated with an Enjin Blockchain account. When a transaction is initiated on the Enjin Platform, the Wallet Daemon receives the transaction, signs it, and sends it back to the platform. This ensures secure and efficient transaction processing for Enjin Platform users.

![](https://files.readme.io/84d8e35-image.png)

The diagram above provides insight into the interaction between the Enjin Wallet Daemon and the Enjin Platform. This illustrates how the Wallet Daemon can communicate with the API in both directions, automatically signing and broadcasting transactions to the blockchain. This helps developers better understand how the two components work together seamlessly to provide a streamlined experience.

# Wallet Daemon Events

![](https://files.readme.io/b67b651-image.png)

The diagram above depicts the various stages involved in creating a new collection on the Enjin Matrixchain via the Enjin Platform API, with a particular emphasis on the Wallet Daemon events.

1. **Establish a WebSocket connection - **Connect to a WebSocket server to subscribe to channels that receive events.
2. **Subscribe to a WebSocket channel - **Subscribe to the channel associated with your wallet to receive real-time events.
3. **Send a mutation - **Send a "CreateCollection" mutation to the Enjin Platform API to create a new collection on the Enjin Matrixchain. The API will encode the transaction that the wallet daemon needs to sign and save it in the Enjin Platform Database.
4. **Wallet daemon requests pending transactions - **The wallet daemon repeatedly asks the Enjin Platform API if there are any transactions to sign to prevent incoming connections to the wallet daemon, which holds your <<glossary:Private Key>>.
5. **Sign and broadcast the transaction - **After receiving the pending transaction, the wallet daemon signs it with your private key and broadcasts it to the Enjin Matrixchain.
6. **Enjin Matrixchain processes the transaction - **If everything is correct and valid, the Matrixchain successfully processes the extrinsic sent by the wallet daemon, and the new collection is created.
7. **Enjin Platform API monitors the chain - **The Enjin Platform API continually watches the chain via a WebSocket connection to detect any activity.
8. **Save the data to the database - **The Enjin Platform API stores the new collection data in its own database, allowing you to query it as desired.
9. **Emit an event -** The Enjin Platform API sends an event to the WebSocket channels, providing you with the opportunity to take appropriate actions if you're subscribed to the relevant channel.

***

> 🚧 There are two approaches for running the Wallet Daemon:
> 
> - The Wallet Daemon Standalone
> - The docker [Cloud-Based Testnet Platform](https://platform.canary.enjin.io), connected to the Enjin <<glossary:Canary>> <<glossary:Testnet>>.
> - The [Cloud-Based Mainnet Platform](http://platform.enjin.io/), connected to the Enjin <<glossary:Blockchain>> <<glossary:Mainnet>>.
> - The [Open-Source Platform](https://github.com/enjin/platform) which you can run locally to connect to either network.

> 📘 Choosing the Right Approach for Running the Wallet Daemon
> 
> There are two ways to run the Wallet Daemon, each suitable for different user profiles and use cases:
> 
> 1. **Executable Approach:** This method involves running a simple executable, configuring it via a user interface, and clicking 'Run' to start it. It is the most straightforward approach and is recommended for beginners or those who are not developers. Learn how to set it up in our [Setting up Wallet Daemon using Executable](#wallet-daemon-executable) guide.
> 
> 2. **Docker Approach:** This method involves cloning a GitHub repository and modifying the configuration files. It offers more flexibility and control, making it suitable for developers and for production use. Learn how to set it up in our [Setting up Wallet Daemon using Docker](#wallet-daemon-docker) guide.
> 
> Choose the approach that best fits your technical proficiency and the needs of your project.

# Wallet Daemon Executable

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/c91b868-image.png",
        null,
        ""
      ],
      "align": "center",
      "sizing": "600px"
    }
  ]
}
[/block]


Setting up the Wallet Daemon Executable is a straight forward process.  
Download the latest version of the Wallet Daemon from [GitHub](https://github.com/enjin/wallet-daemon-ui/releases), extract it, and run the `enjin_wallet_daemon.exe` executable file.  
Follow the on-screen instructions to set it up and make sure to insert your Enjin Platform API Token from your [account settings page](https://platform.canary.enjin.io/settings).

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/7f5636c-Daemon_Overview-min.gif",
        "",
        "Configuring the Wallet Daemon Executable with the E"
      ],
      "align": "center",
      "caption": "Configuring the Wallet Daemon Executable with Enjin Platform"
    }
  ]
}
[/block]


# Wallet Daemon Docker

> 📘 Code repository: <https://github.com/enjin/wallet-daemon>

It is recommended that the Enjin Wallet Daemon is installed and ran in isolation. This means running it on a dedicated server. The daemon itself is incredibly light-weight and does not require any extensive resources.

> 📘 Have Docker installed?
> 
> If you don't have Docker installed, please review the [Quickstart Guide](doc:quickstart-guide) for more information.

You can do this by first cloning the `enjin/platform` repository from GitHub with the submodules:

`git clone --recurse-submodules <https://github.com/enjin/platform.git`

## Configure Daemon

You will want to update the `configs/daemon/.env` file with the `PLATFORM_KEY` (which is an API Token generated within the Settings page of the Enjin Platform Cloud). In addition to this, you'll want to specify a unique `KEY_PASS`.

> ❗️ The `KEY_PASS` is immutable. It is directly used to derive the wallet private key. Choose something unique and make sure to backup this `KEY_PASS` in a secure manner.

The final configuration is to update the `configs/daemon/config.json` file to communicate with either the Enjin Blockchain (mainnet) or Canary Blockchain (testnet). You can do this by updating the node property in the JSON file. You can find an example of both networks below.

### Enjin Blockchain

```
{  
  "node": "wss://rpc.matrix.blockchain.enjin.io:443",  
  "api": "http\://app:80/graphql",  
  "master_key": "/opt/app/storage"  
}
```

### Canary Blockchain

```
{  
  "node": "wss://rpc.matrix.canary.enjin.io:443",  
  "api": "http\://app:80/graphql",  
  "master_key": "/opt/app/storage"  
}
```

## Starting the Daemon

Finally, you can spin up the daemon using the following command from the platform directory:

`docker composer up -d daemon`