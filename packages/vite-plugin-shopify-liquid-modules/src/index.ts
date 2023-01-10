import { Plugin, ResolvedConfig } from 'vite'
import {
    ShopifyLiquidModulesOptions,
    ResolvedShopifyLiquidModulesOptions,
    resolveOptions,
} from './options'
import { getJSONString, node, tg, zod } from '@snailicide/g-library'
import path from 'path'
import fs from 'fs'
import * as console from 'console'
export default function shopifyModules(
    options: ShopifyLiquidModulesOptions = {}
): Plugin {
    const resolvedOptions = resolveOptions(options)
    let _config: ResolvedConfig
    if (tg.isNotUndefined(resolvedOptions)) processModules(resolvedOptions)

    return {
        name: 'vite-plugin-shopify-liquid-modules',
    }
}
export type {
    ShopifyLiquidModulesOptions,
    ResolvedShopifyLiquidModulesOptions,
    resolveOptions,
} from './options'

const processModules = ({
    modulesDir,
    themeRoot,
    sections,
    snippets,
}: ResolvedShopifyLiquidModulesOptions): void => {
    if (
        zod.filePath.safeParse(themeRoot).success &&
        fs.existsSync(themeRoot) &&
        zod.filePath.safeParse(modulesDir).success &&
        fs.existsSync(modulesDir)
    ) {
        const outThemePath = zod.filePath.parse(themeRoot)
        const outSectionsDir = path.resolve(outThemePath, './sections')
        const outSnippetsDir = path.resolve(outThemePath, './snippets')
        const inModulesDir = zod.filePath.parse(modulesDir)
        if (sections.copy) {
            ///get list of potential modules with section files.
            const sectionFileArr = node.getFilePathArr(
                `${inModulesDir}/**/${sections.file_name}.liquid`
            )
            sectionFileArr.forEach((section_file) => {
                const true_module_name = section_file.parentdirname
                const module_path = zod.filePath.parse(
                    `${inModulesDir}/${true_module_name}`
                )
                //LOAD SECTION FILE TO CHECK
                const section_file_content = fs.readFileSync(
                    section_file.absolute,
                    'utf8'
                )
                //  todo:  %dir%
                const result_path = `${outSectionsDir}/${sections.prefix}${true_module_name}.liquid`
                const newSection = replaceSchemaTags(
                    section_file_content,
                    module_path,
                    result_path
                )
            })
        }
        if (snippets.copy) {
            const snippetFileArr = node
                .getFilePathArr(
                    `${inModulesDir}/**/${snippets.file_name}.liquid`
                )
                .filter((snippet_file) => {
                    return snippet_file.filename !== sections.file_name
                })
            snippetFileArr.forEach((file) => {
                const result_path = path.resolve(
                    `${outSnippetsDir}/${snippets.prefix}${file.basename}`
                )
                const the_snippet_file = fs.readFileSync(file.absolute, 'utf8')
                fs.writeFileSync(result_path, the_snippet_file)
            })
        }
    } else {
        const outThemePath = zod.filePath.parse(themeRoot)
        const inModulesDir = zod.filePath.parse(modulesDir)
        if (!fs.existsSync(outThemePath)) {
            console.warn(
                'Theme Root does not exist! No files output! ::',
                outThemePath
            )
        }
        if (!fs.existsSync(inModulesDir)) {
            console.warn(
                'Module Root does not exist! No files output! ::',
                inModulesDir
            )
        }
    }
}

/**
 * Thanks and credit for this function goes to author, i cannot regex this well.
 *
 * @author David Warrington
 * @function replaceSchemaTags
 * @see {@link https://github.com/davidwarrington/liquid-schema-plugin |Liquid Schema Plugin}
 * @see {@link https://github.com/davidwarrington/liquid-schema-plugin/blob/master/plugin/index.js#L105 | source function}
 */
const replaceSchemaTags = async (
    fileContents: string,
    module_path: string,
    result_path: string
) => {
    const replaceableSchemaRegex =
        /{%-?\s*schema\s*('.*'|".*")\s*-?%}(([\s\S]*){%-?\s*endschema\s*-?%})?/
    const fileContainsReplaceableSchemaRegex =
        replaceableSchemaRegex.test(fileContents)
    if (!fileContainsReplaceableSchemaRegex) {
        fs.writeFileSync(path.resolve(result_path), fileContents)
        return fileContents
    }
    const result = fileContents.match(replaceableSchemaRegex)
    if (result !== null) {
        const [match, importableFilePath, , contents] = result
        if (tg.isNotUndefined(importableFilePath)) {
            const _importableFilePath = importableFilePath.replace(
                /(^('|"))|(('|")$)/g,
                ''
            )
            if (
                fs.existsSync(
                    path.resolve(`${module_path}/${_importableFilePath}`)
                )
            ) {
                const { default: getSchema } = await import(
                    path.resolve(`${module_path}/${_importableFilePath}`)
                )
                const endfile = fileContents.replace(
                    replaceableSchemaRegex,
                    `{% schema %}\n${getJSONString(getSchema)}\n{% endschema %}`
                )
                fs.writeFileSync(path.resolve(result_path), endfile)
                return endfile
            }
        }
    }
    return
}
