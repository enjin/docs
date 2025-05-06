---
title: "Setting up Redis"
slug: "setting-up-redis"
description: "Learn how to configure Redis for in-memory data storage, improving the performance of the Enjin blockchain platform."
---
Redis is an open source, advanced key-value store that supports various data structures such as strings, hashes, lists, sets, and sorted sets. It is widely used for caching, session management, job queueing, and real-time updates in web applications.

To use Redis with Laravel, you need to install Redis on your system and the PHP Redis extension on your Laravel project. You also need to configure Redis in your Laravel application’s config/database.php file.  This section will guide you through that.

First let's install the redis software itself, you can find a comprehensive guide on the [DigitalOcean website](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-20-04). The ket steps for the platform are outlined below:

1. Begin by updating your local `apt` package cache and installing Redis itself:

```bash
sudo apt update

sudo apt install redis-server
```

2. This will download and install Redis and its dependencies. Following this, there is one important configuration change to make in the Redis configuration file, which was generated automatically during the installation.  
   Open this file with nano:

```bash
sudo nano /etc/redis/redis.conf
```

Inside the file, find the `supervised` directive. This directive allows you to declare an init system to manage Redis as a service, providing you with more control over its operation. The supervised directive is set to `no` by default. Since you are running Ubuntu, which uses the systemd init system, change this to `systemd`:

```text
. . .

# If you run Redis from upstart or systemd, Redis can interact with your
# supervision tree. Options:
#   supervised no      - no supervision interaction
#   supervised upstart - signal upstart by putting Redis into SIGSTOP mode
#   supervised systemd - signal systemd by writing READY=1 to $NOTIFY_SOCKET
#   supervised auto    - detect upstart or systemd method based on
#                        UPSTART_JOB or NOTIFY_SOCKET environment variables
# Note: these supervision methods only signal "process is ready."
#       They do not enable continuous liveness pings back to your supervisor.
supervised systemd

. . .
```

3. That’s the only change you need to make to the Redis configuration file at this point, so save and close it when you are finished. If you used nano to edit the file, do so by pressing CTRL + X, Y, then ENTER.  
   Then, restart the Redis service to reflect the changes you made to the configuration file:

```bash
sudo systemctl restart redis.service
```

4. Now that Redis is installed you can set it as the `CACHE_DRIVER` in your .env file: `CACHE_DRIVER=redis`
   ```bash
   cd /var/www/laravel/
   sudo nano .env
   ```

```text
CACHE_DRIVER=redis
FILESYSTEM_DISK=local
```
