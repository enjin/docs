---
title: "Installing Additional Packages"
slug: "installing-additional-packages"
description: "Learn how to install additional packages to enhance the functionality of your Enjin blockchain platform and meet your project’s needs."
---
Run the composer require command from the root of your Laravel folder for each of the Enjin Platform packages you wish to install.  Remember to run the migrations with `php artisan migrate` after the installations have completed.

Available packages are Beam, Fuel-Tanks, Marketplace and UI.

```bash
cd /var/www/laravel/

composer require enjin/platform-beam

composer require enjin/platform-fuel-tanks

composer require enjin/platform-marketplace

composer require enjin/platform-ui
```

:::info Continue with the installation
If your platform is already running, the [workers need to be restarted](/05-enjin-platform/02-self-hosting-cloud/011-restarting-the-platform.md) for the changes to take effect.  
If you just installed the `platform-ui` package, make sure to [set it up](/05-enjin-platform/02-self-hosting-cloud/04-setting-up-the-ui.md) before using it.  
If you haven't installed the `platform-ui` package, please continue to the [Setting up the Decoder](/05-enjin-platform/02-self-hosting-cloud/05-setting-up-the-decoder.md) page
:::
