import { Plugin, ResolvedConfig } from 'vite'
import {
    ShopifyLiquidModulesOptions,
    ResolvedShopifyLiquidModulesOptions,
    resolveOptions,
} from './options'
import { getJSONString, node, tg, zod } from '@snailicide/g-library'
export default function shopifyModules(
    options: ShopifyLiquidModulesOptions = {}
): Plugin {
    const resolvedOptions = resolveOptions(options)
    let _config: ResolvedConfig
    if (
        tg.isNotUndefined<ResolvedShopifyLiquidModulesOptions>(resolvedOptions)
    ) {
        const obj = resolvedOptions
    }

    return {
        name: 'vite-plugin-shopify-liquid-modules',

        /*const fileRegex = /\.(my-file-ext)$/
        transform(src, id) {
            if (fileRegex.test(id)) {
                return {
                    code: compileFileToJS(src),
                    map: null, // provide source map if available
                }
            }
        },*/
    }
}
export type {
    ShopifyLiquidModulesOptions,
    ResolvedShopifyLiquidModulesOptions,
    resolveOptions,
} from './options'
// Check for module folders with corresponding liquid files and set up symlinks as needed
