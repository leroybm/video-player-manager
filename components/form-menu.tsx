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
    <aside aria-labelledby="navTitle">
      <h2
        id="navTitle"
        className="mb-1.5">
        Configuration
      </h2>
      <nav
        role="tablist"
        tabIndex={0}
        className="flex max-w-lg flex-col gap-1 overflow-hidden">
        {formMenuItems.map((menuItem) => (
          <button
            role="tab"
            aria-controls={menuItem.key}
            aria-selected={selectedItem === menuItem.key}
            key={menuItem.key}
            onClick={() => handleMenuChange(menuItem)}
            className={`cursor-pointer whitespace-nowrap pl-2 text-left
              ${
                selectedItem === menuItem.key ?
                  "!text-blue-600"
                : "text-slate-500"
              }
              `}>
            {menuItem.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
