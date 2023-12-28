import { useFormContext } from "react-hook-form"
import { FormMenuItem, formMenuItems } from "@/constants/form-menu-item"
import { ConfiguratorOptions } from "@/models/configurator-options"
import { useAlertService } from "@/services/use-alert-service"

interface FormMenuProps {
  onMenuChange: (menuItem: FormMenuItem) => void
  selectedItem: string
  onSave: (value: ConfiguratorOptions) => void
}

export function FormMenu({
  onMenuChange,
  onSave,
  selectedItem,
}: FormMenuProps) {
  const {
    getValues,
    trigger,
    formState: { isDirty, isValid },
  } = useFormContext<ConfiguratorOptions>()
  const alertService = useAlertService()

  function handleMenuChange(menuItem: FormMenuItem) {
    if (!isDirty) {
      return onMenuChange(menuItem)
    }

    trigger()

    if (isValid) {
      onSave(getValues())
      return onMenuChange(menuItem)
    }

    alertService.error(
      "Some fields have errors. Please check your input and try again."
    )
  }

  return (
    <div>
      <p className="mb-1.5">Configuration</p>
      <ul className="flex flex-col max-w-lg overflow-hidden gap-1">
        {formMenuItems.map((menuItem) => (
          <li
            key={menuItem.key}
            onClick={() => handleMenuChange(menuItem)}
            className={`pl-2 whitespace-nowrap cursor-pointer
              ${
                selectedItem === menuItem.key ?
                  "!text-blue-500"
                : "text-slate-500"
              }
              `}>
            {menuItem.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
