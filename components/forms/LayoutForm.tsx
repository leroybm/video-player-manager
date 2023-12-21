import { cloneDeep } from "lodash";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ConfiguratorOptions, ExtendedFluidPlayerOptions } from "../../models/ConfiguratorOptions";
import { CheckboxInput, FormField, Select, TextInput } from "../../components/fields";
import { SubmitButton } from "../../components/SubmitButton";

/**
 * This form is for the root options that can be found at https://docs.fluidplayer.com/docs/configuration/layout/
 */
export function LayoutForm({
  configuration,
  onSave,
  onDirty,
}: {
  configuration: ConfiguratorOptions;
  onSave: (newOptions: Partial<ConfiguratorOptions>) => void;
  onDirty: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ExtendedFluidPlayerOptions>({
    defaultValues: { ...cloneDeep(configuration.playerConfiguration) },
  });

  useEffect(() => {
    const subscription = watch(onDirty);
    return () => subscription.unsubscribe();
  }, [watch, onDirty]);

  return (
    <form onSubmit={handleSubmit((data) => onSave({ playerConfiguration: data }))}>
      <FormField
        label="Primary color"
        errorMessage={errors.layoutControls?.primaryColor?.message}
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#primarycolor"
      >
        <TextInput register={register} fieldName="layoutControls.primaryColor" placeholder="#333333;" />
      </FormField>

      <FormField
        label="Poster image"
        errorMessage={errors.layoutControls?.posterImage?.message}
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#posterimage"
      >
        <TextInput register={register} fieldName="layoutControls.posterImage" placeholder="path/to/my/image.jpg" />
      </FormField>

      <FormField
        label="Enable play button"
        forCheckbox
        errorMessage={errors.layoutControls?.playButtonShowing?.message}
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#playbuttonshowing"
      >
        <CheckboxInput fieldName={"layoutControls.playButtonShowing"} register={register} />
      </FormField>

      <FormField
        label="Enable play/pause animation"
        forCheckbox
        errorMessage={errors.layoutControls?.playPauseAnimation?.message}
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#playpauseanimation"
      >
        <CheckboxInput fieldName={"layoutControls.playPauseAnimation"} register={register} />
      </FormField>

      <FormField
        label="Enable fill to container"
        forCheckbox
        errorMessage={errors.layoutControls?.fillToContainer?.message}
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#filltocontainer"
      >
        <CheckboxInput fieldName={"layoutControls.fillToContainer"} register={register} />
      </FormField>

      <FormField
        label="Enable auto play"
        forCheckbox
        errorMessage={errors.layoutControls?.autoPlay?.message}
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#autoplay"
      >
        <CheckboxInput fieldName={"layoutControls.autoPlay"} register={register} />
      </FormField>

      <FormField
        label="Preload"
        errorMessage={errors.layoutControls?.preload?.message}
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#preload"
      >
        <Select fieldName={"layoutControls.preload"} register={register} values={["none", "metadata", "auto"]} />
      </FormField>

      <FormField
        label="Mute video on start"
        forCheckbox
        errorMessage={errors.layoutControls?.mute?.message}
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#mute"
      >
        <CheckboxInput fieldName={"layoutControls.mute"} register={register} />
      </FormField>

      <FormField
        label="Enable double-clicking for fullscreen"
        forCheckbox
        errorMessage={errors.layoutControls?.doubleclickFullscreen?.message}
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#doubleclickfullscreen"
      >
        <CheckboxInput fieldName={"layoutControls.doubleclickFullscreen"} register={register} />
      </FormField>

      <FormField
        label="Enable subtitles"
        forCheckbox
        errorMessage={errors.layoutControls?.subtitlesEnabled?.message}
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#subtitlesenabled"
      >
        <CheckboxInput fieldName={"layoutControls.subtitlesEnabled"} register={register} />
      </FormField>

      <FormField
        label="Enable keyboard control"
        forCheckbox
        errorMessage={errors.layoutControls?.keyboardControl?.message}
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#keyboardcontrol"
      >
        <CheckboxInput fieldName={"layoutControls.keyboardControl"} register={register} />
      </FormField>

      <FormField
        label="Title"
        errorMessage={errors.layoutControls?.title?.message}
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#title"
      >
        <TextInput register={register} fieldName="layoutControls.title" placeholder="Video Title" />
      </FormField>

      <FormField
        label="Enable video loop"
        forCheckbox
        errorMessage={errors.layoutControls?.loop?.message}
        externalLink="https://docs.fluidplayer.com/docs/configuration/layout/#loop"
      >
        <CheckboxInput fieldName={"layoutControls.loop"} register={register} />
      </FormField>

      <SubmitButton />
    </form>
  );
}
