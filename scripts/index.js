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

initialCards.forEach(card => {
  const cardElement = document.createElement("div");
  cardElement.classList.add("cards__card");

  const cardImageContainer = document.createElement("div");
  cardImageContainer.classList.add("cards__card-image");

  const cardImage = document.createElement("img");
  cardImage.classList.add("cards__card-image-inner");
  cardImage.src = card.link;
  cardImage.alt = `Imagem de ${card.name}`;

  cardImageContainer.appendChild(cardImage);

  const cardInfos = document.createElement("div");
  cardInfos.classList.add("cards__card-infos");

  const cardTitle = document.createElement("h2");
  cardTitle.classList.add("cards__card-title");
  cardTitle.textContent = card.name;

  const likeButton = document.createElement("img");
  likeButton.classList.add("cards__card-like");
  likeButton.src = "images/Group.svg";
  likeButton.alt = "botão de curtir";

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("active");
  });

  cardInfos.appendChild(cardTitle);
  cardInfos.appendChild(likeButton);

  cardElement.appendChild(cardImageContainer);
  cardElement.appendChild(cardInfos);

  cardsContainer.appendChild(cardElement);
});
