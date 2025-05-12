---
title: "Enjin Platform v1.9.0 Upgrade Guide"
slug: "enjin-platform-v190"
description: "Learn about the latest features and improvements in Enjin Platform v1.9.0, including performance enhancements and new tools."
---
Every year the Laravel framework that the Platform is based on gets a major version update.  When this happens we also update the Platform code to use the new version.  This update requires a couple of extra steps as we follow the upgrade guide from the [Laravel website](https://laravel.com/docs/11.x/upgrade).

:::note Before starting, check to see if you need to upgrade.
Run `php artisan --version` on the CLI from your installation folder.  
If it shows `Laravel Framework 10.x.x` or below then proceed to update using this guide.
:::

The first job is to update some of the package versions in the `compose.json` file.  If not using sanctum for platform authentication then you can ignore that entry.

If you are using the `beyondcode/laravel-websockets` package you will also need to remove it from the `composer.json` file as it is no longer being maintained and is not compatible with Laravel 11. It will be replaced later on with Laravel Reberb, Laravel's new 1st party websocket server.  If you are using a 3rd Party websocket provider such as Pusher then you can ignore the steps to install Reverb, instead check the documentation from your package provider for compatibility with Laravel 11 and follow any necessary steps to update if needed.

```bash
cd /var/www/laravel/

nano composer.json
```

```bash
...
    "laravel/framework" : "^11.0",
		"laravel/sanctum" : "^4.0",
...
		"nunomaduro/collision" : "^8.0",
...
```

Save and exit with `ctrl-x y`. Next run `composer update`.  Once the command completes and if you are running your own websocket sever you can now install the new Laravel Reverb package. If you aren't running a websocket server then skip to the last section.

Install Laravel Reverb with this command:

```bash
php artisan install:broadcasting
```

Next update your .env file by copying your pusher vars to the new reverb vars, and ensure you have set the `BRADCAST_DRIVER` to `reverb`:

```text
...
BROADCAST_DRIVER=reverb
...
REVERB_APP_ID=
REVERB_APP_KEY=
REVERB_APP_SECRET=
REVERB_SERVER_HOST=127.0.0.1
REVERB_SERVER_PORT=6001
REVERB_SCHEME=https
REVERB_HOST="example.com"
REVERB_PORT=443
```

Ensure that the required 'vite' versions of the vars are also in the .env file:

```text
VITE_REVERB_APP_KEY="${REVERB_APP_KEY}"
VITE_REVERB_HOST="${REVERB_HOST}"
VITE_REVERB_PORT="${REVERB_PORT}"
VITE_REVERB_SCHEME="${REVERB_SCHEME}"
```

Finally update your nginx site configuration, open it with nano:

```bash
sudo nano /etc/nginx/sites-enabled/laravel
```

Find the `location` section for `/app/.*` and update the content to the following.  This will ensure your websocket is made available properly via wss:

```nginx
location ~ /app/.* {
			proxy_http_version 1.1;
			proxy_set_header Host $http_host;
			proxy_set_header Scheme $scheme;
			proxy_set_header SERVER_PORT $server_port;
			proxy_set_header REMOTE_ADDR $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			proxy_set_header Upgrade $http_upgrade;
			proxy_set_header Connection "Upgrade";
	
			proxy_pass             http://127.0.0.1:6001$1;
			proxy_read_timeout     60;
			proxy_connect_timeout  60;
			proxy_redirect         off;
}
```

Save the config with `ctrl-x y` and restart nginx with `sudo service nginx restart`.

Laravel Reverb uses node, so we will next need to build the app with `npm run build` this should also build the platform UI assets if you are using the `platform-ui` package too.

Finally, if you are using supervisor to handle your long running commands (such as the ingest and queue workers) then you will then need to [restart both the queue worker and in the ingest commands](/05-enjin-platform/02-self-hosting-cloud/011-restarting-the-platform.md) so they also use the latest code.  If the Platform Decoder was also updated and rebuilt then it should also be restarted.

Please note that if you have configured supervisor to run your websocket server then you'll need to update the conf as follows e.g.:

```bash
sudo supervisorctl stop all
sudo nano /etc/supervisor/conf.d/platform-websocket.conf
```

Modify the `command=` entry to read:

```text
command=php /var/www/laravel/artisan reverb:start 
```

Save with `ctry-x y` and then reload and restart the supervisor commands:

```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start all
```

## Confirming the update was successful

To check if the upgrade was successful:  
Access the well-known file at `https://your_url.com/.well-known/enjin-platform.json` and check that the versions are expected. For example:

```json
    "packages": {
        "enjin/platform-beam": {
            "version": "v1.9.2",
            "revision": "4759194ba4eee799316f4bf10bc495b51abb74d5",
            "routes": [
                "claim/{code}"
            ]
        },
        "enjin/platform-core": {
            "version": "v1.9.2",
            "revision": "b1a97265cb96af7fd757255174eca541fa562d15",
            "routes": [
                "proof/{code}",
                "qr"
            ]
        },
        "enjin/platform-fuel-tanks": {
            "version": "v1.9.1",
            "revision": "6044d3c5b5bce5d2a568a7558f567de001f6ebe0"
        },
        "enjin/platform-marketplace": {
            "version": "v1.9.0",
            "revision": "2f3dcfd9468766c5495e5d3dfe737c8216324bf1"
        },
        "enjin/platform-ui": {
            "version": "v1.9.1",
            "revision": "30edfb6def746113b74a79b843066e557fd6412d"
        }
    },
```

## Tracked Collections

v1.9.0 of the platform brings a change to how collections are synced and tracked.  Previously the platform would sync all collections and tokens from the chain when using the sync command unless you asked it to only track certain collections in the .env file.  However with the increasing amount of collections and tokens on the blockchain it meant that syncs were becoming very resource intensive and taking a very long time to populate.  With v1.9.0, the platform will now default to only tracking and syncing collections that you ask it to instead of tracking everything by default.  There are new mutations to help manage which collections you would like to track which are `AddToTracked` and `RemoveFromTracked`.  There are also options in the platform UI to track and untrack collections.  If you would still like to sync everything then this is still possible by setting the `SYNC_ALL=true` .env variable.
