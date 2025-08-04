import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (selectedDate) => {
    setSelectedDate(selectedDate);

  };

  return (
    <div className="flex flex-col">
      <small>Select a date</small>
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        showTimeSelect
        dateFormat="Pp"
        placeholderText="Select a date and time"
        className="border-2 rounded-lg border-slate-950 px-2 w-full"
      />

    </div>
  );
};

export default Calendar;
