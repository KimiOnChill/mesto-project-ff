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
      if (res.ok) return res.json()
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

// Получение карточек с сервера
export const getInitialCards = () => {
  return fetch(`${requestConfig.baseUrl}/cards`, {
    headers: requestConfig.headers
  })
    .then(res => {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    })
} 

export function testServer () {
  return fetch(`${requestConfig.baseUrl}/cards`, {
    headers: requestConfig.headers
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  }); 
}

