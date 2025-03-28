// import { Card } from "./Card.js";
// import { FormValidator } from './FormValidator.js';
// import { setupModalHandlers } from './utils.js';

// const modal = document.querySelector('.profile__modal');
// const modalAdd = document.querySelector('.profile__modal-add');
// const overlay = document.querySelector('.profile__overlay');
// const nameInput = document.querySelector('#nameInput');
// const jobInput = document.querySelector('#jobInput');
// const title = document.querySelector('.profile__infos-title');
// const job = document.querySelector('.profile__infos-description');
// const form = document.querySelector('.profile__modal-form');

// nameInput.value = title.textContent;
// jobInput.value = job.textContent;

// setupModalHandlers({
//   triggerSelector: '.profile__infos-edit',
//   modalSelector: '.profile__modal',
//   closeSelector: '.profile__modal-close',
//   overlaySelector: '.profile__overlay'
// });

// setupModalHandlers({
//   triggerSelector: '.profile__button-rectangle',
//   modalSelector: '.profile__modal-add',
//   closeSelector: '.profile__modal-add-close',
//   overlaySelector: '.profile__overlay'
// });

// function handleSubmit(e) {
// 	e.preventDefault();

// 	title.textContent = nameInput.value;
// 	job.textContent = jobInput.value;

// 	modal.classList.remove('opened');
// 	overlay.classList.remove('opened');
// }

// form.addEventListener('submit', handleSubmit);

// ///////////////////////////////////
// //renderizar os cards por js



// const initialCards = [
// 	{
// 	  name: "Vale de Yosemite",
// 	  link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
// 	},
// 	{
// 	  name: "Lago Louise",
// 	  link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
// 	},
// 	{
// 	  name: "Montanhas Carecas",
// 	  link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
// 	},
// 	{
// 	  name: "Latemar",
// 	  link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
// 	},
// 	{
// 	  name: "Parque Nacional da Vanoise ",
// 	  link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
// 	},
// 	{
// 	  name: "Lago di Braies",
// 	  link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
// 	}
// ];


// const cardsContainer = document.querySelector(".cards");

// function renderCards() {
//     cardsContainer.innerHTML = "";
//     initialCards.forEach(cardData => {
//       const card = new Card(cardData, "#card-template");
//       cardsContainer.appendChild(card.getCardElement());
//     });
//   }


// ////////////ADICIONAR CARDS PELO FORMULARIO/////////

// const formAddCard = document.querySelector(".profile__modal-add-form");
// const titleInput = document.querySelector("#titleInput");
// const linkInput = document.querySelector("#linkInput");

// function handleAddNewCard(e){
// 	e.preventDefault();
//   const titleValue = titleInput.value;
//   const linkValue = linkInput.value;

//   initialCards.unshift({ name: titleValue, link: linkValue });
//   renderCards();
//   titleInput.value = "";
//   linkInput.value = "";
// 	modalAdd.classList.remove('opened');
// 	overlay.classList.remove('opened');
// }

// formAddCard.addEventListener("submit",handleAddNewCard)
// document.addEventListener("DOMContentLoaded", renderCards);


// const validationConfig = {
//   inputSelector: '.profile__modal-input',
//   submitButtonSelector: '.profile__modal-button',
//   inactiveButtonClass: 'button--disabled',
//   inputErrorClass: 'input-error',
//   errorClass: 'error-message'
// };

// const formEditProfile = document.querySelector('.profile__modal-form');
// //const formAddCard = document.querySelector('.profile__modal-add-form');

// // Cria instâncias para cada formulário
// const editProfileValidator = new FormValidator(validationConfig, formEditProfile);
// const addCardValidator = new FormValidator(validationConfig, formAddCard);

// // Habilita a validação
// editProfileValidator.enableValidation();
// addCardValidator.enableValidation();


import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";

// Dados iniciais dos cards
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

// -------------------------
// Instâncias de validação
// -------------------------
const validationConfig = {
  inputSelector: ".profile__modal-input",
  submitButtonSelector: ".profile__modal-button",
  inactiveButtonClass: "button--disabled",
  inputErrorClass: "input-error",
  errorClass: "error-message"
};

const editProfileFormElement = document.querySelector(".profile__modal-form");
const addCardFormElement = document.querySelector(".profile__modal-add-form");

const editProfileValidator = new FormValidator(validationConfig, editProfileFormElement);
const addCardValidator = new FormValidator(validationConfig, addCardFormElement);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

// -------------------------
// Instância de UserInfo
// -------------------------
const userInfo = new UserInfo({
  nameSelector: ".profile__infos-title",
  jobSelector: ".profile__infos-description"
});

// -------------------------
const popupWithImage = new PopupWithImage(".popup-image");
popupWithImage.setEventListeners();


function handleCardClick({ link, name }) {
  popupWithImage.open({ link, title: name });
}

// -------------------------
// Função para criar um card
// -------------------------
function createCard(data) {
  const card = new Card(data, "#card-template", handleCardClick);
  return card.getCardElement();
}

// -------------------------
// Instância de Section para renderizar os cards
// -------------------------
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsSection.addItem(cardElement);
    }
  },
  ".cards"
);
cardsSection.renderItems();

// -------------------------
// Instância de PopupWithForm para editar o perfil
// -------------------------
const profilePopup = new PopupWithForm(".profile__modal", (formData) => {
  userInfo.setUserInfo({ name: formData.name, job: formData.job });
  profilePopup.close();
});
profilePopup.setEventListeners();

// Ao clicar no botão de editar perfil, atualiza os valores dos inputs
document.querySelector(".profile__infos-edit").addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  document.querySelector("#nameInput").value = currentUser.name;
  document.querySelector("#jobInput").value = currentUser.job;
  profilePopup.open();
});


const addCardPopup = new PopupWithForm(".profile__modal-add", (formData) => {
  // Considere que os inputs do formulário de novo card possuem name="title" e name="link"
  const newCardData = { name: formData.title, link: formData.link };
  const cardElement = createCard(newCardData);
  cardsSection.addItem(cardElement);
  addCardPopup.close();
  // Opcional: resetar os estados de validação, se necessário
});
addCardPopup.setEventListeners();

// Ao clicar no botão de adicionar card
document.querySelector(".profile__button-rectangle").addEventListener("click", () => {
  addCardPopup.open();
});
