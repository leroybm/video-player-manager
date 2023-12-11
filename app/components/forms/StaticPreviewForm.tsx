import { Control, FieldArrayWithId, UseFieldArrayUpdate, useForm, useWatch } from "react-hook-form";
import { ExtendedFluidPlayerOptions } from "models/ConfiguratorOptions";
import { FormField, NumberInput, TextInput } from "components/fields";

interface StaticPreviewFormProps {
  update: UseFieldArrayUpdate<ExtendedFluidPlayerOptions, "layoutControls.timelinePreview.frames">;
  index: number;
  value: FieldArrayWithId<ExtendedFluidPlayerOptions, "layoutControls.timelinePreview.frames", "id">;
  control: Control<ExtendedFluidPlayerOptions>;
  isOpen: boolean;
  onClickOpen: () => void;
  onClickRemove: () => void;
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
  });
  const data = useWatch({
    control,
    name: `layoutControls.timelinePreview.frames.${index}`,
  });

  const getTitleSection = () => (
    <>
      <p className="font-medium mb-1">
        Static Preview ({data?.startTime}s - {data?.endTime}s)
      </p>
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
        {getTitleSection()}
      </li>
    );
  }

  return (
    <li className="border-2 rounded border-slate-400 mb-4 p-2 bg-top relative">
      <div className="flex justify-between mb-3">{getTitleSection()}</div>

      <FormField label="Start Time" errorMessage={errors?.startTime?.message}>
        <NumberInput
          register={register}
          fieldName="startTime"
          placeholder="10"
          required
          onChange={handleSubmit((data) => update(index, data))}
        />
      </FormField>

      <FormField label="End Time" errorMessage={errors?.endTime?.message}>
        <NumberInput
          register={register}
          fieldName="endTime"
          placeholder="10"
          required
          onChange={handleSubmit((data) => update(index, data))}
        />
      </FormField>

      <FormField label="Image" errorMessage={errors?.image?.message}>
        <TextInput
          register={register}
          fieldName="image"
          placeholder="https://placekitten.com/320/180"
          required
          onChange={handleSubmit((data) => update(index, data))}
        />
        {data?.image && (
          <div
            className={`w-full aspect-video bg-cover bg-center mt-2`}
            style={{ backgroundImage: `url(${data.image})` }}
          />
        )}
      </FormField>

      <FormField label="Horizontal Position (Pixels)" errorMessage={errors?.x?.message}>
        <NumberInput
          register={register}
          fieldName="x"
          placeholder="0"
          min={0}
          onChange={handleSubmit((data) => update(index, data))}
        />
      </FormField>

      <FormField label="Vertical Position (Pixels)" errorMessage={errors?.y?.message}>
        <NumberInput
          register={register}
          fieldName="y"
          placeholder="0"
          min={0}
          onChange={handleSubmit((data) => update(index, data))}
        />
      </FormField>

      <FormField label="Width (Pixels)" errorMessage={errors?.w?.message}>
        <NumberInput
          register={register}
          fieldName="w"
          placeholder="200"
          min={0}
          onChange={handleSubmit((data) => update(index, data))}
        />
      </FormField>

      <FormField label="Height (Pixels)" errorMessage={errors?.h?.message}>
        <NumberInput
          register={register}
          fieldName="h"
          placeholder="84"
          min={0}
          onChange={handleSubmit((data) => update(index, data))}
        />
      </FormField>
    </li>
  );
}
