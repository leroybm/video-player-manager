import { cloneDeep, uniqueId } from "lodash";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { ConfiguratorOptions, ExtendedFluidPlayerOptions, ExtendedAdOptions } from "../../models/ConfiguratorOptions";
import { AdvertismentForm } from "./AdvertismentForm";
import { SubmitButton } from "../../components/SubmitButton";

const advertismentDefaults: ExtendedAdOptions = {
  _id: uniqueId(),
  roll: "preRoll",
  vastTag: "https://",
  adClickable: true,
} as ExtendedAdOptions;

/**
 * This form is for the root options that can be found at https://docs.fluidplayer.com/docs/configuration/ads/#adlist
 */
export function AdvertismentListForm({
  configuration,
  onSave,
  onDirty,
}: {
  configuration: ConfiguratorOptions;
  onSave: (newOptions: Partial<ExtendedFluidPlayerOptions>) => void;
  onDirty: () => void;
}) {
  const { handleSubmit, watch, control } = useForm<ExtendedFluidPlayerOptions>({
    defaultValues: { ...cloneDeep(configuration.options) },
  });
  const {
    fields: advertisments,
    append: appendAdvertisment,
    update: updateAdvertisment,
    remove: removeAdvertisment,
  } = useFieldArray({
    name: "vastOptions.adList",
    control,
  });
  const [openAdvertismentIndex, setOpenAdvertismentIndex] = useState<null | number>(null);

  useEffect(() => {
    const subscription = watch(() => {
      onDirty();
    });
    return () => subscription.unsubscribe();
  }, [watch, onDirty]);

  /**
   * Appends new advertisments by either creating it from the defaults or by
   * copying the last one. Opens newly created advertisment.
   */
  function addNewAdvertisment() {
    if (advertisments.length === 0) {
      return appendAdvertisment(cloneDeep(advertismentDefaults));
    }

    appendAdvertisment(
      cloneDeep({
        ...advertisments[advertisments.length - 1],
        _id: uniqueId(),
      }),
    );

    setOpenAdvertismentIndex(advertisments.length);
  }

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <p className="text-blue-700 mb-2">
        <a href="https://docs.fluidplayer.com/docs/configuration/ads/#adlist" target="_blank">
          Open Advertisment documentation in a new tab&nbsp;↗️
        </a>
      </p>

      <ul>
        {advertisments.map((advertisment, index) => (
          <AdvertismentForm
            key={advertisment._id}
            control={control}
            update={(...args) => {
              console.log("update from ads form", ...args);

              updateAdvertisment(...args);
            }}
            index={index}
            value={advertisment}
            isOpen={openAdvertismentIndex === index}
            onClickOpen={() => setOpenAdvertismentIndex(index)}
            onClickRemove={() => removeAdvertisment(index)}
          />
        ))}

        <li
          className="border-2 rounded border-slate-400 mb-4 p-2 bg-top relative w-full text-left flex justify-between items-center cursor-pointer"
          onClick={addNewAdvertisment}
        >
          ➕ Add new Advertisment
        </li>
      </ul>

      <SubmitButton />
    </form>
  );
}
