# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over your `app/` folder to the new project that's pre-configured for your target server.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```


### Prisma
Borrowed from: https://remix.run/docs/en/v1/tutorials/jokes#set-up-prisma

Initialize prisma with sqlite - if not done before in the app

This will create the prisma folder 

```sh
npx prisma init --datasource-provider sqlite
```

that gives us this output:

```sh
✔ Your Prisma schema was created at prisma/schema.prisma
  You can now open it in your favorite editor.

warn You already have a .gitignore. Don't forget to exclude .env to not commit any secret.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Run prisma db pull to turn your database schema into a Prisma schema.
3. Run prisma generate to generate the Prisma Client. You can then start querying your database.

More information in our documentation:
https://pris.ly/d/getting-started
```

Now make prisma load variables from .env and sync the db with the Prisma schema:

```sh
npx prisma db push
```

Seeds are set in the prisma/seed.ts file

To run seeders

```sh
node --require esbuild-register prisma/seed.ts
```

or which is the same 

```sh
 npx prisma db seed
 ```

Due to our custom package.json script

To generate the data models

```sh
npx prisma db pull
```

Studio: 

```sh
npx prisma studio
```

Access to the database in a nice UI

Deployment info https://remix.run/docs/en/v1/tutorials/jokes#deployment




