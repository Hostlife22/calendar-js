import { openModal } from '../common/modal.js';
import { getPropertyValue } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';

const getClassNames = (day, classNames) =>
  classNames.map((className) =>
    new Date(new Date().toDateString()).getTime() === day.getTime()
      ? `${className} ${className}_active`
      : className,
  );

const createHeader = (day) => {
  const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const classNames = ['day-label__day-name', 'day-label__day-number'];
  const [dayName, dayNumber] = getClassNames(day, classNames);

  return `
  <div class="calendar__day-label day-label">
	<span class="${dayName}">${daysOfWeek[day.getDay()]}</span>
	<span class="${dayNumber}">${day.getDate()}</span>
  </div>`;
};

export const renderHeader = (eventData) => {
  const weekStart = getPropertyValue(eventData, 'displayedWeekStart');
  const daysOfWeekArray = generateWeekRange(weekStart);
  const headerElement = document.querySelector('.calendar__header');

  headerElement.innerHTML = '';
  headerElement.innerHTML = daysOfWeekArray.map((day) => createHeader(day)).join(' ');
};

const createEventBtn = document.querySelector('.create-event-btn');
createEventBtn.addEventListener('click', openModal);
