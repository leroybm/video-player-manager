"use client"

import {
  Control,
  FieldArrayWithId,
  UseFieldArrayUpdate,
  useForm,
  useWatch,
} from "react-hook-form"
import { FormField, NumberInput, TextInput } from "@/components/fields"
import { ConfiguratorOptions } from "@/types"

interface StaticPreviewFormProps {
  update: UseFieldArrayUpdate<
    ConfiguratorOptions,
    "playerConfiguration.layoutControls.timelinePreview.frames"
  >
  index: number
  value: FieldArrayWithId<
    ConfiguratorOptions,
    "playerConfiguration.layoutControls.timelinePreview.frames",
    "id"
  >
  control: Control<ConfiguratorOptions>
  isOpen: boolean
  onClickOpen: () => void
  onClickRemove: () => void
}

export function StaticPreviewForm({
  update,
  index,
  value,
  control,
  isOpen,
  onClickOpen,
  onClickRemove,
}: StaticPreviewFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: value,
  })
  const data = useWatch({
    control,
    name: `playerConfiguration.layoutControls.timelinePreview.frames.${index}`,
  })

  const getTitleSection = () => (
    <>
      <p className="mb-1 font-medium">
        Static Preview ({data?.startTime}s - {data?.endTime}s)
      </p>
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
        {getTitleSection()}
      </li>
    )
  }

  return (
    <li className="relative mb-4 rounded border-2 border-slate-400 bg-top p-2">
      <div className="mb-3 flex justify-between">{getTitleSection()}</div>

      <FormField
        label="Start Time"
        errorMessage={errors?.startTime?.message}>
        <NumberInput
          register={register}
          fieldName="startTime"
          placeholder="10"
          required
          onChange={handleSubmit((data) => update(index, data))}
        />
      </FormField>

      <FormField
        label="End Time"
        errorMessage={errors?.endTime?.message}>
        <NumberInput
          register={register}
          fieldName="endTime"
          placeholder="10"
          required
          onChange={handleSubmit((data) => update(index, data))}
        />
      </FormField>

      <FormField
        label="Image"
        errorMessage={errors?.image?.message}>
        <TextInput
          register={register}
          fieldName="image"
          placeholder="https://placekitten.com/320/180"
          required
          onChange={handleSubmit((data) => update(index, data))}
        />
        {data?.image && (
          <div
            className={`mt-2 aspect-video w-full bg-cover bg-center`}
            style={{ backgroundImage: `url(${data.image})` }}
          />
        )}
      </FormField>

      <FormField
        label="Horizontal Position (Pixels)"
        errorMessage={errors?.x?.message}>
        <NumberInput
          register={register}
          fieldName="x"
          placeholder="0"
          min={0}
          onChange={handleSubmit((data) => update(index, data))}
        />
      </FormField>

      <FormField
        label="Vertical Position (Pixels)"
        errorMessage={errors?.y?.message}>
        <NumberInput
          register={register}
          fieldName="y"
          placeholder="0"
          min={0}
          onChange={handleSubmit((data) => update(index, data))}
        />
      </FormField>

      <FormField
        label="Width (Pixels)"
        errorMessage={errors?.w?.message}>
        <NumberInput
          register={register}
          fieldName="w"
          placeholder="200"
          min={0}
          onChange={handleSubmit((data) => update(index, data))}
        />
      </FormField>

      <FormField
        label="Height (Pixels)"
        errorMessage={errors?.h?.message}>
        <NumberInput
          register={register}
          fieldName="h"
          placeholder="84"
          min={0}
          onChange={handleSubmit((data) => update(index, data))}
        />
      </FormField>
    </li>
  )
}
