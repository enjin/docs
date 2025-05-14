---
title: "Fuel Tanks Pallet"
slug: "fuel-tank-pallet"
description: "Subsidize fees for your players while reducing overall costs."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';

:::info The Enjin Blockchain Console
Use [console.enjin.io](https://console.enjin.io/) to use the user interface referenced in this document.  
You may also check the [hands-on guide for creating and using fuel tanks](/02-guides/01-platform/02-managing-users/04-using-fuel-tanks.md)
:::

## What is a Fuel Tank?

Fuel Tanks are special accounts that are used purely for transaction fees. Developers can choose to subsidize costs for their customers by depositing ENJ tokens to a Fuel Tank they control. ENJ tokens deposited to a Fuel Tank cannot be withdrawn, but they are released to the tank owner upon tank destruction.

A fuel tank can whitelist specific tokens, tags, transaction types or users that will be permitted to use it.

The fuel tank’s ID may be specified in any transaction. The chosen fuel tank will cover transaction costs if its requirements are met. Any remaining costs will be paid by the Fee Payer.

‍Rules are added to a fuel tank to fine-tune its permissions for specific operators, tokens, time limits and value limits.

## Terminology

### Dispatch

Dispatch refers to the act of broadcasting a transaction via a Fuel Tank, which will subsidize the call's <GlossaryTerm id="transaction_fees" />. Depending on the configuration of the Fuel Tank, it may also subsidize any <GlossaryTerm id="storage_deposit" /> required by the call.

### Accounts

#### Tank User Account

Some fuel tanks require users to register an account to use them. The owner of the fuel tank can specify whether only they can add accounts or if users are allowed to create their own accounts, with or without specific requirements, with the `User Account Management` field.  
Each fuel tank account requires a 0.01 ENJ deposit for the Tank User Account <GlossaryTerm id="storage_deposit" />

#### User Account Management

By default, only the Fuel Tank owner has the permission to add accounts to the Fuel Tank User Accounts. However, the Fuel Tank can be configured to allow accounts to add themselves by setting the `userAccountManagement.tankReservesAccountCreationDeposit` field.

- **Default Behavior**: If the `userAccountManagement` field is not configured, only the Fuel Tank owner can add accounts to the Fuel Tank User Accounts.
- **Self-Addition without Deposit Funding**: If the `userAccountManagement.tankReservesAccountCreationDeposit` field is set to `false`, the Fuel Tank allows accounts to add themselves to the Fuel Tank User Accounts. However, the Fuel Tank will not provide the funds required for the Tank User Account <GlossaryTerm id="storage_deposit" />.
- **Self-Addition with Deposit Funding**: If the `userAccountManagement.tankReservesAccountCreationDeposit` field is set to `true`, the Fuel Tank allows accounts to add themselves to the Fuel Tank User Accounts, and it also covers the necessary funds required for the Tank User Account <GlossaryTerm id="storage_deposit" />.

### Rules

#### Account Rules

Account Rules are rules that are validated at the time of Tank User Account Creation.

#### Dispatch Rules

Dispatch Rules are rules that are validated at the time of dispatch.  
When a dispatch call is made to a fuel tank, it must be made in accordance with a set of rules. These rules, known as rule sets, can include multiple individual rules that determine the validity of the call. A fuel tank can have multiple rule sets, each of which controls access and permissions to the fuel tank's functionality and resources.

#### Available Rules

##### Whitelisted Callers:

Whitelisted callers are accounts that are explicitly granted permission to make calls to a fuel tank and/or create Tank User Accounts. Any calls made by accounts not on the whitelist will be rejected and fail.

##### Whitelisted Collections:

Whitelisted collections refer to a list of specific collections allowed to be called by dispatch on a fuel tank. If a dispatch call involves a collection that is not within the whitelisted collections, it will be rejected and fail. This ensures that calls are only made to the specific collections authorized to be accessed.

##### Max Fuel Burn Per Transaction:

It is a setting that limits the amount of fuel that can be consumed in a single transaction. It is a safety measure that helps prevent misuse and overuse of the fuel tank's resources by ensuring that a single transaction doesn't consume too much fuel, which is important to ensure a sustainable network.

##### User Fuel Budget:

A user fuel budget is the total amount of fuel allocated to a specific user. It sets a limit on the amount of fuel that can be consumed by a user's transactions. Once the user's fuel budget is exhausted, their transactions will fail until the reset period is passed / their account data is removed / more fuel is added to the budget. This is meant to avoid the overuse of resources and ensure a sustainable network.

##### Tank Fuel Budget:

A tank fuel budget is the total amount of fuel allocated to a specific rule set. It sets a limit on the amount of fuel that can be consumed by all transactions made through that rule set. Once the tank's fuel budget is exhausted, all transactions will fail until the reset period is passed / more fuel is added to the tank's budget or overall consumption is lowered.

##### Require Token:

The "Require token" setting determines that a specific token must be held by the caller for the call to be accepted by the fuel tank. If the caller does not possess the required token, the call will be rejected and fail. This feature is intended to ensure that only users who hold the specified token can access the fuel tank's functions and resources.

##### Require Signature:

The "Require Signature" setting determines that a call must be signed by a specific account, and this signature must be included in the dispatch settings for the call to be accepted by the fuel tank.  
If the signature is not provided, is invalid or is signed by a different account, the call will be rejected and fail. This feature is particularly useful with [managed wallets](/02-guides/01-platform/02-managing-users/03-using-managed-wallets.md) to allow multiple controlled accounts to use the fuel tank without paying <GlossaryTerm id="storage_deposit" />s in advance.

##### Whitelisted Pallets:

Whitelisted Pallets refer to a list of specific pallet names that are allowed to be executed using this rule set. This setting only considers the pallet name, not the extrinsics or parameters passed to it. Any call that includes pallets not on the list will be rejected and fail. This ensures that only certain pallets are authorized for calls made by the users, providing a finer level of control over what actions are allowed.

##### Permitted Extrinsics:

Permitted extrinsics refer to a list of specific extrinsic function names that are allowed to be executed using this rule set. This setting only considers the extrinsic name, not the parameters passed to it. Any call that includes extrinsics not on the list will be rejected and fail. This ensures that only certain extrinsics are authorized for calls made by the users, providing a finer level of control over what actions are allowed.

##### Permitted Calls:

Permitted calls refer to a list of specific extrinsic calls that are allowed to be made using this rule set, including both the extrinsic name and the specific parameters. Any calls made to other extrinsics, or extrinsic calls with non-permitted arguments, will be rejected and fail. This ensures that only authorized extrinsic calls with specific arguments can be made by the users, providing a finer level of control over what actions are allowed.

### General Tank Terms

#### Coverage Policy:

This determines the scope of the fuel tank's subsidy.  
Setting the Coverage Policy to "FEES" means it will subsidize only <GlossaryTerm id="transaction_fees" />.  
Alternatively, setting it to "FEES_AND_DEPOSIT" ensures it covers both <GlossaryTerm id="transaction_fees" /> and any <GlossaryTerm id="storage_deposit" /> the dispatched call may require.

#### Freezing:

"Freezing" is a state where a fuel tank or a rule set is temporarily prevented from accepting calls. This means that while a fuel tank or rule set is frozen, no dispatches are allowed to occur on it. This is implemented as a safety measure to prevent accidental or malicious changes and to ensure that the fuel tank or rule set remains in a stable state until the freeze is lifted.  
Also note that in order to mutate any fuel tank or rule set configurations, it must be frozen first.

#### Descriptor:

A descriptor is a list of all the data needed to create a fuel tank. It includes details such as the fuel tank's name, account management rules, rule sets and other configuration information related to the fuel tank. The descriptor acts as a blueprint that defines how the fuel tank is set up and how it will function. It contains all the information needed to create and configure the fuel tank, and can be used to modify the fuel tank's settings.

#### Require Account:

The "Require Account" setting determines whether the caller must have a tank account in order to dispatch.  
If "Require Account" is set to true, the caller must have a tank account; otherwise, their dispatch will be rejected and fail.  
If "Require Account" is set to false, the caller can dispatch even without a tank account.  
It is important to note that when "Require Account" is set to false, anyone will be able to dispatch, which could quickly drain the tank funds. Therefore, it is crucial to implement strict dispatch rules when using "Require Account: false" to prevent misuse.

### Extrinsics

#### create_fuel_tank:

Create a new fuel tank by providing a descriptor. Extrinsic generates a discrete `AccountId` for the fuel tank based on passed in parameters, it takes a storage deposit and emits `FuelTankCreated` event in the success case. Creation of already existing fuel tank will result in `FuelTankAlreadyExists` error, while duplicate rule kinds within a rule set will result in `DuplicateRuleKinds`

#### mutate_fuel_tank:

Applies provided mutation to the fuel tank. Caller must be the owner of the fuel tank, otherwise call will result in `NoPermission` error. Tank must be frozen in order to mutate it, otherwise call will result in `RequiresFrozenTankOrRuleset` error. Duplicate rule kinds within a rule set will result in `DuplicateRuleKinds`. In success case emits `FuelTankMutated` event

#### add_account:

Adds a new fuel tank user account, which not only allows using fuel tank, but also stores user consumption and rule set data. An account can be created only if account rules are successfully validated. An account is required to dispatch calls when the ruleset's `require_account` is set to `true`.  
A storage deposit is required, and may be paid by the user or the fuel tank, depending on the settings. Could fail with `NoPermission` if caller is not the owner and user management settings don't allow users to create accounts on their own. Creation of already existing account withing a tank will result in `AccountAlreadyExists` error. In case some of account rules cannot validate the caller, rule specific error will be returned. In success case emits `AccountAdded` event

#### remove_account:

Removes a user account from a fuel tank and returns the storage deposits. Fuel tank must be frozen for operation to succeed, otherwise call will result in `RequiresFrozenTank` error. Account must not contain any rule data, otherwise call will result in `AccountContainsRuleData` error. In success case emits `AccountRemoved` event

#### remove_account_rule_data:

Remove account rule data if it exists. Requires the fuel tank or the rule set to be frozen, otherwise will result in `RequiresFrozenTankOrRuleset` error. Only callable by the fuel tank's owner, otherwise will result in `NoPermission` error. In success case emits `AccountRuleDataRemoved` event

#### dispatch:

Dispatch a call through the fuel tank, where the tank would pay for transaction fees and, if configured, provide a storage deposit.  
Additional settings can be provided with the `Settings` argument such as `provide remaining fee`, or include a signature required for the `RequireSignature` dispatch rule.  
All calls are subject to rule set evaluation and would result in rule specific errors in case of failure. In case the inner call fails, the `DispatchFailed` event will be emitted with wrapped dispatch error inside. In success case emits `Dispatched` event.

#### dispatch_and_touch:

Same as dispatch, but also does create an account for the caller with `add_account` operation if it doesn't exist. Fuel tank's `user_account_management` settings must allow self-service account creation, otherwise call will result in `NoPermission` error.

#### schedule_mutate_freeze_state:

Schedule mutating of fuel tank or rule set `is_frozen` state for `on_finalize` to execute with help of `process_freeze_queue` helper function. Additional 1 read and 1 write are added to account for `on_finalize` storage operations. Only callable by the fuel tank's owner, otherwise will result in `NoPermission` error. In case queue already has maximum number of items, will result in `FreezeQueueFull` error. In success case emits `MutateFreezeStateScheduled` event

#### insert_rule_set:

Insert a new rule set into a fuel tank. It can be a new rule set or it can replace an existing one. If it is replacing a rule set, a rule that is storing data on any accounts cannot be removed and will result in `CannotRemoveRuleThatIsStoringAccountData` error. Use `remove_account_rule_data` to remove the data first. If a rule is being replaced, it will be mutated with the new parameters, and it will maintain any persistent data it already has. Fuel tank or rule set must be frozen, otherwise will result in `RequiresFrozenTankOrRuleset` error. If fuel tank already has maximum number of rule sets, will result in `MaxRuleSetsExceeded` error. Duplicate rule kinds within a rule set will result in `DuplicateRuleKinds`. In success case emits `RuleSetInserted` event

#### remove_rule_set:

Remove rule set from a fuel tank. A rule that is storing data on any accounts cannot be removed and will result in `CannotRemoveRuleThatIsStoringAccountData` error. Use `remove_account_rule_data` to remove the data first. This is only callable by the fuel tank's owner, otherwise will result in `NoPermission` error. Fuel tank or rule set must be frozen, otherwise will result in `RequiresFrozenTankOrRuleset` error. In success case emits `RuleSetRemoved` event

#### batch_add_account:

Same as `add_account` but takes a list of `AccountIds` to add into a fuel tank

#### batch_remove_account:

Same as `remove_account` but takes a list of `AccountIds` to remove from a fuel tank

#### force_set_consumption:

Force set the fuel tank consumption. If `user_id` is `Some`, it sets the consumption for that account. If it is `None`, it sets the consumption on the fuel tank directly. Currently only callable by fuel tank owner and sudo account, otherwise will result in `NoPermission` error

#### destroy_fuel_tank:

Destroy the fuel tank. Only callable by owner, otherwise will result in `NoPermission` error. The fuel tank must be frozen, otherwise will result in `DestroyUnfrozenTank` error. Can only be destroyed if all accounts are removed, otherwise will result in `DestroyWithExistingAccounts` error. Returns the storage deposit and remaining balance to the fuel tank owner. In success case emits `FuelTankDestroyed` event

## How to create a fuel tank?

A fuel tank can be created by anyone using the `create_fuel_tank` extrinsic function, once the fuel tank is created, the owner can add funds to it and subsidize transactions that are permitted by the fuel tank. The primary function of a fuel tank is to allow a user to interact with Enjin Matrixchain without paying transaction fees (called gas fees in Ethereum).

Create a new fuel tank by providing a `descriptor`. The extrinsic generates a discrete `AccountId` for the fuel tank based on passed in parameters, it takes a storage deposit and emits `FuelTankCreated` event in the success case. Creation of already existing fuel tank will result in `FuelTankAlreadyExists` error, while duplicate rule kinds within a rule set will result in `DuplicateRuleKinds`.

To create a new fuel tank using the [explorer](https://console.enjin.io/#/explorer), head to `Network` → `Fuel tanks` → `Create Fuel Tank`. This page allows you to create a new fuel tank by specifying the following options:

- **Name:** Name for the fuel tank.
- **[User Account Management](#user-account-management):** (Optional) Allows setting the permission level to add new accounts to the fuel tank.
- **[Coverage Policy](#coverage-policy):** \<FEES|FEES_AND_DEPOSIT\> → Specify the scope of the fuel tank's subsidy.
- **[Account Rules](#account-rules):** (Optional) Allows specifying rules that are evaluated before an account is added to the fuel tank.
- **[Dispatch Rules](#dispatch-rules):** (Optional) Allows specifying rules that are evaluated before an extrinsic is dispatched via the fuel tank.

:::warning
Even though the account rules and dispatch rules are optional, it is recommended to have some rules setup for your fuel tank, a fuel tank without any rules might be open to anyone without limits.
:::

This image shows how to create a fuel tank, with some basic rules, in the following fuel tank configuration Alice creates a fuel tank that provides storage deposits for operations that require it. The tank consists of a single ruleset that doesn't require a Tank User Account to dispatch calls, and only Bob and Charlie can dispatch calls via this ruleset.

![](/img/components/enjin-matrixchain/26.png)

## How to modify a fuel tank?

To mutate or modify a fuel tank, the caller must be the owner of the fuel tank, otherwise call will result in `NoPermission` error. Tank must be frozen in order to mutate it, otherwise call will result in `RequiresFrozenTankOrRuleset` error. Duplicate rule kinds within a rule set will result in `DuplicateRuleKinds`. In success case emits `FuelTankMutated` event

To mutate a fuel tank using the explorer, head to `Network` → `Fuel tanks`. Mutating a fuel tank involves three steps 1. Freeze the fuel tank 2. Mutate the fuel tank 3. Unfreeze the fuel tank

1. To Freeze the fuel tank, head to `Network` → `Fuel tanks`, this will present a list of all fuel tanks, select the fuel tank you wish to mutate and select freeze/unfreeze. In the next dialog box, set `is_frozen` to `true` and execute the transaction
2. To mutate the fuel tank, head to `Network` → `Fuel Tanks` → under specific fuel tank → `Mutate`In the modal, Select the Account (the owner of the fuel tank) and select the fuel tank id (you can get this from the fuel tanks page in the previous step) and add any modifications to the fuel tank.  
   If successful, you should see the event with you changes in the explorer `Network` tab
3. To unfreeze the fuel tank, head to `Network` → `Fuel tanks`, and perform the same step but select the `is_frozen` to `false`

## Add an account to a fuel tank

Adds a new fuel tank user account. An account can be created only if [account rules](#account-rules) are successfully validated. An account may be required to dispatch calls. A storage deposit is required, and may be paid by the user or the fuel tank, depending on the settings. Could fail with `NoPermission` if caller is not the owner and user management settings don't allow users to create accounts on their own. Creation of already existing account withing a tank will result in `AccountAlreadyExists` error. In case some of account rules cannot validate the caller, rule specific error will be returned. In success case emits `AccountAdded` event

To add an account to a fuel tank using the explorer, head to `Network` → `Fuel tanks`:

- Select the fuel tank and click add account
- Select account to be added.
- On success you should see an `AccountAdded` event

## Remove an account from fuel tank

Removes a user account from a fuel tank and returns the storage deposits. Fuel tank must be frozen for operation to succeed, otherwise call will result in `RequiresFrozenTank` error. Account must not contain any rule data, otherwise call will result in `AccountContainsRuleData` error. In success case emits `AccountRemoved` event

To remove an account from a fuel tank using the explorer:

1. Head to `Network` → `Fuel tanks`, and follow similar instructions to remove an account.
2. Select the fuel tank and click remove account

![](/img/components/enjin-matrixchain/27.png)

## Remove an account rule data

As part of enforcing the budget and max spending limits of the fuel tank, the fuel tank stores data for every account. The `remove_account_rule_data` allows to remove a user account rule data if it exists. Requires the fuel tank or the rule set to be frozen, otherwise will result in `RequiresFrozenTankOrRuleset` error. Only callable by the fuel tank's owner, otherwise will result in `NoPermission` error. In success case emits `AccountRuleDataRemoved` event.

:::warning
Similar to the process of mutating a Fuel Tank, the Fuel Tank must be frozen for the operation to succeed, otherwise the call will result in an error.
:::

To remove an account rule data, head to `Developer` → `Extrinsic` → `fuelTanks` → `removeAccountRuleData`, and select the `tankId`, `accountId` to remove data from and the rule set and rule type to remove data from.

![](/img/components/enjin-matrixchain/28.png)

## Dispatch a transaction using a fuel tank

Dispatch a call through the fuel tank, where the tank would pay for transaction fees and, if configured, provide a storage deposit. All calls are subject to rule set evaluation and would result in rule specific errors in case of failure. In case the inner call fails, the `DispatchFailed` event will be emitted with wrapped dispatch error inside. In success case emits `Dispatched` event.

To dispatch a transaction using a fuel tank, head to Network → Fuel tanks, select the fuel tank you wish to use and select Dispatch.

Inside the dialog box that opens, select:

- The extrinsic you want to call via the fuel tank.
- The rule set id you wish to apply to the transaction.
- The extrinsic to execute.
- The dispatch settings if necessary.

![](/img/components/enjin-matrixchain/29.png)

On success, you should see the `CallDispatched` event.

## Selecting a fuel tank to dispatch with

The `fuelTanks_selectFuelTank` API method is a part of the matrix runtime, designed to allow users to select a fuel tank from a list of given fuel tanks. Here are step-by-step instructions on how to call this method, including the necessary parameters and expected output.

### Method Definition

```rust
#[method(name = "fuelTanks_selectFuelTank")]
fn select_fuel_tank(
	&self,
	caller: Address,
	call: Vec<u8>,
	settings: Vec<u8>,
	fuel_tanks: Vec<Address>,
	at: Option<BlockHash>,
) -> RpcResult<Option<(Address, u32)>>;
```

### Parameters

- `[Required]` caller (Address): The address of the caller who is invoking the method.
- `[Required]` call (`Vec<u8>`): A vector of bytes representing the call that is to be made.
- `[Required]` settings (`Vec<u8>`): A vector of bytes representing the settings to be applied during the call. This should match the settings provided during the actual call or the selction will not work correctly.
- `[Required]` fuel_tanks (`Vec<Address>`): A vector of addresses representing the available fuel tanks to select from. If no fuel tanks are provided then all fuel tanks are searched.
- at (Option\<BlockHash): An optional block hash at which the selection should be made.

### Return Value

The method returns a `RpcResult<Option<(Address, u32)>>`, which can be interpreted as:

- `Option<(Address, u32)>` : An optional tuple where:  
  `Address`: The selected fuel tank's address.  
  `u32`: The amount of fuel (funds) available in the selected tank.

If no appropriate fuel tanks are found the rpc will return null.

### How it works

The provided RPC method `fuelTanks_selectFuelTank` works by internally selecting the most suitable fuel tank for a transaction based on the caller's request and the set of predefined rules. The evaluation process considers various factors such as the fee required to execute the transaction, whether the fuel tank is frozen, and if the caller's account is associated with the fuel tank. The goal is to find the fuel tank that can cover the transaction costs with the least expense to the user while complying with all applicable rules.

It is important to note that this RPC method relies heavily on the proper configuration and the correct availability of fuel tanks. If the settings passed during the selectFuelTank phase and actual call differs then the result might be unreliable.

### Example

- PolkadotJS

```javascript
import { ApiPromise, Keyring, WsProvider } from '@polkadot/api';

const MATRIX_URL = "ws://127.0.0.1:56287";

async function sendTransaction() {
        // Initialize the provider
        const provider = new WsProvider(MATRIX_URL);
        
        // Create the API instance
        const api = await ApiPromise.create({
            provider,
            rpc: {
                fuelTanks: {
                    selectFuelTank: {
                        params: [
                            { name: 'callerAddress', type: 'AccountId' },
                            { name: 'call', type: 'Vec<u8>' },
                            { name: 'settings', type: 'Vec<u8>' },
                            { name: 'fuelTanks', type: 'Vec<AccountId>' },
                            { name: 'at', type: 'Hash', isOptional: true }
                        ],
                    },
                }
            }
        });

        // Create a keyring instance and add Alice's account
        const keyring = new Keyring({ type: 'sr25519' });
        const alice = keyring.addFromUri('//Alice');

        // Define recipient and amount for the transfer
        const recipient = 'cxMefrbkBrS5CQNTsZNxrntTMnakzVLnR9d5f3q5TuhDBynex';
        const amount = 1000000000000;

        // Create the transfer call
        const transferCall = api.tx.balances.transferKeepAlive(recipient, amount);

        // Debug: Log the transfer call
        console.log('Transfer call (hex):', transferCall.toHex());

        // Define settings and fuelTanks with proper types
        const settings = new Uint8Array(); // or the actual settings if available
        const fuelTanks = []; // Pass an empty array if no specific fuel tanks are provided

        // Perform the RPC call to select the fuel tank
        const response = await api.rpc.fuelTanks.selectFuelTank(
            "cxMefrbkBrS5CQNTsZNxrntTMnakzVLnR9d5f3q5TuhDBynex",
            transferCall.tou8a(),
            settings,
            fuelTanks,
            null // Use 'null' for optional 'at' parameter if not required
        );

        // Debug: Log the response
        console.log('Response:', response);
}
```
