---
title: "FAQ"
slug: "faq"
description: "Find answers to frequently asked questions about the Enjin platform, including setup, integration, and troubleshooting tips."
---
## Q: How often is the Enjin Platform Updated?

Updates are scheduled monthly, specifically on the second Tuesday of each month. However, updates may be rolled out sooner if there's a need to support new features, blockchain upgrades, or to address critical security issues.

## Q: Does the Enjin Platform update automatically?

No, the Enjin Platform doesn't have an 'automatic' update feature. Instead, the starter project is set to use the stable release branches, which are typically updated manually once a month, on the second Tuesday of the month. Users must update their projects to the latest stable version as it becomes available.

## Q: What type of data does the database store, and do I need to back it up?

The database holds both cached data from the blockchain and off-chain data such as Beams. It's advisable to back up your data regularly. Note that tables like `transactions`, `wallets`, `events`, and `pending_events` contain essential data not on the blockchain and should always be backed up. Other tables are mostly caches and can be reconstructed from blockchain data. Also ensure to back up your wallet daemon's seed, password, and file name to recover your setup fully.

## Q: How do I disable the included wallet daemon and use an external one?

To disable the internal daemon, remove its configuration from the `docker-compose.yml` file. This will prevent it from starting up with the other services, allowing you to use an external daemon that only permits outgoing connections for enhanced security. Here's a snippet of what you might remove:

```yaml
daemon:
  image: enjin/daemon:latest
  build:
    context: .
    dockerfile: configs/daemon/Dockerfile
  restart: unless-stopped
  volumes:
    - ./configs/daemon/store:/opt/app/storage
```

By excluding this section, the internal daemon won't be initialized, and you can then set up an external wallet daemon as needed.
