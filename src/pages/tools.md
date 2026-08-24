import GlossaryTerm from '@site/src/components/GlossaryTerm';

# Tools

The Enjin Platform is **chain-agnostic** — a single dashboard and API endpoint serve both networks. Use the **network selector** in the top-right corner of the platform UI to switch between **Canary** (testnet) and **Enjin** (mainnet).

## Recommended Flow

<GlossaryTerm id="enjin_blockchain" /> <GlossaryTerm id="mainnet" /> is <GlossaryTerm id="immutable" /> — every transaction lives on its ledger forever and attracts real gas fees. So we recommend building and testing on the testnet first, then moving to mainnet:

1. **Build and test on Canary** <GlossaryTerm id="testnet" /> — the fast, free environment for testing Enjin's tools.
   1. Download the [Enjin Wallet](https://enj.in/wallet).
   2. Create an [Enjin Platform account](https://platform.enjin.io).
   3. With the network selector set to **Canary**, get some cENJ to test with from the [built-in faucet](/getting-started/using-the-enjin-platform#canary-faucet).
2. **Move to Enjin mainnet** once your integration works end-to-end.
   1. Get some [ENJ](https://enjin.io/enjin-coin) to cover fees and storage deposits.
   2. Switch the network selector to **Enjin**, then create your collections and mint your tokens.

## Platform & API

These tools are the same on both networks — switch between Canary and Enjin using the network selector.

| Tool                   | Description                                                                                                                                                                             |
|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Enjin Platform Cloud](https://platform.enjin.io)   | The plug-and-play Web3-integration platform, enabling you to launch a full-scale valuable economy with ease.                                                                            |
| [API Key & Settings](https://platform.enjin.io/settings)     | Enjin Platform settings where you can generate your API Key, authenticate your wallet account, and more.                                                                                |
| [API Endpoint](https://platform.enjin.io/graphql)           | Use this to interact with the Enjin Platform API: `https://platform.enjin.io/graphql`                                                                                              |
| [API Playground](https://platform.enjin.io/graphiql)         | An easy-to-use interface where you can run queries and mutations powered by Enjin’s GraphQL API.                                                                                        |
| [Enjin Wallet](https://enj.in/wallet)           | A powerful cross-chain wallet that allows you to sign transactions and manage your assets on both mainnet and testnet.                                                                  |
| [Built-in Canary Faucet](/getting-started/using-the-enjin-platform#canary-faucet)            | The Platform's built-in faucet drops 250 cENJ to your Wallet Daemon's wallet — switch the network selector to Canary and click the faucet icon.                                          |

## Network-Specific Tools

The marketplace, block explorer, and native coin differ between the two networks:

| Tool                   | Canary (Testnet)                                              | Enjin (Mainnet)                              |
|------------------------|---------------------------------------------------------------|----------------------------------------------|
| NFT.io Marketplace     | [canary.nft.io](https://canary.nft.io)                        | [nft.io](https://nft.io)                     |
| Subscan Block Explorer | [canary-matrix.subscan.io](https://canary-matrix.subscan.io/) | [matrix.subscan.io](https://matrix.subscan.io/) |
| Native Coin            | cENJ — free, from the [built-in faucet](/getting-started/using-the-enjin-platform#canary-faucet) | [ENJ](https://enjin.io/enjin-coin)           |

## Community

| Tool                                                             | Description                                                                                                |
|------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| [Enjin Ecosystem Slack Community](https://enj.in/ecosystem-slack) | Join the official Enjin Ecosystem Slack community to connect with other developers and community members. |
