import { formMenuItems } from "../constants";
import { ConfiguratorOptions, ExtendedFluidPlayerOptions } from "../models";
import { useEffect, useState } from "react";
import { FormMenu } from "./FormMenu";
import { transformFluidPlayerConfiguration } from "../helpers/client";
import { FormProvider, useForm } from "react-hook-form";
import { cloneDeep } from "lodash";

export function FluidPlayerConfigurator({
  configuration,
  onSave,
}: {
  configuration: ConfiguratorOptions;
  onSave: (newOptions: Partial<ConfiguratorOptions>) => void;
}) {
  const formMethods = useForm<ConfiguratorOptions>({
    defaultValues: { ...cloneDeep(configuration) },
  });
  const [openedMenu, setOpenedMenu] = useState(formMenuItems[0].key);

  useEffect(() => {
    const formValues = formMethods.getValues();
  }, []);

  /**
   * Changes selected menu if there is no form errors
   */
  function handleChangeMenu({ key }: { key: string }) {
    setOpenedMenu(key);
  }

  /**
   * Handles saving and disabling the dirty form state
   */
  function handleSave(options: Partial<ConfiguratorOptions>) {
    onSave({ ...options, playerConfiguration: transformFluidPlayerConfiguration(options?.playerConfiguration || {}) });
  }

  const { FormComponent } = formMenuItems.find((menuItem) => menuItem.key === openedMenu) || {};

  return (
    <FormProvider {...formMethods}>
      <div className="grid grid-cols-[minmax(160px,_1fr)_3fr] gap-2">
        <FormMenu onMenuChange={handleChangeMenu} onSave={handleSave} selectedItem={openedMenu} />
        {FormComponent && (
          <FormComponent configuration={configuration} onSave={handleSave} />
        )}
      </div>
    </FormProvider>
  );
}
