import { Control, FieldArrayWithId, UseFieldArrayUpdate, useForm, useWatch } from "react-hook-form";
import { ConfiguratorOptions } from "@/models/configurator-options";
import { FormField, TextInput } from "@/components/fields";

interface ContextMenuLinkFormProps {
  update: UseFieldArrayUpdate<ConfiguratorOptions, "playerConfiguration.layoutControls.contextMenu.links">;
  index: number;
  value: FieldArrayWithId<ConfiguratorOptions, "playerConfiguration.layoutControls.contextMenu.links", "id">;
  control: Control<ConfiguratorOptions>;
  isOpen: boolean;
  onClickOpen: () => void;
  onClickRemove: () => void;
}

export function ContextMenuLinkForm({
  update,
  index,
  value,
  control,
  isOpen,
  onClickOpen,
  onClickRemove,
}: ContextMenuLinkFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: value,
  });
  const data = useWatch({
    control,
    name: `playerConfiguration.layoutControls.contextMenu.links.${index}`,
  });

  const titleSection = (
    <>
      <p className="font-medium mb-1 capitalize">{data?.label}</p>
      <button
        className="font-light mr-1 text-sm hover:text-red-500 hover:transform-gpu origin-right hover:scale-105 transition ease-in"
        type="button"
        onClick={onClickRemove}
      >
        Remove
      </button>
    </>
  );

  if (!isOpen) {
    return (
      <li
        className="border-2 rounded border-slate-400 mb-4 p-2 bg-top relative w-full text-left flex justify-between items-center cursor-pointer"
        onClick={onClickOpen}
      >
        {titleSection}
      </li>
    );
  }

  return (
    <li className="border-2 rounded border-slate-400 mb-4 p-2 bg-top relative">
      <div className="flex justify-between mb-3">{titleSection}</div>

      <FormField label="Label" errorMessage={errors?.label?.message}>
        <TextInput
          register={register}
          fieldName="label"
          required
          minLength={1}
          onChange={handleSubmit((data) => update(index, data))}
          placeholder="Wikipedia"
        />
      </FormField>

      <FormField label="URL" errorMessage={errors?.href?.message}>
        <TextInput
          register={register}
          fieldName="href"
          required
          minLength={1}
          onChange={handleSubmit((data) => update(index, data))}
          placeholder="https://wikipedia.org"
        />
      </FormField>
    </li>
  );
}
