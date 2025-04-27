---
title: "Checklist"
slug: "production-checklist"
excerpt: ""
hidden: false
metadata: 
  title: "Checklist - Prepare Your Enjin Platform Setup"
  description: "Follow this comprehensive checklist to ensure your Enjin blockchain platform is set up correctly and ready for deployment."
  image: []
  robots: "index"
createdAt: "Mon Nov 20 2023 21:27:17 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Sep 10 2024 00:48:08 GMT+0000 (Coordinated Universal Time)"
---
**Hosting**

- [x] **Host Docker on a cloud provider.**  
     Minimum specs: 2 vCPU, 5 GB memory (e.g., AWS equivalent: t3.medium).  
     Implement autoscaling for increased inbound throughput and queuing capacity.
- [x] **Host the MySQL on a cloud provider.**  
     Options: AWS RDS, Google Cloud SQL, Heroku.  
     Minimum specs: 2 vCPUs, 2 GB memory (e.g., AWS equivalent: t4g.small).

**Security**

- [x] Utilize labels to keep track of your wallets, admins, and access tokens.
- [x] Regularly review the admins list to remove inactive and former team members.
- [x] Securely store access tokens and the secret key. Rotate these credentials if they are compromised.
- [x] Use access token with expirations to grant time-bound access.

**Dev Wallets**

- [x] Recommended: Use a wallet backed by AWS KMS or Google KMS for added security. These wallets ensure recoverable access, and private keys remain confidential.
- [x] If using a local wallet, back up the private key. The platform cannot recover private keys if the encrypted stored data is lost or corrupted.
- [x] Ensure your wallets have sufficient funds.
