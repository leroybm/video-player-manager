"use client"

import { useFormContext } from "react-hook-form"
import { ConfiguratorOptions } from "@/types/configurator-options"
import {
  CheckboxInput,
  FormField,
  Select,
  TextInput,
} from "@/components/fields"

export function TheaterModeForm({
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
        label="Allow theater mode"
        forCheckbox
        errorMessage={
          errors.playerConfiguration?.layoutControls?.allowTheatre?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#allowtheatre">
        <CheckboxInput
          fieldName={"playerConfiguration.layoutControls.allowTheatre"}
          register={register}
        />
      </FormField>

      {/* Removed in meanwhile, check: https://github.com/fluid-player/fluid-player/issues/790
      <FormField
        label="Theatre Element (selector)"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.theatreAdvanced
            ?.theatreElement?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#theatreadvanced">
        <TextInput
          register={register}
          fieldName="playerConfiguration.layoutControls.theatreAdvanced.theatreElement"
          placeholder="container-id"
        />
      </FormField>

      <FormField
        label="Class to apply"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.theatreAdvanced
            ?.classToApply?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#theatreadvanced">
        <TextInput
          register={register}
          fieldName="playerConfiguration.layoutControls.theatreAdvanced.classToApply"
          placeholder="my-theatre-class"
        />
      </FormField> */}

      <FormField
        label="Width"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.theatreSettings?.width
            ?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#theatresettings">
        <TextInput
          register={register}
          fieldName="playerConfiguration.layoutControls.theatreSettings.width"
          placeholder="60%"
        />
      </FormField>

      <FormField
        label="Height"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.theatreSettings?.height
            ?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#theatresettings">
        <TextInput
          register={register}
          fieldName="playerConfiguration.layoutControls.theatreSettings.height"
          placeholder="400px"
        />
      </FormField>

      <FormField
        label="Margin Top"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.theatreSettings?.marginTop
            ?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#theatresettings">
        <TextInput
          register={register}
          fieldName="playerConfiguration.layoutControls.theatreSettings.marginTop"
          placeholder="50"
        />
      </FormField>

      <FormField
        label="Horizontal Align"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.theatreSettings
            ?.horizontalAlign?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#theatresettings">
        <Select
          fieldName={
            "playerConfiguration.layoutControls.theatreSettings.horizontalAlign"
          }
          register={register}
          values={["left", "right", "center"]}
        />
      </FormField>
    </form>
  )
}
