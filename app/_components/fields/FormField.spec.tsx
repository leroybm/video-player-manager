import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { FormField } from "./FormField";

describe("FormField", () => {
  it("should render", () => {
    render(
      <FormField label="Test">
        <input type="text" />
      </FormField>,
    );
  });

  it("should have an input label", async () => {
    render(
      <FormField label="Test">
        <input type="text" />
      </FormField>,
    );

    const input = await screen.getByLabelText("Test");
    expect(input).toBeTruthy();
  });

  it("should have the label text after the input for checkbox", async () => {
    render(
      <FormField label="Test" forCheckbox>
        <input type="checkbox" />
      </FormField>,
    );

    const input = await screen.getByLabelText("Test");
    const label = input.parentElement;
    const paragraph = await screen.getByText("Test");

    expect(input.compareDocumentPosition(paragraph)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(label).toHaveClass("inline-block");
  });

  it("should display error message", async () => {
    render(
      <FormField label="Test" errorMessage="Oops">
        <input type="text" />
      </FormField>,
    );

    const error = await screen.getByText("Oops");

    expect(error).toBeTruthy();
  });

  it("should display external link", async () => {
    render(
      <FormField label="Test" externalLink="https://example.com/">
        <input type="text" />
      </FormField>,
    );

    const anchor = (await screen.getByTitle("Open Test documentation in a new tab")) as HTMLAnchorElement;

    expect(anchor).toBeTruthy();
    expect(anchor.href).toBe("https://example.com/");
    expect(anchor.target).toBe("_blank");
  });
});
