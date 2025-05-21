// todo: create module files for all conponents
// todo: check popups and modals in your conspect 

// Импорты
import './pages/index.css';
import { initialCards, createCard, deleteCard, handleLike } from './scripts/cards.js';
import { openModal, closeModal } from './scripts/modal.js';
import avatar from './images/avatar.jpg';

// Добавление аватара
document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;

// DOM узлы
const cardsContainer = document.querySelector('.places__list');

const popupContainer = document.querySelectorAll('.popup');

const buttonOpenEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');

const buttonAddNewCard = document.querySelector('.profile__add-button');
const popupAddNewCard = document.querySelector('.popup_type_new-card');

const popupToShowFullPic = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');

const everyButtonToClosePopup = document.querySelectorAll('.popup__close');

// Вывод карточки на страницу
initialCards.forEach((card) => cardsContainer.append(createCard(card, deleteCard)));

// Обработчики событий
buttonOpenEditProfile.addEventListener('click', () => openModal(popupEditProfile) );

buttonAddNewCard.addEventListener('click', () => openModal(popupAddNewCard) );

cardsContainer.addEventListener('click', function (evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  openModal(popupToShowFullPic);
});

popupContainer.forEach( container => {
  container.addEventListener('click', function (evt) {
    if (!evt.target.classList.contains('popup__content')) {
      closeModal(container);
    }
  });
});


