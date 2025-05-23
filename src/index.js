// Импорты
import avatar from './images/avatar.jpg';
import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, handleLike, openFullPic } from './scripts/card.js';
import { openModal, closeModal } from './scripts/modal.js';

// Добавление аватара
document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;

// DOM узлы
const cardsContainer = document.querySelector('.places__list');

const allPopups = document.querySelectorAll('.popup');

const buttonOpenEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');

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

// Вывод карточки на страницу
initialCards.forEach((card) => cardsContainer.append(createCard(card, deleteCard, handleLike, openFullPic)));

// Открытие модального окна редактирования профиля по кнопке
buttonOpenEditProfile.addEventListener('click', function () { 
  openModal(popupEditProfile);
  //поля формы заполнены значениями со страницы
  nameInput.value = profileNameOnPage.textContent;
  descriptionInput.value = profileDescriptionOnPage.textContent;  
});

// Открытие модального окна добавления карточки по кнопке
buttonAddNewCard.addEventListener('click', () => openModal(popupAddNewCard) );

//Закрытие любого открытого модального окна
allPopups.forEach( popup => {
  //добавление плавности
  popup.classList.add('popup_is-animated');
  
  //закрытие кликом по крестику или оверлею
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      closeModal(popup);
    }
  });
  //закрытие нажатием на esc описано в openModal
});

// «Отправка» формы редактирования профиля
profileFormElement.addEventListener('submit', function handleFormSubmit (evt) {
  evt.preventDefault();
  profileNameOnPage.textContent = nameInput.value;
  profileDescriptionOnPage.textContent = descriptionInput.value;
  closeModal(popupEditProfile);
});

// Создание новой карточки  
addCardFormElement.addEventListener('submit', function handleSubmit (evt) {
  evt.preventDefault();
  const newCardObj = {
    name: cardNameInput.value,
    link: cardUrlInput.value
  };
  cardsContainer.prepend(createCard(newCardObj, deleteCard, handleLike, openFullPic))
  // test image
  // name: Дорсет
  // link: https://i.pinimg.com/736x/d7/10/a3/d710a3d4f26e1df2cbcbd1dfb0cddf8f.jpg
  addCardFormElement.reset();
  closeModal(popupAddNewCard);
});