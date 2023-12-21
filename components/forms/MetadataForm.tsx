import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { ConfiguratorOptions } from "../../models";
import { SubmitButton } from "../SubmitButton";
import { FormField, TextInput } from "../fields";

export function MetadataForm({
  configuration,
  onSave,
}: {
  configuration: ConfiguratorOptions;
  onSave: (newOptions: Partial<{ title: string, videoUrl: string }>) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger
  } = useFormContext<ConfiguratorOptions>();

  useEffect(() => {
    if (configuration?.title === undefined) {
      trigger(["title", "sources.0.url"], { shouldFocus: true });
    }
  }, []);

  /**
   * TODO: Remove when form for multiple sources is developed
   */
  // function transformData(data: { videoUrl: string, title: string }) {
  //   return { ...configuration, title: data.title, sources: [{ label: 'default', url: data.videoUrl }] };
  // }

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

      <SubmitButton />
    </form>
  );
}
