// hooks/useCreateNode.ts
import { useState } from "react"

interface CreateNodeOptions {
  nodeType: "spot"
  data: Record<string, any>
}

interface CreateNodeResponse {
  success: boolean
  node?: {
    id: string
    title: string
    type: string
  }
  error?: string
}

export const useCreateNode = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createNode = async ({
    nodeType,
    data,
  }: CreateNodeOptions): Promise<CreateNodeResponse | null> => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/nodes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodeType, data }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Ошибка при создании узла")
      }

      return result
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Неизвестная ошибка"
      setError(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { createNode, loading, error }
}
