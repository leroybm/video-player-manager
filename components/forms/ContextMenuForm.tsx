import { cloneDeep, uniqueId } from "lodash";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ConfiguratorOptions } from "../../models";
import { ContextMenuLinkForm } from "./ContextMenuLinkForm";
import { CheckboxInput, FormField } from "../fields";

const linkDefaults = {
  id: uniqueId(),
  href: 'https://',
  label: 'New Link',
};

export function ContextMenuForm({
  onSave,
}: {
  onSave: (newOptions: Partial<ConfiguratorOptions>) => void;
}) {
  const { handleSubmit, control, register, formState: { errors } } = useFormContext<ConfiguratorOptions>();
  const {
    fields: links,
    append: appendLink,
    update: updateLink,
    remove: removeLink,
  } = useFieldArray({
    name: "playerConfiguration.layoutControls.contextMenu.links",
    control,
  });
  const [openLinkIndex, setOpenLinkIndex] = useState<null | number>(null);

  /**
   * Appends new link by either creating it from the defaults or by
   * copying the last one. Opens newly created link.
   */
  function addNewLink() {
    if (links.length === 0) {
      return appendLink(cloneDeep(linkDefaults));
    }

    appendLink(
      cloneDeep({
        ...links[links.length - 1],
        _id: uniqueId(),
      }),
    );

    setOpenLinkIndex(links.length);
  }

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <p className="text-blue-700 mb-2">
        <a href="https://docs.fluidplayer.com/docs/configuration/layout/#contextmenu" target="_blank">
          Open Context Menu documentation in a new tab&nbsp;↗️
        </a>
      </p>

      <FormField
        label="Show playback controls"
        forCheckbox
        errorMessage={errors.playerConfiguration?.layoutControls?.contextMenu?.controls?.message}
      >
        <CheckboxInput fieldName={"playerConfiguration.layoutControls.contextMenu.controls"} register={register} />
      </FormField>

      <ul>
        {links.map((link, index) => (
          <ContextMenuLinkForm
            key={link.id}
            control={control}
            update={(...args) => {
              updateLink(...args);
            }}
            index={index}
            value={link}
            isOpen={openLinkIndex === index}
            onClickOpen={() => setOpenLinkIndex(index)}
            onClickRemove={() => removeLink(index)}
          />
        ))}

        <li
          className="border-2 rounded border-slate-400 mb-4 p-2 bg-top relative w-full text-left flex justify-between items-center cursor-pointer"
          onClick={addNewLink}
        >
          ➕ Add new Link
        </li>
      </ul>
    </form>
  );
}
