const requestConfig = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-40', // url with my cohort id
  headers: {
    authorization: 'd4b57c9c-e67a-4de7-a0ec-2ef937f8b287', // my token
    'Content-Type': 'application/json'
  }
}

// Получение данных пользователя с сервера
export const getUserData = () => {
  return fetch(`${requestConfig.baseUrl}/users/me`, {
    headers: requestConfig.headers
  })
    .then(res => {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    })
}

// Функция смены надписи Сохранить на Сохранение
export const savingOnButton = (button, isSaving) => {
  if (isSaving) {
    button.textContent = "Сохранение...";
    button.setAttribute('disabled', '');
  }
  else{
    button.textContent = "Сохранить";
    button.removeAttribute('disabled');
  }
}

// Смена аватара пользователя
export const changeAvatar = (avatarLink, button) => {
  return fetch(`${requestConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: requestConfig.headers,
    body: JSON.stringify({
        avatar: avatarLink
      })
  })
    .then(res => {
      savingOnButton(button, true);
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    })
    .finally( () => {
      setTimeout(() => {savingOnButton(button, false)}, 1500)
    })
}

// Получение карточек с сервера
export const getCardsFromServer = () => {
  return fetch(`${requestConfig.baseUrl}/cards`, {
    headers: requestConfig.headers
  })
    .then(res => {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    })
} 

// Редактирование профиля с отправкой на сервер
export const editProfile = (newName, newAbout, button) => {
  return fetch(`${requestConfig.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: requestConfig.headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    })
      .then(res => {
        savingOnButton(button, true);
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
      .finally( () => {
        setTimeout(() => {savingOnButton(button, false)}, 1500)
      })
}

// Добавление карточки с отправкой на сервер
export const addCard = (newName, newLink, button) => {
  return fetch(`${requestConfig.baseUrl}/cards`, {
      method: 'POST',
      headers: requestConfig.headers,
      body: JSON.stringify({
        name: newName,
        link: newLink
      })
    })
      .then(res => {
        savingOnButton(button, true);
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
      .finally( () => {
        setTimeout(() => {savingOnButton(button, false)}, 1500)
      })
}

// Удаление карточки
export const deleteCardFromServer = (cardId, cardElement) => {
  return fetch(`${requestConfig.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: requestConfig.headers
    })
      .then(res => {
        if (res.ok) cardElement.remove();
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
}

// Добавление лайка на карточку
export const placeLike = (cardId, likeCount, likeButton) => {
  return fetch(`${requestConfig.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: requestConfig.headers
    })
      .then(res => {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
          likeCount.textContent = res['likes'].length;
          likeButton.classList.add('card__like-button_is-active');
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
}

// Удаление лайка с карточки
export const deleteLike = (cardId, likeCount, likeButton) => {
  return fetch(`${requestConfig.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: requestConfig.headers
    })
      .then(res => {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
          likeCount.textContent = res['likes'].length;
          likeButton.classList.remove('card__like-button_is-active');
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
}