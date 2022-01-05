import { createNumbersArray } from '../common/createNumbersArray.js';

const formatTimescale = (timescaleNumber) => {
  return timescaleNumber >= 0 && timescaleNumber <= 9
    ? `0${timescaleNumber}:00`
    : `${timescaleNumber}:00`;
};

const createTimescale = (timescaleNumber) => {
  const timeFormat = formatTimescale(timescaleNumber);
  return `<span class="calendar__time-scale-hour" data-time-scale=${timescaleNumber}>${timeFormat}</span>`;
};

export const renderTimescale = () => {
  const times = createNumbersArray(0, 23)
    .map((timescale) => createTimescale(timescale))
    .join(' ');

  document.querySelector('.calendar__time-scale').innerHTML = times;
};
