# Frontend Architecture

## Scope

This document defines the local boundaries for the Next.js App Router
application. Route files stay thin and compose feature components while shared
behavior remains independent of routing.

```text
app/layout.tsx
  -> route group layout
       -> page.tsx
            -> feature component
                 -> shared UI component
                 -> feature API types
                 -> lib/api
  -> AuthContext and route guards
```

## Responsibilities

- `src/app/` owns routing, route groups, layouts, metadata, and framework
  entrypoints. Page files should primarily compose features.
- `src/features/<domain>/` owns domain-specific screens and interaction
  flows.
- `src/components/ui/` owns reusable presentational primitives.
- `src/components/layouts/` owns public and authenticated page chrome.
- `src/components/auth/` owns route-access composition, not business data.
- `src/features/<domain>/apiTypes.ts` owns that API domain's contracts.
- `src/contexts/` owns genuinely application-wide client state.
- `src/lib/api.ts` owns HTTP transport, token refresh, and normalized errors.
- Styles remain separated by page, layout, feature, and UI responsibility.

Dependencies flow from App Router entrypoints to features and then shared
components or libraries. Shared components and libraries must not import page
modules.

## Server and client boundaries

Use Server Components by default when browser APIs, event handlers, Context, or
client-side state are unnecessary. Place `'use client'` at the narrowest
boundary that needs it. Do not import server-only secrets or database access
into client modules.

Runtime values returned by `/env.json` are public browser configuration and
must never contain secrets. Authentication redirects must preserve public token
routes such as password reset. Represent loading and error states explicitly.

## Testing

Test feature behavior, shared UI, contexts, and route guards with Vitest and
Testing Library. Add regressions for route accessibility and authentication
redirects. Mock the HTTP boundary in unit tests and reserve deployed browser or
integration tests for complete system flows.
