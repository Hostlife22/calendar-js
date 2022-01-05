function createEventColors() {
  const colorsArray = [
    '#d50000',
    '#e67c73',
    '#f4511e',
    '#f6bf26',
    '#33b679',
    '#0b8043',
    '#039be5',
    '#3f51b5',
    '#8e24aa',
    '#7986cb',
    '#1d296d',
    '#616161',
  ];

  return colorsArray.map((color) => {
    const colorElement = document.createElement('div');

    colorElement.classList.add('event-form__color');
    colorElement.setAttribute('data-color', color);
    colorElement.style.backgroundColor = color;

    return colorElement;
  });
}

export function renderEventColor() {
  const colorPickerElement = document.querySelector('.event-form__colors');
  colorPickerElement.textContent = '';

  const colorsPicker = createEventColors();

  colorsPicker.map((color) => colorPickerElement.append(color));
}
