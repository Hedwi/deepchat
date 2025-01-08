import endent from 'endent'

const messages = {
  systemPrompt: chrome.i18n.getMessage("systemPrompt"),
  originalText: chrome.i18n.getMessage('originalText'),
  instructions: chrome.i18n.getMessage('instructions'),
}

export const SYSTEM_PROMPT = messages.systemPrompt

export const getTransformedPrompt = (prompt: string, selectedText: string) => {
  return endent`
    #### ${messages.instructions}:
    ${prompt}
    #### ${messages.originalText}:
    ${selectedText}
  `
}
