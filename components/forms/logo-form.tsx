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

/**
 * This form is for the root options that can be found at https://docs.fluidplayer.com/docs/configuration/layout/#logo
 */
export function LogoForm({
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
        label="Image URL"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.logo?.imageUrl?.message
        }>
        <TextInput
          register={register}
          fieldName="playerConfiguration.layoutControls.logo.imageUrl"
          placeholder="https://www.routetomylogo.com/logo.jpg"
        />
      </FormField>

      <FormField
        label="Position"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.logo?.position?.message
        }>
        <Select
          fieldName={"playerConfiguration.layoutControls.logo.position"}
          register={register}
          values={["top left", "top right", "bottom left", "bottom right"]}
        />
      </FormField>

      <FormField
        label="Click URL"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.logo?.clickUrl?.message
        }>
        <TextInput
          register={register}
          fieldName="playerConfiguration.layoutControls.logo.clickUrl"
          placeholder="https://www.landingpage.com/welcome"
        />
      </FormField>

      <FormField
        label="Opacity"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.logo?.opacity?.message
        }>
        <NumberInput
          fieldName={"playerConfiguration.layoutControls.logo.opacity"}
          register={register}
          min={0}
          max={1}
          step={0.1}
          placeholder="0.8"
        />
      </FormField>

      <FormField
        label="Image on hover URL"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.logo?.mouseOverImageUrl
            ?.message
        }>
        <TextInput
          register={register}
          fieldName="playerConfiguration.layoutControls.logo.mouseOverImageUrl"
          placeholder="image/on/hover.jpg"
        />
      </FormField>

      <FormField
        label="Image margin (CSS)"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.logo?.imageMargin?.message
        }>
        <TextInput
          register={register}
          fieldName="playerConfiguration.layoutControls.logo.imageMargin"
          placeholder="30px 80% 0 30px"
        />
      </FormField>

      <FormField
        label="Hide with controls"
        forCheckbox
        errorMessage={
          errors.playerConfiguration?.layoutControls?.logo?.hideWithControls
            ?.message
        }>
        <CheckboxInput
          fieldName={"playerConfiguration.layoutControls.logo.hideWithControls"}
          register={register}
        />
      </FormField>

      <FormField
        label="Show over ads"
        forCheckbox
        errorMessage={
          errors.playerConfiguration?.layoutControls?.logo?.showOverAds?.message
        }>
        <CheckboxInput
          fieldName={"playerConfiguration.layoutControls.logo.showOverAds"}
          register={register}
        />
      </FormField>

      <p>
        <a
          className="text-blue-700"
          href="https://docs.fluidplayer.com/docs/configuration/layout/#logo"
          target="_blank">
          Open Logo documentation in a new tab&nbsp;↗️
        </a>
      </p>
    </form>
  )
}
