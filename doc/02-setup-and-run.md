# Setup and Run

## Prerequisites

- **Node.js** (v20+ recommended)
- **npm**
- **Docker** — for local PostgreSQL (or use Supabase cloud)
- **Supabase** — cloud project or local Supabase CLI

## Environment Variables

Environment validation is in [lib/env/env.ts](../lib/env/env.ts). Variables depend on `APP_ENV` (`development`, `test`, or `production`).

### Development

Copy [.env.local.example](../.env.local.example) to `.env.local` and set:

| Variable | Description |
|----------|--------------|
| `DB_NAME` | Database name (e.g. `sme_business_health`) |
| `DB_USER` | PostgreSQL user |
| `DB_PASSWORD` | PostgreSQL password |
| `DB_PORT` | Port (default `65432` for Supabase compatibility) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY_DEVELOPMENT` | Supabase service role key |
| `DIRECT_URL_DEVELOPMENT` | Direct PostgreSQL URL |
| `DATABASE_URL_DEVELOPMENT` | Connection pool URL |
| `OPENROUTER_API_KEY` | OpenRouter API key (for explanations) |

### Production

See [.env.example](../.env.example). Required variables include `*_PRODUCTION` variants, `OPENROUTER_API_KEY`, and `SUPABASE_SSL_CERT` (base64-encoded CA cert for Supabase cloud). See the main [README](../README.md) for Supabase SSL setup.

### Test / E2E

Copy [.env.test.example](../.env.test.example) to `.env.test`:

| Variable | Description |
|----------|-------------|
| `TEST_PORT` | Port for E2E dev server (e.g. `4001`) |
| `DATABASE_URL_TEST` | Test database URL |
| `DIRECT_URL_TEST` | Direct test DB URL |
| `NEXT_PUBLIC_SUPABASE_URL_TEST` | Supabase test URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY_TEST` | Supabase test anon key |
| `SUPABASE_SERVICE_ROLE_KEY_TEST` | Supabase test service role key |

For the Playwright VS Code extension, add to [.vscode/settings.json](../.vscode/settings.json):

```json
{
  "playwright.env": {
    "APP_ENV": "test",
    "TEST_PORT": "4000"
  }
}
```

## Local Database

Start PostgreSQL with Docker:

```bash
npm run dk:up
```

This uses [docker/docker-compose.yml](../docker/docker-compose.yml) and requires `DB_USER`, `DB_PASSWORD`, `DB_NAME`, and `DB_PORT` in `.env.local`. Stop with:

```bash
npm run dk:down
```

## Supabase

- **Cloud**: Create a project at [supabase.com](https://supabase.com) and fill in the Supabase env vars.
- **Local**: Use `npm run supabase:dev` or `npm run supabase:e2e` for E2E. See [README](../README.md) for SSL certificate handling with Supabase cloud.

## Database Setup

1. Install dependencies (runs `prisma generate` via postinstall):

   ```bash
   npm install
   ```

2. Run migrations:

   ```bash
   npm run db:migrate
   ```

   Or push schema without migration history:

   ```bash
   npm run db:push
   ```

3. (Optional) Seed the database:

   ```bash
   npm run db:seed
   ```

## Run Development

```bash
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000).

## E2E Testing

1. Ensure `.env.test` exists with all `*_TEST` variables.
2. (If using local Supabase) Start E2E Supabase: `npm run supabase:e2e`
3. Run E2E tests:

   ```bash
   npm run test:e2e
   ```

   Or with UI:

   ```bash
   npm run test:e2e:ui
   ```

   Or with HTML report:

   ```bash
   npm run test:e2e:report
   ```

4. Stop E2E Supabase when done: `npm run supabase:e2e:stop`

## Build and Production

```bash
npm run build
npm run start
```

## Linting and Typechecking

```bash
npm run lint
npm run typecheck
```

Fix lint issues:

```bash
npm run lint:fix
```
