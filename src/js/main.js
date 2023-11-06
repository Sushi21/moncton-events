import '../style/style.css';
import * as data from '../data/events.json';
import * as dropdowns from './dropdowns';
import * as events from './events';
import { initialize } from './event-listeners';
import * as scroll from './scroll-to-top';

window.data = data;
dropdowns.populateDropdownOptions();
events.displayEvents({});
initialize();
