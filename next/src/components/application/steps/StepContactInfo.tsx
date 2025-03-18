import React from "react"
import { Controller } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { StepProps } from "../types"
import { FormField } from "../components/FormField"
import { PhoneInput } from "../components/PhoneInput"
import { getErrorMessage } from "../utils/errorHelpers"

export function StepContactInfo({ control, errors }: StepProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Куда отправить предложение?</h2>
      <p className="text-muted-foreground text-md">
        Оставь телефон и почту, чтобы мы могли отправить предложение:
      </p>
      {/* Отображение общей ошибки */}

      {errors.contact &&
        typeof errors.contact === "object" &&
        getErrorMessage(errors, "contact", "Введите хотя бы один контакт")}
      <div className="space-y-2">
        <Label htmlFor="phone">Телефон</Label>
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
        <p className="text-xs text-muted-foreground">
          Введите номер телефона в международном формате
        </p>
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
            label="Электронная почта"
            value={field.value ?? ""}
            type="email"
            autocomplete="email"
            name="email"
            onChange={field.onChange}
            placeholder="Электронная почта"
            error={errors.contact?.email?.message}
          />
        )}
      />
      <Controller
        name="contact.wechat"
        control={control}
        render={({ field }) => (
          <FormField
            label="WeChat"
            name="wechat"
            onChange={field.onChange}
            value={field.value ?? ""}
            placeholder="WeCha ID или номер телефона"
          />
        )}
      />
      <Controller
        name="contact.whatsapp"
        control={control}
        render={({ field }) => (
          <FormField label="Whatsapp" {...field} placeholder="+7999999999" />
        )}
      />
      <Controller
        name="contact.telegram"
        control={control}
        render={({ field }) => (
          <FormField label="Telegram" {...field} placeholder="@haohub" />
        )}
      />
    </div>
  )
}
