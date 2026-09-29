# Military Asset Management Frontend

React + Vite + JavaScript + Tailwind CSS frontend for the existing Spring Boot Military Asset Management API.

## Requirements
- Node.js 20+ recommended
- Existing backend running at `http://localhost:8080`

## Setup

```bash
npm install
copy .env.example .env
npm run dev
```

For PowerShell, `copy .env.example .env` also works.

The frontend uses:

`VITE_API_BASE_URL=http://localhost:8080/api/v1`

## Production build

```bash
npm run build
npm run preview
```

## Lint

```bash
npm run lint
```

## Authentication

The frontend sends:

`Authorization: Bearer <JWT>`

The JWT and non-sensitive logged-in user profile are stored in localStorage under `token` and `user`.

## Integrated API endpoints

- POST `/auth/login`
- GET `/dashboard`
- GET `/inventory`
- GET/POST `/purchases`
- GET/POST `/transfers`
- GET/POST `/assignments`
- GET/POST `/expenditures`
- GET/POST `/bases`
- GET/POST `/equipment-types`
- GET/POST `/users`
- GET `/audit-logs`

No direct MySQL connection is used.

## Important

The UI does not create mock business data. If an API endpoint is unavailable, the page displays an error/empty state instead.

The backend remains authoritative for validation, authorization, inventory updates, and base isolation.
