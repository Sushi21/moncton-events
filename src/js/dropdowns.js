// Function to populate dropdown options
export function populateDropdownOptions() {
  const events = data.default;
  const typeFilter = document.getElementById('typeFilter');
  const venueFilter = document.getElementById('venueFilter');

  const eventTypes = [
    ...new Set(events.map((item) => item['Event Type'])),
  ].sort();
  const venues = [...new Set(events.map((item) => item['Venue']))].sort();

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
