import * as Switch from '@radix-ui/react-switch'
import type React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { useSettings } from '../../../hooks/useSettings'
import FieldWrapper from '../Elements/FieldWrapper'
import SectionHeading from '../Elements/SectionHeading'

const QuickMenuSettings = () => {
  const [settings, setSettings] = useSettings()

  const messages = {
    quickMenu: chrome.i18n.getMessage("QuickMenu"),
    descriptionQuickMenu: chrome.i18n.getMessage("descriptionQuickMenu"),
    enableQuickMenu: chrome.i18n.getMessage("EnableQuickMenu"),
    descriptionEnableQuickMenu: chrome.i18n.getMessage("descriptionEnableQuickMenu"),
    excludeSites: chrome.i18n.getMessage("ExcludeSites"),
    descriptionExcludeSites: chrome.i18n.getMessage("descriptionExcludeSites"),
    sitesExample: chrome.i18n.getMessage("sitesExample"),
  }

  const quickMenuSettings = settings.quickMenu

  const handleEnableQuickMenuChange = (enabled: boolean) => {
    setSettings({
      ...settings,
      quickMenu: {
        ...quickMenuSettings,
        enabled: enabled,
      },
    })
  }

  const handleExcludeSitesChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const sites = event.target.value
      .split(',')
      .map((site) => site.trim())
      .filter(Boolean)
    setSettings({
      ...settings,
      quickMenu: {
        ...quickMenuSettings,
        excludedSites: sites,
      },
    })
  }

  return (
    <div className="cdx-w-full cdx-flex-shrink-0 cdx-rounded-md">
      <SectionHeading title={messages.quickMenu} />

      {/* =========================
        Enable Visible Quick Menu
      ===========================*/}
      <FieldWrapper
        title={messages.enableQuickMenu}
        description={messages.descriptionEnableQuickMenu}
        row={true}
      >
        <Switch.Root
          checked={quickMenuSettings.enabled}
          onCheckedChange={handleEnableQuickMenuChange}
          className="cdx-w-[42px] cdx-h-[25px] cdx-bg-neutral-500 cdx-rounded-full cdx-relative data-[state=checked]:cdx-bg-blue-500 cdx-outline-none cdx-cursor-default"
        >
          <Switch.Thumb className="cdx-block cdx-w-[21px] cdx-h-[21px] cdx-bg-white cdx-rounded-full cdx-transition-transform cdx-duration-100 cdx-translate-x-0.5 cdx-will-change-transform data-[state=checked]:cdx-translate-x-[19px]" />
        </Switch.Root>
      </FieldWrapper>

      {/* =========================
              Exclude Sites
      ===========================*/}
      <FieldWrapper
        title={messages.excludeSites}
        description={messages.descriptionExcludeSites}
      >
        <TextareaAutosize
          className="input"
          placeholder={messages.sitesExample}
          minRows={2}
          value={quickMenuSettings.excludedSites.join(', ')}
          onChange={handleExcludeSitesChange}
        />
      </FieldWrapper>
    </div>
  )
}

export default QuickMenuSettings
