# Setup and Run

## Prerequisites

- **Node.js** v22.22.2
- **npm**
- **Docker** — for local PostgreSQL (or use Supabase cloud)
- **Supabase** — cloud project or local Supabase CLI
- **direnv** (recommended on Ubuntu/Debian/WSL) — loads [`.envrc`](../.envrc) when you enter the project directory
- **bash** — shell setup ([`setup/setup-shell.sh`](../setup/setup-shell.sh)) only runs on Ubuntu/Debian (including default WSL distros). Fedora and other distros skip `~/.bashrc` changes; configure direnv manually if needed.

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

## Project setup

### Environemnt files

Install `direnv` in the os

`sudo apt install direnv   # Ubuntu/Debian/WSL example`

The project uses three environment files

- `.env` - for production
- `.env.local` - for local development
- `.env.test`  - for local e2e testing

These files are loaded from
[`.envrc`](../.envrc) loads environment files when you `cd` into the repo (with direnv installed and allowed):

```bash
dotenv_if_exists .env
dotenv_if_exists .env.local
dotenv_if_exists .env.test
```

#### On Ubuntu/Debian, `setup-shell.sh` adds to

`~/.bashrc`:
- `dotenv_if_exists` — helper for manual env loading in bash
- `eval "$(direnv hook bash)"` — enables direnv in new bash sessions

After `npm run setup:shell`, run `source ~/.bashrc` in your terminal (sourcing inside `npm run` only affects the script subshell). Then `cd` into the project; direnv should load `.envrc` automatically.

```bash
npm run setup
source ~/.bashrc          # required in your own terminal after setup
```

## Create `.env` files and declare specified variables

## Install packages

`npm install` already runs `prisma generate`

To re-run only the shell step: `bash setup/setup-shell.sh` (or `npm run setup:shell` for the full chain).

## Playwright configuration

**Note:**
Ubuntu 26.04 might not have native support for playwright chromium
It is necessary use the following workaround:

```bash
echo 'export PLAYWRIGHT_HOST_PLATFORM_OVERRIDE=ubuntu24.04-x64' >> ~/.bashrc
source ~/.bashrc
```

**Install chromium for e2e testing**

`npm run setup:chromium`

If the operating system require dependencies run

`npm run setup:chromiumL:deps`

## supabase configuration

For development and e2e testing are used two sets of supabase local containers

To setup these containers run the follwing command

`npm run setup:supabase`

- **Cloud**: Create a project at [supabase.com](https://supabase.com) and fill in the Supabase env vars.

- **Local**: Use `npm run supabase:dev` or `npm run supabase:e2e` for E2E. See [README](../README.md) for SSL certificate handling with Supabase cloud.
- **`npm run setup`**: Starts both dev and E2E local stacks via `supabase:start` (`supabase:dev start` then `supabase:e2e start`).


## Database Setup

1. Install dependencies (runs `prisma generate` via postinstall). See [Project setup](#project-setup-npm-run-setup) for optional `npm run setup` bootstrap:

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
