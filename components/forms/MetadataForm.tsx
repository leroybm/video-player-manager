import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { ConfiguratorOptions } from "../../models";
import { FormField, TextInput } from "../fields";

export function MetadataForm({
  onSave,
}: {
  onSave: (newOptions: Partial<{ title: string, videoUrl: string }>) => void;
}) {
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = useFormContext<ConfiguratorOptions>();
  const configuration = getValues();

  useEffect(() => {
    if (configuration?.title === '') {
      trigger(["title", "sources.0.url"], { shouldFocus: true });
    }
  }, []);

  return (
    <form onSubmit={handleSubmit((data) => onSave(data))}>
      <FormField
        label="Title"
        errorMessage={errors.title?.message}
      >
        <TextInput register={register} fieldName="title" placeholder="Configuration Title" required />
      </FormField>

      <FormField
        label="Video URL"
        errorMessage={errors.sources?.[0]?.url?.message}
      >
        <TextInput register={register} fieldName="sources.0.url" placeholder="Video URL" required />
      </FormField>
    </form>
  );
}
