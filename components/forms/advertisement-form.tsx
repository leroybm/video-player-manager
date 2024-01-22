"use client"

import {
  Control,
  FieldArrayWithId,
  UseFieldArrayUpdate,
  useForm,
  useWatch,
} from "react-hook-form"
import {
  FormField,
  Select,
  TextInput,
  CheckboxInput,
  NumberInput,
} from "@/components/fields"
import { ConfiguratorOptions } from "@/types/configurator-options"

interface AdvertisementFormProps {
  update: UseFieldArrayUpdate<
    ConfiguratorOptions,
    "playerConfiguration.vastOptions.adList"
  >
  index: number
  value: FieldArrayWithId<
    ConfiguratorOptions,
    "playerConfiguration.vastOptions.adList",
    "id"
  >
  control: Control<ConfiguratorOptions>
  isOpen: boolean
  onClickOpen: () => void
  onClickRemove: () => void
}

export function AdvertisementForm({
  update,
  index,
  value,
  control,
  isOpen,
  onClickOpen,
  onClickRemove,
}: AdvertisementFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: value,
  })
  const data = useWatch({
    control,
    name: `playerConfiguration.vastOptions.adList.${index}`,
  })

  const titleSection = (
    <>
      <p className="mb-1 font-medium capitalize">{data?.roll}</p>
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

      <FormField label="Roll Type">
        <Select
          register={register}
          fieldName="roll"
          values={["preRoll", "midRoll", "postRoll", "onPauseRoll"]}
          required
          onChange={() => {
            if (data.roll === "midRoll") {
              setValue("timer", 30)
            }

            return handleSubmit((data) => update(index, data))()
          }}
        />
      </FormField>

      <FormField
        label="Vast Tag"
        errorMessage={errors?.vastTag?.message}>
        <TextInput
          register={register}
          fieldName="vastTag"
          required
          minLength={3}
          onChange={handleSubmit((data) => update(index, data))}
          placeholder="https://adserver.com/zoneId"
        />
      </FormField>

      {data?.roll === "midRoll" && (
        <FormField
          label="Timer"
          errorMessage={errors?.timer?.message}>
          <TextInput
            register={register}
            fieldName="timer"
            required
            pattern={/(^\d+$)|(^\d{1,2}%$)/}
            patternMessage="Field must be a number or a percentage between 1% and 99%"
            onChange={handleSubmit((data) => update(index, data))}
            placeholder="50%"
          />
        </FormField>
      )}

      <FormField
        label="Fallback Vast Tags (Comma separated)"
        errorMessage={errors?.fallbackVastTags?.message}>
        <TextInput
          register={register}
          fieldName="fallbackVastTags"
          pattern={/^\S*(?!\s)$/}
          patternMessage="Should be a string of URLs separated by commas"
          placeholder="https://example.com/,https://example.com/"
          onChange={handleSubmit((data) => update(index, data))}
        />
      </FormField>

      <FormField
        label="Video Ad Text"
        errorMessage={errors?.adText?.message}>
        <TextInput
          register={register}
          fieldName="adText"
          placeholder="Advertising supports us directly"
          onChange={handleSubmit((data) => update(index, data))}
        />
      </FormField>

      <FormField
        label="Video Ad Text Position"
        errorMessage={errors?.adTextPosition?.message}>
        <Select
          register={register}
          fieldName="adTextPosition"
          defaultMessage="Default"
          values={["top left", "top right", "bottom left", "bottom right"]}
          onChange={() => handleSubmit((data) => update(index, data))()}
        />
      </FormField>

      <FormField
        label="Video Ad Clickable"
        errorMessage={errors?.adClickable?.message}
        forCheckbox>
        <CheckboxInput
          register={register}
          fieldName="adClickable"
          onChange={() => handleSubmit((data) => update(index, data))()}
        />
      </FormField>

      <FormField
        label="Banner Vertical Alignment"
        errorMessage={errors?.vAlign?.message}>
        <Select
          register={register}
          fieldName="vAlign"
          values={["top", "middle", "bottom"]}
          defaultMessage="Default"
          onChange={() => handleSubmit((data) => update(index, data))()}
        />
      </FormField>

      <FormField
        label="Banner Ad Duration"
        errorMessage={errors?.nonLinearDuration?.message}>
        <NumberInput
          register={register}
          fieldName="nonLinearDuration"
          placeholder="10"
          onChange={handleSubmit((data) => update(index, data))}
        />
      </FormField>

      <FormField
        label="Banner Size"
        errorMessage={errors?.size?.message}>
        <Select
          register={register}
          fieldName="size"
          values={["468x60", "300x250", "728x90"]}
          defaultMessage="Default"
          onChange={() => handleSubmit((data) => update(index, data))()}
        />
      </FormField>
    </li>
  )
}
