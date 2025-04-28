---
title: "Running the Wallet Daemon"
slug: "running-the-wallet-daemon"
excerpt: ""
hidden: false
metadata: 
  title: "Running the Wallet Daemon - Secure Blockchain Transactions"
  description: "Learn how to run the Wallet Daemon for managing blockchain transactions securely within the Enjin platform."
  image: []
  robots: "index"
createdAt: "Wed Jan 31 2024 10:24:35 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Nov 13 2024 15:48:13 GMT+0000 (Coordinated Universal Time)"
---
Along with running the Platform natively on your own cloud service, you can also build and run the wallet daemon natively too.  This requires just a few steps to configure and build the app which can then be run from the same server as the platform or on a completely different server.  It would be highly recommended to run the wallet daemon app on a separate server, and ideally one which is is configured to only allow connections to and from your platform server, or at least not generally accessible directly from the internet.  Please note that 2GB of ram would be recommended when building the wallet daemon from source locally.

:::info Prerequisite: Rust Version 1.82
To install or update the wallet daemon, ensure that you have Rust version 1.82 installed. If you need to update Rust, you can do so by running the following command:

```bash
rustup update
```
:::

1. Start by installing or updating cargo: 
   ```bash
   apt install cargo
   ```

2. Install or update the openssl dev libs: 
   ```bash
   apt-get install libssl-dev pkg-config
   ```

3. Next add the `KEY_PASS` and `PLATFORM_KEY` env vars to your environment variable list so they start on login, to do this create a new `wallet-daemon.sh` file in `/etc/profile.d/`: 
   ```bash
   nano /etc/profile.d/wallet-daemon.sh
   ```
   And then add the variables, choose a strong password for your `KEY_PASS` and set your platform's auth token in the `PLATFORM_KEY`, save the file with `ctrl-x` followed by `y`: 
   ```bash
   export KEY_PASS="MySuperSecurePassword01"
   export PLATFORM_KEY="Your_Platform_Token_Here"
   ```

4. Once saved you'll need to log off from your server and log back in so they get loaded.

5. Next, create a new folder to hold the Wallet Daemon repo and build: 
   ```bash
   cd ~/enjin/
   mkdir wallet-daemon
   ```

6. Pull the wallet-daemon repo from GitHub: 
   ```bash
   cd ~/enjin/wallet-daemon/
   git clone https://github.com/enjin/wallet-daemon.git .
   ```

7. Edit the `config.json` file in nano to set which blockchain node and platform to connect to and also set where it can find the wallet private key, typically `./store`, then save with `ctrl-x` `y`:  

   ```bash
   nano config.json
   ```

   ```json
   {
     "node": "wss://rpc.matrix.canary.enjin.io:443",
     "relay_node": "wss://rpc.relay.canary.enjin.io:443",
     "api": "https://your-platform-url.com/graphql",
     "master_key": "./store"
   }

   ```

   :::warning Using Platform on mainnet?
   If you are using the Enjin Platform on mainnet, make sure to use a mainnet RPC (such as wss://rpc.matrix.blockchain.enjin.io)
   :::

8. Build the Wallet Daemon app: 
   ```bash
   cargo build --release
   ```

9. Remove the demo Wallet key: 
   ```bash
   rm store/73723235547f46358c6a32dd1ffb28ee537313a674dc3dc882beb3246e03aa4dc246022f
   ```

10. Attach to your `tmux` workers session and create a new pane for the wallet daemon, use `ctrl-b` `"` to create a new pane and `ctrl-b` `up-arrow` or `down-arrow` to navigate to it if not already selected: 
    ```bash
    tmux a -t workers
    ```

11. Navigate to the wallet-daemon folder in your new pane and then run the wallet build: 
    ```bash
    cd ~/enjin/wallet-daemon
    ./target/release/wallet-daemon
    ```

12. Note down the account addresses that will be displayed, these are for your new Wallet Daemon account and will be used to sign transactions.

From here on you simply need to update the `DAEMON_ACCOUNT` variable in your .ENV with the new wallet account address and fund the account.  The wallet daemon will then poll for transactions every 6 seconds and process anything new that you create.

## Updating the Wallet Daemon

:::info Prerequisite: Rust Version 1.82
To update the wallet daemon, ensure that you have Rust version 1.82 installed. If you need to update Rust, you can do so by running the following command:

```bash
rustup update
```
:::

If you're using Supervisor to keep the wallet running ([Keeping the Platform Running](/02-tutorials/04-going-open-source/03-cloud-installation/012-keeping-the-platform-running.md)) , stop it using:

```bash
sudo supervisorctl stop platform-wallet:*
```

Login as your platform user (or from root use `su - platform` and change to the wallet daemon directory:

```bash
cd ~/enjin/wallet-daemon/
```

Pull the latest version from git and build:

```bash
git pull
cargo build --release
```

To test, you can run directly (**omit if using supervisor**):

```bash
./target/release/wallet-daemon
```

Start the wallet using supervisor:

```bash
sudo supervisorctl start platform-wallet:*
```

## Importing an Existing Wallet Account

If you already have a wallet account that you'd like to use with the wallet daemon then you can import it when you first run the daemon app after building.  First make sure the `./store` folder is empty and then start the wallet daemon with the `import` arg:

```bash
./target/release/wallet-daemon import
```

You'll then be asked to type in your 12-word mnemonic phrase. If you had previously generated your account using a password then you will need to add the password to the end of your phrase when importing it like this:

`your twelve word phrase///your_password`

If you did not set a password then you can omit the forward slashes altogether.  After you have entered your phrase (and password if needed) the wallet daemon will create the necessary seed file in the `./store` folder ready to use.  If a password was used then make sure the same one is set in your `KEY_PASS` environment variable as documented above.  You can now run the wallet daemon as normal and it will use your existing account.
