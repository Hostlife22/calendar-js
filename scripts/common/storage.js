import { createEvent, getEventList } from './eventGateway.js';
import { getStartOfWeek } from './time.utils.js';

const initialDataObject = {
  displayedWeekStart: getStartOfWeek(new Date()),
  eventIdToDelete: null,
  eventIdToUpdate: null,
  events: [],
};

export function isEmptyDatabase(data) {
  const condition = !!data.length;

  return condition ? data : createEvent(initialDataObject).then(() => getEventList());
}

export const getPropertyValue = (arr, prop) => arr.find((obj) => obj.hasOwnProperty(prop))[prop];
