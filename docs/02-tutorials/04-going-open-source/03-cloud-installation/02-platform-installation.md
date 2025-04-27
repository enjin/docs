---
title: "Platform Installation"
slug: "platform-installation"
excerpt: ""
hidden: false
metadata: 
  title: "Platform Installation - Installing the Enjin Blockchain Platform"
  description: "A complete guide to installing the Enjin blockchain platform, from prerequisites to deployment on cloud servers."
  image: []
  robots: "index"
createdAt: "Wed Jan 31 2024 10:14:26 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Sep 10 2024 00:18:31 GMT+0000 (Coordinated Universal Time)"
---
# Install the Enjin Platform package dependencies

1. Your app will be located in `/var/www/laravel/`. Use the `cd` command to navigate to this folder:

   ```bash
   cd /var/www/laravel/
   ```

2. We are now ready to install the required extensions, install them with the following command:

   :::warning Check your installed php version
   This guide was tested on php version 8.2, which is why the extensions are installed on version 8.2  
   Make sure to install the extensions on the same php version that your server is running.  
   To check which php version is currently installed, run the command `php -v`
   :::

   ```bash
   sudo apt-get update
   sudo apt install php8.2-{common,sqlite3,gmp,intl,mysql,bcmath,pcov,redis} 
   ```

3. Check that Go is installed, and install it if not:
   ```bash
   go version
   ```

4. If the above command doesn't return something like `go version go1.18.1 linux/amd64` then proceed to install it with these commands (the following is from https://www.cyberciti.biz/faq/how-to-install-gol-ang-on-ubuntu-linux/). 
   ```bash
   sudo apt update
   sudo apt upgrade
   sudo apt search golang-go
   sudo apt search gccgo-go
   sudo apt install golang-go
   ```

# Install and configure the Enjin Platform Core package

1. Delete the `composer.lock` file if it exists:

   ```bash
   rm composer.lock
   ```

2. Edit the `composer.json` file using a tool like `nano` or `vim` and set the `minimum-stability` property to `dev`.  If using nano you can save and quit with `ctrl-x` and then `y` followed by `enter`

3. Run the composer require command from the root of your Laravel folder for each of the Enjin Platform packages you wish to install.

   :::info Platform Packages
   In this guide, we are installing platform-core package only, this is the only required package.  
   All other packages are optional.  
   To install additional packages, check out the [Installing Additional Platform Packages](doc:installing-additional-packages) section
   :::

   ```bash
   composer require enjin/platform-core  
   ```

4. Once the core package is installed, build the `sr25519` plugin:

   ```bash
   cd vendor/gmajor/sr25519-bindings/go && go build -buildmode=c-shared -o sr25519.so . && mv sr25519.so ../src/Crypto/sr25519.so && chown $USER:www-data ../src/Crypto/sr25519.so && cd ../../../../
   ```

5. Run the platform database migrations:

   ```bash
   php artisan migrate
   ```

6. Add these variables to your .env file, the .env file is located in the root of the laravel folder and you can edit it with one of the built-in text editors such a [nano](https://www.nano-editor.org/):

   ```bash
   sudo nano .env
   ```

   The required additions are: 

   ```Text
   AUTH_DRIVER=basic_token
   BASIC_AUTH_TOKEN=

   CHAIN=substrate
   NETWORK=canary
   DAEMON_ACCOUNT=
   ```

7. You should set the `BASIC_AUTH_TOKEN` to a long random string, this will be your key to access the API from your services. 

8. Set the `NETWORK` to either `canary` (for testnet) or `enjin` (for mainnet).

9. If you wish to use the wallet daemon to sign transactions then you should set your wallet daemon account address in the `DAEMON_ACCOUNT` .env var.

10. Additionally, we need to update the `APP_URL` to your public facing URL.
    ```Text
    APP_URL=https://your.domain.com
    ```

:::info Continue with the installation
If you wish to use features such as Beam, Fuel Tanks, Marketplace, or UI, please continue to the [Installing Additional Packages](doc:installing-additional-packages) page.  
If not, please continue to the [Setting up the Decoder](doc:setting-up-the-decoder) page.
:::

# Setup Automated Database Pruning

The ingest process will store data over time in the database. Once processed, this data can be optionally pruned to save storage space in the database.

1. Ensure that Cron is installed and enabled
   ```bash
   sudo apt update
   sudo apt install cron
   sudo systemctl enable cron
   ```
2. Edit using crontab
   ```bash
   crontab -e
   ```
3. Add the following entry to the end of the file, after the last #. This will run the scheduler every minute, which will decide when to perform database pruning
   ```text
   * * * * * cd /var/www/laravel && php artisan schedule:run >> /dev/null 2>&1
   ```
4. Ensure that Laravel scheduler command is correct
   ```bash
   nano /var/www/laravel/app/Console/Kernel.php
   ```
5. Within the schedule function, make sure it's scheduled for the period of time you'd like. For example, hourly or daily.
   ```php
   /**
   * Define the application's command schedule.
   */
   protected function schedule(Schedule $schedule): void
   {
     $schedule->command('model:prune', ['--model' => \Enjin\Platform\Models\Laravel\Block::class])->daily();
   }
   ```
