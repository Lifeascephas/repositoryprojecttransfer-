# KVDA Kenya - Volunteer Organization Website

## Overview

This is a full-stack web application for the **Kenya Voluntary Development Association (KVDA)**, a non-profit organization that coordinates volunteer programs and community development projects across Kenya. The site serves as a public-facing portal showcasing programs (short-term workcamps, long-term volunteering, educational tours, outbound exchange), volunteer projects, news/updates, and a contact form for inquiries. The app uses a dark theme with deep red and black branding.

The stack is a monorepo with a React frontend (Vite + TypeScript), an Express backend, PostgreSQL database via Drizzle ORM, and Replit Auth for authentication.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend (client/)
- **Framework**: React 18 with TypeScript, bundled by Vite
- **Routing**: Wouter (lightweight client-side router) — pages: Home, About, What We Do, Events, Programs, Projects, Volunteer, Partners, Donate, News, Contact, 404
- **State/Data Fetching**: TanStack React Query for server state management
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives with Tailwind CSS
- **Animations**: Framer Motion for scroll animations and page transitions
- **Forms**: React Hook Form with Zod validation (via @hookform/resolvers)
- **Styling**: Tailwind CSS with CSS variables for theming. Dark theme by default (black background, deep red primary). Fonts: DM Sans (body), Outfit (display headings)
- **Path aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend (server/)
- **Framework**: Express.js on Node with TypeScript (run via tsx)
- **API Pattern**: RESTful JSON API under `/api/` prefix. Routes defined in `shared/routes.ts` as a typed route map with Zod schemas for validation
- **Database**: PostgreSQL with Drizzle ORM. Schema defined in `shared/schema.ts`
- **Storage Layer**: `server/storage.ts` implements `IStorage` interface with `DatabaseStorage` class — abstracts all DB queries
- **Authentication**: Replit Auth (OpenID Connect) via Passport.js with session storage in PostgreSQL (`connect-pg-simple`). Auth code lives in `server/replit_integrations/auth/`
- **Build**: Custom build script (`script/build.ts`) uses Vite for client and esbuild for server, outputting to `dist/`

### Shared Code (shared/)
- `schema.ts` — Drizzle table definitions: users, programs, projects, news, inquiries
- `models/auth.ts` — Drizzle tables for Replit Auth: sessions, users (separate user model with OAuth fields)
- `routes.ts` — Typed API route definitions with Zod response schemas

### Database Schema
- **users** — Basic user table (id, username, email, isAdmin, createdAt)
- **programs** — Volunteer programs (title, type, description, duration, imageUrl). Types: short_term, long_term, outbound, educational
- **projects** — Volunteer projects (title, location, sector, code, description, imageUrl). Sectors: Health, Education, Environment, etc.
- **news** — News articles (title, content, imageUrl, publishedAt)
- **inquiries** — Contact form submissions (name, email, subject, message, createdAt)
- **events** — Events and activities (title, description, date, location, imageUrl, type)
- **team_members** — Staff team (name, role, email, phone, imageUrl, order)
- **board_members** — Board of directors (name, position, imageUrl, order)
- **partners** — International partner organizations (name, country, website, logoUrl, description)
- **testimonials** — Volunteer testimonials (name, country, program, quote, imageUrl)
- **sessions** — PostgreSQL session store for Replit Auth (sid, sess, expire)
- **users (auth)** — Replit Auth users (id, email, firstName, lastName, profileImageUrl, timestamps)

### API Endpoints
- `GET /api/programs` — List all programs
- `GET /api/programs/:id` — Get single program
- `GET /api/projects` — List all projects
- `GET /api/projects/:id` — Get single project
- `GET /api/news` — List all news (ordered by publishedAt desc)
- `GET /api/news/:id` — Get single news item
- `POST /api/inquiries` — Submit contact form inquiry
- `GET /api/events` — List all events
- `GET /api/team-members` — List team members
- `GET /api/board-members` — List board members
- `GET /api/partners` — List partner organizations
- `GET /api/testimonials` — List volunteer testimonials
- `GET /api/auth/user` — Get authenticated user (Replit Auth)
- `GET /api/login` — Replit Auth login redirect
- `GET /api/logout` — Logout

### Key Design Decisions
1. **Monorepo with shared types**: The `shared/` directory contains schemas and route definitions used by both client and server, ensuring type safety across the stack
2. **Drizzle ORM over alternatives**: Chosen for its TypeScript-first approach and lightweight query building. Uses `drizzle-zod` for automatic Zod schema generation from DB tables
3. **shadcn/ui component library**: Not installed as a dependency but copied into `client/src/components/ui/` — allows full customization of each component
4. **Wouter over React Router**: Lightweight router, simpler API for a relatively small number of pages
5. **Images**: Currently using Unsplash URLs for placeholder images throughout the site

## External Dependencies

- **PostgreSQL**: Primary database, required. Connection via `DATABASE_URL` environment variable
- **Replit Auth (OpenID Connect)**: Authentication provider. Requires `ISSUER_URL`, `REPL_ID`, and `SESSION_SECRET` environment variables
- **Unsplash**: Used for placeholder images (loaded via direct URLs, no API key needed)
- **Google Fonts**: DM Sans and Outfit fonts loaded via CDN in `client/index.html` and `client/src/index.css`
- **No other external APIs or payment integrations are currently active** (though Stripe is in the build allowlist for potential future use)

### Required Environment Variables
- `DATABASE_URL` — PostgreSQL connection string (mandatory)
- `SESSION_SECRET` — Secret for Express sessions (mandatory for auth)
- `REPL_ID` — Replit environment identifier (set automatically on Replit)
- `ISSUER_URL` — OpenID Connect issuer URL (defaults to `https://replit.com/oidc`)

### Key npm Dependencies
- `express`, `express-session`, `passport` — Server framework and auth
- `drizzle-orm`, `drizzle-kit`, `drizzle-zod` — Database ORM and migrations
- `@tanstack/react-query` — Client data fetching
- `framer-motion` — Animations
- `react-hook-form`, `zod`, `@hookform/resolvers` — Form handling and validation
- `wouter` — Client routing
- `date-fns` — Date formatting
- `connect-pg-simple` — PostgreSQL session store