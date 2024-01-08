"use client"

import { useFormContext } from "react-hook-form"
import { ConfiguratorOptions } from "@/types/configurator-options"
import {
  CheckboxInput,
  FormField,
  NumberInput,
  Select,
  TextInput,
} from "@/components/fields"

export function MiniPlayerForm({
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
        label="Enable MiniPlayer"
        forCheckbox
        errorMessage={
          errors.playerConfiguration?.layoutControls?.miniPlayer?.enabled
            ?.message
        }>
        <CheckboxInput
          fieldName={"playerConfiguration.layoutControls.miniPlayer.enabled"}
          register={register}
        />
      </FormField>

      <FormField
        label="Width (px)"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.miniPlayer?.width?.message
        }>
        <NumberInput
          fieldName={"playerConfiguration.layoutControls.miniPlayer.width"}
          register={register}
          min={400}
          placeholder="400"
        />
      </FormField>

      <FormField
        label="Height (px)"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.miniPlayer?.height
            ?.message
        }>
        <NumberInput
          fieldName={"playerConfiguration.layoutControls.miniPlayer.height"}
          register={register}
          min={225}
          placeholder="225"
        />
      </FormField>

      <FormField
        label="Width Mobile (vw)"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.miniPlayer?.widthMobile
            ?.message
        }>
        <NumberInput
          fieldName={
            "playerConfiguration.layoutControls.miniPlayer.widthMobile"
          }
          register={register}
          min={0}
          max={100}
          placeholder="40"
        />
      </FormField>

      <FormField
        label="Placeholder text"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.miniPlayer
            ?.placeholderText?.message
        }>
        <TextInput
          register={register}
          fieldName="playerConfiguration.layoutControls.miniPlayer.placeholderText"
          placeholder="Playing in Mini Player"
        />
      </FormField>

      <FormField
        label="Position"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.miniPlayer?.position
            ?.message
        }>
        <Select
          fieldName={"playerConfiguration.layoutControls.miniPlayer.position"}
          register={register}
          values={["top left", "top right", "bottom left", "bottom right"]}
        />
      </FormField>

      <FormField
        label="Auto toggle with scroll"
        forCheckbox
        errorMessage={
          errors.playerConfiguration?.layoutControls?.miniPlayer?.autoToggle
            ?.message
        }>
        <CheckboxInput
          fieldName={"playerConfiguration.layoutControls.miniPlayer.autoToggle"}
          register={register}
        />
      </FormField>

      <p>
        <a
          className="text-blue-700"
          href="https://docs.fluidplayer.com/docs/configuration/layout/#miniplayer"
          target="_blank">
          Open Mini Player documentation in a new tab&nbsp;↗️
        </a>
      </p>
    </form>
  )
}
