This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install the Netlify CLI if you haven't already:

```bash
npm install netlify-cli -g
```

Then, run the development server using Netlify Dev to ensure all Netlify features (like Blobs) work correctly:

```bash
netlify dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Netlify

The easiest way to deploy your Next.js app is to use the [Netlify Platform](https://www.netlify.com/).

### Manual Deploy

To deploy manually from your terminal:

```bash
netlify deploy --prod
```

### Continuous Deployment

For continuous deployment, connect your GitHub repository to your Netlify project. Every push to the `main` branch will trigger a new production build.
