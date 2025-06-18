// Функция открытия модального окна
// принимает на вход DOM-элемент модального окна
export function openModal(modal) {
  modal.classList.add("popup_is-opened");

  //закрытие нажатием на esc
  document.addEventListener("keydown", closePopupEsc);
}

// Функция закрытия модального окна
export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
}

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}