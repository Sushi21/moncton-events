import { displayEvents } from './events';

export function initialize() {
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

  document.getElementById('goTop').addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });

  document.getElementById('clearFilters').addEventListener('click', () => {
    clearFilters();
  });
}

function clearFilters() {
  var typeFilter = document.getElementById('typeFilter');
  var venueFilter = document.getElementById('venueFilter');
  var dateFilter = document.getElementById('dateFilter');
  resetSelect(typeFilter);
  resetSelect(venueFilter);
  resetSelect(dateFilter);
}

function resetSelect(select) {
  select.value = '';
  select.dispatchEvent(new Event('change'));
}
