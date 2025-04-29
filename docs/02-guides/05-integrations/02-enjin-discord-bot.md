---
title: "Enjin Discord Bot"
slug: "enjin-discord-bot"
description: "Discover how to use the Enjin Discord Bot to integrate blockchain functionality within Discord servers, enhancing community interaction."
---
<div class="video-container">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/n4pUAWuPiS0?si=-fKbdXA25kQSmvUR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

The Enjin Discord Bot offers an advanced integration solution, enabling users to seamlessly connect their wallets. Utilizing this secure wallet connection, the bot is capable of automatically assigning specific roles based on the user's collection and NFT holdings.

## Step #1: Add the Enjin Bot to your discord server

Head over to this page to add the Enjin Bot to your discord server: https://enj.in/discord-bot

## Step #2: Grant the Enjin Bot permissions

Navigate to "**Server Settings**" within your Discord server, and select "**Roles**".  
For the Enjin Bot to be able to assign roles to users, it must be positioned higher in the hierarchy than all the roles it is intended to assign.  
In the roles list, locate the Enjin Bot and drag it **above** the roles it will be managing.  
Make sure to save the changes by clicking the "**Save Changes**" button.

![Setting up the Enjin Discord Bot - Configuring Roles Permissions](./img/discord-roles-permissions.gif)


## Step #3: Setup the role assignment configurations

To configure the role assignment, you will need to enter the specific collection IDs that the Enjin Bot will use to assign roles. 

In your Discord server, type `/setup ` or type `/` and select the `/setup` command. You will be prompted to enter the collection ID, and two optional fields `asset` ID and `balance` (which can be viewed by pressing the 'Tab' button) to assign role based on token holdings.  
These IDs correspond to the collection / asset that users must own in order to be assigned certain roles.

You can find the collection IDs by visiting [NFT.io](https://nft.io) and selecting the specific collection. The collection ID is located next to the collection name or in the token's details, where you can also find the token ID.

After verifying and finalizing the configuration settings, send the message.

The bot will then prompt you to select which roles to assign - Select the roles and click anywhere outside of the selection box to confirm the selection.

![Setting up the Enjin Discord Bot - Running the Setup Command](./img/discord-running-setup-command.gif)

:::tip Did you know?
You can assign different roles based on token amount holdings.  
e.g. `Enjineer` role if owning at least 1 Blobby token, and `Gamer` role if owning at least 10 Blobby tokens.
:::

## Step #4: Configure the Wallet Connection Channel

To enable the bot to scan user wallets, users must first establish a connection between their wallets and your Discord server. This requires a dedicated text channel for wallet connections.

Create a specific text channel that users will utilize for this purpose.

Within this newly created channel, execute the `/add-button` command. This command will generate a user-friendly button for users to connect their wallets.

For a more personalized user experience, you may also add a custom description to the wallet connection button. Simply append the `description` parameter to the `/add-button` command prompt.

![Setting up the Enjin Discord Bot - Configuring Wallet Connection Channel](./img/discord-setting-up-wallet-connection.gif)

***

Congratulations! You have successfully configured the Enjin Discord Bot for your server. This advanced integration will allow for seamless wallet connection and role assignment based on user's collection and NFT holdings.

For those interested in further customization or hosting options, the Enjin Discord Bot code is open-source and publicly available at https://github.com/enjin/discord-bot.  Feel free to explore, alter, and host it according to your specific needs.
