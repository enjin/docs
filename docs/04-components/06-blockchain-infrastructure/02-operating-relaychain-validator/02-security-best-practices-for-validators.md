---
title: "Security Best Practices for Validators"
slug: "security-best-practices"
description: "Validators play a critical role in the Enjin Blockchain ecosystem by proposing, validating and finalizing blocks. Given their importance, validators are frequent targets for various types of attacks. It is essential to follow best practices for setting up and maintaining your validator nodes to mitigate risk and ensure the network’s robustness."
---
## Secure Server Configuration

The security of the servers where validator nodes are run is fundamental to maintaining a secure validator. Here are the key considerations for securing your server:

- **Use of Verified Software:** Always download Docker images from the official Docker Hub repository ([enjin/relaychain](https://hub.docker.com/r/enjin/relaychain)). This helps ensure that you are using the correct, unmodified, software necessary for network participation.
- **Up-to-Date Software:** Ensuring you’re running the latest stable release is important for both operating the node (you can sign up to our mailing list to keep up-to-date: [mailing-list-node-operators@enjin.io](https://groups.google.com/a/enjin.io/g/mailing-list-node-operators)), but also keeping your operating system and other applications up-to-date is equally essential to patch 0-days and prevent other such potential vulnerabilities.
- Verify File Integrity: After downloading files, verify the hashes against those provided by the download source. This step ensures that the files have not been tampered with or corrupted during the download process.
- **Follow Official Validator Setup Documentation:** Use the [Running a Validator](/04-components/06-blockchain-infrastructure/02-operating-relaychain-validator/01-running-a-validator.md) documentation to set up a validator node and ensure adhering to its principles.
- **Dedicated Server for Validator Nodes:** A validator node is an incredibly sensitive operation and running one requires careful considerations. One of those is ensuring the server running the validator node is dedicated for the sole purpose of running a single validator node. This is to ensure compute resources are dedicated to the node and to prevent other applications from interfering with the execution of the node.
- **Do Not Run as Privileged User:** Never use the root or admin user. Validators should run as a non-privileged user to minimize potential damage from attacks.

### Linux-specific Best Practices

It is strongly recommended that you disable non-essential SSH subsystems like banner, motd, scp, and X11 forwarding. Furthermore, preventing the use of password-based SSH in favor of key-based access will strongly improve your node’s security.

## Network Security

A well-configured network is crucial to protecting your validator from external threats. Below are network security best practices to follow:

- **Firewalls and Port Management:** Protect your node from unauthorized access, you can read more on the [official documentation](/04-components/06-blockchain-infrastructure/01-enjin-blockchain-nodes/01-running-a-node.md#ports) about which ports need to be opened and the rest can remain restricted.
- **Secure Access to Validator:** Ensure access to your validator is as restricted as possible. Use a Virtual Private Network (VPN) or SSH tunnel for secure remote access. Use IP whitelisting to allow only specific IP addresses to connect to your validator. When possible, make sure to enforce Multi-Factor Authentication (MFA) for any account with access to the validator.

## Key Management and Secure Access

Your validator node’s private key is the most sensitive asset. Proper key management and secure access protocol are essential to preventing key theft or misuse:

- **Secure Private Key Storage and Generation:** Store your validator key on a Hardware Security Module (HSM) or a Hardware (Cold) Wallet to ensure it is highly secure and not exposed to the host operating system.
- **Validator Access Control:** Apply the principle of least privilege to all accounts and services. Ensure that users and processes have only the minimal level of access necessary to perform their functions. This reduces the risk of privilege escalation attacks or accidental key exposure to those that don't require access.
- **Regular Auditing:** reviewing access logs, security settings and applying ongoing updates based on changes in best practices.

## Monitoring and Incident Response

Continuous monitoring and an effective incident response are key to maintaining a secure validator setup. The following are best practices for setting up monitoring and incident response procedures:

- **Real-Time Monitoring:** Implement real-time monitoring of your validator node, including performance, used resources (CPU, memory, disk), network traffic and validator health. Use tools like Prometheus and Grafana, and make sure to set up alerts for abnormal activities.
- **Logging and Auditing:** Implement comprehensive logging for your validator node. Store and maintain these logs securely. In the event of an issue or security incident, these logs can be audited to identify the root cause and facilitate a timely resolution.
- **Incident Response:** Create a team responsible for quick response to any incidents. The team should be able to answer incidents 24/7.
- **Backup and Recovery:** Implement a backup strategy that includes regular snapshots of the chainstate. Test recovery procedures periodically to ensure they are up-to-date and effective.
- **Validator Supervision:** Configure your validator software to be restarted automatically if stopped for any reason. Use a supervisor process to manage this. Review the logs associated with the commanded shutdown.

## Conclusion

Following these security best practices will help ensure your validator node is secure and compliant with the standards of the Enjin Blockchain. The security of validators is vital to maintaining the trust and functionality of the network.
