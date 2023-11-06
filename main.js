import './style.css'

import { format, parse } from 'date-fns'

import * as data from './events.json';

function displayEvents(filter) {  
  const events = data.default;
  const table = document.querySelector('table');

  // Clear existing table rows
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  events.forEach((event) => {
    if (
      (!filter.date || isDateInEvents(filter.date, event['Date & Time'])) &&
      (!filter.type || event['Event Type'] === filter.type) &&
      (!filter.venue || event['Venue'] === filter.venue)
    ) {
      const row = table.insertRow(table.rows.length);
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);
      const cell5 = row.insertCell(4);
      const cell6 = row.insertCell(5);

      cell1.innerHTML = event['Date & Time'];
      cell2.innerHTML = event['Event Type'];
      cell3.innerHTML = event['Event Information'];
      cell4.innerHTML = event['Venue'];
      cell5.innerHTML = event['Price'];
      cell6.innerHTML = event['Tickets'];
    }
  });
}

// Function to populate dropdown options
function populateDropdownOptions() {
  const events = data.default;
  const typeFilter = document.getElementById('typeFilter');
  const venueFilter = document.getElementById('venueFilter');

  const eventTypes = new Set();
  const venues = new Set();

  events.forEach((event) => {
    eventTypes.add(event['Event Type']);
    venues.add(event['Venue']);
  });

  for (let type of eventTypes) {
    const option = document.createElement('option');
    option.value = type;
    option.textContent = type;
    typeFilter.appendChild(option);
  }

  for (let venue of venues) {
    const option = document.createElement('option');
    option.value = venue;
    option.textContent = venue;
    venueFilter.appendChild(option);
  }
}

function isDateInEvents(selectedDate, event) {
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

populateDropdownOptions();

// Event listeners for filter elements
document.getElementById('dateFilter').addEventListener('input', () => {
  const dateValue = document.getElementById('dateFilter').value;
  displayEvents({ date: dateValue });
});

document.getElementById('typeFilter').addEventListener('change', () => {
  const typeValue = document.getElementById('typeFilter').value;
  displayEvents({ type: typeValue });
});

document.getElementById('venueFilter').addEventListener('change', () => {
  const venueValue = document.getElementById('venueFilter').value;
  displayEvents({ venue: venueValue });
});

displayEvents({});

