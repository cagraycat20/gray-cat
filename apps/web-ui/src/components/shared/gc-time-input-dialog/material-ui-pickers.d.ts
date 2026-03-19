declare module 'material-ui-pickers' {
  import { MaterialUiPickersDate } from 'material-ui-pickers/typings/date';
  import { Component } from 'react';

  export interface TimePickerViewProps {
    date: MaterialUiPickersDate;
    ampm?: boolean;
    onHourChange: (date: MaterialUiPickersDate) => void;
    onMinutesChange: (date: MaterialUiPickersDate) => void;
    onSecondsChange: (date: MaterialUiPickersDate) => void;
    type: 'hours' | 'minutes' | 'seconds';
    minutesStep: number;
  }

  export class TimePickerView extends Component<TimePickerViewProps> {
  }

}

declare module 'material-ui-pickers/TimePicker/components/TimePickerView' {
  export { TimePickerViewProps } from 'material-ui-pickers';
  import { TimePickerView } from 'material-ui-pickers';
  export default TimePickerView;
}
