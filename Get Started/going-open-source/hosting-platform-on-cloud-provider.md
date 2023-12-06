---
title: "Cloud Installation"
slug: "hosting-platform-on-cloud-provider"
excerpt: ""
hidden: true
createdAt: "Wed Nov 29 2023 16:33:04 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Nov 29 2023 19:32:04 GMT+0000 (Coordinated Universal Time)"
---
The Open-Source Platform is a Laravel application and can be hosted on a cloud provider without using Docker  
In this tutorial, we will be setting up the Enjin Platform on [DigitalOcean](https://digitalocean.com/).

# Self-hosting Enjin Platform on DigitalOcean

## Setting up a Droplet

1. Sign up for a [DigitalOcean](https://digitalocean.com/) account.
2. Go to your Dashboard and then click 'Spin up a Droplet'.
3. Choose a region (for best performance, choose the nearest region to you / your users).

   [block:image]{"images":[{"image":["https://files.readme.io/0218e9f-image.png",null,""],"align":"center","border":true}]}[/block]
4. Under 'Choose an image' select the Marketplace tab.
5. In the search box type 'Laravel' and pick Laravel from the list.

   [block:image]{"images":[{"image":["https://files.readme.io/7f1f2ea-image.png",null,""],"align":"center","border":true}]}[/block]
6. Under 'Choose Size' you can select the size of the hardware you'd like to run, you can start with a Basic Shared 'Regular' CPU at $6/month and scale from there as you need.
7. We would recommend using an SSH key to access your droplet, so select SSH Key under 'Choose Authentication Method'.
8. Click 'Add SSH Key' and then paste your public SSH Key into the box and give it a name, if you don't yet have an SSH Key then follow the instructions on the right-hand panel to generate one.
9. You can optionally add on free improved metrics monitoring and alerting.
10. Finally give your droplet a meaningful hostname.
11. Click 'Create Droplet' to start provisioning. After a few minutes your droplet will be ready to log in to ready for the next stage.

## Configure the Droplet

1. Open a terminal window and SSH into your Droplet using the command:

```shell
ssh root@public_ip_address
```

2. Type 'yes' when it asks you about the key fingerprint.
3. If you get a Permission Denied (publickey) error it's likely you will need to add your SSH Key to your SSH Agent, on windows this may be via Putty, or on MacOS/linux via ssh-add. You can find guides [here (for Windows)](https://docs.digitalocean.com/products/droplets/how-to/add-ssh-keys/create-with-putty/) and [here (For MacOS/Linux)](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).
4. The first time you log in to the Droplet it will take you through a few config steps:
   1. Add the domain or subdomain you would like to use, it doesn't have to be connected via DNS yet at this stage.  You also don't have to set a domain, in which case just use the Droplet's IP address.
   2. However, if you wish to use the automatic SSL certificate then it's at this stage where you would need to hook up your domain to the droplet's IP address so the SSL can be configured by Let's Encrypt.  It's recommended you do this at this point if you can, and you should refer to your domain host's instructions for how to add an A record for your domain to point to the Droplet's IP address.
      1. If you choose to proceed, follow the prompts to complete the SSL setup.
5. You should now be presented with an 'installation completed' message.

## Install the Enjin Platform package dependencies

1. Your app will be located in `/var/www/laravel/`. Use the `cd` command to navigate to this folder:

```shell
cd /var/www/laravel/
```

2. We are now ready to install the required extensions, install them with this command:

```shell
sudo apt-get update  
sudo apt install php8.2-{common,sqlite3,gmp,intl,mysql,bcmath,pcov,redis}
```

## Install and configure the Enjin Platform Core packages

1. Delete the `composer.lock` file if it exists:

```shell
rm composer.lock
```

2. Edit the `composer.json` file using a tool like `nano` or `vim` and set the `minimum-stability` property to `dev`.  If using nano you can save and quit with `ctrl-x` and then `y` followed by `enter`
3. Run the composer require command from the root of your Laravel folder for each of the Enjin Platform packages you require (at a minimum you need Core, everything else is optional):

```shell
composer require enjin/platform-core  
composer require enjin/platform-beam  
composer require enjin/platform-fuel-tanks  
composer require enjin/platform-marketplace  
composer require enjin/platform-ui
```

4. Run the platform database migrations:

```shell
php artisan migrate
```

5. Add these variables to your .env file, the .env file is located in the root of the laravel folder and you can edit it with one of the built-in text editors such a [nano](https://www.nano-editor.org/):

```shell
sudo nano .env
```

```
AUTH_DRIVER=null  
BASIC_AUTH_TOKEN=

CHAIN=substrate  
NETWORK=canary  
DAEMON_ACCOUNT=
```

6. You should set the `BASIC_AUTH_TOKEN` to a long random string, this will be your key to access the API from your services.
7. Set the `NETWORK` to either `canary` (for testnet) or `enjin` (for mainnet).
8. If you wish to use the wallet daemon to sign transactions then you should set your wallet daemon account address in the `DAEMON_ACCOUNT` .env var.

## Run the platform workers

1. For full functionality it is recommended to sync the platform and start ingesting blockchain events, along with starting the queue worker so events are processed.  We can do this by running these commands on the platform server using a new tmux session:

```shell
tmux new -t workers
```

2. Once the session is open create a new pane using `ctrl-b` followed by double quotes (`"`) so we can run and monitor both workers simultaneously then switch to the first pane using `ctrl-b` followed by `up-arrow`, finally run the sync command.  It will take a few minutes, don't worry if it looks like it gets stuck at around 80%, it'll still be churning through data:

```shell
php artisan platform:sync
```

3. Once the sync is complete run the ingest worker command to start receiving and processing blockchain events:

```shell
php artisan platform:ingest
```

4. switch to the lower pane using `ctrl-b` followed by `down-arrow` and then run the queue worker which will process and broadcast the platform events, along with any jobs as required:

```shell
php artisan queue:work
```

![](https://files.readme.io/66c515b-image.png)

Your platform setup is now complete and you can start querying blockchain data and creating transactions for your wallet daemon to sign.

To use the GraphQL API, send your requests to the droplet's `<public_ip>/graphql`:

```
1.2.3.4/graphql
```

Once the workers are running you can detach from the session using `ctrl-b` followed by `d`.  
To reattach to your worker session use this command in the terminal: `tmux a -t workers`  
There are other useful commands you can use with `tmux`, check this resource for more information <https://tmuxcheatsheet.com/>