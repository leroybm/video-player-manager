"use client"

import { useFormContext } from "react-hook-form"
import { ConfiguratorOptions } from "@/types/configurator-options"
import { FormField, TextInput } from "@/components/fields"

export function CaptionsForm({
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
        label="Caption for 'Play'"
        errorMessage={errors.playerConfiguration?.captions?.play?.message}>
        <TextInput
          register={register}
          fieldName="playerConfiguration.captions.play"
          placeholder="Play"
        />
      </FormField>

      <FormField
        label="Caption for 'Pause'"
        errorMessage={errors.playerConfiguration?.captions?.pause?.message}>
        <TextInput
          register={register}
          fieldName="playerConfiguration.captions.pause"
          placeholder="Pause"
        />
      </FormField>

      <FormField
        label="Caption for 'Mute'"
        errorMessage={errors.playerConfiguration?.captions?.mute?.message}>
        <TextInput
          register={register}
          fieldName="playerConfiguration.captions.mute"
          placeholder="Mute"
        />
      </FormField>

      <FormField
        label="Caption for 'Unmute'"
        errorMessage={errors.playerConfiguration?.captions?.unmute?.message}>
        <TextInput
          register={register}
          fieldName="playerConfiguration.captions.unmute"
          placeholder="Unmute"
        />
      </FormField>

      <FormField
        label="Caption for 'Fullscreen'"
        errorMessage={
          errors.playerConfiguration?.captions?.fullscreen?.message
        }>
        <TextInput
          register={register}
          fieldName="playerConfiguration.captions.fullscreen"
          placeholder="Fullscreen"
        />
      </FormField>

      <FormField
        label="Caption for 'Exit Fullscreen'"
        errorMessage={
          errors.playerConfiguration?.captions?.exitFullscreen?.message
        }>
        <TextInput
          register={register}
          fieldName="playerConfiguration.captions.exitFullscreen"
          placeholder="Exit Fullscreen"
        />
      </FormField>

      <p>
        <a
          className="text-blue-700"
          href="https://docs.fluidplayer.com/docs/configuration/layout/#captions"
          target="_blank">
          Open Captions documentation in a new tab&nbsp;↗️
        </a>
      </p>
    </form>
  )
}
