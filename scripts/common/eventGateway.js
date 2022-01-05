const baseUrl = 'https://61c8c4dcadee460017260de8.mockapi.io/eventss';

export const getEventList = () => {
  return fetch(baseUrl).then((response) => response.json());
};

export const createEvent = (eventData) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(eventData),
  });
};

export const updateEventList = (updatedeventData, eventData = '1') => {
  return fetch(`${baseUrl}/${eventData}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(updatedeventData),
  }).then((response) => response.json());
};

export const deleteEvent = (eventData) => {
  return fetch(`${baseUrl}/${eventData}`, {
    method: 'DELETE',
  });
};
