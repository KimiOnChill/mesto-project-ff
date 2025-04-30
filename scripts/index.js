// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function cardCreate (card) {
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  cardItem.querySelector('.card__image').src = card.link;
  cardItem.querySelector('.card__image').alt = `Фото места под названием ${card.name}`;
  //cardItem.querySelector('.card__delete-button').addEventListener('click', deleteCard())
  cardItem.querySelector('.card__title').textContent = card.name;
  placesList.append(cardItem);
}

// @todo: Функция удаления карточки
/*function deleteCard () {
  const listItem = cardItem.querySelector('.card__delete-button').closest('.todo__item');
  listItem.remove();
}*/

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => cardCreate(card));