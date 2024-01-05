import {
  Control,
  FieldArrayWithId,
  UseFieldArrayUpdate,
  useForm,
  useWatch,
} from "react-hook-form"
import { ConfiguratorOptions } from "@/types/configurator-options"
import { FormField, TextInput } from "@/components/fields"

interface ContextMenuLinkFormProps {
  update: UseFieldArrayUpdate<
    ConfiguratorOptions,
    "playerConfiguration.layoutControls.contextMenu.links"
  >
  index: number
  value: FieldArrayWithId<
    ConfiguratorOptions,
    "playerConfiguration.layoutControls.contextMenu.links",
    "id"
  >
  control: Control<ConfiguratorOptions>
  isOpen: boolean
  onClickOpen: () => void
  onClickRemove: () => void
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
  })
  const data = useWatch({
    control,
    name: `playerConfiguration.layoutControls.contextMenu.links.${index}`,
  })

  const titleSection = (
    <>
      <p className="mb-1 font-medium capitalize">{data?.label}</p>
      <button
        className="mr-1 origin-right text-sm font-light transition ease-in hover:scale-105 hover:transform-gpu hover:text-red-500"
        type="button"
        onClick={onClickRemove}>
        Remove
      </button>
    </>
  )

  if (!isOpen) {
    return (
      <li
        className="relative mb-4 flex w-full cursor-pointer items-center justify-between rounded border-2 border-slate-400 bg-top p-2 text-left"
        onClick={onClickOpen}>
        {titleSection}
      </li>
    )
  }

  return (
    <li className="relative mb-4 rounded border-2 border-slate-400 bg-top p-2">
      <div className="mb-3 flex justify-between">{titleSection}</div>

      <FormField
        label="Label"
        errorMessage={errors?.label?.message}>
        <TextInput
          register={register}
          fieldName="label"
          required
          minLength={1}
          onChange={handleSubmit((data) => update(index, data))}
          placeholder="Wikipedia"
        />
      </FormField>

      <FormField
        label="URL"
        errorMessage={errors?.href?.message}>
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
  )
}
