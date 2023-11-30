import { cloneDeep, rest } from "lodash";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ConfiguratorOptions, ExtendedFluidPlayerOptions } from "_models/ConfiguratorOptions";
import { CheckboxInput, FormField, Select, TextInput } from "_components/fields";
import { SubmitButton } from "_components/SubmitButton";

export function MetadataForm({
  configuration,
  onSave,
  onDirty,
}: {
  configuration: ConfiguratorOptions;
  onSave: (newOptions: Partial<{ title: string, videoUrl: string }>) => void;
  onDirty: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger
  } = useForm<{ title: string, videoUrl: string }>({
    defaultValues: { title: configuration?.title, videoUrl: configuration?.videoUrl },
  });

  useEffect(() => {
    if (configuration?.title === undefined) {
      trigger(["title", "videoUrl"], { shouldFocus: true });
      onDirty(); // Prevents navigation
    }
  }, []);

  useEffect(() => {
    const subscription = watch(onDirty);
    return () => subscription.unsubscribe();
  }, [watch, onDirty]);

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <FormField
        label="Title"
        errorMessage={errors.title?.message}
      >
        <TextInput register={register} fieldName="title" placeholder="Configuration Title" required />
      </FormField>

      <FormField
        label="Video URL"
        errorMessage={errors.videoUrl?.message}
      >
        <TextInput register={register} fieldName="videoUrl" placeholder="Video URL" required />
      </FormField>

      <SubmitButton />
    </form>
  );
}
