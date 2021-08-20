import React from "react";
import { DatePicker } from "antd";
import moment from "moment";
import { DATE_FORMAT, TODAY } from "components/Utils/constans";

interface DateSelectProps {
  handleSetDate: (selectDate: string) => void;
}

const DateSelect = ({ handleSetDate }: DateSelectProps) => {
  const onDateSelection = (date: any, dateString: string) => {
    handleSetDate(moment(dateString).startOf("day").format(DATE_FORMAT));
  };
  const disablePastDate = (current: any) => {
    return current && current < moment().startOf("day");
  };

  return (
    <DatePicker
      format={DATE_FORMAT}
      defaultValue={TODAY}
      onChange={onDateSelection}
      disabledDate={(current) => disablePastDate(current)}></DatePicker>
  );
};

export default DateSelect;
