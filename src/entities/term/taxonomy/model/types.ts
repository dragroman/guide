export interface TaxonomyTerm {
  id: string
  name: string
  path?: string
  description?: string
  weight?: number
  changed?: string
  drupal_internal__tid?: number
}

export interface TaxonomyApiResponse {
  data: TaxonomyTerm[]
  meta?: {
    total: number
    page: number
    limit: number
  }
}
