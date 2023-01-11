import {
    GlobalSettingsSection,
    parseThemeSettingSection,
    Setting,
    SettingsMapped,
    parseSettingsGroup,
} from '@snailicide/g-shopify-library'
type GlobalColorSettingsGroup = {
    //todo: look at why header type doesnt matter,
    /* * Colors * */
    color_header: Setting<'paragraph'>
    colors_solid_button_labels: Setting<'color'>

    /* * Accent Colors * */
    colors_accent_1: Setting<'color'>
    gradient_accent_1: Setting<'color_background'>
    colors_accent_2: Setting<'color'>
    gradient_accent_2: Setting<'color_background'>

    /* * Primary Colors * */
    color_header2: Setting<'header'>

    colors_text: Setting<'color'>
    colors_outline_button_labels: Setting<'color'>

    colors_background_1: Setting<'color'>
    gradient_background_1: Setting<'color_background'>

    colors_background_2: Setting<'color'>
    gradient_background_2: Setting<'color_background'>
}
/*
"header__1": {
    "content": "Primary colors"
},
"header__2": {
    "content": "Secondary colors"
},
*/

type color_accent = {
    colors_accent: Setting<'color'>
    gradient_accent: Setting<'color_background'>
}
//Merge<SuffixProperties<color_accent,"_1">,SuffixProperties<color_accent,"_2">>
//as `${Key extends string
//         ? Key
//         : never}${Suffix}`
type MergedGroup<SuffixKey extends string> = { [K in SuffixKey]: string } //SuffixProperties<BlobalColorTest,K> };
//type MergedGrou2<SuffixKey extends string> =SettingsMapped<Merge<SuffixProperties<BlobalColorTest,"_1">,SuffixProperties<BlobalColorTest,"_2">>>

const getSchema = () => {
    const color_setting: SettingsMapped<GlobalColorSettingsGroup> = [
        {
            type: 'header',
            content: 't:settings_schema.colors.settings.header__1.content',
        },
        {
            type: 'color',
            id: 'colors_solid_button_labels',
            default: '#FFFFFF',
            label: 't:settings_schema.colors.settings.colors_solid_button_labels.label',
            info: 't:settings_schema.colors.settings.colors_solid_button_labels.info',
        },
        {
            type: 'color',
            id: 'colors_accent_1',
            default: '#121212',
            label: 't:settings_schema.colors.settings.colors_accent_1.label',
            info: 't:settings_schema.colors.settings.colors_accent_1.info',
        },
        {
            id: 'gradient_accent_1',
            type: 'color_background',
            label: 't:settings_schema.colors.settings.gradient_accent_1.label',
        },
        {
            type: 'color',
            id: 'colors_accent_2',
            default: '#334FB4',
            label: 't:settings_schema.colors.settings.colors_accent_2.label',
        },
        {
            id: 'gradient_accent_2',
            type: 'color_background',
            label: 't:settings_schema.colors.settings.gradient_accent_2.label',
        },
        {
            type: 'header',
            content: 't:settings_schema.colors.settings.header__2.content',
        },
        {
            type: 'color',
            id: 'colors_text',
            default: '#121212',
            label: 't:settings_schema.colors.settings.colors_text.label',
            info: 't:settings_schema.colors.settings.colors_text.info',
        },
        {
            type: 'color',
            id: 'colors_outline_button_labels',
            default: '#121212',
            label: 't:settings_schema.colors.settings.colors_outline_button_labels.label',
            info: 't:settings_schema.colors.settings.colors_outline_button_labels.info',
        },
        {
            type: 'color',
            id: 'colors_background_1',
            default: '#FFFFFF',
            label: 't:settings_schema.colors.settings.colors_background_1.label',
        },
        {
            id: 'gradient_background_1',
            type: 'color_background',
            label: 't:settings_schema.colors.settings.gradient_background_1.label',
        },
        {
            type: 'color',
            id: 'colors_background_2',
            default: '#F3F3F3',
            label: 't:settings_schema.colors.settings.colors_background_2.label',
        },
        {
            id: 'gradient_background_2',
            type: 'color_background',
            label: 't:settings_schema.colors.settings.gradient_background_2.label',
        },
    ]
    const colors_group = parseThemeSettingSection({
        name: 't:settings_schema.colors.name',
        settings: color_setting,
    })
    const result = colors_group
    console.log('THE RESULT IS ', result)
    if (result !== undefined) {
        return result
    } else {
        console.log('colors_group COMPILE ERROR!!')
        return {}
    }
}
export default getSchema()
