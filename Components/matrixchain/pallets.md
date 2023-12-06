---
title: "MultiToken Pallet"
slug: "pallets"
excerpt: "The utility pallets of the Enjin Blockchain."
hidden: false
metadata: 
image: []
robots: "index"
createdAt: "Tue Oct 31 2023 19:08:11 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Sat Nov 11 2023 21:55:09 GMT+0000 (Coordinated Universal Time)"
---
> 📘 Use [console.enjin.io](https://console.enjin.io/) to use the user interface referenced in this document.

# What is the MultiToken <<glossary:Pallet>>?

Enjin has [developing ](<>)a token standard called MultiTokens. The standard will be compatible with matrixchains, parachains, parathreads and smart contracts, so it’s interoperable with the entire Enjin, Polkadot and Kusama ecosystem.

**Fungible tokens** are stackable, have a quantity and optional decimal places. An example of a fungible token is a twenty dollar bill - each bill is worth the same amount as another twenty dollar bill.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/8c137c8-605e5bcb4377adeb7f7d6803_2.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


**Non-fungible tokens** are not interchangeable; each token has its own unique identifier. Examples of NFTs are original art, gaming characters and pets, numbered collectibles, and more.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/7b86c51-605e5bcb4377ad478f7d6804_3.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


**Grouped NFTs** are non-fungible tokens that are a part of a family, and share the same Base ID.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/d3ca40c-605e5bcb4377adaf067d6805_4.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


# Terminology

- **Collection - **A group of tokens. Also holds data for those tokens and the policies that govern their behavior.
- **Token - **A unique asset with a balance
- **Policy - **Governs behavior for tokens in a collection
- **Attribute -** Metadata for a collection or a token
- **Operator -** An account that operates on behalf of another account (transferFrom)
- **Approval -** Required for an operator to use an account
- **Freeze/Thaw - **If a collection, token, or account is frozen, it cannot transfer tokens
- **Descriptor -** Used to create something. For example, a CollectionDescriptor creates a Collection.

# Collections

A collection must be created before tokens may be minted. A collection is somewhat akin to an ERC-721 smart contract - its creator has certain privileges, such as minting new tokens or setting metadata for the collection and its tokens.

The first 2000 Collection IDs are reserved for future system collections. Collections created on-chain through this <<glossary:Extrinsic>> start from ID 2001 and are sequentially created.

A deposit of 6.25 ENJ is required to create a collection. The deposit can be recovered by the creator if all tokens are burned and the collection is destroyed.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/9906b35-1.webp",
        "",
        "Custom PolkadotJS explorer pages are available to view collections and tokens. It's located at <https://console.enjin.io/> and Multi Tokens page is located in Network tab."
      ],
      "align": "center",
      "caption": "Custom PolkadotJS explorer pages are available to view collections and tokens. It's located at <https://console.enjin.io/> and Multi Tokens page is located in Network tab."
    }
  ]
}
[/block]


[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/f647d0b-2.webp",
        "",
        "A list of collections is shown with relevant information. Collection rows are expandable to display more details."
      ],
      "align": "center",
      "caption": "A list of collections is shown with relevant information. Collection rows are expandable to display more details."
    }
  ]
}
[/block]


[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b3cf087-3.webp",
        "",
        "Each expanded collection contains information about minted tokens, accounts created with the collection, attributes assigned, as well as different policies set."
      ],
      "align": "center",
      "caption": "Each expanded collection contains information about minted tokens, accounts created with the collection, attributes assigned, as well as different policies set."
    }
  ]
}
[/block]


# Policies

Policies allow controlling behavior of various aspects of tokens in a collection. All policies are contained within the collection, and some of them store data and are configurable. This paradigm was chosen because it allows other blockchains that include `pallet-multi-tokens` to easily customize its behavior. It also helps the end-user by separating token behavior into separate groups.

There are 5 types of polices:

- **Mint Policy -** Handles minting.
- **Burn Policy -** Validates burning. Has no configurable parameters.
- **Transfer Policy -** Handles transfers, including freezing and allowing transfer_from. Stores the collection freeze state.
- **Attribute Policy -** Handles metadata. Does not store data and has no configurable parameters.
- **Market Policy -** Handles interfacing with the marketplace. Stores collection royalty.

# Tokens

Each token must belong to a Collection, and is created using the mint extrinsic.

There is no distinction between fungible and non-fungible tokens. A non-fungible token is simply a token with a total supply of one. Additional constraints, like a cap, can be applied to a token at the time of minting to make sure the total supply never increases.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/1c6f100-4.webp",
        "",
        "Each token has its own page, displaying all relevant details, like minting rules, storage deposits, supply, attributes and more."
      ],
      "align": "center",
      "caption": "Each token has its own page, displaying all relevant details, like minting rules, storage deposits, supply, attributes and more."
    }
  ]
}
[/block]


# How to Create a Collection

A collection is created by using the `create_collection` extrinsic. The only required parameter is a descriptor which allows customizing the collection's behavior. The descriptor contains all of the policies and some additional settings. Some settings can be changed later using the `mutate_collection` extrinsic, but the policies currently cannot be changed, so think carefully before choosing the policies.

By default, the policies are flexible, but you can make them more strict. For example, if you want a collection to only contain non-fungible tokens, you can set `max_token_supply` to Some(1) and `force_single_mint` to true on the mint policy.

When the collection is created, it will emit a `CollectionCreated` event. This event contains the collection id that is used to access the collection.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/9b42874-5.webp",
        "",
        "To create a collection, go to the Multi Tokens page and click on the `Create Collection` button. A form will appear, where you can choose the policies and fill in relevant fields."
      ],
      "align": "center",
      "caption": "To create a collection, go to the Multi Tokens page and click on the `Create Collection` button. A form will appear, where you can choose the policies and fill in relevant fields."
    }
  ]
}
[/block]


# How to create a Token

> 📘 Each token must contain a minimum backing of ENJ to be minted, called Unit Price.

Tokens are created using the `mint` extrinsic. It only contains two parameters, the `recipient` and `mint params`. The mint params is an enum with a few variants. The only important variants are:

## CreateToken

This must be used the first time a token is created. The provided token id must not already exist. Some additional settings can be chosen when creating a token, such as setting a cap on the balance or giving it a royalty for the marketplace. If the token is to be an NFT, set the cap to` Some(TokenCap::SingleMint)` and set `initial_supply` to `1`.

Some of these settings can be changed later by using the `mutate_token extrinsic`.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/45695eb-6.webp",
        "",
        "To create a token, go to the Multi Tokens page, choose a collection you own and click on the Mint button. A form will appear, where you can choose the initial supply, the recipient of the tokens and more parameters."
      ],
      "align": "center",
      "caption": "To create a token, go to the Multi Tokens page, choose a collection you own and click on the Mint button. A form will appear, where you can choose the initial supply, the recipient of the tokens and more parameters."
    }
  ]
}
[/block]


## Mint

This is used when minting additional balance to an already existing token. The unit price can be supplied if you want to increase it, but it cannot be decreased. Otherwise, set the unit price to `None`.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/56d84b6-7.webp",
        "",
        "To mint additional tokens, go to the existing Token page and click the `Mint` button. A form will appear, where you can choose the initial supply, the recipient of the tokens and more parameters."
      ],
      "align": "center",
      "caption": "To mint additional tokens, go to the existing Token page and click the `Mint` button. A form will appear, where you can choose the initial supply, the recipient of the tokens and more parameters."
    }
  ]
}
[/block]


# Transfering tokens and NFTs

To perform a transfer, use the `transfer` extrinsic. There are two types of transfers:

## Simple Transfer

A simple transfer is when the `origin` of the extrinsic is also the sender.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b03f93d-8.webp",
        "",
        "To perform a simple transfer, go to the existing Token page and click the Transfer button. A form will appear, where you can choose the recipient of the tokens and the amount to transfer. "
      ],
      "align": "center",
      "caption": "To perform a simple transfer, go to the existing Token page and click the Transfer button. A form will appear, where you can choose the recipient of the tokens and the amount to transfer. "
    }
  ]
}
[/block]


## Operator Transfer

An operator transfer allows one account to make transfers on behalf of another account. This is also known as `transfer_from`. 

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/d69e6e1-9.webp",
        "",
        "An operator transfer is the same as `SimpleTransfer`, but it has a `source` field. This field is the account that the balance will be transferred from. This requires prior approval."
      ],
      "align": "center",
      "caption": "An operator transfer is the same as `SimpleTransfer`, but it has a `source` field. This field is the account that the balance will be transferred from. This requires prior approval."
    }
  ]
}
[/block]


Approvals can be set for entire collections, or they can be set for specific tokens. They can have expiration times, and specific balances can be set for token approvals. The following extrinsics are used for approvals:

- **approve_collection -** Approves all tokens in a collection.
- **approve_token -** Approves a specific token in a collection for a specific amount. For security reasons, you must specify the exact amount of the previous approval (or zero if there is none) in the `current_amount` parameter for the extrinsic to succeed.
- **unapprove_collection -** Removes a collection approval.
- **unapprove_token -** Removes a token approval.

# Burning Tokens

Tokens can be burned by calling `burn`. This works exactly like a transfer, but it will also decrease the total supply of the token.

There is an additional field on the `BurnParam` called `remove_token_storage`. If this is set to true, the token will be removed from the storage when it's total supply reaches zero. This can only be done by the token's owner.

If the token is removed from storage, the deposit will be returned to the owner, and it will be as if the token never existed, so it can be recreated in the future.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/71ac0b4-12.webp",
        "",
        "To burn tokens, go to the existing Token page and click the `Burn` button. A form will appear, where you can choose the amount to burn."
      ],
      "align": "center",
      "caption": "To burn tokens, go to the existing Token page and click the `Burn` button. A form will appear, where you can choose the amount to burn."
    }
  ]
}
[/block]


# Setting/Removing Attributes

To add or update metadata for a token or a collection, use the `set_attribute` extrinsic. Providing `token_id` adds the attribute to the token, otherwise add it directly to the collection. It's only callable by the collection's owner.

To remove an `attribute`, use `remove_attribute` extrinsic. It's only callable by the collection owner. If the `token_id` is provided, the attribute will be removed from the token. Otherwise, it will be removed from the collection.

## Setting Collection Attributes

This is done by clicking the `Manage Attributes` button under the expanded collection. Use toggle to switch between setting and removing attributes.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/c8c3ff0-13.webp",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


## Setting Token Attributes

This is done by clicking the `Manage Attributes` button on the token page. Use toggle to switch between setting and removing attributes.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/035356c-14.webp",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


# Freezing

Accounts, collections, and tokens can be frozen to prevent transfers. This is done using the `freeze` extrinsic, which expects freezing `info` to be provided. The `info` specifies whether the collection, token, collection account or token account should be frozen.

## Freeze a collection or a collection account

This is done by clicking on Freeze button under expanded collection.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/d95abbc-15.webp",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


## Freeze a token or a token account

This is done by clicking on Freeze button on the token page.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/e7d1285-16.webp",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


# Thawing

To unfreeze either collection, token, collection account or token account, use the thaw extrinsic. It expects the same `info` as the `freeze` extrinsic.

## Thaw a collection or a collection account

This is done by clicking on the `Thaw` button under expanded collection.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/5b6be9a-17.webp",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


## Thaw a token or a token account

This is done by clicking on the `Thaw` button on the token page.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/4357903-18.webp",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


# Batch operations

It is also possible to perform certain operations in batch. The following operations are supported:

## Batch Transfer

Using `batch_transfer` you can transfer the specific `amount` of tokens of a `collection` to list of `recipients`. If `continue_on_failure` is false, a single transfer failure will fail all of them. If it is true, execution will continue when a failure is encountered.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/44fa40f-19.webp",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


## Batch Mint

Using `batch_mint` you can mint the tokens of a collection to a list of `recipients` consisting of an `AccountId` and `MintParams`. If `continue_on_failure` is false, a single mint failure will fail all operations. If it is true, execution will continue when a failure is encountered.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/3abf6d8-20.webp",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


## Batch Set Attribute

Using `batch_set_attribute` you can set the list of attributes to a collection or a token. If `token_id` is None, the attribute is added to the collection. If it is `Some`, the attribute is added to the token.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/e48d6de-21.webp",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


## Remove All Attributes

Removes all attributes from the given `collection_id` or `token_id`.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b32493f-22.webp",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


# Unit Price

The unit price of a token represents the backing value of each unit in ENJ. This is needed to pay storage deposits for accounts that are created to hold the token's balances. The unit price determines two things:

- The amount of ENJ that will be reserved when minting units
- The minimum balance for each account

## ENJ Deposit

The ENJ deposit is taken from the issuer account as units are minted, and it is returned proportionally as units are burned. The minimum deposit is `Config::TokenAccountDeposit`, which has a value of 10^16 (0.01 ENJ).

The formula for the ENJ deposit is:

`unit_price _ total_supply`

You must set a unit price that will cause the deposit to be equal to or above the minimum value. You can calculate the minimum like this:

`Config::TokenAccountDeposit / total_supply`

## Minimum Balance

Accounts that go below the 0.01 ENJ minimum balance are deleted. This can be prevented during transfers by setting keep_alive to true in TransferParams.

The formula for the minimum balance is:

`Config::TokenAccountDeposit / unit_price`

When the minimum unit price is used, the minimum balance will be the entire total supply. This means only one account can hold units of the token. This is recommended for NFTs. For fungible tokens, the unit price should be set according to what you want the minimum balance to be.

As the unit_price increases, the minimum balance decreases, but the ENJ deposit goes up.

The unit price can be increased, but it can never be decreased.