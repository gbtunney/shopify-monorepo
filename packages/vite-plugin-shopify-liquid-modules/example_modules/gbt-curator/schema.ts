import {
    SectionSchema,
    parseSectionSchema,
} from '@snailicide/g-shopify-library'
import curator_settings from './settings.js'

export const getSchema = () => {
    const _settings = curator_settings

    const schema: SectionSchema = {
        name: 'Curator IO',
        tag: 'section',
        settings: _settings,
        /* presets: [
            {
                name: 'gbt-curator-io',
            },
        ],*/
    }
    const result = parseSectionSchema(schema)

    return {
        ...schema,
        presets: [
            {
                name: 'gbt-curator-io',
            },
        ],
    }
}
export default getSchema()
