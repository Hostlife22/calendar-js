import { renderWeek } from './calendar/calendar.js';
import { renderHeader } from './calendar/header.js';
import { renderTimescale } from './calendar/timescale.js';
import { getEventList } from './common/eventGateway.js';
import { isEmptyDatabase } from './common/storage.js';
import { initEventForm } from './events/createEvent.js';
import { renderEventColor } from './events/eventColors.js';
import { renderEvents } from './events/events.js';
import { initNavigation } from './header/navigation.js';

document.addEventListener('DOMContentLoaded', () => {
  getEventList()
    .then((data) => isEmptyDatabase(data))
    .then((eventData) => {
      renderTimescale();
      renderWeek(eventData);
      renderEvents(eventData);
      renderHeader(eventData);
      initNavigation(eventData);
      initEventForm();
      renderEventColor();
    })
    .catch(() => alert('Internal Server Error'));
});
