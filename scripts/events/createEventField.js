import { openModal } from '../common/modal.js';
import shmoment from '../common/shmoment.js';

export function createEvent(event) {
  const currentDay = new Date();
  const dateTarget = +event.target.parentElement.dataset.day || currentDay.getDate();
  const timeTarget = Object.values(event.target.dataset);
  const NUMBER_OF_MINUTES = 60;
  const setDate = shmoment(currentDay)
    .add('days', dateTarget - currentDay.getDate())
    .add('hours', timeTarget - currentDay.getHours() - 1)
    .add('minutes', NUMBER_OF_MINUTES - currentDay.getMinutes())
    .result();

  openModal(setDate);
}

export const onClickField = (event) => {
  const isTargetName = event.target.className;
  const className = ['calendar__time-slot', 'calendar__time-scale-hour'];

  if (className.includes(isTargetName)) {
    createEvent(event);
  }
};
