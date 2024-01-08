"use client"

import { useFormContext } from "react-hook-form"
import { ConfiguratorOptions } from "@/types/configurator-options"
import { FormField, NumberInput, TextInput } from "@/components/fields"

export function HtmlOnPauseForm({
  onSave,
}: {
  onSave: (newOptions: Partial<ConfiguratorOptions>) => void
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<ConfiguratorOptions>()

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <FormField
        label="HTML (Empty to disable)"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.htmlOnPauseBlock?.html
            ?.message
        }>
        <TextInput
          register={register}
          fieldName="playerConfiguration.layoutControls.htmlOnPauseBlock.html"
          placeholder="<b>Paused</b>"
        />
      </FormField>

      <FormField
        label="Width (px)"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.htmlOnPauseBlock?.width
            ?.message
        }>
        <NumberInput
          fieldName={
            "playerConfiguration.layoutControls.htmlOnPauseBlock.width"
          }
          register={register}
          min={0}
          placeholder="100"
        />
      </FormField>

      <FormField
        label="Height (px)"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.htmlOnPauseBlock?.height
            ?.message
        }>
        <NumberInput
          fieldName={
            "playerConfiguration.layoutControls.htmlOnPauseBlock.height"
          }
          register={register}
          min={0}
          placeholder="50"
        />
      </FormField>

      <p>
        <a
          className="text-blue-700"
          href="https://docs.fluidplayer.com/docs/configuration/layout/#htmlonpauseblock"
          target="_blank">
          Open HTML On Pause Block documentation in a new tab&nbsp;↗️
        </a>
      </p>
    </form>
  )
}
