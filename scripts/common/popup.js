const popupElem = document.querySelector('.popup');
const popupContentElem = document.querySelector('.popup__content');
const popupDescriptionElem = document.querySelector('.popup__description');

export function openPopup(x, y) {
  popupElem.classList.remove('hidden');
  popupContentElem.style.top = `${y}px`;
  popupContentElem.style.left = `${x}px`;
}

export function closePopup() {
  popupElem.classList.add('hidden');
  popupDescriptionElem.removeAttribute('data-event-id');
}

export function onClickInsidePopup(event) {
  event.stopPropagation();
}

export function contentPopup(elem) {
  const [title, eventTime, text] = [...elem.children].map((el) => el.innerText);
  popupDescriptionElem.setAttribute('data-event-id', elem.dataset.event);
  popupDescriptionElem.innerHTML = `
  <p class="popup__title">${title}</p>
  <p class="popup__event">${eventTime} o'clock</p>
  <p class="popup__text">${text}</p>
  `;
}

popupContentElem.addEventListener('click', onClickInsidePopup);
popupElem.addEventListener('click', closePopup);
