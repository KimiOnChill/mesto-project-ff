// todo: create module files for all conponents
// todo: check popups and modals in your conspect 

// Импорты
import avatar from './images/avatar.jpg';
import './pages/index.css';
import { initialCards, createCard, deleteCard, handleLike } from './scripts/cards.js';
import { openModal, closeModal } from './scripts/modal.js';

// Добавление аватара
document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;

// DOM узлы
const cardsContainer = document.querySelector('.places__list');

const popupContainer = document.querySelectorAll('.popup');

const buttonOpenEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');

const profileNameOnPage = document.querySelector('.profile__title');
const profileDescriptionOnPage = document.querySelector('.profile__description');

const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const buttonFormSubmit = document.querySelector('.popup__button'); 
// ! mb delete buttonFormSubmit
const buttonAddNewCard = document.querySelector('.profile__add-button');
const popupAddNewCard = document.querySelector('.popup_type_new-card');

const popupToShowFullPic = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');

// Вывод карточки на страницу
initialCards.forEach((card) => cardsContainer.append(createCard(card, deleteCard)));

// Обработчики событий

// Открытие модального окна редактирования профиля по кнопке
buttonOpenEditProfile.addEventListener('click', function () { 
  openModal(popupEditProfile);
  //поля формы заполнены значениями со страницы
  nameInput.value = profileNameOnPage.textContent;
  descriptionInput.value = profileDescriptionOnPage.textContent;  
});

// Открытие модального окна добавления карточки по кнопке
buttonAddNewCard.addEventListener('click', () => openModal(popupAddNewCard) );

// Открытие модального окна изображения карточки на фулл
// по клику на изображение карточки
cardsContainer.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('card__image')) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    openModal(popupToShowFullPic);
  }
});

//Закрытие любого открытого модального окна
popupContainer.forEach( container => {
  //закрытие кликом по крестику или оверлею
  container.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      closeModal(container);
    }
  });
  //закрытие нажатием на esc в openModal
});

// «Отправка» формы
formElement.addEventListener('submit', function handleFormSubmit (evt) {
  evt.preventDefault();
  profileNameOnPage.textContent = nameInput.value;
  profileDescriptionOnPage.textContent = descriptionInput.value;
  closeModal(popupEditProfile);
});