// Функция открытия модального окна
// принимает на вход DOM-элемент модального окна

export function openModal (input) {
  input.classList.add('popup_is-opened');
}

// Функция закрытия модального окна
export function closeModal (input) {
  input.classList.remove('popup_is-opened');
}