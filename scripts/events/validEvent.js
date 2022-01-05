import { getPropertyValue } from '../common/storage.js';
import { getDateTime } from '../common/time.utils.js';

const error = document.querySelector('.error');
function getIntersection(event, events) {
  return events.find(
    ({ start, end }) => event.start < new Date(end) && new Date(start) < event.end,
  );
}

export function isIntersection(enteredValue, data) {
  const events = getPropertyValue(data, 'events');
  const idToUpdate = document.querySelector('.popup__description').getAttribute('data-event-id');
  const filteredEvents = events.filter(({ id }) => id !== idToUpdate);
  const intersection =
    idToUpdate !== null
      ? getIntersection(enteredValue, filteredEvents)
      : getIntersection(enteredValue, events);

  return intersection === undefined;
}

export function eventValidator(startTime, endTime, date) {
  const MAX_DURATION = 360;
  const TIMESTAMP_IN_MINUTES = 60000;
  const duration =
    (getDateTime(date, endTime) - getDateTime(date, startTime)) / TIMESTAMP_IN_MINUTES;

  const message =
    duration <= 0
      ? 'Incorrect time entry'
      : duration >= MAX_DURATION
      ? 'The event should not last more than 6 hours'
      : null;

  error.textContent = message;

  return message === null;
}

export function checkingForDeletion(data) {
  const events = getPropertyValue(data, 'events');
  const eventIdToDelete = document
    .querySelector('.popup__description')
    .getAttribute('data-event-id');

  const TIMESTAMP_IN_SECONDS = 1000;
  const TIMESTAMP_IN_MINUTES = 60;
  const BEFORE_THE_EVENT_STARTS = 15;

  const filteredEvents = events.find(({ id }) => id === eventIdToDelete);
  const currentTime = new Date();
  const timeDifference = Math.abs(
    (new Date(filteredEvents.start) - currentTime) / (TIMESTAMP_IN_SECONDS * TIMESTAMP_IN_MINUTES),
  );

  return timeDifference > BEFORE_THE_EVENT_STARTS;
}
