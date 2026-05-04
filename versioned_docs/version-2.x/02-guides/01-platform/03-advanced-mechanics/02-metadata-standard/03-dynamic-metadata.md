---
title: "Dynamic Metadata"
slug: "dynamic-metadata"
description: "Learn to use Dynamic Metadata to efficiently manage large NFT collections. Our easy-to-follow guide shows how to set one URL for all your tokens, saving time and on-chain costs."
---

What if you have a collection with 10,000 unique tokens? Setting up metadata (like the name, image, and description) for each one sounds like a lot of work, and it can be costly.

**Dynamic metadata** is our simple and efficient solution for this.

Instead of putting metadata on *every single token*, you just set **one link** on your entire **collection**. Applications like the Enjin Wallet and NFT.io marketplace will then use that single link to automatically find the correct metadata for each specific token as it's needed.

### 🎯 Why Use Dynamic Metadata?

  * **Save Time & Effort:** Manage metadata for thousands (or millions\!) of tokens from one central place.
  * **Save on Costs:** This method uses much less on-chain data, which can reduce the ENJ required to create your tokens.
  * **Easy to Update:** Want to change your token's image? Just replace the media file on your server. There's no need for a new on-chain transaction.

-----

## How Dynamic Metadata Works

Understanding this is key to setting it up correctly.

### How Your Metadata is Found (The Hierarchy)

When you look at an NFT in your wallet, the wallet needs to find its image and name. It searches in a specific order:

1.  **Token:** First, it checks for metadata *directly on that single token*.
2.  **Group (Optional):** If not, it checks if the token is in a *group* that has metadata.
3.  **Collection:** If it's still empty, it finally looks at the *whole collection* for the metadata link.

Dynamic metadata works by setting the link at the **Collection level** (step 3). This way, all tokens in that collection will use this link as their default.

### The Magic `{id}` Placeholder

This is the most important part. The single link you set on your collection will include the special placeholder: `{id}.json`

> **Example link:** `https://my-server.com/metadata/{id}.json`

When a wallet needs to find a token's details, it automatically replaces `{id}` with the correct filename. Your job is to make sure your files are hosted and named correctly so the wallet can find them.


### Let's Walk Through an Example

Seeing this in action makes it much clearer.

Let's imagine you have a collection called **"Hero's Hoard"** which has an ID of **`8143`**.
Inside this collection, you have a token called **"Dragon's Fang"** with an ID of **`72`**.

You have already set up dynamic metadata for your collection, and the `uri` attribute on your collection (`8143`) is:
`ipfs://bafy...xyz/{id}.json`

Now, a user opens the NFT.io marketplace to look at your "Dragon's Fang" token. Here's what happens behind the scenes:

1.  **NFT.io needs metadata for token `72` in collection `8143`.**
2.  It checks the token itself for a `uri`. **Nothing is set there.**
3.  It checks the token's group (if any) for a `uri`. **Nothing is set there either.**
4.  It checks the *collection* (`8143`) for a `uri`. **Success!** It finds your dynamic link: `ipfs://bafy...xyz/{id}.json`.
5.  NFT.io knows it's looking for a *token*, so it uses the token file name convention: `<CollectionID>-<TokenID>.json`.
6.  It replaces the `{id}` in your link with **`8143-72`**.
7.  The final URL it fetches is: `ipfs://bafy...xyz/8143-72.json`.

Your server (or Pinata, in our example) then sends this specific file, which contains the name "Dragon's Fang" and its unique image. That's how it all connects!

### What You Must Name Your Files

For this to work, your hosted files **must** use these exact naming conventions:

  * **For your Collection's metadata:** `<CollectionID>.json`
      * *Example: `8143.json`*
  * **For each Token (NFT) metadata:** `<CollectionID>-<TokenID>.json`
      * *Example: `8143-72.json` (This is for Token 72 in Collection 8143)*
  * **For a Token Group metadata (Optional):** `<GroupID>-group.json`
      * *Example: `5-group.json`*

-----

## How to Set Up Dynamic Metadata: A Step-by-Step Guide

This setup is a three-step process. We'll walk you through it using a free, easy-to-use service called [Pinata.cloud](https://www.pinata.cloud/), which hosts files on a decentralized network called IPFS.

:::tip Do I have to use IPFS?
You can use any public server or hosting service, but Pinata is a great choice for beginners.
:::

### Step 1: Host Your Media Files (Images, Videos, etc.)

First, let's get all your images and videos uploaded.

1.  Sign up for a free account at [Pinata.cloud](https://www.pinata.cloud/).
2.  On your computer, create a folder and put all your media files into it (e.g., `collection-banner.png`, `token-1.jpg`, `token-2.mp4`).
3.  On your Pinata dashboard, click the blue "**+ Add**" button in the top-right corner, then select **Folder Upload**.
4.  Upload the folder you just prepared.
5.  Once it's finished, you'll see your folder in the file list. Copy its **CID** (a long string of letters and numbers).
6.  Save this CID somewhere safe (like a notepad). This is your `<Media-CID>`.

<video muted playsinline controls width="100%">
  <source src="/img/guides/advanced-mechanics/uploading-media-files.mp4" type="video/webm" />
  Sorry, your browser doesn't support embedded videos.
</video>

### Step 2: Create and Host Your JSON Metadata Files

Next, we'll create simple text files (called JSON files) that tell the wallet *about* your tokens, including where to find the media files you just uploaded.

1.  **Create your Collection JSON file:**

      * On your computer, create a new text file and name it *exactly* `<CollectionID>.json` (e.g., `8143.json`).
      * Inside this file, add your collection's details like `name` and `description`, following the [Metadata Standard](/02-guides/01-platform/03-advanced-mechanics/02-metadata-standard/02-metadata-standard.md).
      * For the `media` or `image` field, add the URL to your collection's media file from Step 1. The format is: `ipfs://<Media-CID>/filename.png`
          * *Example:* `"url": "ipfs://bafy...abc/collection-banner.png"`

2.  **Create your Token JSON files:**

      * Now, do the same for *each* token. Create a new text file and name it *exactly* `<CollectionID>-<TokenID>.json` (e.Example: `8143-72.json`).
      * Inside, add that token's specific `name`, `description`, `attributes`, etc.
      * For its `media`, point to its specific media file: `ipfs://<Media-CID>/token-72.jpg`
          * *Example:* `"url": "ipfs://bafy...abc/token-72.jpg"`

3.  **Create your Group JSON files (Optional):**

      * If you use Token Groups, repeat the process. Name the file `<GroupID>-group.json` (e.Example: `5-group.json`).

4.  **Upload Your JSON Folder:**

      * Once you've created all your `.json` files, put them *all* into a **new, separate folder** on your computer.
      * Go back to Pinata and upload this new folder (the one containing all your `.json` files).
      * When it's done, copy the **CID** for this **JSON folder**. This is the final piece you need! Let's call it your `<JSON-CID>`.

### Step 3: Update Your Collection's On-Chain URI

Finally, let's tell your collection where to find these new metadata files. You'll do this by setting its `uri` attribute.

1.  The `value` you need to set is your **`<JSON-CID>`** from the last step, followed by the `/{id}.json` placeholder.
      * **Example Value:** `ipfs://bafy...xyz/{id}.json` (Replace `bafy...xyz` with your actual `<JSON-CID>`).
2.  Set this attribute using the `BatchSetAttribute` mutation. You can copy/paste the example below into the [graphiql playground](https://platform.enjin.io/graphiql), and change the values.

```graphql
mutation SetDynamicMetadataURI {
  BatchSetAttribute(
    collectionId: 8143 # 👈 Change this to your Collection ID
    # We're not setting a tokenId, so this applies to the whole collection
    attributes: [
      {
        key: "uri"
        # 👇 Change this to your JSON folder's CID + the {id} placeholder
        value: "ipfs://bafy...xyz/{id}.json" 
      }
    ]
  ) {
    id
    state
  }
}
```

3.  Run this mutation, and you're all set\! Wallets and marketplaces will now automatically find your metadata.

:::warning **Important:** Do Not Replace `{id}`
You must use the literal string `{id}.json` at the end of your URI. **Do not** replace `{id}` with an actual ID. The wallet or marketplace handles this replacement for you.
:::

:::info 
For a more detailed guide on updating metadata using the Enjin Platform, check out [this page](/02-guides/01-platform/01-managing-tokens/03-adding-metadata.md).
:::

-----

## Migrating Legacy Metadata (For collections from Ethereum/JumpNet)

This section is **only** if you are moving a collection from Ethereum or JumpNet and *already* used dynamic metadata there. The token ID format has changed, so you just need to rename your old `.json` files.

### Conversion Steps

1.  Find the new **Collection ID** for your collection on Enjin Blockchain (e.g., `2000`).
2.  Create a new JSON file for your collection, named `<CollectionID>.json` (e.g., `2000.json`).
3.  Now, for each token, find its **old** `.json` filename.
    * *Old Example:* `70800000000000af000000000000000000000000000000000000000000000005.json`
4.  **Follow these steps to get the new name:**
    1.  **Remove the 32 zeros** from the middle (from position 17 to 48). *Result:* `70800000000000af0000000000000005.json`
    2.  **Remove the `.json`** at the end. *Result:* `70800000000000af0000000000000005`
    3.  **Convert this number.** This is a "hexadecimal" number. Use any online "hex to decimal" converter to change it. *Result:* `149538149525803038929858507180710297605`
    4.  **Add `.json` back** to the end. **New Filename:** `149538149525803038929858507180710297605.json`
5.  Repeat this renaming process for all your old token JSON files.
6.  Upload all your **newly renamed** files (plus your new collection file, e.g., `2000.json`) into a new folder on your server or IPFS.
7.  Finally, update your collection's `uri` attribute (like in [Step 3 above](#step-3-update-your-collections-on-chain-uri)) to point to this new folder, making sure to add `{id}.json` at the end.
    * *Example:* `httpss://example.com/metadata/{id}.json`