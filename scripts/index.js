import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";
import Api from "./Api.js";
import { ownerId }from "./utils.js"


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

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "6776f0e2-04cc-4374-8e7e-91a09af225f0",
    "Content-Type": "application/json",
  },
});


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
	console.log("Dados passados para a classe Card:", data);
	const card = new Card(
	  {
		...data,
		deleteCard: (card) => deleteCard(card),
		canDelete: data.owner === ownerId,
	  },
	  "#card-template",
	  handleCardClick
	);
	return card.getCardElement();
  }

let cardsSection;

api.getInitialCards().then(res => {
  console.log("response-> ",res)
  if (res.status !== 200) {
    return Promise.reject("Erro da requisição-> " ,res.status)
  }return res.json()
}).then(cards => {
  console.log("cards-> ",cards)
  cardsSection = new Section(
    {
      items: cards,
      renderer: (item) => {
        const cardElement = createCard(item);
        cardsSection.addItem(cardElement);
      },
    },
    ".cards"
  );
  cardsSection.renderItems();
}).catch(error => {
  console.log("[GET] /cards-> ",error)
})



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

/////////////////////ADD CARD////////////////////////////////////////////

const addCardPopup = new PopupWithForm(".profile__modal-add", (formData) => {
  const newCardData = {
    name: formData.title,
    link: formData.link,
    isLiked: false,
    owner: ownerId,
    createdAt: new Date(),
  };

  api.createCard(newCardData)
    .then((res) => {
      if (res.status !== 201) {
        return Promise.reject(`Erro da requisição: ${res.status}`);
      }
      return res.json();
    })
    .then((createdCard) => {
		console.log("Resposta da API ao criar o cartão:", createdCard);
		const cardElement = createCard(createdCard);
		cardsSection.addItem(cardElement);
		addCardPopup.close();
    })
    .catch((error) => {
      console.error("[POST] /cards ->", error);
    });
});
addCardPopup.setEventListeners();

addButton.addEventListener("click", () => {
  addCardPopup.open();
});

///////////////////////DELETE CARD//////////////////////////////////////

function deleteCard(card) {
	if (!card._canDelete) {
	  console.error("Você não é dono do cartão e não pode deletá-lo.");
	  return;
	}

	api.deleteCard(card._id)
	  .then(() => {
		card._element.remove();
		card._element = null;
		console.log("Cartão deletado com sucesso.");
	  })
	  .catch((err) => {
		console.error("Erro ao deletar o cartão:", err);
	  });
  }
