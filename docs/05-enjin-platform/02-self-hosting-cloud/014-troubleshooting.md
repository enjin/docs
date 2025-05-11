---
title: "Troubleshooting"
slug: "troubleshooting"
description: "A guide to troubleshooting common issues within the Enjin blockchain platform, ensuring minimal disruptions and smooth operations."
---
### How to fix the Enjin Platform "Permission Denied" error?

Sometimes you may get 'Permission Denied' errors when trying to use the platform, usually this is where some services are being run as a different user to what was initially configured in the Laravel snapshot.  
To fix these would normally be a case of changing the owner user to the www-data group. The two most common are the log files, and the storage folder.  
To fix them it would normally be a case of running the chown command as follows:

```bash
sudo chown -R www-data:www-data /var/www/laravel/storage/
```
