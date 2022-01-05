import { createNumbersArray } from '../common/createNumbersArray.js';
import { getPropertyValue } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import lineTime from './timeLine.js';

const generateDay = () =>
  createNumbersArray(0, 23)
    .map((timeSlot) => `<span class="calendar__time-slot" data-slot="${timeSlot}"></span>`)
    .join(' ');

const createDaysOfWeek = (weekRange) => {
  const generatedDay = generateDay();

  return weekRange
    .map((day) => `<div class="calendar__day" data-day="${day.getDate()}">${generatedDay}</div>`)
    .join(' ');
};

export const renderWeek = (eventData) => {
  const weekStart = getPropertyValue(eventData, 'displayedWeekStart');
  const weekRange = generateWeekRange(weekStart);
  const calendarWeek = document.querySelector('.calendar__week');

  calendarWeek.innerHTML = '';
  calendarWeek.innerHTML = createDaysOfWeek(weekRange);

  lineTime.startRender(weekStart);
};
