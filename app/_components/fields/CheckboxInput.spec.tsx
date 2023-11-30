import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { CheckboxInput } from "./CheckboxInput";

const MockForm = ({
  formValuesUpdated,
  onChange,
}: {
  formValuesUpdated?: (args: FieldValues) => void;
  onChange?: () => void;
}) => {
  const { register, watch } = useForm();
  const formValues = watch();

  useEffect(() => {
    if (formValuesUpdated) formValuesUpdated(formValues);
  }, [formValues]);

  return <CheckboxInput register={register} fieldName="isToggled" onChange={onChange} />;
};

describe("CheckboxInput", () => {
  it("should render", () => {
    render(<MockForm />);
  });

  it("should toggle on", async () => {
    render(<MockForm />);

    fireEvent.click(screen.getByRole("checkbox"));

    const input = await screen.getByRole("checkbox");
    expect(input).toBeChecked();
  });

  it("should toggle off", async () => {
    render(<MockForm />);

    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("checkbox"));

    const input = await screen.getByRole("checkbox");
    expect(input).not.toBeChecked();
  });

  it("should change form value", async () => {
    // This test is a little redudant since it's testing RHF
    // But it's a nice POC
    let formValue;

    render(<MockForm formValuesUpdated={(value) => (formValue = value)} />);

    fireEvent.click(screen.getByRole("checkbox"));

    await new Promise((resolve) => setTimeout(resolve));
    expect(formValue).toEqual({ isToggled: true });
  });

  it("should emit on change event", async () => {
    let hasChanged = false;

    render(<MockForm onChange={() => (hasChanged = true)} />);

    fireEvent.click(screen.getByRole("checkbox"));

    await new Promise((resolve) => setTimeout(resolve));
    expect(hasChanged).toBeTruthy();
  });
});
