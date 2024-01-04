import { useState } from "react"
import { FormMenu } from "./form-menu"
import { transformFluidPlayerConfiguration } from "@/lib/client"
import { ConfiguratorOptions } from "@/types"
import { formMenuItems } from "@/constants"

interface FluidPlayerConfiguratorProps {
  onSave: (newOptions: Partial<ConfiguratorOptions>) => void
}

export function FluidPlayerConfigurator({
  onSave,
}: FluidPlayerConfiguratorProps) {
  const [openedMenu, setOpenedMenu] = useState(formMenuItems[0].key)

  /**
   * Changes selected menu if there is no form errors
   */
  function handleChangeMenu({ key }: { key: string }) {
    setOpenedMenu(key)
  }

  /**
   * Handles saving and disabling the dirty form state
   */
  function handleSave(options: Partial<ConfiguratorOptions>) {
    onSave({
      ...options,
      playerConfiguration: transformFluidPlayerConfiguration(
        options?.playerConfiguration || {}
      ),
    })
  }

  const { FormComponent, label } =
    formMenuItems.find((menuItem) => menuItem.key === openedMenu) || {}

  return (
    <div className="grid grid-cols-[minmax(160px,_1fr)_3fr] gap-2">
      <FormMenu
        onMenuChange={handleChangeMenu}
        onSave={handleSave}
        selectedItem={openedMenu}
      />
      {FormComponent && <div>
        <h2 className="text-lg mb-1.5">{label}</h2>
        <FormComponent onSave={handleSave} />
      </div>}
    </div>
  )
}
