import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ExtendedAdOptions, ExtendedFluidPlayerOptions } from "_models";
import { omit, uniqueId } from "lodash";
import { useFieldArray, useForm } from "react-hook-form";
import { AdvertismentForm } from "./AdvertismentForm";

const DummyComponent = ({
  openIndex = 0,
  defaultValues = {} as ExtendedFluidPlayerOptions,
  onOpen,
  onRemove,
  onUpdate,
}: {
  openIndex?: number;
  defaultValues?: ExtendedFluidPlayerOptions;
  onOpen?: (i: number) => void;
  onRemove?: (i: number) => void;
  onUpdate?: (...args: unknown[]) => void;
}) => {
  const { control } = useForm<ExtendedFluidPlayerOptions>({
    defaultValues: defaultValues,
  });
  const { fields: advertisments, update, remove } = useFieldArray({
    name: "vastOptions.adList",
    control,
  });

  return (
    <>
      {advertisments.map((ad, i) => (
        <AdvertismentForm
          key={ad._id}
          control={control}
          update={onUpdate ? (...args) => { onUpdate(...args); update(...args); } : (...args) => update(...args)}
          index={i}
          value={ad}
          isOpen={openIndex === i}
          onClickOpen={onOpen ? () => onOpen(i) : () => undefined}
          onClickRemove={onRemove ? () => onRemove(i) : () => remove(i)}
        />
      ))}
    </>
  );
};

describe("AdvertismentForm", () => {
  it("should render empty", () => {
    render(<DummyComponent />);
  });

  it("should render one", async () => {
    const adList = [{ _id: uniqueId(), roll: 'preRoll', vastTag: '' }] as ExtendedAdOptions[];
    // @ts-expect-error
    render(<DummyComponent defaultValues={{ vastOptions: { adList } }} />)

    const title = screen.findByText(adList[0].roll);
    expect(title).toBeTruthy();
  });

  it("should render two", async () => {
    const adList = [
        { _id: uniqueId(), roll: 'preRoll', vastTag: '' },
        { _id: uniqueId(), roll: 'midRoll', vastTag: '', timer: 10 },
    ] as ExtendedAdOptions[];
    // @ts-expect-error
    render(<DummyComponent defaultValues={{ vastOptions: { adList } }} />)

    const preRollTitle = screen.findByText(adList[0].roll);
    const midRollTitle = screen.findByText(adList[1].roll);
    expect(preRollTitle).toBeTruthy();    
    expect(midRollTitle).toBeTruthy();    
  });

  it("should fill form for preRoll", async () => {
    const user = userEvent.setup();
    const adList = [{ _id: uniqueId(), roll: 'preRoll', vastTag: '' }] as ExtendedAdOptions[];
    // @ts-expect-error
    render(<DummyComponent defaultValues={{ vastOptions: { adList } }} />)

    await user.pointer({ target: screen.getByLabelText('Vast Tag'), keys: '[MouseLeft]' });
    await user.keyboard('https://adserver.com/test');

    expect(screen.getByLabelText("Vast Tag")).toHaveValue("https://adserver.com/test");
  });

  it('should fill form for midRoll', async () => {
    const user = userEvent.setup();
    const adList = [{ _id: uniqueId(), roll: 'midRoll', vastTag: 'https://' }] as ExtendedAdOptions[];
    // @ts-expect-error
    render(<DummyComponent defaultValues={{ vastOptions: { adList } }} />)

    await user.type(screen.getByLabelText('Timer'), '30%');

    expect(screen.getByLabelText("Timer")).toHaveValue("30%");
  });

  it('should change displayed form', async () => {
    const user = userEvent.setup();
    const adList = [{ _id: uniqueId(), roll: 'preRoll', vastTag: 'https://' }] as ExtendedAdOptions[];
    // @ts-expect-error
    render(<DummyComponent defaultValues={{ vastOptions: { adList } }} />)

    await user.selectOptions(screen.getByRole('combobox', { name: 'Roll Type' }), 'midRoll');
    await user.type(screen.getByLabelText('Timer'), '30%');

    expect(screen.getByLabelText("Timer")).toHaveValue("30%");
  });

  it('should open a form', async () => {
    const mockOpen = jest.fn();
    const adList = [
      { _id: uniqueId(), roll: 'preRoll', vastTag: 'https://' },
      { _id: uniqueId(), roll: 'postRoll', vastTag: 'https://' }
    ] as ExtendedAdOptions[];
    // @ts-expect-error
    render(<DummyComponent onOpen={mockOpen} defaultValues={{ vastOptions: { adList } }} />)

    await userEvent.click(screen.getAllByRole('listitem')[1]);
    
    expect(mockOpen).toHaveBeenCalledWith(1);
  });

  it('should delete item', async () => {
    const mockRemove = jest.fn();
    const adList = [
      { _id: uniqueId(), roll: 'preRoll', vastTag: 'https://' },
      { _id: uniqueId(), roll: 'postRoll', vastTag: 'https://' }
    ] as ExtendedAdOptions[];
    // @ts-expect-error
    render(<DummyComponent onRemove={mockRemove} defaultValues={{ vastOptions: { adList } }} />)

    await userEvent.click(screen.getAllByText('Remove')[1]);
    
    expect(mockRemove).toHaveBeenCalledWith(1);
  });

  it('should update with every entry', async () => {
    let lastUpdateValue = {} as ExtendedAdOptions;
    const mockUpdate = jest.fn((_, value) => lastUpdateValue = value);
    const user = userEvent.setup();
    const adList = [{ _id: uniqueId(), roll: 'preRoll', vastTag: '' }] as ExtendedAdOptions[];
    const fillInput = async (label: string, text: string) => {
      await user.pointer({ target: screen.getByLabelText(label), keys: '[MouseLeft]' });
      await user.keyboard(text);
    }
    // @ts-expect-error
    render(<DummyComponent onUpdate={mockUpdate} defaultValues={{ vastOptions: { adList } }} />)

    await fillInput('Vast Tag', 'https://adserver.com/test');
    await user.selectOptions(screen.getByRole('combobox', { name: 'Roll Type' }), 'midRoll');
    await fillInput('Timer', '120');
    await fillInput('Fallback Vast Tags (Comma separated)', 'https://adserver.com/test1,https://adserver.com/test2');
    await fillInput('Video Ad Text', 'Ad Text');
    await user.selectOptions(screen.getByRole('combobox', { name: 'Video Ad Text Postion' }), 'bottom left');
    await user.pointer({ target: screen.getByLabelText('Video Ad Clickable'), keys: '[MouseLeft]' });
    await user.selectOptions(screen.getByRole('combobox', { name: 'Banner Vertical Alignment' }), 'middle');
    await fillInput('Banner Ad Duration', '20');
    await user.selectOptions(screen.getByRole('combobox', { name: 'Banner Size' }), '728x90');

    expect(omit(lastUpdateValue, ['id', '_id'])).toEqual({
      "adClickable": true,
      "adText": "Ad Text", 
      "adTextPosition": "bottom left",
      "fallbackVastTags": "https://adserver.com/test1,https://adserver.com/test2",
      "nonLinearDuration": "20",
      "roll": "midRoll",
      "size": "728x90",
      "timer": "120",
      "vAlign": "middle",
      "vastTag": "https://adserver.com/test"
    });
  });

  it('should show validate Vast Tag', async () => {
    const user = userEvent.setup();
    const adList = [{ _id: uniqueId(), roll: 'preRoll', vastTag: '' }] as ExtendedAdOptions[];
    // @ts-expect-error
    render(<DummyComponent defaultValues={{ vastOptions: { adList } }} />)

    await user.pointer({ target: screen.getByLabelText('Vast Tag'), keys: '[MouseLeft]' });
    await user.keyboard('1');

    expect(screen.getByText("Must be longer than 3")).toBeTruthy();

    await user.keyboard('[Backspace]');

    expect(screen.getByText("This field is required")).toBeTruthy();

    await user.keyboard('https://example.com/');

    expect(screen.getByLabelText("Vast Tag")).toHaveValue("https://example.com/");
  });

  it('should show validate Timer', async () => {
    const user = userEvent.setup();
    const adList = [{ _id: uniqueId(), roll: 'midRoll', vastTag: '' }] as ExtendedAdOptions[];
    // @ts-expect-error
    render(<DummyComponent defaultValues={{ vastOptions: { adList } }} />)

    await user.pointer({ target: screen.getByLabelText('Timer'), keys: '[MouseLeft]' });
    await user.keyboard('one');

    expect(screen.getByText("Field must be a number or a percentage between 1% and 99%")).toBeTruthy();

    await user.keyboard('[Backspace][Backspace][Backspace]120%');

    expect(screen.getByText("Field must be a number or a percentage between 1% and 99%")).toBeTruthy();

    await user.keyboard('[Backspace][Backspace][Backspace]20');

    expect(screen.getByLabelText("Timer")).toHaveValue("20");

    await user.keyboard('%');

    expect(screen.getByLabelText("Timer")).toHaveValue("20%");
  });

  it('should show validate Fallback Vast Tags', async () => {
    const user = userEvent.setup();
    const adList = [{ _id: uniqueId(), roll: 'preRoll', vastTag: 'https://' }] as ExtendedAdOptions[];
    // @ts-expect-error
    render(<DummyComponent defaultValues={{ vastOptions: { adList } }} />)
    const getTarget = (withPatterError?: boolean) => screen.getByRole('textbox', {
      name: `Fallback Vast Tags (Comma separated)${withPatterError ? ' Should be a string of URLs separated by commas' : ''}`
    });

    await user.pointer({ target: getTarget(), keys: '[MouseLeft]' });
    await user.keyboard('https://example.com/; https://example.com/');

    expect(screen.getByText("Should be a string of URLs separated by commas")).toBeTruthy();

    await user.clear(getTarget(true));
    await user.keyboard('https://example.com/ https://example.com/');

    expect(screen.getByText("Should be a string of URLs separated by commas")).toBeTruthy();

    await user.clear(getTarget(true))
    await user.keyboard('https://example.com/');

    expect(getTarget()).toHaveValue('https://example.com/');

    await user.clear(getTarget())
    await user.keyboard('https://example.com/,https://example.com/');

    expect(getTarget()).toHaveValue('https://example.com/,https://example.com/');
  });
});
