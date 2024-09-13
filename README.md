# Astro + React + Tailwind

```
npm init astro -- --template framework-react app_name
```

```
npm create astro@latest -- --template framework-react app_name
```

astro integration w/ tailwind

```
npx astro add tailwind
```

serving the pokemon-data sort of like a microservice > from the pokemon-data directory:

```
PORT=8080 npx serve
```

- Layout using an Astro file > create "Layout.astro" file
- Creating parametrized route > create "[id].astro" file
- When using a form, astro will create a query string automatically, we just need the 'q' value

```
const q = Astro.url.searchParams.get("q")?.toLowerCase() ?? "";
```

- As Astro uses static pages on the client-side as one way to work faster, to implement dynamic content and make astro do Server-Side Rendering we'll output it to server instead of static and add an adapter such as node (check the astro.config.mjs before and after adding "node" to the project to visualize it)

```
npx astro add node
```

- and add the mode to the astro.config.mjs

```
adapter: node({
    mode: 'standalone'
  })
```

- Now the details page stops working because when moving from the static model to the server model we lose getStaticPaths() functionality.
- That's one of the downsides: with Astro you can't decide on a route-basis if some routes are server-side rendered and other routes are statically generated
- So we'll comment the getStaticPaths() function from the "[id].astro" file and change it to find the pokemon we want

- To implement the API routes we'll need to search the API by creating a page called "search.ts" (we can't use tsx on the api page, only ts)
- Then we'll create a get function to fetch the data from our pokemon.json file and then return a new response based on the typed search query
- Now the `localhost:3000/api/search?q=${query}` is working

- Now onto creating a completly dinamic search page by creating the "search.astro" file
- It's now available at "localhost:3000/search"
- But still not working because we have to add the "client" param to the SearchPage to tell the page when to load the component

- !important: Client-Side Rendering with Astro is only available with .astro files so you can specify which part of the page is going to be static and which part of the page is going to be dynamic
