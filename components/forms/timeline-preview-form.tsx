"use client"

import { cloneDeep, uniqueId } from "lodash"
import { useEffect, useState } from "react"
import {
  FieldArrayWithId,
  FieldError,
  FieldErrorsImpl,
  Merge,
  useFieldArray,
  useFormContext,
} from "react-hook-form"
import { StaticPreviewForm } from "./static-preview-form"
import {
  ConfiguratorOptions,
  ExtendedFluidPlayerOptions,
} from "@/types/configurator-options"
import {
  CheckboxInput,
  FormField,
  Select,
  TextInput,
} from "@/components/fields"

type VTTPreviewOptionsFieldError = Merge<
  FieldError,
  FieldErrorsImpl<NonNullable<VTTPreviewOptions>>
>

const staticTimelineItemDefaults = {
  _id: uniqueId(),
  startTime: 0,
  endTime: 5,
  image: "https://placekitten.com/200/84",
  x: 0,
  y: 0,
  w: 200,
  h: 84,
}

/**
 * This form is for the root options that can be found at https://docs.fluidplayer.com/docs/configuration/preview/
 */
export function TimelinePreviewForm({
  onSave,
}: {
  onSave: (newOptions: Partial<ConfiguratorOptions>) => void
}) {
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useFormContext<ConfiguratorOptions>()
  const {
    fields: staticPreviews,
    append: appendStaticPreview,
    update: updateStaticPreview,
    remove: removeStaticPreview,
  } = useFieldArray({
    name: "playerConfiguration.layoutControls.timelinePreview.frames",
    control,
  })
  const configuration = getValues()
  const [timelinePreviewType, setTimelinePreviewType] = useState(
    configuration.playerConfiguration.layoutControls?.timelinePreview?.type
  )
  const [openPreviewIndex, setOpenPreviewIndex] = useState<null | number>(null)

  useEffect(() => {
    const subscription = watch((formValue, { type, name }) => {
      const nextType =
        formValue.playerConfiguration?.layoutControls?.timelinePreview?.type
      if (
        nextType &&
        type === "change" &&
        name === "playerConfiguration.layoutControls.timelinePreview.type"
      ) {
        setTimelinePreviewType(nextType)
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  function validateTimings(
    staticPreviews: FieldArrayWithId<
      ExtendedFluidPlayerOptions,
      "layoutControls.timelinePreview.frames",
      "id"
    >[]
  ): boolean {
    return staticPreviews.every((staticPreview, index) => {
      return index === 0 ? true : (
          staticPreview.startTime >= staticPreviews[index - 1].endTime
        )
    })
  }

  function addNewStaticPreview() {
    if (staticPreviews.length === 0) {
      return appendStaticPreview(cloneDeep(staticTimelineItemDefaults))
    }

    appendStaticPreview(
      cloneDeep({
        ...staticPreviews[staticPreviews.length - 1],
        _id: uniqueId(),
        startTime: Number(staticPreviews[staticPreviews.length - 1].endTime),
        endTime: Number(staticPreviews[staticPreviews.length - 1].endTime) + 5,
      })
    )

    setOpenPreviewIndex(staticPreviews.length)
  }

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <FormField label="Type">
        <Select
          fieldName={"playerConfiguration.layoutControls.timelinePreview.type"}
          register={register}
          values={["VTT", "static"]}
        />
      </FormField>

      <p className="mb-2 text-blue-700">
        <a
          href="https://docs.fluidplayer.com/docs/configuration/preview/"
          target="_blank">
          Open Timeline Preview documentation in a new tab&nbsp;↗️
        </a>
      </p>

      {timelinePreviewType === "VTT" && (
        <>
          <FormField
            label="Enable sprite relative path"
            forCheckbox
            errorMessage={
              (
                errors.playerConfiguration?.layoutControls
                  ?.timelinePreview as VTTPreviewOptionsFieldError
              )?.spriteRelativePath?.message
            }>
            <CheckboxInput
              fieldName={
                "playerConfiguration.layoutControls.timelinePreview.spriteRelativePath"
              }
              register={register}
            />
          </FormField>

          <FormField
            label="File"
            errorMessage={
              (
                errors.playerConfiguration?.layoutControls
                  ?.timelinePreview as VTTPreviewOptionsFieldError
              )?.file?.message
            }>
            <TextInput
              register={register}
              fieldName="playerConfiguration.layoutControls.timelinePreview.file"
              placeholder="thumbnails.vtt"
            />
          </FormField>

          <FormField
            label="Sprite"
            errorMessage={
              (
                errors.playerConfiguration?.layoutControls
                  ?.timelinePreview as VTTPreviewOptionsFieldError
              )?.sprite?.message
            }>
            <TextInput
              register={register}
              fieldName="playerConfiguration.layoutControls.timelinePreview.sprite"
              placeholder="thumbnails.jpg"
            />
          </FormField>
        </>
      )}

      {timelinePreviewType === "static" && (
        <ul className="mb-4">
          {staticPreviews.map((staticPreview, index) => (
            <StaticPreviewForm
              key={staticPreview._id}
              control={control}
              update={(...args) => {
                updateStaticPreview(...args)
              }}
              index={index}
              value={staticPreview}
              isOpen={openPreviewIndex === index}
              onClickOpen={() => setOpenPreviewIndex(index)}
              onClickRemove={() => removeStaticPreview(index)}
            />
          ))}

          <li
            className="relative mb-4 flex w-full cursor-pointer items-center justify-between rounded border-2 border-slate-400 bg-top p-2 text-left"
            onClick={addNewStaticPreview}>
            ➕ Add new Static Preview
          </li>
        </ul>
      )}

      {!validateTimings(staticPreviews) && (
        <div className="mt-1 text-red-500">Invalid Timings</div>
      )}
    </form>
  )
}
