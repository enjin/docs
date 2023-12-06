---
title: "Fuel Tanks Pallet"
slug: "fuel-tank-pallet"
excerpt: "Subsidize fees for your players while reducing overall costs."
hidden: false
createdAt: "Tue Oct 31 2023 20:06:58 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Nov 30 2023 00:19:48 GMT+0000 (Coordinated Universal Time)"
---
> 📘 Use [console.enjin.io](https://console.enjin.io/) to use the user interface referenced in this document.

# What is a Fuel Tank?

Fuel Tanks are special accounts that are used purely for transaction fees. Developers can choose to subsidize costs for their customers by depositing ENJ tokens to a Fuel Tank they control. ENJ tokens deposited to a Fuel Tank cannot be withdrawn.

A fuel tank can whitelist specific tokens, tags, transaction types or users that will be permitted to use it.

The fuel tank’s ID may be specified in any transaction. The chosen fuel tank will cover transaction costs if its requirements are met. Any remaining costs will be paid by the Fee Payer.

A fuel tank can be configured with owners, admins and operators who may tap into it for transaction fees.

‍Rules are added to a fuel tank to fine-tune its permissions for specific operators, tokens, time limits and value limits.

# Terminology

## Accounts

Accounts: To interact with a fuel tank, users must first register an account with the fuel tank. The owner of the fuel tank has the ability to specify if they want to allow users to create their own accounts by adjusting a specific setting.

## Rules

When a call is made to a fuel tank, it must be made in accordance with a set of rules. These rules, known as rule sets, can include multiple individual rules that determine the validity of the call. A fuel tank can have multiple rule sets, each of which controls access and permissions to the fuel tank's functionality and resources.

#### Whitelisted Callers

Whitelisted callers are accounts that are explicitly granted permission to make calls to a fuel tank. Any calls made by accounts not on the whitelist will be rejected and fail.

#### Whitelisted Collections

Whitelisted collections refer to a list of specific collections allowed to be called by dispatch on a fuel tank. If a dispatch call is made to any collection, not on the whitelist, it will be rejected and fail. This ensures that calls are only made to the specific collections authorized to be accessed.

#### Max Fuel Burn Per Transaction

It is a setting that limits the amount of fuel that can be consumed in a single transaction. It is a safety measure that helps prevent misuse and overuse of the fuel tank's resources by ensuring that a single transaction doesn't consume too much fuel, which is important to ensure a sustainable network.

#### User Fuel Budget

A user fuel budget is the total amount of fuel allocated to a specific user across all rule sets of a fuel tank. It sets a limit on the amount of fuel that can be consumed by a user's transactions. Once the user's fuel budget is exhausted, their transactions will fail until more fuel is added to their budget or their overall consumption is lowered , which is meant to avoid the overuse of resources and ensure a sustainable network.\*\*

#### Tank Fuel Budget

A tank fuel budget is the total amount of fuel allocated to a specific fuel tank across all its rule sets. It sets a limit on the amount of fuel that can be consumed by all transactions made through that tank. Once the tank's fuel budget is exhausted, all transactions will fail until more fuel is added to the tank's budget or overall consumption is lowered.

#### Require Token

The "Require token" setting indicates that a specific token must be held by the caller for their call to be accepted by the fuel tank. If the caller does not possess the required token, their call will be rejected and fail. This feature is intended to ensure that only users who hold the specified token can access the fuel tank's functions and resources.

#### Permitted Calls

Permitted calls refer to a list of specific function calls that are allowed to be made using this rule set. Any calls made to other functions will be rejected and fail. This ensures that only authorized calls can be made by the users, and also, by setting a boundary to what calls are allowed and what calls are not, it helps to protect the network from unwanted transactions that could impact negatively on the network.

#### Permitted Extrinsics

Permitted extrinsics refer to a list of specific extrinsics that are allowed to be made using this rule set. Any extrinsics that are not on the list will be rejected and fail. This feature is used to restrict access to specific functionality and resources on the network and ensure that only authorized calls can be made by users. When setting this rule, it's important to note that the parameters passed to the extrinsic do not affect the outcome, only the function name is considered.\*\*

#### Freezing

"Freezing" is a state where a fuel tank or a rule set is temporarily prevented from accepting calls or making changes. This means that while a fuel tank or rule set is frozen, no dispatches are allowed to occur on it. This is implemented as a safety measure to prevent accidental or malicious changes and to ensure that the fuel tank or rule set remains in a stable state until the freeze is lifted.

#### Descriptor

A descriptor is a list of all the data needed to create a fuel tank. It includes details such as the fuel tank's name, account management rules, rule sets and other configuration information related to the fuel tank. The descriptor acts as a blueprint that defines how the fuel tank is set up and how it will function. It contains all the information needed to create and configure the fuel tank, and can be used to modify the fuel tank's settings.

## Extrinsics

#### `create_fuel_tank`

Create a new fuel tank by providing a descriptor. Extrinsic generates a discrete AccountId for the fuel tank based on passed in parameters, it takes a storage deposit and emits FuelTankCreated event in the success case. Creation of already existing fuel tank will result in FuelTankAlreadyExists error, while duplicate rule kinds within a rule set will result in DuplicateRuleKinds

#### `mutate_fuel_tank`

Applies provided mutation to the fuel tank. Caller must be the owner of the fuel tank, otherwise call will result in NoPermission error. Tank must be frozen in order to mutate it, otherwise call will result in RequiresFrozenTankOrRuleset error. Duplicate rule kinds within a rule set will result in DuplicateRuleKinds. In success case emits FuelTankMutated event

#### `add_account`

Adds a new fuel tank user account, which not only allows using fuel tank, but also stores user consumption and rule set data. An account can be created only if account rules are successfully validated. An account is required to dispatch calls. A storage deposit is required, and may be paid by the user or the fuel tank, depending on the settings. Could fail with NoPermission if caller is not the owner and user management settings dont allow users to create accounts on their own. Creation of already existing account withing a tank will result in AccountAlreadyExists error. In case some of account rules cannot validate the caller, rule specific error will be returned. In success case emits AccountAdded event

#### `remove_account`

Removes a user account from a fuel tank and returns the storage deposits. Fuel tank must be frozen for operation to succeed, otherwise call will result in RequiresFrozenTank error. Account must not contain any rule data, otherwise call will result in AccountContainsRuleData error. In success case emits AccountRemoved event

#### `remove_account_rule_data`

Remove account rule data if it exists. Requires the fuel tank or the rule set to be frozen, otherwise will result in RequiresFrozenTankOrRuleset error. Only callable by the fuel tank's owner, otherwise will result in NoPermission error. In success case emits AccountRuleDataRemoved event

#### `dispatch`

Dispatch a call through the fuel tank, where the tank would pay for transaction fees and, if configured, provide a storage deposit. All calls are subject to rule set evaluation and would result in rule specific errors in case of failure. In case the inner call fails, the DispatchFailed event will be emitted with wrapped dispatch error inside. In success case emits Dispatched event

#### `dispatch_and_touch`

Same as dispatch, but also does create an account for a caller with add_account operation if it doesnt exist. Fuel tank's user_account_management settings must allow self-service account creation, otherwise call will result in NoPermission error.

#### `schedule_mutate_freeze_state`

Schedule mutating of fuel tank or rule set is_frozen state for on_finalize to execute with help of process_freeze_queue helper function. Additional 1 read and 1 write are added to account for on_finalize storage operations. Only callable by the fuel tank's owner, otherwise will result in NoPermission error. In case queue already has maximum number of items, will result in FreezeQueueFull error. In success case emits MutateFreezeStateScheduled event

#### `insert_rule_set`

Insert a new rule set into a fuel tank. It can be a new rule set or it can replace an existing one. If it is replacing a rule set, a rule that is storing data on any accounts cannot be removed and will result in CannotRemoveRuleThatIsStoringAccountData error. Use remove_account_rule_data to remove the data first. If a rule is being replaced, it will be mutated with the new parameters, and it will maintain any persistent data it already has. Fuel tank or rule set must be frozen, otherwise will result in RequiresFrozenTankOrRuleset error. If fuel tank already has maximum number of rule sets, will result in MaxRuleSetsExceeded error. Duplicate rule kinds within a rule set will result in DuplicateRuleKinds. In success case emits RuleSetInserted event

#### `remove_rule_set`

Remove rule set from a fuel tank. A rule that is storing data on any accounts cannot be removed and will result in CannotRemoveRuleThatIsStoringAccountData error. Use remove_account_rule_data to remove the data first. This is only callable by the fuel tank's owner, otherwise will result in NoPermission error. Fuel tank or rule set must be frozen, otherwise will result in RequiresFrozenTankOrRuleset error. In success case emits RuleSetRemoved event

#### `batch_add_account`

Same as add_account but takes a list of AccountIds to add into a fuel tank

#### `batch_remove_account`

Same as remove_account but takes a list of AccountIds to remove from a fuel tank

#### `force_set_consumption`

Force set the fuel tank consumption. If user_id is Some, it sets the consumption for that account. If it is None, it sets the consumption on the fuel tank directly. Currently only callable by fuel tank owner and sudo account, otherwise will result in NoPermission error

#### `destroy_fuel_tank`

Destroy the fuel tank. Only callable by owner, otherwise will result in NoPermission error. The fuel tank must be frozen, otherwise will result in DestroyUnfrozenTank error. Can only be destroyed if all accounts are removed, otherwise will result in DestroyWithExistingAccounts error. Returns the storage deposit and remaining balance to the fuel tank owner. In success case emits FuelTankDestroyed event

# How to create a fuel tank?

A fuel tank can be created by anyone using the `create_fuel_tank` extrinsic function, once the fuel tank is created, the owner can add funds to it and subsidise transactions that are permitted by the fuel tank. The primary function of a fuel tank is to allow a user to interact with Enjin Matrixchain without paying transaction fees (called gas fees in Ethereum).

Create a new fuel tank by providing a `descriptor`. Extrinsic generates a discrete `AccountId` for the fuel tank based on passed in parameters, it takes a storage deposit and emits `FuelTankCreated` event in the success case. Creation of already existing fuel tank will result in `FuelTankAlreadyExists` error, while duplicate rule kinds within a rule set will result in `DuplicateRuleKinds`.

To create a new fuel tank using the [explorer](https://console.enjin.io/#/explorer), head to `Network` -> `Fuel tanks` -> `Create Fuel Tank`. This page allows you to create a new fuel tank by specifying the following options:

- **Name: **Name for the fuel tank.
- **User Account Management: **(Optional) Allows setting the permission level to add new accounts to the fuel tank.
- **Provides Deposit: **boolean -> Allows specifying if Fuel Tank is providing a storage deposit for operations that require it.
- **Account Rules:** (Optional) Allows specifying rules that are evaluated before an account is added to the fuel tank.
- **Dispatch Rules:** (Optional) Allows specifying rules that are evaluated before an extrinsic is executed via the fuel tank.

> 🚧 Even though the account rules and dispatch rules are optional, it is recommended to have some rules setup for your fuel tank, a fuel tank without any rules is open to anyone without limits.

This image shows how to create a fuel tank, with some basic rules, in the following fuel tank configuration only the account Alice (test account) can join the fuel tank and only Alice can dispatch operations via the fuel tank.

![](https://files.readme.io/172de0c-image.png)

# How to modify a fuel tank?

To mutate or modify a fuel tank, the caller must be the owner of the fuel tank, otherwise call will result in `NoPermission` error. Tank must be frozen in order to mutate it, otherwise call will result in `RequiresFrozenTankOrRuleset` error. Duplicate rule kinds within a rule set will result in `DuplicateRuleKinds`. In success case emits `FuelTankMutated` event

To mutate a fuel tank using the explorer, head to `Network` -> `Fuel tanks`. Mutating a fuel tank involves three steps 1. Freeze the fuel tank 2. Mutate the fuel tank 3. Unfreeze the fuel tank

1. To Freeze the fuel tank, head to `Network` -> `Fuel tanks`, this will present a list of all fuel tanks, select the fuel tank you wish to mutate and select freeze/unfreeze. In the next dialog box, set `is_frozen` to `true` and execute the transaction
2. To mutate the fuel tank, head to `Network` -> `Fuel Tanks` -> under specific fuel tank -> `Mutate`In the modal, Select the Account (the owner of the fuel tank) and select the fuel tank id (you can get this from the fuel tanks page in the previous step) and add any modifications to the fuel tank.  
   If successful, you should see the event with you changes in the explorer `Network` tab
3. To unfreeze the fuel tank, head to `Network` -> `Fuel tanks`, and perform the same step but select the `is_frozen` to `false`

# Add an account to a fuel tank

Adds a new fuel tank user account, which not only allows using fuel tank, but also stores user consumption and rule set data. An account can be created only if account rules are successfully validated. An account is required to dispatch calls. A storage deposit is required, and may be paid by the user or the fuel tank, depending on the settings. Could fail with `NoPermission` if caller is not the owner and user management settings dont allow users to create accounts on their own. Creation of already existing account withing a tank will result in `AccountAlreadyExists` error. In case some of account rules cannot validate the caller, rule specific error will be returned. In success case emits `AccountAdded` event

To add an account to a fuel tank using the explorer, head to `Network` -> `Fuel tanks`:

- Select the fuel tank and click add account
- Select account to be added.
- On success you should see an AccountAdded event

# Remove an account from fuel tank

Removes a user account from a fuel tank and returns the storage deposits. Fuel tank must be frozen for operation to succeed, otherwise call will result in `RequiresFrozenTank` error. Account must not contain any rule data, otherwise call will result in `AccountContainsRuleData` error. In success case emits `AccountRemoved` event

To remove an account from a fuel tank using the explorer:

1. Head to `Network` -> `Fuel tanks`, and follow similar instructions to remove an account.
2. Select the fuel tank and click remove account

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/29ac0f8-image.png",
        null,
        "Select the fuel tank and click remove account"
      ],
      "align": "center",
      "caption": "Select the fuel tank and click remove account"
    }
  ]
}
[/block]


# Remove an account rule data

As part of enforcing the budget and max spending limits of the fuel tank, the fuel tank stores data for every account. The `remove_account_rule_data` allows to remove a user account rule data if it exists. Requires the fuel tank or the rule set to be frozen, otherwise will result in `RequiresFrozenTankOrRuleset` error. Only callable by the fuel tank's owner, otherwise will result in `NoPermission` error. In success case emits `AccountRuleDataRemoved` event.

> 📘 Similar to the process of mutating a Fuel Tank, the Fuel Tank must be frozen for the operation to succeed, otherwise the call will result in an error.

To remove an account rule data, head to `Developer` -> `Extrinsic` -> `fuelTanks` -> `removeAccountRuleData`, and select the `tankId`, `accountId` to remove and the rule set and rule type to remove data from.

![](https://files.readme.io/00aad40-image.png)

# Dispatch a transaction using a fuel tank

Dispatch a call through the fuel tank, where the tank would pay for transaction fees and, if configured, provide a storage deposit. All calls are subject to rule set evaluation and would result in rule specific errors in case of failure. In case the inner call fails, the DispatchFailed event will be emitted with wrapped dispatch error inside. In success case emits Dispatched event.

To dispatch a transaction using a fuel tank, head to Network -> Fuel tanks, select the fuel tank you wish to use and select Dispatch.

Inside the dialog box that opens, select:

- The extrinsic you want to call via the fuel tank.
- The rule set id you wish to apply to the transaction.
- The extrinsic to execute.
- If willing to pay for transaction fees that exceed the fuel tank budget threshold.

![](https://files.readme.io/d94ee40-image.png)

On success, you should see the `CallDispatched` event.