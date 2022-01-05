import { onCreateEvent } from '../events/createEvent.js';
import shmoment from './shmoment.js';
import { getEventDate, getEventTime } from './time.utils.js';

const modalElem = document.querySelector('.modal');
const modalContentElem = document.querySelector('.modal__content');
const colorsElem = document.querySelector('.event-form__colors');

export const setValueModal = (date) => {
  const eventDate =
    date instanceof Date && !isNaN(date)
      ? new Date(date)
      : shmoment(new Date())
          .add('minutes', 60 - new Date().getMinutes())
          .result();

  const futureEventDay = getEventDate(eventDate);
  const startEvent = getEventTime(eventDate.setHours(eventDate.getHours()));
  const endEvent = getEventTime(eventDate.setHours(eventDate.getHours() + 1));

  document.querySelector('.event-form__field[type="date"]').value = futureEventDay;
  document.querySelector('.event-form__field[name="startTime"]').value = startEvent;
  document.querySelector('.event-form__field[name="endTime"]').value = endEvent;
};

export const openModal = (date) => {
  document.querySelector('.error').textContent = '';

  setValueModal(date);
  modalElem.classList.remove('hidden');
};

export const closeModal = () => {
  modalElem.classList.add('hidden');
};

const onClickInsideModal = (event) => {
  const modalElement = event.target.closest('div[class="modal__content"]');

  if (!modalElement) {
    closeModal();
    event.stopPropagation();
  }
};

function openPicker() {
  colorsElem.classList.remove('event-form__colors_hidden');
}

function closePicker() {
  colorsElem.classList.add('event-form__colors_hidden');
}

function onClickInsidePicker(event) {
  const selectedColor = event.classList.contains('event-form__color');

  if (selectedColor) {
    const selectedColorElem = document.querySelector('.event-form__selected');
    selectedColorElem.dataset.eventColor = event.dataset.color;
    selectedColorElem.style.backgroundColor = event.dataset.color;

    closePicker();
  }
}

const onClickModalForm = (event) => {
  const closeBtn = 'button[class="create-event__close-btn"]';
  const submitBtn = 'button[class="event-form__submit-btn"]';
  const selectBtn = 'div[class="event-form__select-color"]';

  const suitableElements = [closeBtn, submitBtn, selectBtn];
  const clickedElement = suitableElements.filter((el) => event.target.closest(el)).join(' ');

  if (clickedElement) {
    event.preventDefault();

    switch (clickedElement) {
      case selectBtn:
        openPicker();
        onClickInsidePicker(event.target);
        return;

      case submitBtn:
        onCreateEvent();
        return;

      default:
        closeModal();
    }
  }

  closePicker();
};

modalContentElem.addEventListener('click', onClickModalForm);
modalElem.addEventListener('click', onClickInsideModal);
