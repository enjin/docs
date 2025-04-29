---
title: "Quick Start Guide"
slug: "quick-start-guide"
description: "Begin your journey with Enjin's blockchain ecosystem using our Quick Start Guide. Learn how to integrate blockchain items into your projects seamlessly"
---

//TODO: complete this draft

# Enjin Quick Start Guide

Welcome! This guide provides the essential steps to quickly integrate the Enjin Blockchain and NFTs into your game or application using the Enjin Platform. We'll use the Canary testnet for a safe development environment.

:::info **By the end of this guide, you will have:**

- Set up your developer account on the Enjin Canary Platform.
- Connected your developer wallet to authorize actions.
- Created your first blockchain Collection and Token (NFT or FT).
- Learned how to link your users' Enjin Wallets to your application.
  - Sent a token to a linked user wallet.
  - Read tokens from a linked user wallet
:::

## 1. Create Your Enjin Canary Platform Account

### What is the Enjin Platform?

The Enjin Platform is your central hub for managing blockchain projects, collections, and digital items (NFTs and Fungible Tokens). We'll start by creating an account on the Canary Platform, which operates on Enjin's testnet blockchain. This allows you to experiment without using real funds or affecting the main network.

### Steps to Create an Account:

1.  Navigate to the Canary Platform website: `[Canary Platform URL - Placeholder]`
2.  Click on the "Sign Up" or "Create Account" button.
    *   `[Screenshot: Sign Up Button - Placeholder]`
3.  Follow the on-screen instructions to register your account (typically involves providing an email and setting a password).
    *   `[Screenshot: Registration Form - Placeholder]`
4.  Verify your email address by clicking the link sent to your inbox.
5.  Log in to your newly created Canary Platform account.
    *   `[Screenshot: Platform Dashboard after Login - Placeholder]`

:::info **Learn More:**
[Read the full overview of the Enjin Platform](placeholder_link_platform_overview)
:::

## 2. Connect Your Wallet Account

### Why Connect a Wallet?

To perform actions on the blockchain (like creating collections or minting tokens) through the Platform, you need to authorize these actions. Connecting your developer wallet (like the Enjin Wallet app) allows the Platform to request your signature for transactions you initiate. This ensures you maintain control over your project's core operations.

### Steps to Connect Your Wallet:

1.  Inside the Enjin Platform, navigate to the "Wallet" or "Account Settings" section.
    *   `[Screenshot: Platform Wallet Section - Placeholder]`
2.  Click "Connect Wallet" or a similar option.
3.  Follow the instructions, which usually involve scanning a QR code with your Enjin Wallet app to link it.
    *   `[Screenshot: Wallet Linking QR Code - Placeholder]`

:::tip Automating Signatures with the Wallet Daemon
For applications requiring automated actions (like minting rewards in real-time or batch transferring items without manual confirmation each time), you can set up the **Enjin Wallet Daemon**. This secure service runs on your server and can automatically sign pre-approved transaction types initiated by your application via the API.

**Learn More:** [Set up the Enjin Wallet Daemon](placeholder_link_wallet_daemon)
:::

:::info **Ways to Create Blockchain Requests:**
You can interact with the Enjin Platform and initiate blockchain requests in several ways:
*   **Manually:** Using the user interface of the Enjin Platform Cloud.
*   **Programmatically:**
    *   Sending **direct HTTP requests** to the [Enjin GraphQL API](placeholder_link_graphql_api_docs).
    *   Using the **official Enjin SDKs***:
        *   [C# SDK](placeholder_link_csharp_sdk)
        *   [C++ SDK](placeholder_link_cpp_sdk)
    * **Other Languages:** The "Guides" section provides code snippets for GraphQL, cURL, JavaScript, Node.JS, and Python for most operations.
    * **AI Assistant:** Utilize the Enjin Platform AI assistant to help construct API calls.
:::

## 3. Create Your First Collection and Token

### What are Collections and Tokens?

*   **Collection:** A smart contract that acts as a container for your digital items. Think of it as representing your entire game, application, or a specific series of items.
*   **Token:** The actual digital item within a collection. This can be a Non-Fungible Token (NFT) representing a unique item (like a specific sword or character) or a Fungible Token (FT) representing interchangeable items (like gold coins or crafting materials).

:::tip Structuring Your Project
A common approach is to create:
*   **One Collection** for your entire game or application.
*   **Multiple Tokens** within that collection, representing the various items, characters, achievements, or currencies your users can own.

➡️ **Learn More:**
*   [Collection Configuration Details](placeholder_link_collection_config)
*   [Token Configuration Details](placeholder_link_token_config)
*   [Best Practices for Structuring Collections and Tokens](placeholder_link_structure_best_practices)
:::

### Creating via the Platform UI:

1.  **Create Collection:**
    *   Navigate to the "Collections" section in the Platform UI.
    *   Click "Create Collection".
    *   Fill in the required details (Name, symbol, etc.).
        *   `[Screenshot: Create Collection Form - Placeholder]`
    *   Submit the creation request (this will require signing with your connected wallet).
2.  **Create Token:**
    *   Go into the Collection you just created.
    *   Navigate to the "Tokens" or "items" tab within the collection.
    *   Click "Create Token".
    *   Choose the token type (NFT or FT) and configure its properties (Name, supply, transfer settings, etc.).
        *   `[Screenshot: Create Token Form - Placeholder]`
    *   Submit the creation request (requires wallet signature).

:::tip Programmatic Creation
You can also create collections and tokens using the API or SDKs. This is useful for automating setup or integrating it into your own tooling.

➡️ **See Guides:**
*   [Guide: Create Collections Programmatically](placeholder_link_create_collection_programmatic)
*   [Guide: Create Tokens Programmatically](placeholder_link_create_token_programmatic)
:::

## 4. Add Metadata to Your Collection and Token

### Why Add Metadata?

Metadata provides the descriptive details for your collections and tokens – like names, descriptions, images, and custom properties. This information makes your items recognizable, visually appealing, and useful within your application and across the Enjin ecosystem (e.g., in wallets and marketplaces).

:::info Learn more about Metadata:
- [Understanding Metadata](placeholder_link_metadata_overview)  
- [Metadata Best Practices](placeholder_link_metadata_best_practices)
:::

### Adding Metadata via the Platform UI:

1.  **Collection Metadata:**
    *   Navigate to your Collection settings.
    *   Find the "Metadata" section.
    *   Upload an image, add a description, and define any other relevant fields.
        *   `[Screenshot: Collection Metadata Editor - Placeholder]`
    *   Save changes.
2.  **Token Metadata:**
    *   Navigate to the specific Token within your Collection.
    *   Find the "Metadata" section.
    *   Upload the token's image, add its description, define custom attributes (e.g., stats, rarity), etc.
        *   `[Screenshot: Token Metadata Editor - Placeholder]`
    *   Save changes.

*(Note: Updating metadata might involve a blockchain transaction depending on the configuration, especially if metadata is set to be immutable or stored on-chain).*

:::tip Programmatic Metadata Updates
Metadata can also be managed via the API/SDKs, allowing you to update item details dynamically based on game events or other logic.

➡️ **See Guide:** [Guide: Add Metadata Programmatically](placeholder_link_add_metadata_programmatic)
:::

## 5. Link a User's Wallet to Your Application

### Why Link User Wallets?

To interact with a specific user's blockchain items (check their holdings, send them items), you need to know their public wallet address *and* have proof they control it. Linking associates their in-app account with their verified wallet address. This typically involves:

1.  Your application requests a unique linking code from the Enjin API.
2.  Your application displays this code (often as a QR code) to the user.
3.  The user scans the QR code with their Enjin Wallet app.
4.  The wallet confirms ownership, securely providing your application with the user's public wallet address.

This allows you to:
*   Grant in-game perks based on NFT ownership.
*   Airdrop or transfer items directly to the user's wallet.
*   Display their relevant blockchain inventory within your app.

### Implementation (GraphQL Example):

You'll typically use GraphQL mutations to initiate the linking process and potentially query the status.

```graphql
# Placeholder: GraphQL mutation to request a linking code for the user
# Example: Might involve passing a unique identifier for the user's app session

mutation RequestLinkingCode {
  # ... API call details ...
  # Returns a code (e.g., URI for QR generation)
}
```

```graphql
# Placeholder: GraphQL query/subscription to check linking status
# Example: Might poll or subscribe based on the linking code/session ID

query CheckLinkingStatus($code: String!) {
  # ... API call details ...
  # Returns linked wallet address if successful
}
```

➡️ **See Guide:** [See the full guide on Linking User Wallets](placeholder_link_user_wallet_linking)

## 6. Send a Token to a User

### Why Send Tokens?

This is a core interaction – transferring an NFT or FT from your project's wallet (or another source) to a user's linked wallet. This could be for:
*   Rewarding achievements.
*   In-app purchases.
*   Airdrops or giveaways.
*   Trading or P2P transfers (if initiated by your backend).

### Implementation (GraphQL Example):

Sending tokens involves creating a transfer request via the API. You'll need the Token ID, the recipient's linked wallet address, and the amount (for FTs).

```graphql
# Placeholder: GraphQL mutation for transferring a token
# Example: Requires specifying Collection ID, Token ID, recipient address, amount (if FT)

mutation SendTokenToUser($recipientAddress: String!, $tokenId: String!, $value: String) {
 # ... API call details ...
 # Initiates a transfer request
}

```

*(Note: This request often needs to be signed, either manually via the Platform UI if initiated there, or automatically by the Wallet Daemon if initiated programmatically from your backend).*

➡️ **See Guide:** [See the full guide on Sending Tokens](placeholder_link_send_tokens)

## 7. Reading Linked User's Tokens

### Why Read User Tokens?

Once a user has linked their wallet (as shown in Step 5), you'll often need to check which tokens they own within your collection(s). This allows you to:

*   Display their relevant inventory within your game or application interface.
*   Verify ownership of specific NFTs to grant access, perks, or abilities.
*   Check balances of Fungible Tokens (like in-game currency).
*   Trigger game logic based on the assets they hold.

### Implementation (GraphQL Example):

Reading a user's token balance or inventory is typically done by querying the Enjin GraphQL API using the user's linked wallet address and specifying the Collection or Token IDs you're interested in.

```graphql
# Placeholder: GraphQL query to get token balances for a specific wallet
# Example: Requires specifying the user's linked wallet address
# Optionally filter by Collection ID or specific Token IDs

query GetUserTokens($walletAddress: String!, $collectionId: String) {
  # ... API call details ...
  # Returns a list of tokens held by the wallet, potentially filtered
  # Example response structure:
  # wallets(address: $walletAddress) {
  #   tokens(collectionId: $collectionId) {
  #     id
  #     balance
  #     # ... other token details
  #   }
  # }
}
```

➡️ **See Guide:** [See the full guide on Reading User Token Balances](placeholder_link_read_tokens)

## 8. Next Steps and Advanced Features

Congratulations! You've covered the basics of setting up your project on the Enjin Platform, creating items, and enabling user wallet interactions.

> **Ready for Production?**
> Remember, this guide used the **Canary testnet** for development and testing. When you are ready to launch your application live, you will need to:
> 1.  Set up your project on the **mainnet Enjin Platform Cloud**: `[Mainnet Platform URL - Placeholder]`
> 2.  Update your application's API calls or SDKs to use the **mainnet GraphQL API endpoints**: `[Mainnet API Endpoints Documentation - Placeholder]`


Now you can explore more advanced integrations:

*   **On-Demand Minting:** Programmatically create *new* tokens directly into users' wallets based on real-time application events (e.g., crafting an item, completing a quest). This avoids pre-minting large supplies.
    ➡️ [Learn about On-Demand Minting](placeholder_link_on_demand_minting)

*   **Enjin Wallet Daemon:** If your application requires frequent, automated minting or transferring without manual intervention, setting up the Wallet Daemon is highly recommended for secure signature automation.
    ➡️ [Set up the Enjin Wallet Daemon](placeholder_link_wallet_daemon)

*   **Managed Wallets:** Simplify onboarding for users unfamiliar with crypto wallets. You can create and manage wallets *for* your users within the platform. Users can interact with blockchain features seamlessly, and later choose to export their items to their own self-custody Enjin Wallet if they wish. This significantly lowers the barrier to entry for Web2 users.
    ➡️ [Explore Managed Wallets](placeholder_link_managed_wallets)

Dive deeper into the specific guides and API documentation to unlock the full potential of Enjin for your project!

➡️ [Explore the full Enjin Documentation](placeholder_link_main_docs)