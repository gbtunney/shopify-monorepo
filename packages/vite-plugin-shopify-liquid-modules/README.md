## Inspiration

### Liquid Schema Plugin _(webpack)_

This plugin was inspired by David Warrington'a article [Building Shopify Section Schemas with JavaScript](https://ellodave.dev/blog/article/building-shopify-section-schemas-with-javascript/). It is a Webpack build system plugin, and this was exactly what i was looking for.

> The [Liquid Schema Plugin](https://github.com/davidwarrington/liquid-schema-plugin) allows you to export your Shopify Section schemas from JS and JSON files, in turn allowing you to build your schemas dynamically, share schema partials between several schemas, and benefit from the language support provided by IDEs such as VSCode.

My main issue is that code editor would not collapse the Section Schemas in Liquid Templates unless i wrapped in a script tag, and then Shopify Cli would error because that is not allowed in the {% schema %} tag. These schemas also tend to be a **mile long** and i couldn't check for json formatting errors easily, especially when moving large groups of Section fields.

```html
<!-- causes error when liquid is rendered -->
{% schema 'landing-page' %}
<script type="application/json">
    { "name": "Autumn Winter 2020" }
</script>
{% endschema %}
```

```js
const LiquidSchemaPlugin = require('liquid-schema-plugin')

module.exports = {
    // ...
    'webpack.extend': {
        plugins: [
            new LiquidSchemaPlugin({
                from: {
                    liquid: './src/sections',
                    schema: './src/schema',
                },
                to: './dist/sections',
            }),
        ],
    },
}
```

I wanted to be able to reuse sections easily so after some use, i felt like defining seperate directories for **liquid** and **schema** hindered a modular style approach. I decided on using globs to select the files and added a parent directory key. Thus, my fork born.

####[GitHub - gbtunney/liquid-schema-plugin: Build reusable section schemas using Javascript](https://github.com/gbtunney/liquid-schema-plugin)

Here is how the plugin options was defined instead in my fork:

```ts
const plugin = new LiquidSchemaPlugin({
    from: {
        liquid: `${__dirname}/../../src/shopify/sections/**/section-*.liquid`,
        //  schema: `${__dirname}/../../src/shopify/sections/**/schema.ts`
    },
    to: `${__dirname}/../../shopify/sections`,
})
```

### [vite-plugin-shopify-modules](https://github.com/barrel/barrel-shopify/tree/main/packages/vite-plugin-shopify) by Barrel NY _(vite)_

I have long been hunting for a perfect Shopify theme development environment boilerplate. I wanted something similar to [uicrooks/shopify-theme-lab](https://github.com/uicrooks/shopify-theme-lab) that uses **Vite** instead of **Webpack**. A forum comment lead me to the glorious [vite-plugin-shopify by barrel-shopify](https://github.com/barrel/barrel-shopify/tree/main/packages/vite-plugin-shopify) and then the accompanying [vite-plugin-shopify-modules](https://github.com/barrel/barrel-shopify/tree/main/packages/vite-plugin-shopify-modules) package.

Since this is my first time making a vite plugin, i used this as my starting stucture and was heavily inspired by the overall concept. This project is a customized "hybrid" of these two projects.

```ts
import type { ShopifyLiquidModulesOptions } from './src/options'
const defaultobj: ShopifyLiquidModulesOptions = {
    themeRoot: './theme',
    modulesDir: './modules',
    sections: { prefix: 'g-', copy: false, file_name: 'section' },
    snippets: { prefix: 'g-', copy: false, file_name: '*' },
}
```

# vite-plugin-shopify-modules

This plugin enables Shopify theme developers to structure their code into "module" folders which keep Liquid template files (snippets and sections) organized together with their corresponding JS or CSS, while retaining the standard file structure of Shopify themes.

> _Many thanks to [vite-plugin-shopify-modules](https://github.com/barrel/barrel-shopify/tree/main/packages/vite-plugin-shopify) by Barrel NY for readme inspiration! Much of this text came from there!_

## Features

-   ###Module System

    -   Automatically associates each module folder with the matching **snippet**, **section liquid**, and **section schema** files based on parent directory name
    -   Moves liquid files created within module folders to correct theme folders
    -   Fully compatible with Shopify GitHub integration and Shopify CLI features for syncing updates from remote theme

-   ###Dynamic Shopify Section Schemas
    -   Build Shopify Section schemas dynamically from Typescript, Javascript, and JSON files
    -   Share and reuse schema partials between different modules. Promotes efficient code reusability.
    -   benefit from the language support provided by IDEs such as VSCode and [WebStorm: The Smartest JavaScript IDE, by JetBrains](https://www.jetbrains.com/webstorm/) like autocompletion, formating, collapsing
    -   Use Typescript autocompletion to declare schema structure using my code library. Included types and validators range from generic to highly specific.

## Install

```bash
npm i @gillian/vite-plugin-shopify-liquid-modules -D

# yarn
yarn add @gillian/vite-plugin-shopify-liquid-modules -D

# pnp
pnpm add @gillian/vite-plugin-shopify-liquid-modules -D
```

## Usage

Add `shopifyModules` plugin to vite.config.js / vite.config.ts:

```ts
// vite.config.js / vite.config.ts
import shopifyModules from 'vite-plugin-shopify-modules'

export default {
    plugins: [
        shopifyModules({
            // Default options shown:
            modulesDir: 'modules',
        }),
    ],
}
```

-   Create a "modules" folder alongside your theme folders, or use the `modulesDir` plugin option to specify an alternate location.
-   Create a subfolder for each theme module. The folder name should precisely match the filename of the corresponding liquid section and/or snippet file.
-   If a section or snippet file exists matching the module folder name, a symlink will be generated pointing from the module folder to the actual file.
-   If a file matching the `[module-name].section.liquid` or `[module-name].snippet.liquid` naming convention is found in the module folder, it will be moved to the corresponding theme folder and replaced with a symlink.
-   You can place any other files in the module folder and they will not be affected by the plugin. If you add JS or CSS, make sure these files are imported from an entrypoint file somewhere to include them in the bundled output.

```bash
my-theme
├── assets
│── config
│── layout
│── locales
│── modules
│ └── cart-drawer
│ └── cart-drawer.js
│ └── cart-drawer.css
│ └── cart-drawer.section.liquid # Symlink to /sections/cart-drawer.liquid
│ └── cart-drawer.snippet.liquid # Symlink to /snippets/cart-drawer.liquid
│── sections
│ └── cart-drawer.liquid
│── snippets
│ └── cart-drawer.liquid
└── templates
```

## Using module scripts

Adding a script file to a module folder will not have any effect until the file is imported and loaded into your theme.

This plugin generates an alias to simplify the syntax when importing files from other directories.

-   `@modules` or `~modules` will be resolved to the configured modules path.
-   Additionally, you may omit the JS filename to import module scripts using a shorthand syntax.

Given the default file structure shown above, the following imports are equivalent:

```
// frontend/entrypoints/main.js
import "../../modules/cart-drawer/cart-drawer.js"
import "@modules/cart-drawer/cart-drawer.js"
import "@modules/cart-drawer"
```

When used in combination with the `additionalEntrypoints` option from vite-plugin-shopify, you also have the option to treat each module script as its own entry point to be loaded directly onto a page using a script tag. For example:

```
// vite.config.js / vite.config.ts
import shopify from "vite-plugin-shopify";
import shopifyModules from "vite-plugin-shopify-modules";

export default {
  plugins: [
    shopify({
      additionalEntrypoints: ['modules/**/*.js']
    }),
    shopifyModules()
  ]
}
```

```
// modules/cart-drawer/cart-drawer.section.liquid
{% render 'vite-tag' with '@modules/cart-drawer' %}
```

See the [vite-plugin-shopify docs](https://github.com/barrel/barrel-shopify/tree/main/packages/vite-plugin-shopify) for more details on the plugin configuration and `vite-tag` snippet usage.

## Example

See [seed-theme](https://github.com/barrel/barrel-shopify/tree/main/themes/seed-theme) for an example Shopify theme using this plugin.

## To-Do

-   [ ] Unit tests

## Bugs

Please create an issue if you found any bugs, to help us improve this project!
