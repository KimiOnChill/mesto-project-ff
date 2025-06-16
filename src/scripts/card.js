import { placeLike, deleteLike } from './api.js';


// Функция создания карточки
export function createCard (card, openFullPic, handleLike, cardOwnerId, userId, deleteCardFromServer, cardId) {

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
  const likeCount = newCard.querySelector('.card__like-count');
  const likeButton = newCard.querySelector('.card__like-button');
  if (Array.isArray(card.likes)) {
    likeCount.textContent = card.likes.length;
    if (card.likes.some((x) => x['_id'] == userId)){
      likeButton.classList.add('card__like-button_is-active');
    }
  }
  else {
    likeCount.textContent = 0;
  }
  likeButton.addEventListener('click',() => handleLike(cardId, likeCount, likeButton));
  
  // Delete, если карточка создана этим пользователем
  if (cardOwnerId == userId) {
    newCard.querySelector('.card__delete-button').classList.remove('hidden');
    newCard.querySelector('.card__delete-button').addEventListener('click', () =>
      deleteCardFromServer(cardId, newCard)
    );
  }

  return newCard;
}

// Функция обработки лайка
export function handleLike (cardId, likeCount, likeButton) {
  likeButton.classList.contains('card__like-button_is-active') ? 
    deleteLike(cardId, likeCount, likeButton):
    placeLike(cardId, likeCount, likeButton);
}