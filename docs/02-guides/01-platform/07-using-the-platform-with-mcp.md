---
title: "Using the Enjin Platform with MCP"
slug: "using-the-platform-with-mcp"
description: "Connect an AI agent to the Enjin Platform through its built-in MCP server at https://platform.enjin.io/mcp. Setup steps for Claude Code, Claude Desktop, Cursor, and any other MCP client."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Enjin Platform ships a built-in **MCP (Model Context Protocol) server**. Any MCP-aware AI client — Claude Code, Claude Desktop, Cursor, and others — can connect to it and let an AI agent query your Platform data, resolve Enjin addresses, and, if you allow it, submit transactions on your behalf.

:::warning Experimental
The MCP server is an experimental feature. Tool names, capabilities, and limits may change without notice.
:::

## Quick facts

- **Server URL:** `https://platform.enjin.io/mcp`
- **Transport:** Streamable HTTP (remote server — nothing to install locally)
- **Authentication:** OAuth 2.1 with PKCE. Your MCP client opens a browser login; no client ID, secret, or API token is needed
- **Scope:** `mcp:use`
- **Requirements:** An [Enjin Platform](https://platform.enjin.io/) account

:::info The URL is an API endpoint, not a web page
Opening `https://platform.enjin.io/mcp` in a browser returns `405 Method Not Allowed`. Add it to an MCP client instead — see the steps below.
:::

## What your agent can do

Once connected, the agent gets three tools:

- **Query the Platform API** — run any GraphQL query from the [Platform API](/03-api-reference/03-api-reference.md): balances, collections, tokens, transactions, fuel tanks, and more.
- **Resolve addresses** — turn an SS58 address or `0x` public key into its network, chain, and public key.
- **Submit mutations** *(Write access only)* — create transactions and managed wallets through the Platform. Transactions are still signed by your [Wallet Daemon](/01-getting-started/06-using-wallet-daemon.md), exactly as they are for any other Platform request.

See the [reference](#reference) at the bottom of this page for the full list of tools, resources, and prompts.

## Step 1: Add the server to your MCP client

Add `https://platform.enjin.io/mcp` as a **remote HTTP** MCP server. Pick your client below:

<Tabs>
  <TabItem value="claude-code" label="Claude Code">

Run this in your terminal:

```bash
claude mcp add --transport http enjin-platform https://platform.enjin.io/mcp
```

Then, inside Claude Code, run `/mcp`, select **enjin-platform**, and choose **Authenticate**.

  </TabItem>
  <TabItem value="claude-desktop" label="Claude Desktop / claude.ai">

1. Open **Settings → Connectors**.
2. Click **Add custom connector**.
3. Enter a name (e.g. `Enjin Platform`) and the URL `https://platform.enjin.io/mcp`.
4. Click **Add**, then **Connect**.

  </TabItem>
  <TabItem value="cursor" label="Cursor">

Add the server to your `mcp.json` (project-level `.cursor/mcp.json` or the global one):

```json
{
  "mcpServers": {
    "enjin-platform": {
      "url": "https://platform.enjin.io/mcp"
    }
  }
}
```

Then open **Settings → MCP** and click **Connect** next to `enjin-platform`.

  </TabItem>
  <TabItem value="other" label="Other clients">

Any client that supports **remote MCP servers over Streamable HTTP with OAuth** can connect. You only need the URL:

```
https://platform.enjin.io/mcp
```

Most clients accept it in a config block shaped like this:

```json
{
  "mcpServers": {
    "enjin-platform": {
      "type": "http",
      "url": "https://platform.enjin.io/mcp"
    }
  }
}
```

Leave any token, header, or client-ID fields empty — the client discovers the OAuth settings from the server and handles the login itself.

  </TabItem>
</Tabs>

## Step 2: Authorize the connection

When your client connects for the first time, it opens your browser on the Platform's **Authorize MCP Client** page. Log in if prompted. The page shows the client name, its redirect URI, and the requested scope.

<!-- TODO(screenshot): capture the Authorize MCP Client page (Read/Write selector visible), save as
     static/img/guides/platform-mcp/authorize-mcp-client.png, then replace this comment with:
![Authorize MCP Client page on the Enjin Platform](/img/guides/platform-mcp/authorize-mcp-client.png)
-->

Choose the access level for this client:

- **Read** *(default)* — the agent can run queries only. Mutations are rejected.
- **Write** — the agent can also submit mutations such as creating transactions. With Write access you can tick **Restrict transaction signing to specific public keys** and list the SS58 addresses or public keys that are allowed to sign. Only those wallets can be used as a transaction signer.

:::tip Start with Read
Give an agent Read access first and widen it only when you actually need it to submit transactions. If you enable Write, restrict signing to the specific wallets the agent should use.

If the signing restriction is ticked but no keys are listed, transaction mutations cannot run at all.
:::

Click **Authorize**. Your client completes the handshake automatically and the server's tools become available. Tokens are long-lived, so you will rarely need to re-authorize.

## Step 3: Try it

Ask your agent something the Platform can answer. For example:

> What is the ENJ balance of `efRC9jw5LeZFqmaWBBDxZRTyaLP9dLAqixy32tSnqW9wCsb6y` on Enjin Matrixchain?

The agent will resolve the address, then run a query like this through the Platform:

```graphql
query GetAccount {
  GetAccount(
    network: ENJIN
    chain: MATRIX
    address: "efRC9jw5LeZFqmaWBBDxZRTyaLP9dLAqixy32tSnqW9wCsb6y"
  ) {
    address
    balance
  }
}
```

The `balance` field is returned already formatted in ENJ.

:::info Schema introspection is disabled
The agent cannot introspect the Platform's GraphQL schema over MCP. If it needs field names it does not know, point it at the [API Reference](/03-api-reference/03-api-reference.md) — the pages there are written to be read by agents as well as humans.
:::

## Managing connections

Every authorized client appears under **Settings → MCP Connections** on the Platform, with its access level and when it was created and last used.

![MCP Connections card in Platform settings](/img/guides/platform-mcp/mcp-connections.png)

- **Edit** — switch a connection between Read and Write, or change its signing restrictions.
- **Revoke** — disconnect the client. It will have to authorize again to reconnect.

## Reference

### Tools

| Tool | Access | Description |
|---|---|---|
| `platform-resolve-address-context` | Read | Takes an SS58 address or `0x` public key and returns the public key plus its inferred network, chain, native token symbol, and decimals. |
| `platform-graphql-query` | Read | Runs a GraphQL **query** against the Platform API. Introspection queries are blocked. |
| `platform-graphql-mutation` | Write | Runs an allowed GraphQL **mutation**. On a Read connection it returns `This MCP connection does not permit mutations.` |

### Resources

| Resource | Description |
|---|---|
| `platform://docs/addressing` | The SS58 prefix map (`en` Enjin Relaychain, `ef` Enjin Matrixchain, `cn` Canary Relaychain, `cx` Canary Matrixchain) and guidance to always pass `network` and `chain` explicitly. |
| `platform://context/address/{address}` | Per-address context — the same data as the resolve tool. |

### Prompts

| Prompt | Description |
|---|---|
| `query-native-balance` | Builds the correct `GetAccount` balance query for a given address. |

## Notes

- Platform API tokens are **not** accepted by the MCP server. Authentication is only through the OAuth flow above.
- There is no self-hosted variant. The MCP server is part of the Enjin Platform Cloud.
- The GraphQL surface is the same as the normal Platform API, so everything in the [API Reference](/03-api-reference/03-api-reference.md) applies.
