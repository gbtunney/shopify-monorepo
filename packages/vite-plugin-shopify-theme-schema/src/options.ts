import { zod } from '@snailicide/g-library'
import { z } from 'zod'

const plugin_theme_schema = zod.object({
    themeRoot: zod.optionalDefault(zod.filePath, '.'),
    sourceCodeDir: zod.optionalDefault(zod.filePath, '.'),
    entryPoints: zod.optionalDefault(z.record(z.string()), {}),
})

const resolved_plugin_theme_schema = zod.object({
    themeRoot: zod.filePath,
    sourceCodeDir: zod.filePath,

    entryPoints: z.record(z.string()), //z.record(zod.filePath)
})

export type ShopifyThemeSchemaOptions = z.infer<typeof plugin_theme_schema>
export type ResolvedShopifyThemeSchemaOptions = z.infer<
    typeof resolved_plugin_theme_schema
>

export const resolveOptions = (
    options: ShopifyThemeSchemaOptions
): ResolvedShopifyThemeSchemaOptions | undefined => {
    if (plugin_theme_schema.safeParse(options).success) {
        if (
            resolved_plugin_theme_schema.safeParse(
                plugin_theme_schema.parse(options)
            ).success
        ) {
            return resolved_plugin_theme_schema.parse(
                plugin_theme_schema.parse(options)
            )
        }
    } else {
        plugin_theme_schema.parse(options)
    }
    return undefined
}
