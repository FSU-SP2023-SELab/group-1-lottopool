# Frontend Documentation

## Technologies

- [Solidjs](https://www.solidjs.com) - Reactive Javascript framework
- [Solid Router](https://github.com/solidjs/solid-router) - Allow routing in Solidjs
- [Typescript](https://www.typescriptlang.org/docs/handbook/intro.html) - Enforce Type safety on top of Javascript
- [Tailwind CSS](https://tailwindcss.com) - Easier and consistent CSS implementation
- [Vite](https://vitejs.dev) - Package Bundler

## Structure

We are enforcing a strict file structure to ensure that all frontend files stay organized.

- The assets folder will hold static images and other related assets
- The components folder will hold reusable components for the project
  - The component should first be contained in a folder of its name
    - The main component logic is written in `component-name.tsx`
    - Additional accompanying component files can be created that import into the main component file
    - The `index.ts` holds import and export statements that allows a default import of the component to route to `components/component-name`
    - All interfaces and types relating to the component should be contained in a `types.d.ts` file
- A routes folder will contain a file that contains the code for each route in the app

```
frontend
├── src
│   ├── assets
│   │   └── <asset>
│   │
│   ├── components
│   │   └── component-name
│   │       ├── component-name.tsx
│   │       ├── index.ts
│   │       └── types.d.ts
│   │
│   ├── routes
│   │   └── route-page.tsx
│   │
│   ├── App.tsx
│   ├── index.css
│   └── index.tsx
│
└── index.html
```

## `npm` Scripts

- `npm start` - Start a Vite development server and open the webpage in your default browser
- `npm run dev` - Start a Vite development server without auto-opening
- `npm run build` - Build the frontend into a `dist/` folder
- `npm run serve` - Test serve the frontend from the `dist/` folder
- `npm run format:check` - Check if all files are formatted according to Prettier rules
- `npm run format` - Format all files according to Prettier rules
- `npm run lint` - Run ESLint on all files
- `npm run compile` - Test compile all Typescript into Javascript
- `npm test` - Run frontend tests
- `npm run coverage` - Run coverage on frontend tests

## Additional Notes

- Solidjs has [amazing tutorials](https://www.solidjs.com/tutorial/introduction_basics) on their website
