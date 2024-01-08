"use client"

import { useFormContext } from "react-hook-form"
import { ConfiguratorOptions } from "@/types/configurator-options"
import {
  CheckboxInput,
  FormField,
  NumberInput,
  TextInput,
} from "@/components/fields"
import { getErrorMessage } from "@/lib/utils/errors"

function transformStringIntoArray(value: string) {
  return value.split(",").map((x) => x.trim())
}

/**
 * This form is for the root options that can be found at https://docs.fluidplayer.com/docs/configuration/layout/#controlBar
 */
export function ControlBarForm({
  onSave,
}: {
  onSave: (newOptions: Partial<ConfiguratorOptions>) => void
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<ConfiguratorOptions>()

  function handleSave(newOptions: Partial<ConfiguratorOptions>) {
    if (
      newOptions.playerConfiguration?.layoutControls?.controlBar
        ?.playbackRates &&
      !Array.isArray(
        newOptions.playerConfiguration?.layoutControls?.controlBar
          ?.playbackRates
      )
    ) {
      newOptions.playerConfiguration.layoutControls.controlBar.playbackRates =
        transformStringIntoArray(
          newOptions.playerConfiguration?.layoutControls?.controlBar
            ?.playbackRates as unknown as string
        )
    }

    onSave(newOptions)
  }

  function validateArrayString(stringValue: string | string[]): boolean {
    if (Array.isArray(stringValue)) {
      return true
    }

    try {
      const playbackRateRegExp = /^x[0-9](\.[0-9])?$/
      const transformedValue = transformStringIntoArray(stringValue)
      return transformedValue.every((entry) => playbackRateRegExp.test(entry))
    } catch (error: unknown) {
      throw new Error(`Message: ${getErrorMessage(error)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <FormField
        label="Auto hide"
        forCheckbox
        errorMessage={
          errors.playerConfiguration?.layoutControls?.controlBar?.autoHide
            ?.message
        }>
        <CheckboxInput
          fieldName={"playerConfiguration.layoutControls.controlBar.autoHide"}
          register={register}
        />
      </FormField>

      <FormField
        label="Auto hide timeout (seconds)"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.controlBar
            ?.autoHideTimeout?.message
        }>
        <NumberInput
          fieldName={
            "playerConfiguration.layoutControls.controlBar.autoHideTimeout"
          }
          register={register}
          placeholder="3"
        />
      </FormField>

      <FormField
        label="Is animated"
        forCheckbox
        errorMessage={
          errors.playerConfiguration?.layoutControls?.controlBar?.animated
            ?.message
        }>
        <CheckboxInput
          fieldName={"playerConfiguration.layoutControls.controlBar.animated"}
          register={register}
        />
      </FormField>

      <FormField
        label="Playback rates (Playback rates must be toggled on)"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.controlBar?.playbackRates
            ?.message
        }>
        <TextInput
          register={register}
          fieldName="playerConfiguration.layoutControls.controlBar.playbackRates"
          placeholder="x2 x1.5 x1 x0.5"
          validate={validateArrayString}
          validateMessage="Invalid playbackRates string array. Expected format: 'x2.0, x1.0, x0.5'"
        />
      </FormField>

      <FormField
        label="Allow download"
        forCheckbox
        errorMessage={
          errors.playerConfiguration?.layoutControls?.allowDownload?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#allowdownload">
        <CheckboxInput
          fieldName={"playerConfiguration.layoutControls.allowDownload"}
          register={register}
        />
      </FormField>

      <FormField
        label="Playback Rate Enabled"
        forCheckbox
        errorMessage={
          errors.playerConfiguration?.layoutControls?.playbackRateEnabled
            ?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#playbackrateenabled">
        <CheckboxInput
          fieldName={"playerConfiguration.layoutControls.playbackRateEnabled"}
          register={register}
        />
      </FormField>

      <FormField
        label="Show skip buttons"
        forCheckbox
        errorMessage={
          errors.playerConfiguration?.layoutControls?.controlForwardBackward
            ?.show?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#controlforwardbackward">
        <CheckboxInput
          fieldName={
            "playerConfiguration.layoutControls.controlForwardBackward.show"
          }
          register={register}
        />
      </FormField>

      <FormField
        label="Allow double-tap to skip"
        forCheckbox
        errorMessage={
          errors.playerConfiguration?.layoutControls?.controlForwardBackward
            ?.doubleTapMobile?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#controlforwardbackward">
        <CheckboxInput
          fieldName={
            "playerConfiguration.layoutControls.controlForwardBackward.doubleTapMobile"
          }
          register={register}
        />
      </FormField>

      <p>
        <a
          className="text-blue-700"
          href="https://docs.fluidplayer.com/docs/configuration/layout/#controlbar"
          target="_blank">
          Open Control bar documentation in a new tab&nbsp;↗️
        </a>
      </p>
    </form>
  )
}
