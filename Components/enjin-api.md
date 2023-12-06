---
title: "Enjin API"
slug: "enjin-api"
excerpt: "An overview of Enjin's GraphQL API and its schema."
hidden: false
createdAt: "Sun Nov 12 2023 21:23:00 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Nov 20 2023 22:12:00 GMT+0000 (Coordinated Universal Time)"
---
The Enjin API schema serves as your roadmap when you want to interact with the Enjin platform through code. It's a structured guide that outlines what you can do and the kind of information you can access. Here's a breakdown of key elements within the Enjin API schema:

1. **Types**: These are like the building blocks of data, representing various entities in the Enjin ecosystem, such as users, tokens, wallets, and transactions. Each type comes with specific details you can retrieve.

2. **Fields**: Fields provide the details of these building blocks. When you examine a type, its fields specify the information you can obtain. For example, if it's a token type, you can learn about its name, symbol, and total supply.

3. **Queries**: Queries are your way of posing questions to the Enjin platform. They allow you to request data, akin to asking for information, and you receive the answers in JSON format.

4. **Mutations**: Mutations represent actions you can take. You use mutations to effect changes in the Enjin world, whether it's creating tokens, managing assets, or updating user information.

5. **Arguments**: These serve as special instructions accompanying your queries or actions. They help you obtain specific answers or make precise changes. For example, when requesting tokens, you can use arguments to specify the types of tokens you're interested in.

So, the Enjin API schema acts as your guide for integrating Enjin's blockchain features into your applications, games, or services efficiently. It clarifies what's accessible, how to request information, and how to enact changes, functioning as a map to navigate the Enjin platform through code seamlessly.

> 🚧 Please note: This is an introductory reference
> 
> The information provided in this section cannot be programmatically updated and may be subject to inconsistencies over time. 
> 
> For the most up-to-date and comprehensive list, we strongly recommend referring to the [GraphQL Playground](https://platform.canary.enjin.io/graphiql) and [Apollo API Reference](https://studio.apollographql.com/public/EnjinPlatform/variant/core/home) as your ultimate sources of truth.
> 
> ### GraphiQL Playground:
> 
> #### Testnet
> 
> [Core Operations](https://platform.canary.enjin.io/graphiql) — [Fuel Tanks](https://platform.enjin.io/fuel-tanks) — [Marketplace](https://platform.enjin.io/graphiql/marketplace) — [Beam](https://platform.enjin.io/graphiql/beam)
> 
> #### Mainnet
> 
> [Core Operations](https://platform.enjin.io/graphiql) — [Fuel Tanks](https://platform.enjin.io/graphiql/fuel-tanks) — [Marketplace](https://platform.enjin.io/graphiql/marketplace) — [Beam](https://platform.enjin.io/graphiql/beam)
> 
> ### Apollo API Reference
> 
> #### Testnet
> 
> [Core Operations](https://studio.apollographql.com/public/EnjinPlatform/variant/core/home) — [Marketplace](https://studio.apollographql.com/public/EnjinPlatform/variant/marketplace/home) — [Beam](https://studio.apollographql.com/public/EnjinPlatform/variant/beam/home) — [Fuel Tank](https://studio.apollographql.com/public/EnjinPlatform/variant/fuel-tanks/home)