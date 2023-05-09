# next-drizzle-app-router-edge-template

This is an experimental attempt at creating fullstack app entirely on the Edge runtime, with Next.js's beta App Router.

I am still learning how to structure apps using Next.js's new App Router, and comments are welcome in Discussions.

This project was created for learning purposes. It is open to any contribution. You can clone the repo and use it however you want.

There are some things that doesn't work on new Next.js 13.3.0, so this project uses previous canary release. When issues is fixed by Vercel, I will update the repo.

## Features

This project is inspired by many separate repos. Specifically inspired by [mattddean](https://github.com/mattddean)'s [t3 app router template](https://github.com/mattddean/t3-app-router-edge-drizzle)

- Uses edge runtime on every page and route handlers (except user-created webhook endpoint).
- Type-safe SQL and schema management with drizzle-orm. 
- Authentication with Clerk (with clerk middleware for protecting pages).
- Styling with Tailwind.
- React components with shadcn/ui (it's newly updated by shadcn while I write this readme. So I will update the repo when I have time.).
- SWR for client-side data fetching and mutations.
- REST for route handlers

## Built with

- [Next.js](https://nextjs.org/)
- [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm)
- [PlanetScale](https://planetscale.com/)
- [Clerk.dev](https://clerk.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Upstash/ratelimit](https://github.com/upstash/ratelimit)

## Getting Started

1. Run some commands.

   ```sh
   npm i
   cp .env.example .env
   ```

2. Fill in .env with required variables

3. Push your schema changes to a new PlanetScale database. Don't use this command on an existing database that you care about. It's destructive (and in beta).

   ```sh
   npx drizzle-kit@db-push
   ```

4. Start the Next.js dev server.

   ```sh
   npm dev
   ```
