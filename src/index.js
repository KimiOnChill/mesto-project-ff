// Импорты
import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import avatar from './images/avatar.jpg';

// Добавление аватара
document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const cardsContainer = document.querySelector('.places__list');
const cardItem = cardTemplate.querySelector('.card');

// Функция создания карточки
function createCard (card, deleteCard) {
  const newCard = cardItem.cloneNode(true);
  const cardImage = newCard.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = `Фото места под названием ${card.name}`;
  newCard.querySelector('.card__title').textContent = card.name;
  newCard.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  return newCard;
}

// Функция удаления карточки
function deleteCard (evt) {
  const element = evt.target.closest('.places__item');
  element.remove();
}

// Вывод карточки на страницу
initialCards.forEach((card) => cardsContainer.append(createCard(card, deleteCard)));