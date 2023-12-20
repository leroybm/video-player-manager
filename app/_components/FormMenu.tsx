import { FormMenuItem, formMenuItems } from "_constants/formMenuItem";
import { ConfiguratorOptions } from "_models";
import { useFormContext } from "react-hook-form";

interface FormMenuProps {
  onMenuChange: (menuItem: FormMenuItem) => void;
  selectedItem: string;
  onSave: (value: ConfiguratorOptions) => void;
}

export function FormMenu({ onMenuChange, onSave, selectedItem }: FormMenuProps) {
  const { getValues, trigger, formState: { isDirty, isValid }  } = useFormContext<ConfiguratorOptions>();

  function handleMenuChange(menuItem: FormMenuItem) {
    if (!isDirty) {
      onMenuChange(menuItem);
    }

    trigger();

    if (isValid) {
      onSave(getValues());
      onMenuChange(menuItem);
    }
  }

  return (
    <div>
      <p className="mb-1.5">Configuration</p>
      <ul className="flex flex-col max-w-lg overflow-hidden gap-1">
        {formMenuItems.map((menuItem, index) => (
          <li
            key={menuItem.key}
            onClick={() => handleMenuChange(menuItem)}
            className={`pl-2 whitespace-nowrap ${selectedItem === menuItem.key ? "!text-blue-500" : "text-slate-500"}`}
          >
            {menuItem.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
