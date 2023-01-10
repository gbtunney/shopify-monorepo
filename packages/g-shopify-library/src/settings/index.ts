import { z } from 'zod'
import type { Merge } from 'type-fest'
import { BasicSettings } from './basic.js'
import { SpecializedSettings } from './specialized.js'
import { ShopifySettings } from './shopify.js'
import { SidebarSettings } from './sidebar.js'
export const SettingSchemaMap = {
    ...BasicSettings,
    ...SpecializedSettings,
    ...ShopifySettings,
    ...SidebarSettings,
}
const baseSchema = z.object({
    label: z.string().optional(), ///todo: not sure if for shopify
    info: z.string().optional(),
    id: z.string(),
})
export type SettingTypes = keyof typeof SettingSchemaMap
export type AllSettingTypes = SettingTypes

export type Setting<
    Type extends keyof typeof SettingSchemaMap = keyof typeof SettingSchemaMap,
    id extends string = string
> = Type extends 'paragraph' | 'header'
    ? z.infer<(typeof SettingSchemaMap)[Type]>
    : Merge<
          z.infer<(typeof SettingSchemaMap)[Type]>,
          id extends string
              ? Merge<z.infer<typeof baseSchema>, { id: id }>
              : z.infer<typeof baseSchema>
      >

export type SettingsMapped<T extends Record<string, Setting>> = Array<
    {
        [Key in keyof T]: Key extends string
            ? Setting<T[Key]['type'], Key>
            : never
    }[keyof T]
>
export const single_setting_schema = z.union([
    z.intersection(
        z.discriminatedUnion('type', [
            BasicSettings.text,
            BasicSettings.textarea,
            BasicSettings.number,
            BasicSettings.radio,
            BasicSettings.checkbox,
            BasicSettings.select,
            BasicSettings.range,
            ...Object.values(SpecializedSettings),
            ...Object.values(ShopifySettings),
        ]),
        baseSchema
    ),
    z.discriminatedUnion('type', [
        SidebarSettings.paragraph,
        SidebarSettings.header,
    ]),
])
export const setting_schema = z.array(single_setting_schema)

export type SingleSetting = z.infer<typeof single_setting_schema>
export type Settings = z.infer<typeof setting_schema>

export const parseValidatorFactory =
    <T extends z.ZodTypeAny>(schema: T) =>
    (data: unknown): data is z.infer<T> => {
        return schema.safeParse(data).success
    }
const getSettingsFactory =
    <T extends typeof setting_schema | typeof single_setting_schema>(
        schema: T
    ) =>
    (data: unknown): z.infer<T> | undefined => {
        if (parseValidatorFactory(schema)(data)) {
            return schema.parse(data)
        }
        return undefined
    }

export const parseSettings = getSettingsFactory(setting_schema)
export const parseSingleSetting = getSettingsFactory(single_setting_schema)
export const parseSetting = parseSingleSetting

export {}
