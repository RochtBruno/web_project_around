import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const validationConfig = {
  inputSelector: ".profile__modal-input",
  submitButtonSelector: ".profile__modal-button",
  inactiveButtonClass: "button--disabled",
  inputErrorClass: "input-error",
  errorClass: "error-message",
};

const editProfileFormElement = document.querySelector(".profile__modal-form");
const addCardFormElement = document.querySelector(".profile__modal-add-form");

const editProfileValidator = new FormValidator(
  validationConfig,
  editProfileFormElement
);
const addCardValidator = new FormValidator(
  validationConfig,
  addCardFormElement
);

const editButton = document.querySelector(".profile__infos-edit");
const addButton = document.querySelector(".profile__button-rectangle");

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

const userInfo = new UserInfo({
  nameSelector: ".profile__infos-title",
  jobSelector: ".profile__infos-description",
});

// -------------------------
const popupWithImage = new PopupWithImage(".popup");
popupWithImage.setEventListeners();

function handleCardClick({ link, name }) {
  popupWithImage.open({ link, title: name });
}

function createCard(data) {
  const card = new Card(data, "#card-template", handleCardClick);
  return card.getCardElement();
}

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsSection.addItem(cardElement);
    },
  },
  ".cards"
);
cardsSection.renderItems();

const profilePopup = new PopupWithForm(".profile__modal", (formData) => {
  userInfo.setUserInfo({ name: formData.name, job: formData.job });
  profilePopup.close();
});
profilePopup.setEventListeners();

editButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  document.querySelector("#nameInput").value = currentUser.name;
  document.querySelector("#jobInput").value = currentUser.job;
  profilePopup.open();
});

const addCardPopup = new PopupWithForm(".profile__modal-add", (formData) => {
  const newCardData = { name: formData.title, link: formData.link };
  const cardElement = createCard(newCardData);
  cardsSection.addItem(cardElement);
  addCardPopup.close();
});
addCardPopup.setEventListeners();

addButton.addEventListener("click", () => {
  addCardPopup.open();
});
