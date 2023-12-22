import {
  AdvertisementListForm,
  CallbacksForm,
  CaptionsForm,
  ContextMenuForm,
  ControlBarForm,
  HtmlOnPauseForm,
  LayoutForm,
  LogoForm,
  MetadataForm,
  MiniPlayerForm,
  PersistentSettingsForm,
  TheaterModeForm,
  TimelinePreviewForm
} from "@/components/forms";

type FormComponents =
  | typeof MetadataForm
  | typeof LayoutForm
  | typeof MiniPlayerForm
  | typeof LogoForm
  | typeof ControlBarForm
  | typeof TimelinePreviewForm
  | typeof AdvertisementListForm
  | typeof HtmlOnPauseForm
  | typeof TheaterModeForm
  | typeof CallbacksForm
  | typeof CaptionsForm
  | typeof PersistentSettingsForm
  | typeof ContextMenuForm;

export interface FormMenuItem {
  label: string;
  key: string;
  FormComponent: FormComponents;
}

export const formMenuItems: FormMenuItem[] = [
  {
    label: "Metadata",
    key: "metadata",
    FormComponent: MetadataForm,
  },
  {
    label: "Layout",
    key: "layout",
    FormComponent: LayoutForm,
  },
  {
    label: "Layout - Logo",
    key: "logo",
    FormComponent: LogoForm,
  },
  {
    label: "Layout - Control Bar",
    key: "controlBar",
    FormComponent: ControlBarForm,
  },
  {
    label: "Timeline Preview",
    key: "timelinePreview",
    FormComponent: TimelinePreviewForm,
  },
  {
    label: "Mini Player",
    key: "miniPlayer",
    FormComponent: MiniPlayerForm,
  },
  {
    label: "Advertisement",
    key: "advertisement",
    FormComponent: AdvertisementListForm,
  },
  {
    label: "HTML On Pause Block",
    key: "htmlOnPauseBlock",
    FormComponent: HtmlOnPauseForm,
  },
  {
    label: "Theater Mode",
    key: "theaterMode",
    FormComponent: TheaterModeForm,
  },
  {
    label: "Captions",
    key: "captions",
    FormComponent: CaptionsForm,
  },
  {
    label: "Persistent Settings",
    key: "persistentSettings",
    FormComponent: PersistentSettingsForm,
  },
  {
    label: "Context Menu",
    key: "contextMenu",
    FormComponent: ContextMenuForm,
  },
  {
    label: "Advanced - Callbacks",
    key: "callbacks",
    FormComponent: CallbacksForm,
  },
];
