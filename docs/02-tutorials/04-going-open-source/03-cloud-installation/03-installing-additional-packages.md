---
title: "Installing Additional Packages"
slug: "installing-additional-packages"
excerpt: ""
hidden: false
metadata: 
  title: "Installing Additional Packages - Expand Your Platform’s Functionality"
  description: "Learn how to install additional packages to enhance the functionality of your Enjin blockchain platform and meet your project’s needs."
  image: []
  robots: "index"
createdAt: "Wed Jan 31 2024 10:15:18 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Sep 10 2024 00:20:36 GMT+0000 (Coordinated Universal Time)"
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
If your platform is already running, the [workers need to be restarted](doc:restarting-the-platform) for the changes to take effect.  
If you just installed the `platform-ui` package, make sure to [set it up](doc:setting-up-the-ui) before using it.  
If you haven't installed the `platform-ui` package, please continue to the [Setting up the Decoder](doc:setting-up-the-decoder) page
:::
