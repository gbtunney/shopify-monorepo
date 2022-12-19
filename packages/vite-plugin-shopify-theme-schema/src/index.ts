import path from 'path'
import fs from 'fs'
import { Plugin, ResolvedConfig } from 'vite'
import { node, tg, zod } from '@snailicide/g-library'
import {
    ShopifyThemeSchemaOptions,
    ResolvedShopifyThemeSchemaOptions,
    resolveOptions,
} from './options'

export type {
    ShopifyThemeSchemaOptions,
    ResolvedShopifyThemeSchemaOptions,
    resolveOptions,
} from './options'

export default function shopifyModules(
    options: ShopifyThemeSchemaOptions = {}
): Plugin {
    const resolvedOptions = resolveOptions(options)
    let _config: ResolvedConfig
    if (tg.isNotUndefined(resolvedOptions)) processModules(resolvedOptions)
    return {
        name: 'vite-plugin-shopify-theme-schema',
    }
}

const processModules = ({
    themeRoot,
    sourceCodeDir,
    entryPoints,
}: ResolvedShopifyThemeSchemaOptions): void => {
    if (
        zod.filePath.safeParse(themeRoot).success &&
        fs.existsSync(themeRoot) &&
        zod.filePath.safeParse(sourceCodeDir).success &&
        fs.existsSync(sourceCodeDir)
    ) {
        const outThemePath = zod.filePath.parse(themeRoot)
        const outConfigDir = path.resolve(outThemePath, './config')

        Object.entries(entryPoints).forEach(
            ([entry_pt_out, entry_pt_source]) => {
                const full_entry_path = zod.filePath.parse(
                    `${sourceCodeDir}/${entry_pt_source}`
                )
                const full_out_path = zod.filePath.parse(
                    `${outConfigDir}/${entry_pt_out}`
                )
                compileFile(full_out_path, full_entry_path)
            }
        )
    } else {
        const outThemePath = zod.filePath.parse(themeRoot)
        const inSourceCodeDir = zod.filePath.parse(sourceCodeDir)
        if (!fs.existsSync(outThemePath)) {
            console.warn(
                'Theme Root does not exist! No files output! ::',
                outThemePath
            )
        }
        if (!fs.existsSync(inSourceCodeDir)) {
            console.warn(
                'Source Code Root does not exist! No files processed! ::',
                inSourceCodeDir
            )
        }
    }
}
const compileFile = async (out_path: string, file_path: string) => {
    if (fs.existsSync(file_path)) {
        const { default: getSchema } = await import(file_path)
        const testSectionSchema = getSchema
        node.exportJSONFile([{ data: testSectionSchema, filename: out_path }])
        console.log(
            'Vite: ShopifyThemeSchemaOptions: Success! File written to ',
            out_path
        )
    } else {
        console.warn(
            'Vite: ShopifyThemeSchemaOptions: Entry Point does not exist! No files output! ::',
            file_path
        )
    }
}
