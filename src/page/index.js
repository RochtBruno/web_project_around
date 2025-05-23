import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import { ownerId } from "../scripts/utils.js";

// const initialCards = [
//   {
//     name: "Vale de Yosemite",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
//   },
//   {
//     name: "Lago Louise",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
//   },
//   {
//     name: "Montanhas Carecas",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
//   },
//   {
//     name: "Latemar",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
//   },
//   {
//     name: "Parque Nacional da Vanoise ",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
//   },
//   {
//     name: "Lago di Braies",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
//   },
// ];

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
const popupWithImage = new PopupWithImage(".popup_type_image");
popupWithImage.setEventListeners();

function handleCardClick({ link, name }) {
  popupWithImage.open({ link, title: name });
}

function createCard(data) {
  const card = new Card(
    {
      ...data,
      isLiked: data.isLiked,
      deleteCard: (card) => deleteCard(card),
      canDelete: data.owner === ownerId,
    },
    "#card-template",
    handleCardClick,
    deleteConfirmationPopup,
    api
  );
  return card.getCardElement();
}

let cardsSection;

api
  .getInitialCards()
  .then((res) => {
    if (res.status !== 200) {
      return Promise.reject("Erro da requisição-> ", res.status);
    }
    return res.json();
  })
  .then((cards) => {
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
    return cards
  })
  .catch((error) => {
    console.log("[GET] /cards-> ", error);
  });

///////////////////////////PROFILE///////////////////////////////////

const profileName = document.querySelector(".profile__infos-title");
const profileAbout = document.querySelector(".profile__infos-description");
const profileImage = document.querySelector(".profile__image img");

api.getUser()
  .then((res) => {
    if (res.status !== 200) {
      return Promise.reject("Status da requisição inválido " + res.status);
    }
    return res.json();
  })
  .then((data) => {
    profileName.textContent = data.name;
    profileAbout.textContent = data.about;
    profileImage.src = data.avatar;
  })
  .catch((err) => {
    console.log("[GET] - users/me -> " + err);
  });

const profilePopup = new PopupWithForm(".profile__modal", (formData) => {
  showLoading()
  api.updateUser(formData.name, formData.job)
  .then((res) =>{
    if(res.status !== 200){
      return Promise.reject("Erro ao atualizar o perfil-> "+ res.status)
    }
    return res.json()
  })
  .then((updateData) => {
    userInfo.setUserInfo({name: updateData.name, job: updateData.about})
    profilePopup.close()
  })
  .catch((err) => {
    console.log("[PATCH] /users/me -> ",err)
  })
  .finally(() => {
    hideLoading()
  })
});
profilePopup.setEventListeners();

editButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  document.querySelector("#nameInput").value = currentUser.name;
  document.querySelector("#jobInput").value = currentUser.job;
  profilePopup.open();
});
///////////////////////UPDATE AVATAR ////////////////////////////////////

const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarForm = avatarPopup.querySelector(".popup__form_avatar");
const avatarInput = avatarPopup.querySelector("#avatarInput");
const avatarCloseButton = avatarPopup.querySelector(".popup__close_avatar");
const avatarElement = document.querySelector(".profile__image img");

function openAvatarPopup() {
  avatarPopup.style.display = "flex";
}

function closeAvatarPopup() {
  avatarPopup.style.display = "none";
}

avatarElement.addEventListener("click", openAvatarPopup);

avatarCloseButton.addEventListener("click", closeAvatarPopup);

avatarForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const avatarLink = avatarInput.value;
  showLoading();
  api.updateAvatar(avatarLink)
    .then((res) => {
      if (res.status !== 200) {
        return Promise.reject("Erro ao atualizar o avatar: " + res.status);
      }
      return res.json();
    })
    .then((data) => {
      avatarElement.src = data.avatar;
      closeAvatarPopup();
    })
    .catch((err) => {
      console.error("[PATCH] /users/me/avatar ->", err);
    })
    .finally(()=>{
      hideLoading();
    })
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
  showLoading();
    api
      .createCard(newCardData)
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
      })
      .finally(() => {
        // Ocultar o loading após o término da requisição
        hideLoading();
      }); // Simula um atraso de 3 segundos
});
addCardPopup.setEventListeners();

addButton.addEventListener("click", () => {
  addCardPopup.open();
});

///////////////////////DELETE CARD//////////////////////////////////////

const deleteConfirmationPopup = new PopupWithConfirmation(
  ".popup_type_confirm"
);
deleteConfirmationPopup.setEventListeners();

function deleteCard(card) {
  if (!card._canDelete) {
    console.error("Você não é dono do cartão e não pode deletá-lo.");
    return;
  }
  showLoading()
  api
    .deleteCard(card._id)
    .then(() => {

      card._element.remove();
      card._element = null;
      console.log("Cartão deletado com sucesso.");
      deleteConfirmationPopup.close();
    })
    .catch((err) => {
      console.error("Erro ao deletar o cartão:", err);
    })
    .finally(() => {
      hideLoading()
    })
}

//////////////////////////LOADING UX/////////////////////

const loadingSpinner = document.getElementById("loadingSpinner");
let loadingCount = 0;

function showLoading() {
  loadingCount++;
  loadingSpinner.style.display = "block";
}

function hideLoading() {
  loadingCount--;
  if (loadingCount === 0) {
    loadingSpinner.style.display = "none";
  }
}
