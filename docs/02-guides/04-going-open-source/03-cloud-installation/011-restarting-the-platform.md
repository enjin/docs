---
title: "Restarting the Platform"
slug: "restarting-the-platform"
description: "Learn how to safely restart the Enjin platform to ensure smooth operation and minimal downtime for your blockchain applications."
---
Every time you change .env variables / [update the platform version](/02-guides/04-going-open-source/03-cloud-installation/09-updating-the-platform.md) / [install a package](/02-guides/04-going-open-source/03-cloud-installation/03-installing-additional-packages.md), for any changes to take effect, the workers need to be restarted:

1. attach to your workers tmux sessions:

   ```bash
   tmux a -t workers
   ```

2. Switch to the queue in the bottom panel with `ctrl-b down-arrow` and then press `ctrl-c`. This will stop the worker from running.

3. Restart the queue:

   ```bash
   cd /var/www/laravel/

   php artisan queue:work
   ```

4. Switch to the ingest panel with `ctrl-b up-arrow` and then press `ctrl-c`. This will stop the ingest from running.

5. Restart the syncing process:

   ```bash
   cd /var/www/laravel/

   php artisan platform:sync
   ```

   Once the sync is complete run the ingest worker command to start receiving and processing blockchain events:

   ```bash
   php artisan platform:ingest
   ```

6. If the Platform Decoder also needs a restart, switch to the decoder panel with `ctrl-b up-arrow` and then press `ctrl-c`. This will stop the decoder from running.

7. Restart the decoder:

   ```bash
   cd ~/enjin/platform-decoder

   ./bin/server
   ```
