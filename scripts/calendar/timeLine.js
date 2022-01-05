import { getStartOfWeek } from '../common/time.utils.js';

const createLineTime = (time) => {
  const minutes = time.getMinutes();
  const style = `style="top: ${minutes}px"`;
  return `
	<div class="current-time" ${style}>
		<div class="current-time__line"></div>
		<div class="current-time__circle"></div>
	</div>`;
};

const findElement = (day, currentDate) => {
  const foundElement = document.querySelector(`.calendar__day[data-day="${day}"]`).children;

  return [...foundElement].find((spanElem) => +spanElem.dataset.slot === currentDate.getHours());
};

const getElement = (currentDate, dateOfWeek) => {
  const currentDay = currentDate.getDate();
  const timeDifference = getStartOfWeek(currentDate) - getStartOfWeek(new Date(dateOfWeek));

  return timeDifference === 0 ? findElement(currentDay, currentDate) : null;
};

export function renderLineTime(mondayCurrentWeek) {
  const currentDate = new Date();
  const currentElement = getElement(currentDate, mondayCurrentWeek);

  if (currentElement !== null) {
    document.querySelectorAll('.current-time').forEach((element) => {
      element.remove();
    });

    currentElement.innerHTML += createLineTime(currentDate);
  }
}

const lineTime = {
  idInterval: 0,

  startRender(mondayCurrentWeek) {
    this.idInterval = setInterval(() => renderLineTime(mondayCurrentWeek), 1000);
  },

  clearLineTime() {
    clearInterval(this.idInterval);
  },
};

export default lineTime;
