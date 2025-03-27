import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

// Seletores
const profileEditButton = document.querySelector(".profile__infos-edit");
const profileAddButton = document.querySelector(".profile__button-rectangle");
const formEditProfile = document.querySelector(".profile__modal-form");
const formAddCard = document.querySelector(".profile__modal-add-form");
const nameInput = document.querySelector("#nameInput");
const jobInput = document.querySelector("#jobInput");
const titleInput = document.querySelector("#titleInput");
const linkInput = document.querySelector("#linkInput");
const cardsContainer = document.querySelector(".cards");

// Dados iniciais
const initialCards = [
  { name: "Vale de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg" },
  { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg" },
  { name: "Montanhas Carecas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg" },
  { name: "Parque Nacional da Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg" }
];

// Instância do UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__infos-title",
  jobSelector: ".profile__infos-description"
});

// Pop-up de imagem
const popupWithImage = new PopupWithImage(".cards__card-image-inner");
popupWithImage.setEventListeners();

// Função para abrir o pop-up de imagem
function handleCardClick({ link, name }) {
	popupWithImage.open({ link, name });
}

// Instância da Seção para renderizar os cards
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, "#card-template", handleCardClick);
      cardSection.addItem(card.getCardElement());
    }
  },
  ".cards"
);

cardSection.renderItems();

// Pop-up de edição de perfil
const popupEditProfile = new PopupWithForm(".profile__modal", (formData) => {
  userInfo.setUserInfo(formData);
  popupEditProfile.close();
});
popupEditProfile.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  popupEditProfile.open();
});

// Pop-up de adicionar novo card
const popupAddCard = new PopupWithForm(".profile__modal-add", (formData) => {
  const newCard = new Card({ name: formData.title, link: formData.link }, "#card-template", handleCardClick);
  cardSection.addItem(newCard.getCardElement());
  popupAddCard.close();
});
popupAddCard.setEventListeners();

profileAddButton.addEventListener("click", () => popupAddCard.open());

// Validação de formulários
const validationConfig = {
  inputSelector: ".profile__modal-input",
  submitButtonSelector: ".profile__modal-button",
  inactiveButtonClass: "button--disabled",
  inputErrorClass: "input-error",
  errorClass: "error-message"
};

const editProfileValidator = new FormValidator(validationConfig, formEditProfile);
const addCardValidator = new FormValidator(validationConfig, formAddCard);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();
