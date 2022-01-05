import { getEventList, updateEventList } from '../common/eventGateway.js';
import { closeModal } from '../common/modal.js';
import { getPropertyValue } from '../common/storage.js';
import { getDateTime } from '../common/time.utils.js';
import { onClickField } from './createEventField.js';
import { onDeleteEvent, renderEvents } from './events.js';
import { eventValidator, isIntersection } from './validEvent.js';

const eventFormElem = document.querySelector('.event-form');
const selectedColorElem = document.querySelector('.event-form__selected');
const calendarElem = document.querySelector('.calendar__week-container');

function clearEventForm() {
  eventFormElem.reset();
}

function onCloseEventForm() {
  closeModal();
  clearEventForm();
}

const checkDeletion = () => {
  const eventId = document.querySelector('.popup__description').getAttribute('data-event-id');
  if (eventId !== null) {
    onDeleteEvent();
  }
};

export function onCreateEvent() {
  const { title, description, startTime, endTime, date } = Object.fromEntries(
    new FormData(eventFormElem),
  );

  const isCorrectDuration = eventValidator(startTime, endTime, date);

  if (isCorrectDuration) {
    const descriptionForm = {
      id: Date.now().toString(),
      title: title === '' ? '(No title)' : title,
      description,
      start: getDateTime(date, startTime),
      end: getDateTime(date, endTime),
      color: selectedColorElem.dataset.eventColor,
    };

    getEventList()
      .then((data) => {
        return new Promise((resolve, reject) => {
          if (isIntersection(descriptionForm, data)) {
            resolve(
              updateEventList({
                events: getPropertyValue(data, 'events').concat(descriptionForm),
              }),
            );
          } else {
            reject('Intersection of events');
          }
        });
      })
      .then((response) => {
        checkDeletion();
        renderEvents([response]);
        onCloseEventForm();
      })
      .catch((err) => (document.querySelector('.error').textContent = err));
  }
}

export function initEventForm() {
  calendarElem.addEventListener('click', onClickField);
}
