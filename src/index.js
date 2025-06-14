//! What css i've changed when was setting up validation:
//! popup-input.css | popup__button.css | popup__form.css

// Импорты
import avatar from './images/avatar.jpg';
import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, handleLike } from './scripts/card.js';
import { openModal, closeModal } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import { getUserData, getInitialCards, editProfile, addCard } from './scripts/api.js';

// !Добавление аватара
// !document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;

// DOM узлы
const cardsContainer = document.querySelector('.places__list');

const allPopups = document.querySelectorAll('.popup');

const buttonOpenEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');

const profileImageOnPage = document.querySelector('.profile__image');
const profileNameOnPage = document.querySelector('.profile__title');
const profileDescriptionOnPage = document.querySelector('.profile__description');

const profileFormElement = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');

const addCardFormElement = document.querySelector('.popup__form[name="new-place"]');
const buttonAddNewCard = document.querySelector('.profile__add-button');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');

const popupFullPic = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

// Объект с классами для валидации
const config ={
  formClass: '.popup__form',
  inputClass: '.popup__input',
  submitButtonClass: '.popup__button',
  inactiveButtonClass: 'popup__button-inactive',
  errorClass: 'popup__input-error',
  hiddenClass: 'hidden'
};

//! Вывод карточки на страницу старым способом
//!initialCards.forEach((card) => cardsContainer.append(createCard(card, deleteCard, handleLike, openFullPic)));

// Ответ сервера на запрос профиля и карточек
Promise.all([getUserData, getInitialCards])
  .then(() => {
    // Заполнение профиля значениями с сервера
    getUserData().then(userData => {
      profileNameOnPage.textContent = userData.name;
      profileDescriptionOnPage.textContent = userData.about;
      profileImageOnPage.style.backgroundImage = `url('${userData.avatar}')`;
    });
    // Наполнение карточками с сервера
    getInitialCards().then(cardsObj => {
      cardsObj.forEach((card) => {
        cardsContainer.append(createCard(card, deleteCard, handleLike, openFullPic));
      })
    })
})

// Открытие модального окна редактирования профиля по кнопке
buttonOpenEditProfile.addEventListener('click', function () { 
  openModal(popupEditProfile);
  // поля формы заполнены значениями со страницы
  nameInput.value = profileNameOnPage.textContent;
  descriptionInput.value = profileDescriptionOnPage.textContent;
  // очитска полей от валидации
  clearValidation(profileFormElement, nameInput, config);
  clearValidation(profileFormElement, descriptionInput, config);
  // блокировка кнопки
  profileFormElement.querySelector(config.submitButtonClass).classList.remove(config.inactiveButtonClass);
});

// Открытие модального окна добавления карточки по кнопке
buttonAddNewCard.addEventListener('click', () => {
  openModal(popupAddNewCard);
  // очитска полей от валидации
  clearValidation(addCardFormElement, cardNameInput, config);
  clearValidation(addCardFormElement, cardUrlInput, config);
  // блокировка кнопки
  addCardFormElement.querySelector(config.submitButtonClass).classList.add(config.inactiveButtonClass);
});

// Закрытие любого открытого модального окна
allPopups.forEach( popup => {
  // добавление плавности
  popup.classList.add('popup_is-animated');
  
  // закрытие кликом по крестику или оверлею
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      closeModal(popup);
    }
  });
  // закрытие нажатием на esc описано в openModal
});

// Отправка формы редактирования профиля, подгружающая данные с сервера при изменении
profileFormElement.addEventListener('submit', function handleFormSubmit (evt) {
  evt.preventDefault();
  editProfile(nameInput.value, descriptionInput.value);
  getUserData().then(userData => {
      profileNameOnPage.textContent = userData.name;
      profileDescriptionOnPage.textContent = userData.about;
  })
  closeModal(popupEditProfile);
});

// Создание новой карточки  
addCardFormElement.addEventListener('submit', function handleSubmit (evt) {
  evt.preventDefault();
  const newCardObj = {
    name: cardNameInput.value,
    link: cardUrlInput.value
  };
  cardsContainer.prepend(createCard(newCardObj, deleteCard, handleLike, openFullPic));
  addCard(newCardObj.name, newCardObj.link);
  // test image
  // name: Дорсет
  // link: https://i.pinimg.com/736x/d7/10/a3/d710a3d4f26e1df2cbcbd1dfb0cddf8f.jpg
  addCardFormElement.reset();
  closeModal(popupAddNewCard);
});

// Функция открытия картинки на фулл
function openFullPic (evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openModal(popupFullPic);
}

// Вызов функции для лайв валидации всех input
enableValidation(config);