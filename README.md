# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)


## install tailwind
  - shoutout to "A shot of code" for your youtube video
  - https://www.youtube.com/watch?v=xgJKFQkKVCU&t=1s
  - https://tailwindcss.com/docs/guides/remix

install the dependency for tailwind cli command (note i use - for spacing ignore that):
 - npm i tailwindcss -D

 if you plan to use any of tailwind's templates many of them require the following cli command:
 - npm install @headlessui/react @heroicons/react

 Then make your config file CLI:
 - npx tailwindcss init 

 this will create a tailwind.config.js file, 
 - edit tailwind.config.js to look like this:
  
  <!-- ------------------------------ -->
  /** @type {import('tailwindcss').Config} */
  module.exports = {
    content: ["./app/**/*.{ts,tsx,jsx,js}"],
    theme: {
      extend: {},
    },
    plugins: [],
  };

  <!-- ------------------------------ -->
 
create a "styles" folder in your route
  - mkdir styles
  the cd into that folder the touch css file
  - cd styles
  - touch tailwind.css

once the tailwind.css is create put this inside the file
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

use the following cli command:
  npx tailwindcss -i ./styles/tailwind.css -o ./app/styles/tailwind.css

if you haven't added any tailwind classes you will get an error noting this, its fine
when you use this command tailwind will be smart enough to download only the css details you need into your output folder app/styles/tailwind.css

add the following code to "root.tsx" near the top

  <!-- ------------------------------ -->
 
import styles from './styles/tailwind.css'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

  <!-- ------------------------------ -->

## incorporate running of server to watch for tailwind updates
 
 open your package.json
 find the line that says
  - "dev": "remix dev",
right underneath that insert a line and type 
  - "dev:css": "tailwindcss -i ./styles/tailwind.css -o ./app/styles/tailwind.css -w",
now we have to edit the line which still says ("dev": "remix dev",) edit it to
  - "dev": "concurrently \"npm run dev:css\" \"remix dev\"",

you should have something that looks like this:

<!-- ------------------------------ -->
  "scripts": {
    "build": "remix build",
    "deploy": "fly deploy --remote-only",
    "dev": "concurrently \"npm run dev:css\" \"remix dev\"",
    "dev:css": "tailwindcss -i ./styles/tailwind.css -o ./app/styles/tailwind.css -w",
    "start": "remix-serve build"
  },
<!-- ------------------------------ -->

now run 
  - npm i -D concurrently
 when you now run you npm run dev you should see;
  tailwindcss -i ./styles/tailwind.css -o ./app/styles/tailwind.css -w

  which means you were successful

## prisma install
- npm i -D prisma
- touch .env

- npx prisma init 
 default is postgres for intialization
 create a model see example youtube @ 26 min https://www.youtube.com/watch?v=4tXGRe5CDDg
 - npx prisma db push
 - prisma studio

## Authentication
 https://www.youtube.com/watch?v=vR33ZRJekHk
 
## Deployment

After having run the `create-remix` command and selected "Vercel" as a deployment target, you only need to [import your Git repository](https://vercel.com/new) into Vercel, and it will be deployed.

If you'd like to avoid using a Git repository, you can also deploy the directory by running [Vercel CLI](https://vercel.com/cli):

```sh
npm i -g vercel
vercel
```

It is generally recommended to use a Git repository, because future commits will then automatically be deployed by Vercel, through its [Git Integration](https://vercel.com/docs/concepts/git).

## Development

To run your Remix app locally, make sure your project's local dependencies are installed:

```sh
npm install
```

Afterwards, start the Remix development server like so:

```sh
npm run dev
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!

If you're used to using the `vercel dev` command provided by [Vercel CLI](https://vercel.com/cli) instead, you can also use that, but it's not needed.
