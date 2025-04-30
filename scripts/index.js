// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const cardItem = cardTemplate.querySelector('.card');

// @todo: Функция создания карточки
function cardCreate (card) {
  const newCard = cardItem.cloneNode(true);
  newCard.querySelector('.card__image').src = card.link;
  newCard.querySelector('.card__image').alt = `Фото места под названием ${card.name}`;
  newCard.querySelector('.card__title').textContent = card.name;
  newCard.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  placesList.append(newCard);
}

// @todo: Функция удаления карточки
function deleteCard () {
  const element = placesList.querySelector('.card__delete-button').closest('.places__item');
  element.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => cardCreate(card));