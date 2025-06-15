import { deleteCardFromServer } from './api.js';

// Функция создания карточки
export function createCard (card, openFullPic, handleLike, cardOwnerId, userId, deleteCardFromServer) {

  const cardTemplate = document.querySelector('#card-template').content;
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = newCard.querySelector('.card__image');
  
  // Image
  cardImage.src = card.link; 
  cardImage.alt = card.name;
  cardImage.addEventListener('click', openFullPic);

  // Name
  newCard.querySelector('.card__title').textContent = card.name;

  // Likes
  newCard.querySelector('.card__like-button').addEventListener('click', handleLike);
  newCard.querySelector('.card__like-count').textContent = Array.isArray(card.likes) ? card.likes.length : 0;
  
  // Delete, если карточка создана этим пользователем
  if (cardOwnerId == userId) {
    newCard.querySelector('.card__delete-button').classList.remove('hidden');
    newCard.querySelector('.card__delete-button').addEventListener('click', () => deleteCardFromServer(card['_id'], newCard));
  }

  return newCard;
}

// Функция обработки лайка
export function handleLike (evt) {
  const element = evt.target.closest('.places__item');
  const likeButton = element.querySelector('.card__like-button');
  likeButton.classList.contains('card__like-button_is-active') ? 
    likeButton.classList.remove('card__like-button_is-active'):
    likeButton.classList.add('card__like-button_is-active');
}