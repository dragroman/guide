"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Импортируем компоненты для выбора терминов таксономии
import TaxonomySelect from "@/components/drupal/TaxonomySelect"
import TaxonomyMultiSelect from "@/components/drupal/TaxonomyMultiSelect"
import { useTaxonomyTermsApi } from "@/hooks/useTaxonomyTermsApi"

export default function TaxonomySelectExample() {
  // Состояние для базового компонента
  const [selectedTag, setSelectedTag] = useState("")
  const [selectedTagName, setSelectedTagName] = useState("")

  // Состояние для компонента с API
  const [selectedApiTag, setSelectedApiTag] = useState("")

  // Состояние для мульти-выбора
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedTagsData, setSelectedTagsData] = useState<
    Array<{ id: string; name: string }>
  >([])

  // Используем хук для получения терминов
  const { terms, selectedTerm, isLoading, error, searchTerms } =
    useTaxonomyTermsApi({
      vocabularyId: "location",
      initialValue: selectedApiTag,
      enabled: true,
    })

  // Обработчики для разных компонентов
  const handleTagChange = (id: string, name: string) => {
    setSelectedTag(id)
    setSelectedTagName(name)
  }

  const handleApiTagChange = (id: string, name: string) => {
    setSelectedApiTag(id)
  }

  const handleMultiTagChange = (ids: string[]) => {
    setSelectedTags(ids)
  }

  const handleTagsDataChange = (terms: Array<{ id: string; name: string }>) => {
    setSelectedTagsData(terms)
  }

  return (
    <div className="container mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-bold mb-4">
        Компоненты выбора терминов таксономии
      </h1>

      <Tabs defaultValue="basic">
        <TabsList className="mb-4">
          <TabsTrigger value="basic">Базовый компонент</TabsTrigger>
          <TabsTrigger value="multi">Мульти-выбор</TabsTrigger>
          <TabsTrigger value="hook">С использованием хука</TabsTrigger>
        </TabsList>

        {/* Базовый компонент */}
        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>TaxonomySelect</CardTitle>
              <CardDescription>
                Базовый компонент для выбора одного термина таксономии
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <TaxonomySelect
                value={selectedTag}
                onChange={handleTagChange}
                vocabularyId="location"
                placeholder="Выберите категорию..."
              />

              {selectedTag && (
                <div className="mt-4 p-4 bg-muted rounded-md">
                  <p className="text-sm font-medium">Выбрана категория:</p>
                  <div className="flex mt-2">
                    <Badge variant="outline" className="mr-2">
                      {selectedTagName}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    ID: {selectedTag}
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground border-t p-4">
              <p>
                Загружает все термины при монтировании и фильтрует их на стороне
                клиента. Подходит для небольших словарей.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Мульти-выбор */}
        <TabsContent value="multi">
          <Card>
            <CardHeader>
              <CardTitle>TaxonomyMultiSelect</CardTitle>
              <CardDescription>
                Компонент для выбора нескольких терминов таксономии
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <TaxonomyMultiSelect
                value={selectedTags}
                onChange={handleMultiTagChange}
                onTermsChange={handleTagsDataChange}
                vocabularyId="location"
                placeholder="Добавить теги..."
                badgeVariant="secondary"
                maxItems={5}
              />

              {selectedTags.length > 0 && (
                <div className="mt-4 p-4 bg-muted rounded-md">
                  <p className="text-sm font-medium">
                    Выбрано тегов: {selectedTags.length}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedTagsData.map((tag) => (
                      <Badge key={tag.id} variant="outline">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    IDs: {selectedTags.join(", ")}
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground border-t p-4">
              <p>
                Позволяет выбрать несколько терминов и отображает их в виде
                бейджей. Поддерживает ограничение на максимальное количество
                выбранных элементов.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* С использованием хука */}
        <TabsContent value="hook">
          <Card>
            <CardHeader>
              <CardTitle>С использованием хука useTaxonomyTermsApi</CardTitle>
              <CardDescription>
                Пример использования хука для создания кастомного интерфейса
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Поиск тегов..."
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  onChange={(e) => searchTerms(e.target.value)}
                />

                <Button
                  variant="outline"
                  onClick={() => searchTerms("")}
                  className="whitespace-nowrap"
                >
                  Очистить
                </Button>
              </div>

              {isLoading ? (
                <div className="py-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Загрузка терминов...
                  </p>
                </div>
              ) : error ? (
                <div className="py-4 text-center">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {terms.slice(0, 20).map((term) => (
                    <Badge
                      key={term.id}
                      variant={
                        selectedApiTag === term.id ? "default" : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() => handleApiTagChange(term.id, term.name)}
                    >
                      {term.name}
                      {term.description && (
                        <span className="sr-only">{term.description}</span>
                      )}
                    </Badge>
                  ))}

                  {terms.length > 20 && (
                    <Badge variant="secondary">
                      И еще {terms.length - 20}...
                    </Badge>
                  )}
                </div>
              )}

              {selectedTerm && (
                <div className="mt-6 p-4 bg-muted rounded-md">
                  <p className="text-sm font-medium">Выбранный термин:</p>
                  <h3 className="text-lg font-bold mt-1">
                    {selectedTerm.name}
                  </h3>
                  {selectedTerm.description && (
                    <p className="text-sm mt-2">{selectedTerm.description}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    ID: {selectedTerm.id}
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground border-t p-4">
              <p>
                Использует хук <code>useTaxonomyTermsApi</code> для создания
                кастомного интерфейса. Позволяет контролировать все аспекты
                загрузки данных и отображения.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Пример интеграции с формой</CardTitle>
          <CardDescription>
            Использование компонентов выбора терминов таксономии в форме
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2">
                Категория публикации
              </label>
              <TaxonomySelect
                value={selectedTag}
                onChange={handleTagChange}
                vocabularyId="location"
                placeholder="Выберите категорию..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Теги публикации
              </label>
              <TaxonomyMultiSelect
                value={selectedTags}
                onChange={handleMultiTagChange}
                vocabularyId="location"
                placeholder="Добавить теги..."
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto">Сохранить</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
