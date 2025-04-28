---
title: "Setting up the UI"
slug: "setting-up-the-ui"
excerpt: ""
hidden: false
metadata: 
  title: "Setting up the UI - Configure the User Interface for Enjin"
  description: "Find out how to set up and customize the user interface for Enjin’s platform, improving user experience and functionality."
  image: []
  robots: "index"
createdAt: "Wed Jan 31 2024 10:16:10 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Sep 10 2024 00:20:49 GMT+0000 (Coordinated Universal Time)"
---
:::warning This steps are required only if the UI package is installed
If you want to use the Enjin Platform with a User Interface, make sure to [install the platform-ui package first](/02-tutorials/04-going-open-source/03-cloud-installation/03-installing-additional-packages.md)
:::

If you would like to use the Platform UI package then there is a separate install process to run through as follows, and make sure you have your authentication token handy to paste in.

:::info Pre-requisites for Platform UI Setup
The UI requires a minimum of 2GB RAM to build, so you may need to resize your Droplet temporarily if you started with 1GB
:::

To start the platform-ui installation process, run these commands:

```bash
cd /var/www/laravel/

php artisan platform-ui:install
```

The installer will ask a few questions, such as your platform URL, the auth token you set and so on.

- When asked to enter your Enjin Platform URL, insert your public droplet IP, or domain if you set one up.
- When asked to enter the default route path, insert `/`(forward slash) if you don't wish to use any specific route.

Once it's finished installing, you should be able to load up the UI by going to the path you specified for the 'default route path' step.

![Choose a region](./img/setup-configuration.jpg)

When logging in to the Platform, it'll ask for the `Enjin Platform URL` and `Authorization Token` you used to set up the platform, for authentication purposes.  
Once Inserted, you will be redirected to the platform UI and you'll be able to start using it.
