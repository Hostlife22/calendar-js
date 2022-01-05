import { getEventList, updateEventList } from '../common/eventGateway.js';
import { closePopup, contentPopup, openPopup } from '../common/popup.js';
import { getPropertyValue } from '../common/storage.js';
import { generateWeekRange, getEventTime } from '../common/time.utils.js';
import { updateEvent } from './updateEvents.js';
import { checkingForDeletion } from './validEvent.js';

const weekElem = document.querySelector('.calendar__week');
const popupBtnElem = document.querySelector('.popup__buttons');
const popupDescription = document.querySelector('.popup__description');

function handleEventClick(event) {
  const isCalendarEvent = event.target.closest('.calendar__event');
  if (!isCalendarEvent) {
    return;
  }

  const windowInnerWidth = document.documentElement.clientWidth;
  const windowInnerHeight = document.documentElement.clientHeight;
  const WIDTH_OF_THE_POPUP = 300;
  const HEIGHT_OF_THE_POPUP = 200;

  let x = 0;
  let y = 0;

  if (event.clientX || event.clientY) {
    x =
      event.clientX + WIDTH_OF_THE_POPUP <= windowInnerWidth
        ? event.clientX
        : event.clientX - WIDTH_OF_THE_POPUP;
    y =
      event.clientY + HEIGHT_OF_THE_POPUP <= windowInnerHeight
        ? event.clientY
        : event.clientY - HEIGHT_OF_THE_POPUP;
  }

  openPopup(x, y);
  contentPopup(isCalendarEvent);
}

export function removeEventsFromCalendar() {
  document
    .querySelectorAll(`.calendar__event`)
    .forEach((eventElem) => (eventElem ? eventElem.remove() : null));
}

const createEventElement = (event) => {
  const TIMESTAMP_IN_MINUTES = 60000;
  const startTime = new Date(event.start);
  const endTime = new Date(event.end);
  const eventTime = startTime.getMinutes();
  const eventHeight = (endTime - startTime) / TIMESTAMP_IN_MINUTES;
  const style = `top: ${eventTime}px; height:${eventHeight}px; background-color:${event.color}`;

  return `
	<div class="calendar__event" data-event="${event.id}" style="${style} ">
		<p>${event.title}</p>
    	<p>${getEventTime(startTime)} - ${getEventTime(endTime)}</p>
   		<p>${event.description}</p>
	</div>`;
};

export const renderEvents = (events) => {
  const mondayCurrentWeek = getPropertyValue(events, 'displayedWeekStart');
  const calendarDays = generateWeekRange(mondayCurrentWeek).map((date) => date.getDate());

  getPropertyValue(events, 'events')
    .filter(({ start }) => {
      const eventDay = new Date(start);
      return (
        calendarDays.includes(eventDay.getDate()) &&
        eventDay.getMonth() === new Date(mondayCurrentWeek).getMonth()
      );
    })
    .forEach((event) => {
      const eventDay = new Date(event.start);
      const calendarDayElem = document.querySelector(`[data-day="${eventDay.getDate()}"]`).children;
      const isElement = document.querySelector(`[data-event="${event.id}"]`);

      if (isElement !== null) {
        isElement.remove();
      }

      calendarDayElem[eventDay.getHours()].innerHTML = createEventElement(event);
    });
};

export function onDeleteEvent() {
  getEventList()
    .then(
      (data) =>
        new Promise((resolve, reject) => {
          if (checkingForDeletion(data)) {
            resolve(
              getPropertyValue(data, 'events').filter(
                ({ id }) => popupDescription.dataset.eventId !== id,
              ),
            );
          } else {
            reject('The event cannot be deleted 15 minutes before the start');
          }
        }),
    )
    .then((filteredEvent) => updateEventList({ events: filteredEvent }))
    .then((response) => {
      popupDescription.removeAttribute('data-event-id');
      removeEventsFromCalendar();
      closePopup();
      renderEvents([response]);
    })
    .catch((err) => {
      const popupElem = document.querySelector('.popup__description');
      const popupErr = document.querySelector('.popup__error');
      if (!popupErr) {
        const span = document.createElement('div');
        span.classList.add('popup__error');
        span.textContent = err;
        popupElem.append(span);
      }
    });
}

const onClickPopupBtn = (event) => {
  const isBtn = event.target.closest('button');
  if (!isBtn) {
    return;
  }

  switch (isBtn.classList[1]) {
    case 'delete-event-btn':
      onDeleteEvent();
      break;
    case 'update-event-btn':
      updateEvent(popupDescription.getAttribute('data-event-id'));
      break;
    default:
      closePopup();
  }
};

popupBtnElem.addEventListener('click', onClickPopupBtn);
weekElem.addEventListener('click', handleEventClick);
