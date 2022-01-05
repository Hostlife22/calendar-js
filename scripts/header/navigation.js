import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import lineTime from '../calendar/timeLine.js';
import { updateEventList } from '../common/eventGateway.js';
import shmoment from '../common/shmoment.js';
import { getPropertyValue } from '../common/storage.js';
import { getDisplayedMonth, getStartOfWeek } from '../common/time.utils.js';
import { renderEvents } from '../events/events.js';

const navElem = document.querySelector('.navigation');
const displayedMonthElem = document.querySelector('.navigation__displayed-month');

function renderCurrentMonth(eventData) {
  const weekStart = getPropertyValue(eventData, 'displayedWeekStart');
  const dateOfWeek = new Date(weekStart);

  displayedMonthElem.textContent = getDisplayedMonth(dateOfWeek);
  displayedMonthElem.setAttribute('date-week-start', weekStart);
}

const switchCalendar = (btn, day) =>
  btn === 'next'
    ? shmoment(day).add('days', 7).result()
    : shmoment(day).subtract('days', 7).result();

const changeMonthValue = (pressedButton) => {
  const mondayCurrentWeek = displayedMonthElem.getAttribute('date-week-start');

  return pressedButton === 'today'
    ? getStartOfWeek(new Date())
    : switchCalendar(pressedButton, mondayCurrentWeek);
};

const onChangeWeek = (event) => {
  const switchArrow = event.target.closest('button');

  if (switchArrow !== null) {
    const changedValue = { displayedWeekStart: changeMonthValue(switchArrow.dataset.direction) };

    updateEventList(changedValue).then((data) => {
      const newData = [].concat(data);
      renderHeader(newData);
      lineTime.clearLineTime();
      renderWeek(newData);
      renderCurrentMonth(newData);
      renderEvents(newData);
    });
  }
};

export const initNavigation = (eventData) => {
  renderCurrentMonth(eventData);
  navElem.addEventListener('click', onChangeWeek);
};
