import { useFormContext } from "react-hook-form"
import { FormMenuItem, formMenuItems } from "@/constants/form-menu-item"
import { ConfiguratorOptions } from "@/types/configurator-options"
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
      <ul className="flex max-w-lg flex-col gap-1 overflow-hidden">
        {formMenuItems.map((menuItem) => (
          <li
            key={menuItem.key}
            onClick={() => handleMenuChange(menuItem)}
            className={`cursor-pointer whitespace-nowrap pl-2
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
