---
title: "Keeping the Platform Running"
slug: "keeping-the-platform-updated"
excerpt: ""
hidden: false
metadata: 
  title: "Keeping the Platform Updated - Ensure Continuous Improvement"
  description: "Ensure that your Enjin platform is always running the latest version with this guide to keeping the platform updated."
  image: []
  robots: "index"
createdAt: "Fri Feb 02 2024 01:55:17 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Nov 12 2024 09:52:02 GMT+0000 (Coordinated Universal Time)"
---
Rather than running the various workers and other long running commands in `tmux` you can instead use `supervisor` to launch and monitor your processes.  The big advantage of using `supervisor` is that it will restart your commands should they stop running.

1. First lets install `supervisor`:

```bash
sudo apt-get update

sudo apt-get install supervisor
```

2. Next we need to add a configuration for each of the workers and commands we would like supervisor to manage, starting with the queue worker:

```bash
sudo nano /etc/supervisor/conf.d/platform-queue.conf
```

```text
[program:platform-queue]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/laravel/artisan queue:work
autostart=true
autorestart=true
user=www-data
numprocs=1
redirect_stderr=true
stdout_logfile=/var/www/laravel/storage/logs/platform-queue.log
```

3. Save the queue config with `ctrl-x` `y`. Now lets set up the websocket process (if using Laravel Reverb):

```bash
sudo nano /etc/supervisor/conf.d/platform-websocket.conf
```

```text
[program:platform-websocket]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/laravel/artisan reverb:start
autostart=true
autorestart=true
user=www-data
numprocs=1
redirect_stderr=true
stdout_logfile=/var/www/laravel/storage/logs/platform-websocket.log
```

4. Save the websocket config with `ctrl-x` `y`. Now lets set up the ingest process:

:::tip
It is advised to run `php artisan platform:sync` from your platform's installation folder before starting the ingest command.
:::

```bash
sudo nano /etc/supervisor/conf.d/platform-ingest.conf
```

```text
[program:platform-ingest]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/laravel/artisan platform:ingest
autostart=true
autorestart=true
user=www-data
numprocs=1
redirect_stderr=true
stdout_logfile=/var/www/laravel/storage/logs/platform-ingest.log
```

5. Save the ingest config with `ctrl-x` `y`.  We can also do the same with the platform decoder, the template is the same, however make sure to update the path to the command to match your folder structure, and use the full path to the server command, you should also take note to update the `user=` field to your platform user, or a user which has access to the location of the platform decoder app:

```bash
sudo nano /etc/supervisor/conf.d/platform-decoder.conf
```

```text
[program:platform-decoder]
process_name=%(program_name)s_%(process_num)02d
command=/home/platform/enjin/platform-decoder/bin/server
autostart=true
autorestart=true
user=platform
numprocs=1
redirect_stderr=true
stdout_logfile=/var/www/laravel/storage/logs/platform-decoder.log
```

:::tip
Although it's not recommended to run your wallet daemon on the same server as your platform installation you can also add it to supervisor to manage, whether on the same server, or on a different server.
:::

6. Before the Wallet Daemon will run under supervisor you will need to update the path to the `store` directory in `master_key` property of the daemon's `config.json` file to use the full path to the directory e.g.:

```bash
nano /home/platform/enjin/wallet-daemon/config.json
```

```text
{
  "node": "wss://rpc.matrix.canary.enjin.io:443",
  "api": "https://your_platform_url.com/graphql",
  "master_key": "/home/platform/enjin/wallet-daemon/store"
}
```

7. Save the wallet daemon config with `ctrl-x` `y`, and then set up the supervisor config, please not that you will need to add your `KEY_PASS` and `PLATFORM_KEY` environment variables to the config using the `environment=` key as well:

```bash
sudo nano /etc/supervisor/conf.d/platform-wallet.conf
```

```text
[program:platform-wallet]
process_name=%(program_name)s_%(process_num)02d
command=/home/platform/enjin/wallet-daemon/target/release/wallet-daemon
autostart=true
autorestart=true
user=platform
numprocs=1
redirect_stderr=true
stdout_logfile=/var/www/laravel/storage/logs/platform-wallet.log
environment=KEY_PASS="your_key_pass",PLATFORM_KEY="your_platform_key"
```

8. Save the wallet supervisor config with `ctrl-x` `y`.  With the configs saved we can now load them into supervisor and get them running:

```bash
sudo supervisorctl reread

sudo supervisorctl update

sudo supervisorctl start platform-decoder:*

sudo supervisorctl start platform-websocket:*

sudo supervisorctl start platform-queue:*

sudo supervisorctl start platform-ingest:*

sudo supervisorctl start platform-wallet:*
```

Each worker will output to the log files specified in the configs above, and you can check the overall status of your workers with this command:

```bash
sudo supervisorctl status
```
