# @dv.net/ui-kit

A Vue 3 UI component library for internal and external web applications. Includes ready‑to‑use UI elements (buttons, inputs, selects, tables, modals, etc.), utilities, and styles.

## Quick start

- **Install with yarn**
```bash
yarn add @dv.net/ui-kit
```

- **Use in a Vue 3 (Vite) app**
```vue
<script setup lang="ts">
import { UiButton, UiInput } from "@dv.net/ui-kit";
</script>

<template>
  <UiButton>Submit</UiButton>
  <UiInput v-model="value" placeholder="Enter text" />
</template>

<style>
@import "@dv.net/ui-kit/dist/style.css";
</style>
```

## Demo / component catalog

You can run a local demo app with examples of all components.
```bash
# development mode
yarn run dev

# build demo (static files)
yarn run build-demo
```

## Scripts

- `dev` — run the demo app with Vite
- `build` — type check (tsc) + build the component library
- `build-only` — build the library without tsc
- `build-demo` — build the demo app (`--mode demo`)
- `lint` — ESLint + Stylelint with auto‑fix
- `generate-svg-list` — generate an SVG icon list based on `src/lib/assets/icons`

## Tech stack

- **Vue 3** (`^3.5`) with `<script setup>`
- **Vite** (`^7`) + `@vitejs/plugin-vue`
- **TypeScript** (`^5.8`), d.ts generation via `vite-plugin-dts`
- **SCSS**: shared styles and variables in `src/lib/assets/scss`
- **ESLint** + **Stylelint** + **Prettier**
- **@floating-ui/vue**, **@vueuse/core**, **dayjs**, **maska**, **vue3-lottie**, **vue-virtual-scroller**
- SVG loading via `vite-svg-loader` (SVGO with `removeViewBox: false`, `prefixIds`)

## Project structure (main)

```
src/
  lib/                # component library (sources)
    assets/           # icons, animations, scss, shared style.scss
    components/       # components: UiButton, UiInput, UiSelect, ...
    index.ts          # public exports of the library
  pages/              # demo pages with examples
  router/             # demo app router
  main.ts             # demo app entry
  App.vue             # demo root component
vite.config.ts        # library and demo build config
```

## Development

1) Install dependencies
```bash
yarn install
```
2) Start the demo
```bash
yarn dev
```
3) Make changes in `src/lib/**` — the demo will hot‑reload.

Code quality checks:
```bash
yarn lint
```

Generate icon list (when SVG set changes):
```bash
yarn generate-svg-list
```

## Library build

```bash
yarn build
```
The output will be in `dist/`:
- `dist/index.js` — ES module bundle
- `dist/index.d.ts` — TypeScript types
- `dist/style.css` — shared library styles

## Environment requirements

- Node.js `^20.19.0` or `>=22.12.0`
- Consumer project: `vue >= 3.5.0`, `vue-router >= 4.4.0`

## License

Distributed under the MIT license. See `LICENSE` for details.
