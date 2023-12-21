import { cloneDeep } from "lodash";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ConfiguratorOptions, ExtendedFluidPlayerOptions } from "@/models/configurator-options";
import { CheckboxInput, FormField, NumberInput, TextInput } from "@/components/fields";
import { SubmitButton } from "@/components/submit-button";

function transformStringIntoArray(value: string) {
  return value.split(",").map((x) => x.trim());
}

/**
 * This form is for the root options that can be found at https://docs.fluidplayer.com/docs/configuration/layout/#controlBar
 */
export function ControlBarForm({
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
    defaultValues: { ...cloneDeep(configuration.playerConfiguration) },
  });

  useEffect(() => {
    const subscription = watch(onDirty);
    return () => subscription.unsubscribe();
  }, [watch, onDirty]);

  function handleSave(newOptions: Partial<ExtendedFluidPlayerOptions>) {
    if (
      newOptions.layoutControls?.controlBar?.playbackRates &&
      !Array.isArray(newOptions.layoutControls?.controlBar?.playbackRates)
    ) {
      newOptions.layoutControls.controlBar.playbackRates = transformStringIntoArray(
        newOptions.layoutControls?.controlBar?.playbackRates as unknown as string,
      );
    }

    onSave(newOptions);
  }

  function validateArrayString(stringValue: string | string[]): boolean {
    if (Array.isArray(stringValue)) {
      return true;
    }

    try {
      const playbackRateRegExp = /^x[0-9](\.[0-9])?$/;
      const transformedValue = transformStringIntoArray(stringValue);
      return transformedValue.every((entry) => playbackRateRegExp.test(entry));
    } catch (e) {
      return false;
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <FormField label="Auto hide" forCheckbox errorMessage={errors.layoutControls?.controlBar?.autoHide?.message}>
        <CheckboxInput fieldName={"layoutControls.controlBar.autoHide"} register={register} />
      </FormField>

      <FormField
        label="Auto hide timeout (seconds)"
        errorMessage={errors.layoutControls?.controlBar?.autoHideTimeout?.message}
      >
        <NumberInput fieldName={"layoutControls.controlBar.autoHideTimeout"} register={register} placeholder="3" />
      </FormField>

      <FormField label="Is animated" forCheckbox errorMessage={errors.layoutControls?.controlBar?.animated?.message}>
        <CheckboxInput fieldName={"layoutControls.controlBar.animated"} register={register} />
      </FormField>

      <FormField
        label="Playback rates (Plaback rates must be toggled on)"
        errorMessage={errors.layoutControls?.controlBar?.playbackRates?.message}
      >
        <TextInput
          register={register}
          fieldName="layoutControls.controlBar.playbackRates"
          placeholder="x2 x1.5 x1 x0.5"
          validate={validateArrayString}
          validateMessage="Invalid playbackRates string array. Expected format: 'x2.0, x1.0, x0.5'"
        />
      </FormField>

      <p>
        <a
          className="text-blue-700"
          href="https://docs.fluidplayer.com/docs/configuration/layout/#controlbar"
          target="_blank"
        >
          Open Control bar documentation in a new tab&nbsp;↗️
        </a>
      </p>

      <SubmitButton />
    </form>
  );
}
