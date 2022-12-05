# SpaceX Past Launches

## Getting Started

To start the development server, run the following command:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Click on any two launch cards to compare them by clicking on 'Compare' button.

## Implementation

I used the following libraries/packages to implement this project:

- Next.js wih typescript
- Used apollo client to fetch data from the server.
- Tailwind CSS for styling.
- codegen to generate typescript types from graphql schema.

## Good to have features

If I had more time, I would have added the following features:

- Add a fixed navbar with search inputs and compare button
- Responsive design
- Add a loading spinner
- Tailwind theming

## Problems encountered

- I was getting `query exceeded maximum complexity limit` error when I was trying to fetch past launches with nested fields.
  I couldn't fix it as it need changes from server side or a paid plan.
  So I removed one or two fields from the query to make it work.
