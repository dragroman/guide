import React from "react"
import { Controller } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { StepProps } from "../types"
import { FormField } from "../components/FormField"
import { PhoneInput } from "../components/PhoneInput"
import { getErrorMessage } from "../utils/errorHelpers"
import texts from "../localization/ru"

export function StepContactInfo({ control, errors }: StepProps) {
  const t = texts.contact

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">{t.title}</h2>
      <p className="text-muted-foreground text-md">{t.description}</p>

      <div className="space-y-2">
        {/* Отображение общей ошибки */}
        {errors.contact && typeof errors.contact === "object" && (
          <p className="text-sm font-medium text-destructive mt-2">
            {getErrorMessage(errors, "contact", texts.errors.contactRequired)}
          </p>
        )}
        <Label htmlFor="phone">{t.phoneLabel}</Label>
        <Controller
          name="contact.phone"
          control={control}
          render={({ field }) => (
            <PhoneInput
              id="phone"
              value={field.value}
              onChange={field.onChange}
              className={errors.contact?.phone ? "border-destructive" : ""}
              defaultCountry="RU"
              international
            />
          )}
        />
        <p className="text-xs text-muted-foreground">{t.phoneDescription}</p>
        {errors.contact?.phone && (
          <p className="text-sm font-medium text-destructive">
            {errors.contact.phone.message}
          </p>
        )}
      </div>
      <Controller
        name="contact.email"
        control={control}
        render={({ field }) => (
          <FormField
            label={t.emailLabel}
            value={field.value ?? ""}
            type="email"
            autocomplete="email"
            name="email"
            onChange={field.onChange}
            onBlur={field.onBlur}
            placeholder={t.emailPlaceholder}
            error={errors.contact?.email?.message}
          />
        )}
      />
      <Controller
        name="contact.wechat"
        control={control}
        render={({ field }) => (
          <FormField
            label={t.wechatLabel}
            name="wechat"
            onChange={field.onChange}
            value={field.value ?? ""}
            placeholder={t.wechatPlaceholder}
          />
        )}
      />
      <Controller
        name="contact.whatsapp"
        control={control}
        render={({ field }) => (
          <FormField
            onChange={field.onChange}
            value={field.value ?? ""}
            label={t.whatsappLabel}
            name="Whatsapp"
            placeholder={t.whatsappPlaceholder}
          />
        )}
      />
      <Controller
        name="contact.telegram"
        control={control}
        render={({ field }) => (
          <FormField
            label={t.telegramLabel}
            name="Telegram"
            onChange={field.onChange}
            value={field.value ?? ""}
            placeholder={t.telegramPlaceholder}
          />
        )}
      />
    </div>
  )
}
