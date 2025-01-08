import type React from 'react'
import SectionHeading from '../Elements/SectionHeading'
import FieldWrapper from '../Elements/FieldWrapper'
import { useSettings } from '../../../hooks/useSettings'
import { ThemeOptions } from '../../../config/settings'
import * as Switch from '@radix-ui/react-switch'
import { capitalizeText } from '../../../lib/capitalizeText'

const GeneralSettings = () => {
  const [settings, setSettings] = useSettings()
  const generalSettings = settings.general
  const messages = {
    generalSettings: chrome.i18n.getMessage("GeneralSettings"),
    theme: chrome.i18n.getMessage("Theme"),
    descriptionTheme: chrome.i18n.getMessage("descriptionTheme"),
    webpageContext: chrome.i18n.getMessage("WebpageContext"),
    descriptionWebpageContext: chrome.i18n.getMessage("descriptionWebpageContext"),
    light: chrome.i18n.getMessage("Light"),
    dark: chrome.i18n.getMessage("Dark"),
    system: chrome.i18n.getMessage("System"),
  }


  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setSettings({
      ...settings,
      general: {
        ...generalSettings,
        theme: value as ThemeOptions,
      },
    })
  }

  return (
    <div>
      <SectionHeading title={messages.generalSettings} />

      <FieldWrapper
        title={messages.theme}
        description={messages.descriptionTheme}
        row
      >
        <select
          value={generalSettings?.theme || ThemeOptions.SYSTEM}
          className="input cdx-w-44"
          onChange={handleThemeChange}
        >
          {Object.values(ThemeOptions).map((theme) => (
            <option key={theme} value={theme}>
              {messages[theme]}
            </option>
          ))}
        </select>
      </FieldWrapper>
      <FieldWrapper
        title={messages.webpageContext}
        description={messages.descriptionWebpageContext}
        row
      >
        <Switch.Root
          checked={generalSettings.webpageContext}
          onCheckedChange={(value) =>
            setSettings({
              ...settings,
              general: {
                ...generalSettings,
                webpageContext: value,
              },
            })
          }
          className="cdx-w-[42px] cdx-h-[25px] cdx-bg-neutral-500 cdx-rounded-full cdx-relative data-[state=checked]:cdx-bg-blue-500 cdx-outline-none cdx-cursor-default"
        >
          <Switch.Thumb className="cdx-block cdx-w-[21px] cdx-h-[21px] cdx-bg-white cdx-rounded-full cdx-transition-transform cdx-duration-100 cdx-translate-x-0.5 cdx-will-change-transform data-[state=checked]:cdx-translate-x-[19px]" />
        </Switch.Root>
      </FieldWrapper>
    </div>
  )
}

export default GeneralSettings
