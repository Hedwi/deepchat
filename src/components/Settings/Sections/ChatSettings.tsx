import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Mode } from '../../../config/settings'
import { useChatModels } from '../../../hooks/useChatModels'
import { useSettings } from '../../../hooks/useSettings'
import { capitalizeText } from '../../../lib/capitalizeText'
import { validateApiKey } from '../../../lib/validApiKey'
import FieldWrapper from '../Elements/FieldWrapper'
import SectionHeading from '../Elements/SectionHeading'

const ChatSettings = () => {
  const [settings, setSettings] = useSettings()
  const [showPassword, setShowPassword] = useState(false)
  const { models, setActiveChatModel } = useChatModels()
  const OpenAiApiKeyInputRef = React.useRef<HTMLInputElement>(null)
  const OpenAiBaseUrlInputRef = React.useRef<HTMLInputElement>(null)

  const messages = {
    quickMenu: chrome.i18n.getMessage("QuickMenu"),
    descriptionQuickMenu: chrome.i18n.getMessage("descriptionQuickMenu"),
    enableQuickMenu: chrome.i18n.getMessage("EnableQuickMenu"),
    descriptionEnableQuickMenu: chrome.i18n.getMessage("descriptionEnableQuickMenu"),
    excludeSites: chrome.i18n.getMessage("ExcludeSites"),
    descriptionExcludeSites: chrome.i18n.getMessage("descriptionExcludeSites"),
    chat: chrome.i18n.getMessage("Chat"),
    descriptionChat: chrome.i18n.getMessage("descriptionChat"),
    apiKey: chrome.i18n.getMessage("APIKey"),
    youcangetyourapikey: chrome.i18n.getMessage("YouCanGetYourAPIKey"),
    update: chrome.i18n.getMessage("Update"),
    baseUrl: chrome.i18n.getMessage("BaseURL"),
    enterbaseUrl: chrome.i18n.getMessage("EnterBaseURL"),
    enterplaceholder: chrome.i18n.getMessage("EnterPlaceholder"),
    model: chrome.i18n.getMessage("Model"),
    modelChoose: chrome.i18n.getMessage("ChooseTheModelYouWantToUse"),
    mode: chrome.i18n.getMessage("Mode"),
    modeTweak: chrome.i18n.getMessage("descriptionModeTweak"),

  }

  const chatSettings = settings.chat

  const handleOpenAiKeySubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()
    const apiKeyValue = OpenAiApiKeyInputRef.current?.value || ''
    const baseurlValue = OpenAiBaseUrlInputRef.current?.value || ''

    if (OpenAiApiKeyInputRef.current) {
      const isOpenAiKeyValid: boolean = await validateApiKey(
        apiKeyValue,
        baseurlValue,
      )
      if (isOpenAiKeyValid) {
        setSettings({
          ...settings,
          chat: {
            ...chatSettings,
            openAIKey: apiKeyValue,
            openAiBaseUrl: baseurlValue,
          },
        })
      }
      const inputStyles = isOpenAiKeyValid
        ? { classname: 'input-success', value: `✅  ${apiKeyValue}` }
        : { classname: 'input-failed', value: `❌  ${apiKeyValue}` }

      OpenAiApiKeyInputRef.current.classList.add(inputStyles.classname)
      OpenAiApiKeyInputRef.current.value = inputStyles.value
      setTimeout(() => {
        if (!OpenAiApiKeyInputRef.current) return
        OpenAiApiKeyInputRef.current?.classList.remove(inputStyles.classname)
        OpenAiApiKeyInputRef.current.value = apiKeyValue
      }, 2000)
    }

    if (OpenAiBaseUrlInputRef.current) {
      OpenAiBaseUrlInputRef.current.classList.add('input-success')
      OpenAiBaseUrlInputRef.current.value = `✅ ${baseurlValue}`
      setTimeout(() => {
        if (!OpenAiBaseUrlInputRef.current) return
        OpenAiBaseUrlInputRef.current?.classList.remove('input-success')
        OpenAiBaseUrlInputRef.current.value = baseurlValue
      }, 2000)
    }
  }

  return (
    <div className="cdx-w-full cdx-flex-shrink-0 cdx-rounded-md">
      <SectionHeading title={messages.chat} />
      <FieldWrapper
        title={messages.apiKey}
        description={messages.youcangetyourapikey}
        onSubmit={handleOpenAiKeySubmit}
      >
        <div className="cdx-flex cdx-gap-2 cdx-items-center">
          <div className="cdx-relative cdx-w-full">
            <input
              required
              ref={OpenAiApiKeyInputRef}
              name="openAiApiKey"
              placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              defaultValue={chatSettings.openAIKey || ''}
              type={showPassword ? 'text' : 'password'}
              className="input"
            />
            <button
              type="button"
              className="cdx-absolute cdx-right-4 cdx-top-1/2 cdx-transform cdx--translate-y-1/2 cdx-text-neutral-500 dark:cdx-text-neutral-200 cdx-bg-transparent cdx-outline-none cdx-cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={18} />
              ) : (
                <AiOutlineEye size={18} />
              )}
            </button>
          </div>
          <button type="submit" className="btn">
            {messages.update}
          </button>
        </div>
      </FieldWrapper>
      <FieldWrapper
        title={messages.baseUrl}
        description={messages.enterbaseUrl}
        onSubmit={handleOpenAiKeySubmit}
      >
        <div className="cdx-flex cdx-gap-2 cdx-items-center">
          <input
            ref={OpenAiBaseUrlInputRef}
            name="openAiBaseUrl"
            defaultValue={chatSettings.openAiBaseUrl || ''}
            placeholder={messages.enterplaceholder}
            className="input cdx-w-full"
          />
          <button type="submit" className="btn">
            {messages.update}
          </button>
        </div>
      </FieldWrapper>
      <FieldWrapper
        title={messages.model}
        description={messages.modelChoose}
        row={true}
      >
        <select
          value={chatSettings.model || ''}
          className="input cdx-w-44"
          onChange={(e) => setActiveChatModel(e.target.value)}
        >
          {models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.id}
            </option>
          ))}
        </select>
      </FieldWrapper>
      <FieldWrapper
        title={messages.mode}
        description={messages.modeTweak}
        row={true}
      >
        <select
          value={chatSettings.mode}
          onChange={(e) => {
            setSettings({
              ...settings,
              chat: {
                ...chatSettings,
                mode: e.target.value as unknown as Mode,
              },
            })
          }}
          className="input cdx-w-36"
        >
          {Object.entries(Mode)
            .filter(([, v]) => !Number.isNaN(Number(v)))
            .map(([key, value]) => (
              <option key={key} value={value}>
                {capitalizeText(key.replace('_', ' ').toLowerCase())}
              </option>
            ))}
        </select>
      </FieldWrapper>
    </div>
  )
}

export default ChatSettings
