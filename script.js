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
        if (
          (!filter.date || event['Date & Time'].includes(filter.date)) &&
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
          cell5.innerHTML = event['Cost'];
          cell6.innerHTML = event['Tickets'];
        }
      });
    })
    .catch((error) => console.error('Error fetching events: ', error));
}

// Function to populate dropdown options
function populateDropdownOptions() {
  fetch('events.json')
    .then((response) => response.json())
    .then((data) => {
      const events = data.Events;
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
    });
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
