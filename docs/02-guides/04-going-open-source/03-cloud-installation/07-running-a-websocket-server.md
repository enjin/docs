---
title: "Running a Websocket Server"
slug: "running-a-websocket-server"
description: "Set up and run a websocket server to enable real-time communication and updates within the Enjin blockchain platform."
---
For the platform to be able to broadcast events and for your client apps to receive them you will need to connect to a websocket server.  The websocket server handles connections from your platform and client apps and facilitates the transfer of data from the events to your clients apps. There are several option available, including open source solutions as well as paid for services (e.g. [Pusher](https://pusher.com/channels/)).  Here we will show how to setup the open source [Laravel Reberb](https://laravel.com/docs/11.x/reverb) package to run a server locally.  The Laravel Reverb package is made by the same people as the Laravel framework and works seamlessly with Laravel’s existing suite of event broadcasting tools, so should you decide to scale to a paid for solution via Pusher in future there would be minimal work involved in making the switch.

:::info
For extra security it would be recommended to use secure websocket (WSS) connections, this guide will help you set this up.
:::
1. Start by installing the Laravel Reverb package into your project from the root folder:

```bash
cd /var/www/laravel/
  
php artisan install:broadcasting
```

2. Now you can configure the websocket endpoint you'd like to use.  Do this by setting the Reverb vars in your .env file.  The ID can be any number, and the secret can be any value you choose.  If you decide to migrate to Pusher's paid for service in future then you will get these values from your account there.  In the meantime set the Reverb env vars to any random value.  The `REVERB_APP_KEY` will be used to create the websocket endpoint, and make sure to set the `REVERB_HOST` value to your domain or server ip:

```text
BROADCAST_DRIVER=reverb

REVERB_APP_ID=13453
REVERB_APP_KEY=websocket
REVERB_APP_SECRET=bc285352-c7b8-4ef8-9745-18b12ec35abf
REVERB_SERVER_HOST=127.0.0.1
REVERB_SERVER_PORT=6001
REVERB_HOST="example.com"
```

3. Reverb requires node to run, and uses the built-in 'vite' system to build the required assets.  Add these options to your .env file so vite knows what to use when building the application:

```text
VITE_REVERB_APP_KEY="${REVERB_APP_KEY}"
VITE_REVERB_HOST="${REVERB_HOST}"
VITE_REVERB_PORT="${REVERB_PORT}"
VITE_REVERB_SCHEME="${REVERB_SCHEME}"
```

4. When broadcasting events from your Laravel application to your WebSocket server, the default behavior is to send the event information to the official Pusher server. But since the Laravel Reverb package comes with its own implementation, we need to tell Laravel to send the events to our own server.  
   To do this, you should add the host and port configuration key to your `config/broadcasting.php` if it is not there already.  In this config you can see that it will be configured to use `https` scheme and port `443` which is the default SSL port.

```php
'reverb' => [
    'driver' => 'reverb',
    'key' => env('REVERB_APP_KEY'),
    'secret' => env('REVERB_APP_SECRET'),
    'app_id' => env('REVERB_APP_ID'),
    'options' => [
        'host' => env('REVERB_HOST'),
        'port' => env('REVERB_PORT', 443),
        'scheme' => env('REVERB_SCHEME', 'https'),
        'useTLS' => env('REVERB_SCHEME', 'https') === 'https',
    ],
    'client_options' => [],
],
```

Next, to help secure your websocket follow these steps to enable wss:

1. Log into your server and then open up the nginx config file for your site in nano.  You can find this in the path `/etc/nginx/sites-enabled/laravel` You will need to use `sudo` mode for this so if you are not logging as the root user have your login user password handy to be able save the edits.

```bash
sudo nano /etc/nginx/sites-enabled/laravel
```

2. Add this definition to the end of first `server { }` block, below the line that reads `ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot` and before the closing curly brace:

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

3. Save the file with `ctrl-x` `y` and then restart the nginx server with this command:

```bash
sudo service nginx restart
```

4. Finally connect to your workers tmux session and start (or stop and restart) the websocket server.

```bash
tmux a -t workers

// Use ctrl-b up-arrown / down-arrow to select the pane with the websocket server

ctrl-c // if already running

php artisan reverb:start
```

You should now be able to connect to your websocket sever on port 443 using the `wss` schema e.g. `wss://your-platform-domain.com/app/websocket`
