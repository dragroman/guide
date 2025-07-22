import { useState, useCallback } from "react"

export const useMarkdownEditor = () => {
  const [textareaRef, setTextareaRef] = useState<HTMLTextAreaElement | null>(
    null
  )

  const insertTextAtCursor = useCallback(
    (
      value: string,
      setValue: (value: string) => void,
      before: string,
      after: string = "",
      placeholder: string = ""
    ) => {
      if (!textareaRef) return

      const start = textareaRef.selectionStart
      const end = textareaRef.selectionEnd
      const selectedText = value.substring(start, end)
      const textToInsert = selectedText || placeholder
      const newText =
        value.substring(0, start) +
        before +
        textToInsert +
        after +
        value.substring(end)

      setValue(newText)

      setTimeout(() => {
        const newCursorPos =
          start + before.length + textToInsert.length + after.length
        textareaRef.setSelectionRange(newCursorPos, newCursorPos)
        textareaRef.focus()
      }, 0)
    },
    [textareaRef]
  )

  const insertAtBeginningOfLine = useCallback(
    (value: string, setValue: (value: string) => void, prefix: string) => {
      if (!textareaRef) return

      const start = textareaRef.selectionStart
      const lines = value.split("\n")
      let currentLine = 0
      let charCount = 0

      for (let i = 0; i < lines.length; i++) {
        if (charCount + lines[i].length >= start) {
          currentLine = i
          break
        }
        charCount += lines[i].length + 1
      }

      lines[currentLine] = prefix + lines[currentLine]
      const newText = lines.join("\n")

      setValue(newText)

      setTimeout(() => {
        const newCursorPos = start + prefix.length
        textareaRef.setSelectionRange(newCursorPos, newCursorPos)
        textareaRef.focus()
      }, 0)
    },
    [textareaRef]
  )

  return {
    textareaRef,
    setTextareaRef,
    insertTextAtCursor,
    insertAtBeginningOfLine,
  }
}
