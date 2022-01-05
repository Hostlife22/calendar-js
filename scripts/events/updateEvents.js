import { getEventList } from '../common/eventGateway.js';
import { openModal } from '../common/modal.js';
import { closePopup } from '../common/popup.js';
import { getPropertyValue } from '../common/storage.js';
import { getEventDate, getEventTime } from '../common/time.utils.js';

export const updateEvent = (updateId) => {
  getEventList().then((data) => {
    const [{ description, end, start, title }] = getPropertyValue(data, 'events').filter(
      ({ id }) => id === updateId,
    );

    closePopup();
    openModal(start);
    document.querySelector('.event-form__field[type="text"]').value = title;
    document.querySelector('.event-form__field[type="date"]').value = getEventDate(start);
    document.querySelector('.event-form__field[name="startTime"]').value = getEventTime(start);
    document.querySelector('.event-form__field[name="endTime"]').value = getEventTime(end);
    document.querySelector('.event-form__field[name="description"]').value = description;
    document.querySelector('.popup__description').setAttribute('data-event-id', updateId);
  });
};
