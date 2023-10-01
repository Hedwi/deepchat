import { AvailableModels, Mode } from '../config/settings'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { useCurrentChat, ChatRole } from './useCurrentChat'
import { useMemo } from 'react'
import { AIMessage, HumanMessage, SystemMessage } from 'langchain/schema'
import { useState } from 'react'
import { useChatHistory } from './useChatHistory'

interface UseChatCompletionProps {
  model: AvailableModels
  apiKey: string
  mode: Mode
  systemPrompt: string
}

export const useChatCompletion = ({
  model,
  apiKey,
  mode,
  systemPrompt,
}: UseChatCompletionProps) => {
  const { currentChatId } = useChatHistory()

  const {
    messages,
    updateAssistantMessage,
    addNewMessage,
    updateStoredMessages,
    clearMessages,
  } = useCurrentChat(currentChatId)
  const [generating, setGenerating] = useState(false)

  const controller = new AbortController()

  const chat = useMemo(
    () =>
      new ChatOpenAI({
        streaming: true,
        openAIApiKey: apiKey,
        modelName: model,
        temperature: Number(mode),
      }),
    [],
  )

  const submitQuery = async (query: string) => {
    addNewMessage(ChatRole.USER, query)
    const previousMessages = messages.map((msg) => {
      switch (msg.role) {
        case ChatRole.ASSISTANT:
          return new AIMessage(msg.content)
        case ChatRole.SYSTEM:
          return new SystemMessage(msg.content)
        case ChatRole.USER:
          return new HumanMessage(msg.content)
      }
    })
    setGenerating(true)
    const response = await chat.call(
      [
        new SystemMessage(systemPrompt),
        ...previousMessages,
        new HumanMessage(query),
      ],
      {
        signal: controller.signal,
        callbacks: [
          {
            handleLLMNewToken: updateAssistantMessage,
          },
        ],
      },
    )
    setGenerating(false)
    updateStoredMessages()
    return response.content
  }

  const cancelRequest = () => {
    controller.abort()
    updateStoredMessages()
    setGenerating(false)
  }

  return { messages, submitQuery, generating, cancelRequest, clearMessages }
}
