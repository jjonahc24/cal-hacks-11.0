import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Ensure CSS is imported

const MyDatePicker = (props) => {

  return (
    <DatePicker
      selected={props.selectedDate}
      onChange={props.setDate}
    />
  );
};

export default MyDatePicker;
