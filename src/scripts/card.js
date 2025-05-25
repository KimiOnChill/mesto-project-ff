// Функция создания карточки
export function createCard (card, deleteCard, handleLike, openFullPic) {
  const cardTemplate = document.querySelector('#card-template').content;
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = newCard.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  newCard.querySelector('.card__title').textContent = card.name;
  newCard.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  newCard.querySelector('.card__like-button').addEventListener('click', handleLike);
  cardImage.addEventListener('click', openFullPic);
  return newCard;
}

// Функция удаления карточки
export function deleteCard (evt) {
  const element = evt.target.closest('.places__item');
  element.remove();
}

// Функция обработки лайка
export function handleLike (evt) {
  const element = evt.target.closest('.places__item');
  const likeButton = element.querySelector('.card__like-button');
  likeButton.classList.contains('card__like-button_is-active') ? 
    likeButton.classList.remove('card__like-button_is-active'):
    likeButton.classList.add('card__like-button_is-active');
}