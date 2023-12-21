import { cloneDeep, uniqueId } from "lodash";
import { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ConfiguratorOptions, ExtendedAdOptions } from "../../models";
import { AdvertisementForm } from "./AdvertisementForm";
import { SubmitButton } from "../SubmitButton";

const advertisementDefaults: ExtendedAdOptions = {
  _id: uniqueId(),
  roll: "preRoll",
  vastTag: "https://",
  adClickable: true,
} as ExtendedAdOptions;

/**
 * This form is for the root options that can be found at https://docs.fluidplayer.com/docs/configuration/ads/#adlist
 */
export function AdvertisementListForm({
  onSave,
}: {
  onSave: (newOptions: Partial<ConfiguratorOptions>) => void;
}) {
  const { handleSubmit, watch, control } = useFormContext<ConfiguratorOptions>();;
  const {
    fields: advertisements,
    append: appendAdvertisement,
    update: updateAdvertisement,
    remove: removeAdvertisement,
  } = useFieldArray({
    name: "playerConfiguration.vastOptions.adList",
    control,
  });
  const [openAdvertisementIndex, setOpenAdvertisementIndex] = useState<null | number>(null);

  /**
   * Appends new advertisements by either creating it from the defaults or by
   * copying the last one. Opens newly created advertisement.
   */
  function addNewAdvertisement() {
    if (advertisements.length === 0) {
      return appendAdvertisement(cloneDeep(advertisementDefaults));
    }

    appendAdvertisement(
      cloneDeep({
        ...advertisements[advertisements.length - 1],
        _id: uniqueId(),
      }),
    );

    setOpenAdvertisementIndex(advertisements.length);
  }

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <p className="text-blue-700 mb-2">
        <a href="https://docs.fluidplayer.com/docs/configuration/ads/#adlist" target="_blank">
          Open Advertisement documentation in a new tab&nbsp;↗️
        </a>
      </p>

      <ul>
        {advertisements.map((advertisement, index) => (
          <AdvertisementForm
            key={advertisement._id}
            control={control}
            update={(...args) => {
              console.log("update from ads form", ...args);

              updateAdvertisement(...args);
            }}
            index={index}
            value={advertisement}
            isOpen={openAdvertisementIndex === index}
            onClickOpen={() => setOpenAdvertisementIndex(index)}
            onClickRemove={() => removeAdvertisement(index)}
          />
        ))}

        <li
          className="border-2 rounded border-slate-400 mb-4 p-2 bg-top relative w-full text-left flex justify-between items-center cursor-pointer"
          onClick={addNewAdvertisement}
        >
          ➕ Add new Advertisement
        </li>
      </ul>
    </form>
  );
}
