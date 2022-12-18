import { LocalSchema, defineSectionSchema } from '@snailicide/g-shopify-library'
import type { CuratorGroupSettings } from './settings.js'
import curator_settings from './settings.js'

export const getSchema = () => {
    const _settings = curator_settings

    const schema: LocalSchema.Schema<CuratorGroupSettings> = {
        name: 'Curator IO',
        tag: 'section',
        settings: _settings,
        presets: [
            {
                name: 'gbt-curator-io',
            },
        ],
    }
    return defineSectionSchema(schema)
}
export default getSchema()
