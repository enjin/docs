---
title: "Running a Validator"
slug: "running-a-validator"
excerpt: ""
hidden: false
createdAt: "Tue Oct 31 2023 22:02:18 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Nov 24 2023 15:01:46 GMT+0000 (Coordinated Universal Time)"
---
# Preliminaries​

Operating a Validator carries significant responsibility. You're responsible for both your stake and that of your nominators. Errors can lead to a loss of tokens and harm your reputation. Despite this, being a Validator can be fulfilling as you help secure a decentralized network and increase your holdings.

> 🚧 You should have strong system administration skills before trying to run your own Validator. You'll need to address technical problems with your node independently. Being a Validator is more than just running the Enjin Relaychain binary.

## How much ENJ do I need to become an Active Validator?

There's a distinction between becoming a Validator, and becoming an Active Validator. In order to become a Validator, you need to bond a minimum of 15,000 ENJ. However, becoming an Active Validator requires further economical backing. There is currently a maximum of 13 Active Validators, and so your total stake must be within the top 13. The total stake of a Validator consists of the Validator's own stake, along with the collective stake of all nominators that nominate it. Outside of the top 13, your Validator will remain waiting.

The simplest way to estimate the required stake would be to navigate to the `Staking` > `Targets` page on the Enjin Console and read the value of "Lowest Staked" and staking an additional 1 ENJ on-top of that value.

> 📘 The minimum backing required to become an Active Validator on Enjin Relaychain, as of era 157, is 288,043 ENJ.

> ❗️ Operating an insecure or improper setup may result in loss of ENJ!
> 
> It is important to acknowledge that any ENJ that you stake for your Validator is liable to being slashed. If you are not confident in your ability to run a Validator, it is recommended to nominate your ENJ to a trusted Validator instead.

# Initial Set-up

## Requirements

To run a Validator, most people use a cloud server with Linux. It's recommended to use a recent version of Debian Linux. This guide uses `Ubuntu 22.04 LTS`, but steps should be similar for other operating systems.

## Reference Hardware

Enjin Relaychain's transaction weights are based on specific hardware benchmarks. These were tested on Amazon's `c6i.4xlarge`. Validators should use hardware that matches or exceeds these benchmarks to process blocks efficiently.

- **CPU**
  - x86_64 architecture
  - 4-cores @ 3.4 GHz
  - Intel Ice Lake (or newer); or AMD Zen3 (or newer)
- **Storage**
  - 512 GB NVMe SSD: it is important to note that, overtime, the size of the Enjin Blockchain, and its ecosystem, will grow and therefore scaling of the storage is imperative.
- **Memory**
  - 32 GB DDR4 ECC

> 📘 It is not necessary to use an excessive number of CPU cores as operating a node is a single-threaded operation. Therefore, using a higher clocked CPU with 4-cores is more than sufficient.

The above hardware specifications are not the minimum specifications. However, they should be considered as best practice. Operating a Validator requires the use of professional hardware. Using inferior hardware can lead to performance problems, fewer era points, and even potential slashing.

## Install a Network Time Protocol (NTP) Client

[NTP](https://en.wikipedia.org/wiki/Network_Time_Protocol) is a networking protocol designed to synchronize the clocks of computers over a network. NTP allows you to synchronize the clocks of all the systems within the network. Currently it is required that the local clocks of Validators stay reasonably in-sync. Therefore, you should be running a NTP. Most modern Linux installations include an NTP client installed out-of-the-box for time synchronisation.

### Checking System Clock Synchronization

You can check whether you currently have a NTP client installed by running the following command:

`timedatectl`

In the event that you have a NTP client installed, and is running, you should see a message similar to the following being output upon running the above command:

`System clock synchronized: yes`

### Install an NTP Client

If you do not see the message, you can install a NTP client using the following command:

`sudo apt-get install ntp`

Once installed, `ntpd` (the NTP client daemon) will start automatically. You can then query to ensure that system clock has synchronized by repeating the steps under [Checking System Clock Synchronization](https://docs.enjin.io/enjin-blockchain/validator-staking/running-a-relaychain-validator#checking-system-clock-synchronization).

> ❗️ CRITICAL
> 
> If you skip this step, your Validator may miss chances to author blocks. If the clock isn't accurate, the network may not accept the blocks you produce. This will result in ImOnline heartbeats making it on chain, but zero allocated blocks making it on chain.

## Running a Relaychain Node

You can refer to the page on [Running a Relaychain Node](/docs/relaychain-nodes) in order to get setup.

### Synchronize Chain State

In order to validate, you must first have a node that has fully synchronized. This is simply a matter of running your node and allowing it sufficient time to complete its synchronization. It may take several hours to complete this process.

The syncing process can be identified as a result of lines been written to your console indicating "Syncing," like so:

```
2023-10-10 19:39:00 ⚙️  Syncing, target=#1861415 (8 peers), best: #1733 (0xf5eb…68ab), finalized #1536 (0x14c5…d421), ⬇ 1.0MiB/s ⬆ 15.5kiB/s  
2023-10-10 19:39:05 ⚙️  Syncing 439.6 bps, target=#1861415 (8 peers), best: #3931 (0xa854…ea3c), finalized #3584 (0xc223…cab1), ⬇ 580.4kiB/s ⬆ 2.7kiB/s  
2023-10-10 19:39:10 ⚙️  Syncing 428.6 bps, target=#1861416 (8 peers), best: #6074 (0x7a75…e2db), finalized #5632 (0x4944…9413), ⬇ 579.2kiB/s ⬆ 1.7kiB/s  
2023-10-10 19:39:15 ⚙️  Syncing 417.2 bps, target=#1861417 (8 peers), best: #8160 (0xbb52…b682), finalized #7680 (0x61ce…91bc), ⬇ 577.6kiB/s ⬆ 1.4kiB/s  
2023-10-10 19:39:20 ⚙️  Syncing 416.2 bps, target=#1861418 (8 peers), best: #10241 (0x3303…f6a6), finalized #10240 (0xaac3…9f1c), ⬇ 582.3kiB/s ⬆ 4.0kiB/s
```

You will know when it has synced, as you will no longer see lines as illustrated above and instead you'll see lines indicating blocks have been "Imported":

```
2023-10-18 14:33:24 ✨ Imported #1971895 (0xa37a…4ec9)  
2023-10-18 14:33:24 ✨ Imported #1971895 (0xa37a…4ec9)  
2023-10-18 14:33:22 💤 Idle (10 peers), best: #1971894 (0xe81a…d878), finalized #1971891 (0xa9fc…7deb), ⬇ 4.9kiB/s ⬆ 9.1kiB/s  
2023-10-18 14:33:19 💤 Idle (9 peers), best: #1971894 (0xe81a…d878), finalized #1971890 (0x7065…145e), ⬇ 5.2kiB/s ⬆ 3.9kiB/s  
2023-10-18 14:33:18 ✨ Imported #1971894 (0xe81a…d878)  
2023-10-18 14:33:18 ✨ Imported #1971894 (0xe81a…d878)  
2023-10-18 14:33:17 💤 Idle (10 peers), best: #1971893 (0xb933…472d), finalized #1971890 (0x7065…145e), ⬇ 7.1kiB/s ⬆ 6.1kiB/s  
2023-10-18 14:33:14 💤 Idle (9 peers), best: #1971893 (0xb933…472d), finalized #1971890 (0x7065…145e), ⬇ 8.6kiB/s ⬆ 10.7kiB/s
```

### Session Keys

If you're uncertain about your node's current session keys after the setKeys transaction, you can check using two RPC methods: hasKey for a specific key or hasSessionKeys for the entire session key string.

Once your node has been fully synced, it's now time to generate your session keys. You need to stop the node and run it again using the `--validator` argument.

`$ ./enjin --validator --name "a_reasonably_unique_name_a8f310"`

You will know if this was successful as you will see an output during startup indicating your role is now `AUTHORITY` and an indication of the `BABE` authorship worker being started. This can be observed in the below example:

```
2023-10-10 19:38:46 Enjin  
2023-10-10 19:38:46 ✌️  version 0.9.43-b624209af49  
2023-10-10 19:38:46 ❤️  by Enjin, 2017-2023  
2023-10-10 19:38:46 📋 Chain specification: Enjin Relaychain  
2023-10-10 19:38:46 🏷  Node name: a_reasonably_unique_name_a8f310  
2023-10-10 19:38:46 👤 Role: AUTHORITY  
2023-10-10 19:38:46 💾 Database: RocksDb at /enjin/chainstate/relaychain/chains/enjin-relaychain/db/full  
2023-10-10 19:38:46 ⛓  Native runtime: enjin-101 (enjin-1.tx2.au1)  
[..]  
2023-10-10 19:38:55 👶 Starting BABE Authorship worker
```

### Generating Session Keys

> 📘 If you do not have curl installed, you can install it using the following command: `sudo apt-get install curl`

You need to tell the chain about your Session Keys. This is what associates your validator node with your stash account. You can do this by signing and submitting an extrinsic.

You must first call the `author_rotateKeys` on your node. You can do this via CLI using the following `curl` command:

```
curl -X POST  
	-H "Content-Type: application/json"  
	-d '{"jsonrpc":"2.0","method":"author_rotateKeys","params":\[],"id":1}'  
	http\://localhost:9944
```

> 📘 If you have changed the default ports for your node, you will need to modify the curl command to reflect which port exposes the RPC interface.

If you ran this successfully, you will receive a successful response and the result will include a hex-encoded string. This string is your Session Keys. It is important you make note of these keys as we will set it in the next session.

\``{"jsonrpc":"2.0","result":"0xef1b41a7fca69a26633deb436f3b11aa94eab64edbb9b41e290a1487bb9c9744[..]3893e7a76d3c7ec070a30c96ed1fd2b22daa6856c79ce709032891d4afd171c9","id":1}`

> 📘 It is now recommended that you restart your node. You can disable the RPC / WebSocket interface, or restrict RPC to only allowing safe methods, at this point in order to further lockdown your node.

### Bond ENJ, Set Session Keys and Begin Validating

To become a Validator on the Enjin Relaychain, you initially need 15,000 ENJ. However, to become an Active Validator and earn rewards, you need a total stake that meets or exceeds a certain amount of ENJ. 

If you want community nominations, you must show commitment and trust by bonding some of your own ENJ and illustrating a willingness of own personal loss if you're to operate the Validator incorrectly. Don't bond all of your ENJ to ensure you can cover transaction fees. Bonded ENJ is locked and cannot be used.

In this step, we will bond an amount ENJ, set our session keys and confirm we're ready to begin validating. To get started, navigate to the [Staking > Accounts](https://console.enjin.io/?rpc=wss%3A%2F%2Frpc.relay.blockchain.enjin.io#/staking/actions) page on the Enjin Console and select `+ Add Validator`.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/2c419b5-image.png",
        null,
        "Page 1 of the Setup Validator — set amount to bound and payment destination"
      ],
      "align": "center",
      "caption": "Page 1 of the Setup Validator — set amount to bound and payment destination"
    }
  ]
}
[/block]


Select the `stash account` that you want to use as a Validator. This account will be responsible for bonding the relevant ENJ.

Enter the amount that you would like to bond into the `value bonded` field. In this example we're using 15,000 ENJ. Remember that, if you want to be considered an Active Validator you must bond sufficient ENJ to exceed the current minimum active stake.

For the `payment destination` there are three options:

- **Stash account (increase the amount at stake):** this option allows your Validator's stake to keep increasing with each payout. This can be beneficial as it results in your Validator's stake (and, in-turn, your total stake) to keep increasing and thereby make you more likely to remain an Active Validator by being in the top 13.
- **Stash account (do not increase the amount at stake):** this option allows you to receive ENJ directly back to your stash account, though the amount is not added to your Validator's stake.
- **Specified payment account:** this option allows you to specify an alternative account (unrelated to the stash account) which will receive any payouts.
- You can then select `next` to continue the setup.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/6feed15-image.png",
        null,
        "Page 2 of the Setup Validator — set keys, reward commission and allowing of nominations"
      ],
      "align": "center",
      "caption": "Page 2 of the Setup Validator — set keys, reward commission and allowing of nominations"
    }
  ]
}
[/block]


In the `keys from rotatekeys` field, you want to enter the keys you acquired during Generating Session Keys.

For the `reward commission percentage`, this is a value ranging from 1 - 100. This is the rate that your Validator will be commissioned with.

Selecting a high commission percentage means you are less likely to be nominated by a nominator. Especially, during the early stages of you operating a Validator where proving your reputation is paramount.

In the `allow new nominations` field. This controls whether you want to allow nomination pools to nominate your Validator. Selecting `Yes, allow nominations` will allow your Validator to be nominated by nominators. Selecting `No, block all nominations` will prevent your Validator from being nominated by any new nomination pools.

Finally, select `Bond & Validate` to finalise the setup of your Validator.

All that remains is to verify everything was set correctly. You can do this by navigating to the [Staking > Overview](https://console.enjin.io/?rpc=wss%3A%2F%2Frpc.relay.blockchain.enjin.io#/staking) section of the Enjin Console and selecting the `Waiting` tab. If everything was successful, you'll see your Validator listed.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/e48428b-image.png",
        null,
        "Validator setup successfully and showing as waiting."
      ],
      "align": "center",
      "caption": "Validator setup successfully and showing as waiting."
    }
  ]
}
[/block]


Congratulations! If you've followed everything correctly, you're now officially a Validator! Make sure that you have enough total stake backing your Validator be selected for the next Validator Set.

# FAQ

## Validator Set - when are new Validators selected?

Validators are selected at the start of the final epoch in a given era. For the Enjin Relaychain, this means on the 6th epoch (20th hour) of the era. In order to be selected, you must be one of the top 13 Validators based on total stake and not currently chilled or slashed.

## When will my Validator become active?

If you were selected to be part of the next Validator Set, your Validator will become active in the next era. For the Enjin Relaychain, this means 4 hours after your Validator was selected for inclusion within the next Validator Set.