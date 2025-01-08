import { HiRefresh } from 'react-icons/hi'
import { usePrompts } from '../../../hooks/usePrompts'
import { defaultPrompts } from '../../../config/prompts/default'
import FieldWrapper from '../Elements/FieldWrapper'
import QuickMenuCustomize from '../Elements/QuickMenuCustomize'
import SectionHeading from '../Elements/SectionHeading'

const PromptSettings = () => {
  const messages = {
    prompts: chrome.i18n.getMessage("Prompts"),
    customizePrompts: chrome.i18n.getMessage("CustomizePrompts"),
    descriptionCustomizePrompts: chrome.i18n.getMessage("descriptionCustomizePrompts"),
    restoreDefaultPrompts: chrome.i18n.getMessage("RestoreDefaultPrompts"),
    descriptionRestoreDefaultPrompts: chrome.i18n.getMessage("This will restore the default prompts. Be careful, this action cannot be undone. And any custom prompts you have added will be lost."),
    restore: chrome.i18n.getMessage("Restore"),
  }

  const [, setPrompts] = usePrompts()

  return (
    <div className="cdx-w-full cdx-flex-shrink-0 cdx-flex-1 cdx-rounded-md">
      <SectionHeading title={messages.prompts} />

      {/* =========================
            Customize Prompts
      ===========================*/}
      <FieldWrapper
        title={messages.customizePrompts}
        description={messages.descriptionCustomizePrompts}
      >
        <QuickMenuCustomize />
      </FieldWrapper>

      {/* =========================
          Restore Default Prompts
      ===========================*/}
      <FieldWrapper
        title={messages.restoreDefaultPrompts}
        description={messages.descriptionRestoreDefaultPrompts}
        row
      >
        <button
          type="button"
          className="btn cdx-bg-red-500 hover:cdx-bg-red-600"
          onClick={() => {
            setPrompts(defaultPrompts)
          }}
        >
          <HiRefresh /> {messages.restore}
        </button>
      </FieldWrapper>
    </div>
  )
}

export default PromptSettings
