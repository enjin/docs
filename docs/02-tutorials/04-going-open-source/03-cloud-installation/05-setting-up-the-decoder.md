---
title: "Setting up the Decoder"
slug: "setting-up-the-decoder"
excerpt: ""
hidden: false
metadata: 
  title: "Setting up the Decoder - Configure Enjin’s Blockchain Decoder"
  description: "Learn how to set up the blockchain decoder for the Enjin platform, ensuring accurate and efficient data processing."
  image: []
  robots: "index"
createdAt: "Wed Jan 31 2024 10:16:44 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Sep 10 2024 15:50:33 GMT+0000 (Coordinated Universal Time)"
---
The native platform decoder is a robust and fast tool for decoding blockchain transactions and is recommended to be run with the platform. This doesn't have to be hosted on the same Droplet as the platform, but would be recommended for performance. To get started we need to ensure the dart compiler is installed and ready to build the tool by running these commands:

```bash
sudo apt-get update

sudo apt-get install apt-transport-https

wget -qO- https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo gpg --dearmor -o /usr/share/keyrings/dart.gpg

echo 'deb [signed-by=/usr/share/keyrings/dart.gpg arch=amd64] https://storage.googleapis.com/download.dartlang.org/linux/debian stable main' | sudo tee /etc/apt/sources.list.d/dart_stable.list

sudo apt-get update

sudo apt-get install dart

export PATH="$PATH:/usr/lib/dart/bin"

echo 'export PATH="$PATH:/usr/lib/dart/bin"' >> ~/.profile
```

Next create a folder for the Platform Decoder repository, it's recommended to create this outside of the Laravel root folder:

```bash
cd ~

mkdir enjin

cd enjin

git clone https://github.com/enjin/platform-decoder.git
```

Finally build the app:

```bash
cd platform-decoder

dart pub get

dart compile exe bin/server.dart -o bin/server
```

Once built, we'll run the server in the next step along with the other workers.

## Updating the Decoder

If you're using Supervisor to keep the decoder running ([Keeping the Platform Running](/02-tutorials/04-going-open-source/03-cloud-installation/012-keeping-the-platform-running.md)) , stop it using:

```bash
sudo supervisorctl stop platform-decoder:*
```

Login as your platform user (or from root use `su - platform` and change to the wallet daemon directory:

```bash
cd ~/enjin/platform-decoder/
```

Pull the latest version from git and build:

```bash
git pull
dart pub get
dart compile exe bin/server.dart -o bin/server
```

Start the wallet using supervisor:

```bash
sudo supervisorctl start platform-decoder:*
```
