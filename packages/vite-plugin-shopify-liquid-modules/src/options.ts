import { zod } from '@snailicide/g-library'
import { z } from 'zod'

const plugin_options_schema = zod.object({
    themeRoot: zod.optionalDefault(zod.filePath, './theme'),
    modulesDir: zod.optionalDefault(zod.filePath, './modules'),

    sections: zod.optionalDefault(
        z.object({
            prefix: zod.optionalDefault(zod.string(), 'g-'),
            copy: zod.optionalDefault(zod.boolean(), false),
            file_name: zod.optionalDefault(zod.string(), 'section'),
        }),
        { prefix: 'g-', copy: true, file_name: 'section' }
    ),
    snippets: zod.optionalDefault(
        z.object({
            prefix: zod.optionalDefault(zod.string(), 'g-'),
            copy: zod.optionalDefault(zod.boolean(), false),
            file_name: zod.optionalDefault(zod.string(), '*'),
        }),
        { prefix: 'g-', copy: true, file_name: '*' }
    ),
})

const resolved_plugin_options_schema = zod.object({
    themeRoot: zod.filePath,
    modulesDir: zod.filePath,
    sections: z.object({
        prefix: zod.string(),
        copy: zod.boolean(),
        file_name: zod.string(),
    }),
    snippets: z.object({
        prefix: zod.string(),
        copy: zod.boolean(),
        file_name: zod.string(),
    }),
})

export type ShopifyLiquidModulesOptions = z.infer<typeof plugin_options_schema>
export type ResolvedShopifyLiquidModulesOptions = z.infer<
    typeof resolved_plugin_options_schema
>

export const resolveOptions = (
    options: ShopifyLiquidModulesOptions
): ResolvedShopifyLiquidModulesOptions | undefined => {
    if (plugin_options_schema.safeParse(options).success) {
        if (
            resolved_plugin_options_schema.safeParse(
                plugin_options_schema.parse(options)
            ).success
        ) {
            return resolved_plugin_options_schema.parse(
                plugin_options_schema.parse(options)
            )
        }
    } else {
        plugin_options_schema.parse(options)
    }
    return undefined
    //modulesDir: typeof options.modulesDir !== 'undefined' ? path.normalize(options.modulesDir) : 'modules',
    //themeRoot: typeof options.themeRoot !== 'undefined' ? path.normalize(options.themeRoot) : './'
}
