import * as Dialog from '@radix-ui/react-dialog'
import { useRef, useState } from 'react'
import { HiDocumentText, HiFolder } from 'react-icons/hi'
import TextareaAutosize from 'react-textarea-autosize'
import { type Prompt, usePrompts } from '../../../hooks/usePrompts'
import DialogPortal from '../../Layout/DialogPortal'
import { getUUID } from '../../../lib/getUUID'

export const AddItemButton = ({ isCategory }: { isCategory: boolean }) => {
  const [open, setOpen] = useState(false)
  const [prompts, setPrompts] = usePrompts()
  const formRef = useRef<HTMLFormElement>(null)
  const messages = {
    add: chrome.i18n.getMessage("Add"),
    addCategory: chrome.i18n.getMessage("AddCategory"),
    addPrompt: chrome.i18n.getMessage("AddPrompt"),
    name: chrome.i18n.getMessage("Name"),
    prompt: chrome.i18n.getMessage("Prompt"),
    addNewCategory: chrome.i18n.getMessage("AddNewCategory"),
    addNewPrompt: chrome.i18n.getMessage("AddNewPrompt"),
    save: chrome.i18n.getMessage("Save"),
    cancel: chrome.i18n.getMessage("Cancel"),
    enterName: chrome.i18n.getMessage("EnterName"),
    enterPrompt: chrome.i18n.getMessage("EnterPrompt"),
  }

  const handleAdd = () => {
    if (!formRef.current || !formRef.current.reportValidity()) return

    const formData = new FormData(formRef.current)

    const newName = formData.get('promptName') as string
    const newPrompt = formData.get('prompt') as string

    const item = {
      id: getUUID(),
      name: newName,
      prompt: isCategory ? undefined : newPrompt,
      children: isCategory ? [] : undefined,
    } as Prompt

    const newPrompts = [...prompts, item]
    setPrompts([])
    setPrompts(newPrompts)

    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        {isCategory ? (
          <button
            className="btn !cdx-py-1 cdx-text-sm dark:cdx-bg-neutral-600 cdx-bg-neutral-400 hover:cdx-bg-neutral-500 hover:dark:cdx-bg-neutral-700"
            type="button"
          >
            <HiFolder />
            <span>{messages.addCategory}</span>
          </button>
        ) : (
          <button className="btn !cdx-py-1 cdx-text-sm" type="button">
            <HiDocumentText />
            <span>{messages.addPrompt}</span>
          </button>
        )}
      </Dialog.Trigger>
      <DialogPortal
        title={isCategory ? messages.addNewCategory : messages.addNewPrompt}
        primaryAction={handleAdd}
        secondaryAction={() => setOpen(false)}
        primaryText={messages.save}
        secondaryText={messages.cancel}
      >
        <form className="cdx-flex cdx-flex-col cdx-gap-2" ref={formRef}>
          <label htmlFor="promptName">{messages.name}</label>
          <input
            name="promptName"
            className="input"
            type="text"
            required
            placeholder={messages.enterName}
          />
          {!isCategory && (
            <>
              <label htmlFor="prompt">Prompt</label>
              <TextareaAutosize
                name="prompt"
                className="input"
                required
                placeholder={messages.enterPrompt}
                minRows={2}
                maxRows={15}
              />
            </>
          )}
        </form>
      </DialogPortal>
    </Dialog.Root>
  )
}
