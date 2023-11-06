import { format, parse } from 'date-fns';

export function isDateInEvents(selectedDate, event) {
  // Convert the selected date to a Date object
  const selectedDateObj = createDateWithoutTime(selectedDate);

  // Convert the event date string to a Date object
  const eventDateObj = createDateWithoutTime(convertDateFormat(event));

  // Check if the selected date matches the event date (omitting the time)
  if (
    selectedDateObj.getDate() === eventDateObj.getDate() &&
    selectedDateObj.getMonth() === eventDateObj.getMonth() &&
    selectedDateObj.getFullYear() === eventDateObj.getFullYear()
  ) {
    return true; // Date is present in the events
  }

  return false; // Date is not found in the events
}

function createDateWithoutTime(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day); // Month is 0-based, so subtract 1 from the month
}

function convertDateFormat(inputDate) {
  try {
    const parsedDate = parse(inputDate, 'MMM d, yyyy h:mm a', new Date());
    const formattedDate = format(parsedDate, 'yyyy-MM-dd');
    return formattedDate;
  } catch (error) {
    console.error('Invalid input date format:', error);
    return null;
  }
}
