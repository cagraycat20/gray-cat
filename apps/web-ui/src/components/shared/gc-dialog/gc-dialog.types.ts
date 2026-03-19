export interface Props {
  contentClassName?: string;
  actionsClassName?: string;
  open: boolean;
  okButtonText: string;
  noMaxWidth: boolean;
  okButtonIsInactive?: boolean;
  cancelButtonIsInactive?: boolean;
  additionalDialogActions?: JSX.Element | boolean;
  onClose: () => void;
  onOkClick: () => void;
}
