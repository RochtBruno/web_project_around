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

function setupLikeButton(likeButton) {
	likeButton.addEventListener("click", () => {
		if (likeButton.src.includes("images/Group.svg")) {
			likeButton.src = "images/Union.svg";
		} else if (likeButton.src.includes("images/Union.svg")) {
			likeButton.src = "images/Group.svg";
		}
	});
}

const cardsContainer = document.querySelector(".cards");

function renderCards(){
	cardsContainer.innerHTML = "";
	initialCards.forEach(card => {
		const cardElement = document.createElement("div");
		cardElement.classList.add("cards__card");

		const deleteCard = document.createElement("img");
		deleteCard.classList.add("cards__card-delete");
		deleteCard.src = "images/Trash.svg";
		cardElement.append(deleteCard);

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

		setupLikeButton(likeButton);

		deleteCard.addEventListener("click", () => {
			cardElement.remove();
		});

		likeButton.addEventListener("click", () => {
		  likeButton.classList.toggle("active");
		});

		cardInfos.appendChild(cardTitle);
		cardInfos.appendChild(likeButton);

		cardElement.appendChild(cardImageContainer);
		cardElement.appendChild(cardInfos);

		cardsContainer.appendChild(cardElement);
	  });
}

/////////////// LIKE BUTTON //////////////

document.querySelectorAll(".cards__card-like").forEach(setupLikeButton);

//////////// DELETE CARD /////////////
const deleteCards = document.querySelectorAll(".cards__card-delete");

deleteCards.forEach((deleteCard) => {
	deleteCard.addEventListener("click",(event)=>{
		const card = event.target.closest(".cards__card");
		if(card)
			card.remove();
	})
})

////////////ADICIONAR CARDS PELO FORMULARIO/////////

const formAddCard = document.querySelector(".profile__modal-add-form");
const cardTitle = document.querySelector("#titleInput");
const cardImage = document.querySelector("#linkInput");

function handleAddNewCard(e){
	e.preventDefault();
	initialCards.unshift({name:cardTitle.value,link:cardImage.value});
	console.log(initialCards)
	renderCards();
	cardTitle.value = "";
	cardImage.value = "";
	modalAdd.classList.remove('opened');
	overlay.classList.remove('opened');
}

formAddCard.addEventListener("submit",handleAddNewCard)

renderCards();

///////POP-UP DA IMAGEM/////////
const popUpImages = document.querySelectorAll(".cards__card-image-inner")
popUpImages.forEach(popUpImage => {
	popUpImage.addEventListener("click",(event)=>{
		const imageUrl = event.target.src;
		const card = event.target.closest(".cards__card");
        const cardTitle = card.querySelector(".cards__card-title")?.textContent || "Sem título";
		const popup = document.createElement("div");
        popup.classList.add("popup__overlay");
        popup.innerHTML = `
            <div class="popup__content">
                <img src="${imageUrl}" alt="Imagem Expandida">
                <img src="images/close-modal.png" class="popup__close"></img>
				<p class="popup__description">${cardTitle}</p>
            </div>
        `;

        document.body.appendChild(popup);


        document.querySelector(".popup__close").addEventListener("click", () => {
            popup.remove();
        });

        popup.addEventListener("click", (e) => {
            if (e.target === popup) {
                popup.remove();
            }
        });
	})
})
