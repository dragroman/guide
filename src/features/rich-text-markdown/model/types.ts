import { Control } from "react-hook-form"

export interface MarkdownFieldProps {
  control: Control<any>
  name: string
  label?: string
  description?: string
  placeholder?: string
  className?: string
  rows?: number
}

export interface MarkdownToolbarButton {
  icon: React.ComponentType<{ className?: string }>
  label: string
  action: () => void
  shortcut?: string
}

export interface MarkdownEditorMode {
  mode: "edit" | "preview"
  setMode: (mode: "edit" | "preview") => void
}
