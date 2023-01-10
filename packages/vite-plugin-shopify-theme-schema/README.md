# 🐌 Welcome to @snailicide/vite-plugin-shopify-theme-schema 🐌

| [npm](https://www.npmjs.com/package/@snailicide/vite-plugin-shopify-theme-schema) | [GitHub](https://github.com/gbtunney/shopify-monorepo/tree/main/packages/vite-plugin-shopify-theme-schema) |

<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

This plugin adds features to make it easier to manage the JSON schema files for Shopify Theme Settings. Please see [Inspiration](#inspiration) section for more info and backstory!

> Many thanks to [barrel-shopify](https://github.com/barrel/barrel-shopify) by Barrel NY for readme inspiration.

-   [🐌 Welcome to @snailicide/vite-plugin-shopify-theme-schema 🐌](#welcome-to--snailicide-vite-plugin-shopify-theme-schema---)
    -   [Author](#author)
    -   [Features](#features)
    -   [Examples](#examples)
        -   [Build](#build)
        -   [Tests](#tests)
    -   [Usage](#usage)
        -   [Options](#options)
    -   [Inspiration](#inspiration)
        -   vite-plugin-shopify-theme-settings
    -   [Helpful Links](#helpful-links)
    -   [To-Do](#to-do)
    -   [Bugs](#bugs)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

## Author

👤 **Gillian Tunney** | [github](https://github.com/gbtunney) | [email](mailto:gbtunney@mac.com) |

## Features

### Dynamic Shopify Setting Schemas

-   Build Shopify Setting schemas dynamically from Typescript, Javascript, and JSON files
-   Share and reuse schema partials between different files. Promotes efficient code reusability.
-   Benefit from the language support provided by IDEs such as VSCode and [WebStorm](https://www.jetbrains.com/webstorm/) like autocompletion, formatting, collapsing
-   Use Typescript autocompletion to declare schema structure using my code library. Included types and validators range from generic to highly specific.

## Examples

See [**example_theme_config**](./example_theme_config/) folder for usage examples of [validators](./example_theme_config/global_settings/settings_colors.ts) and [types](./example_theme_config/global_settings/settings_typography.ts).

## Install

```sh
#npm
npm i @snailicide/vite-plugin-shopify-theme-schema -D

# yarn
yarn add @snailicide/vite-plugin-shopify-theme-schema -D

# pnp
pnpm add @snailicide/vite-plugin-shopify-theme-schema -D
```

For pnpm workspace:

```sh
pnpm add @snailicide/vite-plugin-shopify-theme-schema@workspace:*

pnpm --filter=[yourGlob] add @snailicide/vite-plugin-shopify-theme-schema@workspace:*
```

### Build

```sh
pnpm --filter=@snailicide/vite-plugin-shopify-theme-schema build
```

### Tests

```sh
# build example files
pnpm --filter=@snailicide/vite-plugin-shopify-theme-schema test:example
```

## Usage

Add `pluginShopifyThemeSchema` plugin to vite.config.js / vite.config.ts:

```js
import pluginShopifyThemeSchema from '@snailicide/vite-plugin-shopify-theme-schema'

/* * Example  * */
export default {
    plugins: [
        pluginShopifyThemeSchema({
            themeRoot: '.',
            sourceCodeDir: './src/global_settings',
            entryPoints: {
                'settings_schema.json': 'settings_schema.js',
            },
        }),
    ],
}
```

-   Create a `sourceCodeDir` directory under your theme's folder to hold the source files for your `settings_schema.json` or custom entrypoint.
-   Create a Javascript,Typescript or JSON file for each 'entrypoint' of your theme settings. You can compose different files to determine the settings sequence.
-   Make sure that your schema source directory is listed in your theme's `.shopifyignore` file to avoid errors when pushing code to Shopify.

### Options

```ts
import type { ShopifyLiquidModulesOptions } from './src/options'

/* * Default Options Available * */
const defaultobj: ShopifyLiquidModulesOptions = {
    themeRoot: '.',
    sourceCodeDir: './src',
    entryPoints: {
        'settings_schema.json': 'settings_schema.js',
    },
}
```

## Inspiration

### [vite-plugin-shopify-theme-settings](https://github.com/barrel/barrel-shopify/tree/main/packages/vite-plugin-shopify-theme-settings) by Barrel NY

Since i am new vite plugin, i used this as my starting structure and was heavily inspired by the overall concept of the vite-plugin-shopify-theme-settings. I skipped looping thru the json directory and instead used an 'entryPoint' approach.

## Helpful Links

-   [Vite](https://vitejs.dev/)
-   [Shopify Liquid reference](https://shopify.dev/api/liquid)
-   [Shopify Theme Settings reference](https://shopify.dev/themes/architecture/settings)
-   [vite-plugin-shopify-theme-settings](https://github.com/barrel/barrel-shopify/tree/main/packages/vite-plugin-shopify-theme-settings) _(by barrel-shopify)_
-   the awesome [vite-plugin-shopify](https://github.com/barrel/barrel-shopify/tree/main/packages/vite-plugin-shopify) _(by barrel-shopify)_

## To-Do

-   [ ] Unit Tests

## Bugs

Please create an issue if you found any bugs, to help us improve this project!
