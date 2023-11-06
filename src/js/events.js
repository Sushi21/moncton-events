import { isDateInEvents } from './date-utils';

export function displayEvents(filter) {
  const events = data.default;
  const table = document
    .querySelector('table')
    .getElementsByTagName('tbody')[0];

  // Clear existing table rows
  while (table.rows.length > 0) {
    table.deleteRow(0);
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
