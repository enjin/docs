---
title: "Initial Setup"
slug: "initial-setup"
description: "Discover how to host Enjin’s blockchain platform in the cloud, ensuring high availability and scalability for your blockchain applications."
---
## Setting up a Droplet

1. Sign up for a [DigitalOcean](https://digitalocean.com/) account.

2. Go to your Dashboard and then click 'Spin up a Droplet'.

3. Choose a region (for best performance, choose the nearest region to you / your users).

   ![Choose a region](/img/guides/going-open-source/droplet-setup-choose-region.png)

4. Under 'Choose an image' select the Marketplace tab.

5. In the search box type 'Laravel' and pick Laravel from the list.

   ![Choose a region](/img/guides/going-open-source/droplet-setup-select-laravel.png)

   :::info Laravel and Ubuntu versions
   This guide was made and tested on Laravel version 10.16.1, Ubuntu version 22.04.
   :::

6. Under 'Choose Size' you can select the size of the hardware you'd like to run, you can start with a Basic Shared 'Regular' CPU at $6/month and scale from there as you need.

   :::info Pre-requisites for Platform UI Setup
   If you intend to install and build the Platform UI or the Wallet Daemon, the build process requires at least 2GB of RAM to complete.
   :::

7. We would recommend using an SSH key to access your droplet, so select SSH Key under 'Choose Authentication Method'.

8. Click 'Add SSH Key' and then paste your public SSH Key into the box and give it a name, if you don't yet have an SSH Key then follow the instructions on the right-hand panel to generate one.

9. You can optionally add on free improved metrics monitoring and alerting.

10. Finally give your droplet a meaningful hostname.

11. Click 'Create Droplet' to start provisioning. After a few minutes your droplet will be ready to log in to ready for the next stage.

## Configure the Droplet

1. Open a terminal window and SSH into your Droplet using the command:

   ```bash
   ssh root@public_ip_address
   ```

2. Type 'yes' when it asks you about the key fingerprint.

3. If you get a Permission Denied (publickey) error it's likely you will need to add your SSH Key to your SSH Agent, on windows this may be via Putty, or on MacOS/linux via ssh-add. You can find guides [here (for Windows)](https://docs.digitalocean.com/products/droplets/how-to/add-ssh-keys/create-with-putty/) and [here (For MacOS/Linux)](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).

4. The first time you log in to the Droplet it will take you through a few config steps:
   1. Add the domain or subdomain you would like to use, it doesn't have to be connected via DNS yet at this stage.  You also don't have to set a domain, in which case just use the Droplet's IP address.
   2. However, if you wish to use the automatic SSL certificate then it's at this stage where you would need to hook up your domain to the droplet's IP address so the SSL can be configured by Let's Encrypt.  It's recommended you do this at this point if you can, and you should refer to your domain host's instructions for how to add an A record for your domain to point to the Droplet's IP address.
      1. If you choose to proceed, follow the prompts to complete the SSL setup.

5. You should now be presented with an 'installation completed' message.

6. One last setting to tweak is to enable the FFI extension for PHP in the php.ini file, usually located at `/etc/php/8.2/fpm/php.ini`:

   :::warning Check your installed php version
   This guide was tested on php version 8.2  
   If you have a different php version installed, the path and the commands below needs to be based on the php version installed.  
   To check which php version is currently installed, run the command `php -v`
   :::

```bash
sudo nano /etc/php/8.2/fpm/php.ini
```

7. At the bottom of this file is a section for FFI.  By default the `ffi.enable=` property is commented out, delete the `;` at the start of the line and set it to `true`.  Once done save the file with `ctrl-x` `y`.  Now restart the PHP service:

```bash
sudo service php8.2-fpm restart
```

## Adding a new non super-user

:::tip
Your Droplet will be setup with a root 'super' user by default.  It would be recommended to create a non-super user for everyday use.
:::

The Droplet's web server uses a special user and group called `www-data` to keep the server secure when it serves the platform. In contrast, the `root` user has full access to the entire system and can change any file or setting. If you run commands as the `root` user, you might accidentally change the ownership or permissions of files that the web server needs to access. This could prevent the `www-data` user from accessing them and cause permission denied errors and exceptions. To avoid this, you should create a new non-super user that belongs to the same group as the `www-data` user and use it to log in with and run commands. This should ensure file permissions remain intact and platform continues to function as expected.

1. To create the new user, you can use the `adduser` command. To add it to the `www-data` group, you can use the `usermod` command, in this example the new user will be called `platform`.  You will also need to add the new user to the `sudo` group so that it can run elevated commands when required as well:

```bash
sudo adduser --disabled-password  platform
# Omit the --disabled-password if you want to create a password, but you should leave it disabled and use your ssh keys below instead.

sudo usermod -aG www-data platform

sudo usermod -aG sudo platform
```

2. You will also likely want to add your SSH public key to the new user's `authorized_keys` file so that you can log in with the user via ssh. To do this first switch to the new user:

```bash
su - platform
```

3. Create a directory called `.ssh` in the new user’s home directory. You can use the `mkdir` command for this:

```bash
mkdir ~/.ssh
```

4. Create a file called `authorized_keys` in the `.ssh` directory. You can use the `touch` command to do this:

```bash
touch ~/.ssh/authorized_keys
```

5. Set the correct permissions for the `.ssh` directory and the `authorized_keys` file. You can use the `chmod` command to do this:

```bash
chmod 700 ~/.ssh

chmod 600 ~/.ssh/authorized_keys
```

6. Paste the content of your public key file to the `authorized_keys` file. You can use the `nano` command or any other text editor to do this, save and exit nano with `ctrl-x` `y` :

```bash
nano ~/.ssh/authorized_keys
```

Finally log out and then log back in as the new user: `ssh platform@server_ip_address`.  

Now the droplet is configured, it's time to [Install the Enjin Platform](/02-guides/04-going-open-source/03-cloud-installation/02-platform-installation.md)
