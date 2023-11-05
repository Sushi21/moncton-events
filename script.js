// Function to fetch and display events
function displayEvents(filter) {
  fetch('events.json')
    .then((response) => response.json())
    .then((data) => {
      const events = data.Events;
      const table = document.querySelector('table');

      // Clear existing table rows
      while (table.rows.length > 1) {
        table.deleteRow(1);
      }

      events.forEach((event) => {
        if (!filter || Object.values(event).includes(filter)) {
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
          cell5.innerHTML = event['Cost'];
          cell6.innerHTML = event['Tickets'];
        }
      });
    })
    .catch((error) => console.error('Error fetching events: ', error));
}

displayEvents();

// Event listeners for filter buttons
document.getElementById('filterDate').addEventListener('click', () => {
  const filterValue = prompt(
    'Enter a Date & Time (e.g., "Nov 1, 2023 7:00pm"):'
  );
  displayEvents(filterValue);
});

document.getElementById('filterType').addEventListener('click', () => {
  const filterValue = prompt('Enter an Event Type:');
  displayEvents(filterValue);
});

document.getElementById('filterVenue').addEventListener('click', () => {
  const filterValue = prompt('Enter a Venue:');
  displayEvents(filterValue);
});
