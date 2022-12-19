import {
    GlobalSettingsGroup,
    parseThemeSettingGroup,
} from '@snailicide/g-shopify-library'

const getSchema = () => {
    const colors_group: GlobalSettingsGroup = {
        name: 't:settings_schema.colors.name',
        settings: [
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
        ],
    }
    const result = parseThemeSettingGroup(colors_group)
    if (result !== undefined) {
        return result
    } else {
        console.log('colors_group COMPILE ERROR!!')
        return {}
    }
}
export default getSchema()
