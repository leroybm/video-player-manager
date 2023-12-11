import { cloneDeep } from "lodash";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ConfiguratorOptions, ExtendedFluidPlayerOptions } from "../../models/ConfiguratorOptions";
import { CheckboxInput, FormField, NumberInput, Select, TextInput } from "../../components/fields";
import { SubmitButton } from "../../components/SubmitButton";

export function MiniPlayerForm({
  configuration,
  onSave,
  onDirty,
}: {
  configuration: ConfiguratorOptions;
  onSave: (newOptions: Partial<ExtendedFluidPlayerOptions>) => void;
  onDirty: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ExtendedFluidPlayerOptions>({
    defaultValues: { ...cloneDeep(configuration.options) },
  });

  useEffect(() => {
    const subscription = watch(onDirty);
    return () => subscription.unsubscribe();
  }, [watch, onDirty]);

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <FormField
        label="Enable MiniPlayer"
        forCheckbox
        errorMessage={errors.layoutControls?.miniPlayer?.enabled?.message}
      >
        <CheckboxInput fieldName={"layoutControls.miniPlayer.enabled"} register={register} />
      </FormField>

      <FormField label="Width (px)" errorMessage={errors.layoutControls?.miniPlayer?.width?.message}>
        <NumberInput fieldName={"layoutControls.miniPlayer.width"} register={register} min={400} placeholder="400" />
      </FormField>

      <FormField label="Height (px)" errorMessage={errors.layoutControls?.miniPlayer?.height?.message}>
        <NumberInput fieldName={"layoutControls.miniPlayer.height"} register={register} min={225} placeholder="225" />
      </FormField>

      <FormField label="Width Mobile (vw)" errorMessage={errors.layoutControls?.miniPlayer?.widthMobile?.message}>
        <NumberInput
          fieldName={"layoutControls.miniPlayer.widthMobile"}
          register={register}
          min={0}
          max={100}
          placeholder="40"
        />
      </FormField>

      <FormField label="Placeholder text" errorMessage={errors.layoutControls?.miniPlayer?.placeholderText?.message}>
        <TextInput
          register={register}
          fieldName="layoutControls.miniPlayer.placeholderText"
          placeholder="Playing in Miniplayer"
        />
      </FormField>

      <FormField label="Position" errorMessage={errors.layoutControls?.miniPlayer?.position?.message}>
        <Select
          fieldName={"layoutControls.miniPlayer.position"}
          register={register}
          values={["top left", "top right", "bottom left", "bottom right"]}
        />
      </FormField>

      <FormField
        label="Auto toggle with scroll"
        forCheckbox
        errorMessage={errors.layoutControls?.miniPlayer?.autoToggle?.message}
      >
        <CheckboxInput fieldName={"layoutControls.miniPlayer.autoToggle"} register={register} />
      </FormField>

      <p>
        <a
          className="text-blue-700"
          href="https://docs.fluidplayer.com/docs/configuration/layout/#miniplayer"
          target="_blank"
        >
          Open Mini Player documentation in a new tab&nbsp;↗️
        </a>
      </p>

      <SubmitButton />
    </form>
  );
}
