import { z } from 'zod'
import { zod } from '@snailicide/g-library'
import { parseValidatorFactory, setting_schema } from '../settings/index.js'

const ELEMENT_TAGS = [
    'div',
    'article',
    'aside',
    'footer',
    'header',
    'section',
] as const
const elementTags = z.enum(ELEMENT_TAGS)
export type ElementTags = z.infer<typeof elementTags>

const PAGE_TYPES = [
    '404',
    'article',
    'blog',
    'cart',
    'collection',
    'list-collections',
    'customers/account',
    'customers/activate_account',
    'customers/addresses',
    'customers/login',
    'customers/order',
    'customers/register',
    'customers/reset_password',
    'gift_card',
    'index',
    'page',
    'password',
    'policy',
    'product',
    'search',
] as const

const pageTypes = z.enum(PAGE_TYPES)
export type PageTypes = z.infer<typeof pageTypes>

const block_schema = z.object({
    type: z.string(), //change to literal?
    name: z.string().optional(), ///dont know if optional
    limit: zod.number().int().optional(), //todo:might be wrong
    settings: setting_schema,
})
export type BlockSchema = z.infer<typeof block_schema>
const section_schema = z.object({
    name: z.string(),
    tag: elementTags.optional(),
    class: z.string().optional(), //todo: validate??
    limit: zod.optionalDefault(zod.number().int(), 3), //todo:might be wrong
    templates: z.array(pageTypes).optional(),

    settings: setting_schema.optional(),
    blocks: z.array(block_schema).optional(),
})
export type SectionSchema = z.infer<typeof section_schema>

const getSectionSettingsFactory =
    <T extends typeof section_schema | typeof block_schema>(schema: T) =>
    (data: unknown): z.infer<T> | undefined => {
        if (parseValidatorFactory(schema)(data)) {
            return schema.parse(data)
        }
        return undefined
    }

export const parseSectionSchema = getSectionSettingsFactory(section_schema)
export const parseBlockSchema = getSectionSettingsFactory(block_schema)
