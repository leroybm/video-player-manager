"use client"

import { useFormContext } from "react-hook-form"
import { ConfiguratorOptions } from "@/types/configurator-options"
import {
  CheckboxInput,
  FormField,
  Select,
  TextInput,
} from "@/components/fields"

/**
 * This form is for the root options that can be found at https://docs.fluidplayer.com/docs/configuration/layout/
 */
export function LayoutForm({
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
    <form onSubmit={handleSubmit((data) => onSave(data))}>
      <FormField
        label="Primary color"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.primaryColor?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#primarycolor">
        <TextInput
          register={register}
          fieldName="playerConfiguration.layoutControls.primaryColor"
          placeholder="#333333;"
        />
      </FormField>

      <FormField
        label="Poster image"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.posterImage?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#posterimage">
        <TextInput
          register={register}
          fieldName="playerConfiguration.layoutControls.posterImage"
          placeholder="path/to/my/image.jpg"
        />
      </FormField>

      <FormField
        label="Poster image size"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.posterImageSize?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#posterimagesize">
        <Select
          fieldName={"playerConfiguration.layoutControls.posterImageSize"}
          register={register}
          values={["auto", "contain", "cover"]}
        />
      </FormField>

      <FormField
        label="Enable play button"
        forCheckbox
        errorMessage={
          errors.playerConfiguration?.layoutControls?.playButtonShowing?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#playbuttonshowing">
        <CheckboxInput
          fieldName={"playerConfiguration.layoutControls.playButtonShowing"}
          register={register}
        />
      </FormField>

      <FormField
        label="Enable play/pause animation"
        forCheckbox
        errorMessage={
          errors.playerConfiguration?.layoutControls?.playPauseAnimation
            ?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#playpauseanimation">
        <CheckboxInput
          fieldName={"playerConfiguration.layoutControls.playPauseAnimation"}
          register={register}
        />
      </FormField>

      <FormField
        label="Enable fill to container"
        forCheckbox
        errorMessage={
          errors.playerConfiguration?.layoutControls?.fillToContainer?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#filltocontainer">
        <CheckboxInput
          fieldName={"playerConfiguration.layoutControls.fillToContainer"}
          register={register}
        />
      </FormField>

      <FormField
        label="Enable auto play"
        forCheckbox
        errorMessage={
          errors.playerConfiguration?.layoutControls?.autoPlay?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#autoplay">
        <CheckboxInput
          fieldName={"playerConfiguration.layoutControls.autoPlay"}
          register={register}
        />
      </FormField>

      <FormField
        label="Preload"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.preload?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#preload">
        <Select
          fieldName={"playerConfiguration.layoutControls.preload"}
          register={register}
          values={["none", "metadata", "auto"]}
        />
      </FormField>

      <FormField
        label="Mute video on start"
        forCheckbox
        errorMessage={errors.playerConfiguration?.layoutControls?.mute?.message}
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#mute">
        <CheckboxInput
          fieldName={"playerConfiguration.layoutControls.mute"}
          register={register}
        />
      </FormField>

      <FormField
        label="Enable double-clicking for fullscreen"
        forCheckbox
        errorMessage={
          errors.playerConfiguration?.layoutControls?.doubleclickFullscreen
            ?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#doubleclickfullscreen">
        <CheckboxInput
          fieldName={"playerConfiguration.layoutControls.doubleclickFullscreen"}
          register={register}
        />
      </FormField>

      <FormField
        label="Enable subtitles"
        forCheckbox
        errorMessage={
          errors.playerConfiguration?.layoutControls?.subtitlesEnabled?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#subtitlesenabled">
        <CheckboxInput
          fieldName={"playerConfiguration.layoutControls.subtitlesEnabled"}
          register={register}
        />
      </FormField>

      <FormField
        label="Enable keyboard control"
        forCheckbox
        errorMessage={
          errors.playerConfiguration?.layoutControls?.keyboardControl?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#keyboardcontrol">
        <CheckboxInput
          fieldName={"playerConfiguration.layoutControls.keyboardControl"}
          register={register}
        />
      </FormField>

      <FormField
        label="Title"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.title?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#title">
        <TextInput
          register={register}
          fieldName="playerConfiguration.layoutControls.title"
          placeholder="Video Title"
        />
      </FormField>

      <FormField
        label="Enable video loop"
        forCheckbox
        errorMessage={errors.playerConfiguration?.layoutControls?.loop?.message}
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#loop">
        <CheckboxInput
          fieldName={"playerConfiguration.layoutControls.loop"}
          register={register}
        />
      </FormField>

      <FormField
        label="Layout"
        errorMessage={
          errors.playerConfiguration?.layoutControls?.layout?.message
        }
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#layout">
        <TextInput
          register={register}
          fieldName="playerConfiguration.layoutControls.layout"
          placeholder="default"
        />
      </FormField>
    </form>
  )
}
