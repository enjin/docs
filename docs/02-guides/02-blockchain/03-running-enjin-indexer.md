---
title: "Running the Enjin Indexer"
slug: "running-enjin-indexer"
description: "The Enjin Indexer is a tool that processes and serves blockchain data for applications that require efficient data retrieval, filtering, and relations. This guide will walk you through setting up and running the indexer step-by-step."
---
## Prerequisites

Before you begin, ensure that you have [installed Docker](https://docs.docker.com/get-started/get-docker/) on a machine you will use to host the Indexer.

## Quick Start

1. Begin by creating three files: (`docker-compose.yml`, `.env` and `init.sql`):

```yaml
# docker-composer.yml

version: "3.9"

services:
  indexer_db:
    container_name: indexer_db
    image: postgres:16
    restart: unless-stopped
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_PASSWORD: ${DB_PASS}
    volumes:
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
      - indexer_db:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    command: [
      "postgres",
      "-c", "max_connections=200"
    ]

  indexer_redis:
    container_name: indexer_redis
    image: redis:7.0
    restart: on-failure
    volumes:
      - redis_db:/data
    ports:
      - "6389:6379"

  indexer_processor:
    container_name: indexer_processor
    restart: unless-stopped
    image: enjin/indexer:${VERSION:-latest}
    environment:
      CONTAINER_ROLE: processor
    build:
      context: .
    volumes:
      - .env:/squid/.env
    depends_on:
      - indexer_db
      - indexer_worker

  indexer_graphql:
    container_name: indexer_graphql
    restart: unless-stopped
    image: enjin/indexer:${VERSION:-latest}
    environment:
      CONTAINER_ROLE: graphql
    build:
      context: .
    ports:
      - "4000:4000"
      - "8080:8080"
    volumes:
      - .env:/squid/.env
    depends_on:
      - indexer_db
      - indexer_processor

  indexer_worker:
    container_name: indexer_worker
    restart: unless-stopped
    image: enjin/indexer:${VERSION:-latest}
    environment:
      CONTAINER_ROLE: worker
    build:
      context: .
    ports:
      - "9090:9090"
    volumes:
      - .env:/squid/.env
    depends_on:
      - indexer_db
      - indexer_redis

volumes:
  indexer_db:
  redis_db:
```

```sql
-- init.sql

CREATE SCHEMA IF NOT EXISTS metadata;

CREATE TABLE IF NOT EXISTS "metadata"."metadata" (
    id TEXT PRIMARY KEY,
    metadata JSONB,
    uri TEXT,
    last_updated_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS metadata_uri ON "metadata"."metadata" (uri);
```

### .dotenv Configurations

#### Enjin Relaychain
```dotenv
# .env (for Enjin Relaychain)

ARCHIVE_ENDPOINT=https://v2.archive.subsquid.io/network/enjin-relay
CHAIN_ENDPOINT=wss://archive.relay.blockchain.enjin.io
CHAIN_PREFIX=2135
DB_HOST=indexer_db
DB_NAME=indexer_enjin_relay
DB_PORT=5432
DB_PASS=postgres
REDIS_URL=redis://indexer_redis:6379/0
```

#### Enjin Matrixchain
```dotenv
# .env (for Enjin Matrixchain)

ARCHIVE_ENDPOINT=https://v2.archive.subsquid.io/network/enjin-matrix
CHAIN_ENDPOINT=wss://archive.matrix.blockchain.enjin.io
CHAIN_PREFIX=1110
DB_HOST=indexer_db
DB_NAME=indexer_enjin_matrix
DB_PORT=5432
DB_PASS=postgres
REDIS_URL=redis://indexer_redis:6379/1
```

#### Canary Relaychain
```dotenv
# .env (for Canary Relaychain)

ARCHIVE_ENDPOINT=# no archive endpoint available for Canary Relaychain
CHAIN_ENDPOINT=wss://archive.relay.canary.enjin.io
CHAIN_PREFIX=69
DB_HOST=indexer_db
DB_NAME=indexer_canary_relay
DB_PORT=5432
DB_PASS=postgres
REDIS_URL=redis://indexer_redis:6379/2
```

#### Canary Matrixchain
```dotenv
# .env (for Canary Matrixchain)

ARCHIVE_ENDPOINT=https://v2.archive.subsquid.io/network/enjin-canary-matrix
CHAIN_ENDPOINT=wss://archive.matrix.canary.enjin.io
CHAIN_PREFIX=9030
DB_HOST=indexer_db
DB_NAME=indexer_canary_matrix
DB_PORT=5432
DB_PASS=postgres
REDIS_URL=redis://indexer_redis:6379/3
```
<br />

2. Start the Indexer by running the following command: `docker compose up -d`
   _The command will launch all the necessary services in the background._
3. Access the GraphQL API
   Once the services are up and running, you can access the GraphQL Playground of the Indexer by opening your web browser and navigating to: http://localhost:4000/graphql

You can read the [GraphQL Documentation](https://graphql.org/learn/) for more information about how to construct queries for the GraphQL interface.

### Advanced Configuration

1. Clone and Enter the Repository
   ```bash
   git clone https://github.com/enjin/indexer.git
   cd indexer
   ```
2. Configure Environment Variables
   In the repository, you will find a `.env.example` file that outlines the necessary environment variables for running the Enjin Matrixchain Indexer. Copy this file to create your own `.env` file: `cp .env.example .env`
   Then, open the .env file in a text editor and fill in the missing values. Below is an example of the environment variables and their purpose:

```text
NODE_ENV: Node.js environment (supported values: development, production)

CHAIN_ENDPOINT: [Required] WebSocket endpoint to connect to. It is recommended to be set to your own Enjin archive node.
CHAIN_PREFIX: [Required] The chain prefix (SS58) of the chain you are connecting to.
ARCHIVE_ENDPOINT: [Optional] Subsquid archive endpoint for historical blockchain data. See: https://docs.sqd.ai/subsquid-network/reference/networks/https://docs.sqd.ai/subsquid-network/reference/networks/

DB_NAME: [Required] Postgres database name.
DB_HOST: [Required] Postgres host.
DB_PORT: [Required] Postgres port.
DB_PASS: [Required] Postgres password.
REDIS_URL: [Required] Redis URL.

PROMETHEUS_PORT: [Optional] Prometheus port for metrics.
PROCESSOR_PROMETHEUS_ENDPOINT: [Optional] Prometheus endpoint for the processor.

SQD_DEBUG: [Optional] Debugging flag for Subsquid. More info can be found at: https://docs.sqd.dev/sdk/reference/logger/
SENTRY_DSN: [Optional] Sentry DSN for error tracking.
```

:::info
If you are using your own Redis or PostgresSQL instances (instead of the ones provided by Docker Compose), remember to remove the `indexer_db` and `indexer_redis` services from the `docker-compose.yml`, and set the database connection details (like `DB_HOST`, `DB_PORT` and `REDIS_URL`) in the `.env` file to match your external services.
:::

## Troubleshooting

- Ensure Docker is installed and running with sufficient resources.
- Use docker `compose logs -f <service_name>` to view logs and diagnose issues.
- Double-check all environment variables and configurations in the `.env` file.

For additional support, you can reach out to [Enjin Support](https://support.enjin.io).
