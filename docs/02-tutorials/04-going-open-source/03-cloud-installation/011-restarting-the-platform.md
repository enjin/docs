---
title: "Restarting the Platform"
slug: "restarting-the-platform"
excerpt: ""
hidden: false
metadata: 
  title: "Restarting the Platform - Manage Enjin Platform Downtime"
  description: "Learn how to safely restart the Enjin platform to ensure smooth operation and minimal downtime for your blockchain applications."
  image: []
  robots: "index"
createdAt: "Wed Jan 31 2024 10:24:02 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Sep 10 2024 00:42:32 GMT+0000 (Coordinated Universal Time)"
---
Every time you change .env variables / [update the platform version](doc:updating-the-platform) / [install a package](doc:installing-additional-packages), for any changes to take effect, the workers need to be restarted:

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
