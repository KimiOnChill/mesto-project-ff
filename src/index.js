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
const popupToEditProfile = document.querySelector('.popup_type_edit');
const popupToAddNewPlace = document.querySelector('popup_type_new-card');
const popupToShowFullPic = document.querySelector('popup_type_image');

// Вывод карточки на страницу
initialCards.forEach((card) => cardsContainer.append(createCard(card, deleteCard)));

// Обработчики событий
