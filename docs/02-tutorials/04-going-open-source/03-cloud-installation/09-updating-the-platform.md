---
title: "Updating the Platform"
slug: "updating-the-platform"
excerpt: ""
hidden: false
metadata: 
  title: "Updating the Platform - Keep Enjin Up-to-Date"
  description: "Find out how to update the Enjin platform, ensuring that your blockchain solutions are running the latest features and improvements."
  image: []
  robots: "index"
createdAt: "Wed Jan 31 2024 10:18:23 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Sep 10 2024 00:41:53 GMT+0000 (Coordinated Universal Time)"
---
Keeping your Platform up to date is very straightforward.  To do so SSH into your Droplet and run the following command from your installation folder to install the latest versions of the packages:

```bash
cd /var/www/laravel/

composer update

php artisan cache:clear && php artisan optimize
```

One thing to note is that composer will automatically get the latest patch release of the current version specified in the `composer.json` file located in the root of the install folder.  This would be set at the time you ran composer require commands.  Presently these will be a mix of v1.3.x and 1.2.x. If a new minor version is released (e.g. 1.2.x -> 1.3.0) then you will need to edit the `composer.json` file and update the version numbers for the enjin packages like so:

```text
"enjin/platform-core": "^1.3",
"enjin/platform-fuel-tanks": "^1.3",
"enjin/platform-marketplace": "^1.3",
"enjin/platform-beam": "^1.3",
"enjin/platform-ui": "^1.2",
```

In composer, the ^ symbol tells the command to get the latest patch of the version tag specified, so ^1.3 will get any versions of the package starting at v1.3.0 but won't get anything starting at v1.4.0 and above.

It will be worth keeping an eye on the repos for when the minor/major versions of the packages change as these will usually coincide with blockchain upgrades as well.

Once you have updated composer it's best practice to run the migration command to apply any database changes that have been made in the latest versions and also rebuild the UI if the UI package was updated.  If no database changes were made then the migration will complete without altering anything.  Run the migrations with:

```bash
php artisan migrate
php artisan platform-ui:rebuild
```

Finally you will then need to [restart both the queue worker and in the ingest commands](doc:restarting-the-platform) so they also use the latest code.  
If the Platform Decoder was also updated and rebuilt then it should also be restarted.

## Confirming the update was successful

To check if the upgrade was successful:  
Access the well-known file at `https://your_url.com/.well-known/enjin-platform.json` and check that the versions are expected. For example:

```json
    "packages": {
        "enjin/platform-beam": {
            "version": "v1.5.0",
            "revision": "37aa2138cd4974d83ac05ce2d5735db7c6043d3b",
            "routes": [
                "claim/{code}"
            ]
        },
        "enjin/platform-core": {
            "version": "v1.5.1",
            "revision": "b93b2d79edb229232bea03d6a97d329e73c64e31",
            "routes": [
                "proof/{code}",
                "qr"
            ]
        },
        "enjin/platform-fuel-tanks": {
            "version": "v1.5.0",
            "revision": "4f751e8c529e3027063dc72e7f4da2cba6e183f9"
        },
        "enjin/platform-marketplace": {
            "version": "v1.5.0",
            "revision": "9f71ddb12c351637ace5486d9c02ad1f0e45ada3"
        },
        "enjin/platform-ui": {
            "version": "v1.5.0",
            "revision": "bfa6bd30564214481b0535bbd46f8b417d19ef5a"
        }
    },
```
