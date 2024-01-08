"use client"

import { useFormContext } from "react-hook-form"
import { ConfiguratorOptions } from "@/types/configurator-options"
import { CheckboxInput, FormField } from "@/components/fields"

export function PersistentSettingsForm({
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
        forCheckbox
        label="Persist Volume Settings"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.persistentSettings?.volume
            ?.message
        }>
        <CheckboxInput
          register={register}
          fieldName="playerConfiguration.layoutControls.persistentSettings.volume"
        />
      </FormField>

      <FormField
        forCheckbox
        label="Persist Quality Settings"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.persistentSettings
            ?.quality?.message
        }>
        <CheckboxInput
          register={register}
          fieldName="playerConfiguration.layoutControls.persistentSettings.quality"
        />
      </FormField>

      <FormField
        forCheckbox
        label="Persist Speed Settings"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.persistentSettings?.speed
            ?.message
        }>
        <CheckboxInput
          register={register}
          fieldName="playerConfiguration.layoutControls.persistentSettings.speed"
        />
      </FormField>

      <FormField
        forCheckbox
        label="Persist Theatre Settings"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.persistentSettings
            ?.theatre?.message
        }>
        <CheckboxInput
          register={register}
          fieldName="playerConfiguration.layoutControls.persistentSettings.theatre"
        />
      </FormField>

      <p>
        <a
          className="text-blue-700"
          href="https://docs.fluidplayer.com/docs/configuration/layout/#persistentsettings"
          target="_blank">
          Open Persistent Settings documentation in a new tab&nbsp;↗️
        </a>
      </p>
    </form>
  )
}
