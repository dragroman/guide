# Инструкция по созданию новых шагов формы

## Краткое руководство

1. **Создайте файл компонента** в папке `/src/components/application/steps/`
2. **Обновите константы** в `/src/components/application/constants.ts`
3. **Добавьте новый шаг** в функцию `renderCurrentStep()` в `/src/components/application/index.tsx`
4. **Создайте валидацию** в `/src/components/application/utils/validationUtils.ts`
5. **Обновите схему** в `/src/components/application/schemas/applicationSchema.ts`

## Пример создания компонента шага

```tsx
import React from "react"
import { StepProps } from "../types"
import { CardSelector, CardOption } from "../components/CardSelector"
import texts from "../localization/ru"

export function StepNewFeature({
  control,
  errors,
  formData,
  handleOptionChange,
  handleTextChange,
}: StepProps) {
  // Получение текстов из локализации
  const t = texts.yourFeature

  // Опции для выбора
  const options: CardOption[] = [
    {
      name: "option1",
      label: t.options.option1.label,
      description: t.options.option1.description,
    },
    // Другие опции...
  ]

  // Обработчики
  const handleFeatureOptionChange = (name: string, checked: boolean) => {
    handleOptionChange?.("path.to.options", name, checked)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{t.title}</h1>
      <p className="text-muted-foreground">{t.description}</p>

      <CardSelector
        options={options}
        formData={formData}
        path="path.to.options"
        onOptionChange={handleFeatureOptionChange}
      />

      {/* Другие элементы интерфейса... */}
    </div>
  )
}
```

## Добавление шага в форму

В файле `/src/components/application/index.tsx` добавьте:

```tsx
// Импорт
import { StepNewFeature } from "./steps/StepNewFeature"

// В функции renderCurrentStep()
switch (currentStep) {
  // Существующие шаги...
  case X: // Номер вашего шага
    return <StepNewFeature {...stepProps} />
  // Остальные шаги...
}
```

## Добавление валидации

В файле `/src/components/application/utils/validationUtils.ts`:

```typescript
export async function validateNewFeature(
  trigger: UseFormTrigger<ApplicationSchemaType>,
  getValues: UseFormGetValues<ApplicationSchemaType>,
  setError: UseFormSetError<ApplicationSchemaType>
): Promise<boolean> {
  // Базовая валидация через схему
  const isStepValid = await trigger(["path.to.feature"])
  if (!isStepValid) return false

  // Специальные проверки
  // ...

  return true
}
```

Затем добавьте новый случай в `validateCurrentStep()` в `useApplicationForm.ts`:

```typescript
case X: // Номер вашего шага
  isValid = await validateNewFeature(trigger, getValues, setError)
  break
```

## Обновление схемы данных

В файле `/src/components/application/schemas/applicationSchema.ts`:

1. Добавьте новые поля в интерфейс `ApplicationSchemaType`
2. Обновите `defaultFormValues`
3. Расширьте схему Zod `applicationSchema`

## Внесение текстов в локализацию

В файле `/src/components/application/localization/ru.ts` добавьте:

```typescript
yourFeature: {
  title: "Название шага",
  description: "Описание шага",
  options: {
    option1: {
      label: "Опция 1",
      description: "Описание опции 1"
    },
    // Другие опции...
  },
  // Другие тексты...
}
```

## Полная документация

Более подробная документация доступна в [GitLab Wiki](https://gitlab.com/dragroman/guide/-/wikis/Create-new-step) проекта.
