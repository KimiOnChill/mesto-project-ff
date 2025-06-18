const requestConfig = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-40", // url with my cohort id
  headers: {
    authorization: "d4b57c9c-e67a-4de7-a0ec-2ef937f8b287", // my token
    "Content-Type": "application/json",
  },
};

// Обработка результата запроса
const getResponseData = (res) => {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Получение данных пользователя с сервера
export const getUserData = () => {
  return fetch(`${requestConfig.baseUrl}/users/me`, {
    headers: requestConfig.headers,
  }).then(getResponseData);
};

// Смена аватара пользователя
export const changeAvatar = (avatarLink) => {
  return fetch(`${requestConfig.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: requestConfig.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then(getResponseData);
};

// Получение карточек с сервера
export const getCardsFromServer = () => {
  return fetch(`${requestConfig.baseUrl}/cards`, {
    headers: requestConfig.headers,
  }).then(getResponseData);
};

// Редактирование профиля с отправкой на сервер
export const editProfile = (newName, newAbout) => {
  return fetch(`${requestConfig.baseUrl}/users/me`, {
    method: "PATCH",
    headers: requestConfig.headers,
    body: JSON.stringify({
      name: newName,
      about: newAbout,
    }),
  }).then(getResponseData);
};

// Добавление карточки с отправкой на сервер
export const addCard = (newName, newLink) => {
  return fetch(`${requestConfig.baseUrl}/cards`, {
    method: "POST",
    headers: requestConfig.headers,
    body: JSON.stringify({
      name: newName,
      link: newLink,
    }),
  }).then(getResponseData);
};

// Удаление карточки
export const deleteCardFromServer = (cardId, cardElement) => {
  return fetch(`${requestConfig.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: requestConfig.headers,
  }).then(getResponseData);
};

// Добавление лайка на карточку
export const placeLike = (cardId, likeCount, likeButton) => {
  return fetch(`${requestConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: requestConfig.headers,
  }).then(getResponseData);
};

// Удаление лайка с карточки
export const deleteLike = (cardId, likeCount, likeButton) => {
  return fetch(`${requestConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: requestConfig.headers,
  }).then(getResponseData);
};