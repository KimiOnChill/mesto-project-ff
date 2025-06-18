// Импорты
import "./pages/index.css";
import { createCard, handleLike } from "./scripts/card.js";
import { openModal, closeModal } from "./scripts/modal.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import {
  getUserData,
  changeAvatar,
  getCardsFromServer,
  editProfile,
  addCard,
  deleteCardFromServer,
} from "./scripts/api.js";

// DOM узлы
const cardsContainer = document.querySelector(".places__list"); // контейнер всех карточек

const allPopups = document.querySelectorAll(".popup"); // массив всех попапов

const profileImageOnPage = document.querySelector(".profile__image"); // элемент с аватаром
const popupToChangeAvatar = document.querySelector(".popup_type_change-avatar"); // попап с формой для смены аватара
const changeAvatarFormElement = document.querySelector(
  '.popup__form[name="change-avatar"]'
); // форма для смены аватара
const changeAvatarInput = document.querySelector(
  ".popup__input_type_url-avatar"
); // инпут для смены аватара

const buttonOpenEditProfile = document.querySelector(".profile__edit-button"); // кнопка открытия попапа редактирования профиля
const popupEditProfile = document.querySelector(".popup_type_edit"); // попап с формой для редактирования профиля

const profileNameOnPage = document.querySelector(".profile__title"); // имя пользователя на странице
const profileDescriptionOnPage = document.querySelector(
  ".profile__description"
); // описание пользователя на странице

const profileFormElement = document.querySelector(
  '.popup__form[name="edit-profile"]'
); // форма для редактирования профиля
const nameInput = document.querySelector(".popup__input_type_name"); // инпут имени
const descriptionInput = document.querySelector(
  ".popup__input_type_description"
); // инпут описания

const buttonAddNewCard = document.querySelector(".profile__add-button"); // кнопка открытия попапа для новой карточки
const popupAddNewCard = document.querySelector(".popup_type_new-card"); // попап с формой для добавления новой карточки
const addCardFormElement = document.querySelector(
  '.popup__form[name="new-place"]'
); // форма для добавления новой карточки
const cardNameInput = document.querySelector(".popup__input_type_card-name"); // инпут названия карточки
const cardUrlInput = document.querySelector(".popup__input_type_url"); // инпут ссылки на картинку

const popupFullPic = document.querySelector(".popup_type_image"); // попап карточки, открытой на Фулл
const popupImage = document.querySelector(".popup__image"); // карточка, открытая на Фулл
const popupCaption = document.querySelector(".popup__caption"); // подпись развернутой картинки

// Объект с классами для валидации
const config = {
  formClass: ".popup__form",
  inputClass: ".popup__input",
  submitButtonClass: ".popup__button",
  inactiveButtonClass: "popup__button-inactive",
  errorClass: "popup__input-error",
  hiddenClass: "hidden",
};

// ID пользователя, для удобства
let userId;

// Ответ сервера на запрос профиля и карточек
Promise.all([getUserData(), getCardsFromServer()])
  .then((res) => {
    const [userData, cardsObj] = res;

    // Заполнение профиля значениями с сервера
    profileNameOnPage.textContent = userData.name;
    profileDescriptionOnPage.textContent = userData.about;
    profileImageOnPage.style.backgroundImage = `url('${userData.avatar}')`;
    userId = userData["_id"];

    // Наполнение страницы карточками с сервера
    cardsObj.forEach((card) => {
      const cardOwnerId = card["owner"]["_id"];
      cardsContainer.append(
        createCard(
          card,
          openFullPic,
          handleLike,
          cardOwnerId,
          userId,
          deleteCardFromServer,
          card["_id"]
        )
      );
    });
  })
  .catch((error) => {
    console.log(`Ошибка: ${error}`);
  });

// Открытие модального окна редактирования аватара по кнопке
profileImageOnPage.addEventListener("click", function () {
  clearValidation(changeAvatarFormElement, config);
  openModal(popupToChangeAvatar);
});

// Функция смены надписи Сохранить на Сохранение
const savingOnButton = (formElement, isSaving) => {
  const button = formElement.querySelector(".popup__button")
  if (isSaving) {
    button.textContent = "Сохранение...";
    button.setAttribute("disabled", "");
  } else {
    button.textContent = "Сохранить";
    button.removeAttribute("disabled");
  }
};

// Смена аватара
changeAvatarFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  changeAvatar(
    changeAvatarInput.value,
    changeAvatarFormElement.querySelector(".popup__button")
  )
    .then((res) => {
      savingOnButton(changeAvatarFormElement, true);
      profileImageOnPage.style.backgroundImage = `url('${res.avatar}')`;
      setTimeout(() => {
        closeModal(popupToChangeAvatar);
      }, 1000);
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    })
    .finally(() => {
      setTimeout(() => {
        savingOnButton(changeAvatarFormElement, false);
      }, 1500);
    });
});

// Открытие модального окна редактирования профиля по кнопке
buttonOpenEditProfile.addEventListener("click", function () {
  clearValidation(profileFormElement, config);
  openModal(popupEditProfile);
  // поля формы заполнены значениями со страницы
  nameInput.value = profileNameOnPage.textContent;
  descriptionInput.value = profileDescriptionOnPage.textContent;
});

// Открытие модального окна добавления карточки по кнопке
buttonAddNewCard.addEventListener("click", () => {
  clearValidation(addCardFormElement, config);
  openModal(popupAddNewCard);
});

// Закрытие любого открытого модального окна
allPopups.forEach((popup) => {
  popup.classList.add("popup_is-animated"); // плавность

  // закрытие кликом по крестику или оверлею
  popup.addEventListener("click", function (evt) {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close")
    ) {
      closeModal(popup);
    }
  });
  // закрытие нажатием на esc описано в openModal
});

// Отправка формы редактирования профиля, подгружающая данные с сервера при изменении
profileFormElement.addEventListener("submit", function handleFormSubmit(evt) {
  evt.preventDefault();
  editProfile(
    nameInput.value,
    descriptionInput.value,
    profileFormElement.querySelector(".popup__button")
  )
    .then(() => savingOnButton(profileFormElement, true))
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    })
    .finally(() => {
      setTimeout(() => {
        savingOnButton(profileFormElement, false);
      }, 1500);
    });

  getUserData()
    .then((userData) => {
      profileNameOnPage.textContent = userData.name;
      profileDescriptionOnPage.textContent = userData.about;
      setTimeout(() => {
        closeModal(popupEditProfile);
      }, 1000);
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    });
});

// Создание новой карточки
addCardFormElement.addEventListener("submit", function handleSubmit(evt) {
  evt.preventDefault();
  const newCardObj = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
  };
  addCard(
    newCardObj.name,
    newCardObj.link,
    addCardFormElement.querySelector(".popup__button")
  )
    .then((card) => {
      savingOnButton(addCardFormElement, true);
      //навешивание на новую карточку обработчиков с данными с сервера
      let cardId = card["_id"];
      cardsContainer.prepend(
        createCard(
          newCardObj,
          openFullPic,
          handleLike,
          userId,
          userId,
          deleteCardFromServer,
          cardId
        )
      );
      setTimeout(() => {
        closeModal(popupAddNewCard);
      }, 1000);
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    })
    .finally(() => {
      setTimeout(() => {
        savingOnButton(addCardFormElement, false);
      }, 1500);
    });
  // test name: Big Yoshi
  // test link: https://i.pinimg.com/736x/b1/6b/e2/b16be28a1c6d58fbdb4e5fb3daeca161.jpg
});

// Функция открытия картинки на фулл
function openFullPic(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openModal(popupFullPic);
}

// Вызов функции для лайв валидации всех input
enableValidation(config);