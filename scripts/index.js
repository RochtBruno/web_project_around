import { Card } from "./Card.js";
import { FormValidator } from './FormValidator.js';

const editProfile = document.querySelector('.profile__infos-edit');
const createNewCard = document.querySelector('.profile__button-rectangle');
const modal = document.querySelector('.profile__modal');
const modalAdd = document.querySelector('.profile__modal-add');
const overlay = document.querySelector('.profile__overlay');
const closeModal = document.querySelector('.profile__modal-close');
const closeAddModal = document.querySelector('.profile__modal-add-close');
const formElement = document.querySelector('.profile__modal-form');
const nameInput = document.querySelector('#nameInput');
const jobInput = document.querySelector('#jobInput');
const title = document.querySelector('.profile__infos-title');
const job = document.querySelector('.profile__infos-description');
const form = document.querySelector('.profile__modal-form');

nameInput.value = title.textContent;
jobInput.value = job.textContent;

editProfile.addEventListener('click', function () {
	modal.classList.add('opened');
	overlay.classList.add('opened');
});

createNewCard.addEventListener('click', function () {
	modalAdd.classList.add('opened');
	overlay.classList.add('opened');
});

closeModal.addEventListener('click', function () {
	modal.classList.remove('opened');
	overlay.classList.remove('opened');
});


closeAddModal.addEventListener('click', function () {
	modalAdd.classList.remove('opened');
	overlay.classList.remove('opened');
});

function handleSubmit(e) {
	e.preventDefault();

	title.textContent = nameInput.value;
	job.textContent = jobInput.value;

	modal.classList.remove('opened');
	overlay.classList.remove('opened');
}

form.addEventListener('submit', handleSubmit);

///////////////////////////////////
//renderizar os cards por js



const initialCards = [
	{
	  name: "Vale de Yosemite",
	  link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
	},
	{
	  name: "Lago Louise",
	  link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
	},
	{
	  name: "Montanhas Carecas",
	  link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
	},
	{
	  name: "Latemar",
	  link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
	},
	{
	  name: "Parque Nacional da Vanoise ",
	  link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
	},
	{
	  name: "Lago di Braies",
	  link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
	}
];


const cardsContainer = document.querySelector(".cards");

function renderCards() {
    cardsContainer.innerHTML = "";
    initialCards.forEach(cardData => {
      const card = new Card(cardData, "#card-template");
      cardsContainer.appendChild(card.getCardElement());
    });
  }


////////////ADICIONAR CARDS PELO FORMULARIO/////////

const formAddCard = document.querySelector(".profile__modal-add-form");
const titleInput = document.querySelector("#titleInput");
const linkInput = document.querySelector("#linkInput");

function handleAddNewCard(e){
	e.preventDefault();
  const titleValue = titleInput.value;
  const linkValue = linkInput.value;

  initialCards.unshift({ name: titleValue, link: linkValue });
  renderCards();
  titleInput.value = "";
  linkInput.value = "";
	modalAdd.classList.remove('opened');
	overlay.classList.remove('opened');
}

formAddCard.addEventListener("submit",handleAddNewCard)
document.addEventListener("DOMContentLoaded", renderCards);


const validationConfig = {
  inputSelector: '.profile__modal-input',
  submitButtonSelector: '.profile__modal-button',
  inactiveButtonClass: 'button--disabled',
  inputErrorClass: 'input-error',
  errorClass: 'error-message'
};

const formEditProfile = document.querySelector('.profile__modal-form');
//const formAddCard = document.querySelector('.profile__modal-add-form');

// Cria instâncias para cada formulário
const editProfileValidator = new FormValidator(validationConfig, formEditProfile);
const addCardValidator = new FormValidator(validationConfig, formAddCard);

// Habilita a validação
editProfileValidator.enableValidation();
addCardValidator.enableValidation();

