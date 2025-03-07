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
const popUpImages = document.querySelectorAll(".cards__card-image-inner");

popUpImages.forEach(popUpImage => {
    popUpImage.addEventListener("click", (event) => {
        const imageUrl = event.target.src;
        const card = event.target.closest(".cards__card");
        const cardTitle = card.querySelector(".cards__card-title")?.textContent || "Sem título";
        
        const popup = document.createElement("div");
        popup.classList.add("popup__overlay");
        popup.innerHTML = `
            <div class="popup__content">
                <img src="${imageUrl}" alt="Imagem Expandida">
                <img src="images/close-modal.png" class="popup__close">
                <p class="popup__description">${cardTitle}</p>
            </div>
        `;

        document.body.appendChild(popup);

        // Função para fechar o pop-up
        function closePopup() {
            popup.remove();
            document.removeEventListener("keydown", escKeyListener); // Remove o evento ao fechar
        }

        // Fechar ao clicar no botão de fechar
        document.querySelector(".popup__close").addEventListener("click", closePopup);

        // Fechar ao clicar fora da imagem
        popup.addEventListener("click", (e) => {
            if (e.target === popup) {
                closePopup();
            }
        });

        // Fechar ao pressionar "Esc"
        function escKeyListener(e) {
            if (e.key === "Escape") {
                closePopup();
            }
        }

        document.addEventListener("keydown", escKeyListener);
    });
});

//Validação de formulário

const saveButton = document.querySelector('.profile__modal-button');

function showError(input, message) {
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('span');
        errorElement.classList.add('error-message');
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    errorElement.textContent = message;
    input.classList.add('input-error');
}

function clearError(input) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = '';
    }
    input.classList.remove('input-error');
}

function validateInput(input, minLength, maxLength, fieldName) {
    const value = input.value.trim();
    
    if (value.length === 0) {
        showError(input, `Preencha esse campo.`);
        return false;
    } else if (value.length < minLength || value.length > maxLength) {
        showError(input, `${fieldName} deve ter entre ${minLength} e ${maxLength} caracteres.`);
        return false;
    } else {
        clearError(input);
        return true;
    }
}

function validateForm() {
	const isNameValid = validateInput(nameInput, 2, 40, "Nome");
    const isJobValid = validateInput(jobInput, 2, 200, "Sobre");

    saveButton.disabled = !(isNameValid && isJobValid);

    if (saveButton.disabled) {
        saveButton.style.backgroundColor = "#ddd"; // Fundo cinza
        saveButton.style.color = "#777"; // Texto cinza mais escuro
    } else {
        saveButton.style.backgroundColor = "#000"; // Fundo preto
        saveButton.style.color = "#fff"; // Texto branco
    }
}

// Adiciona eventos de validação conforme o usuário digita
nameInput.addEventListener('input', validateForm);
jobInput.addEventListener('input', validateForm);

formElement.addEventListener('submit', function (e) {
    e.preventDefault();
    if (validateForm()) {
        document.querySelector('.profile__infos-title').textContent = nameInput.value;
        document.querySelector('.profile__infos-description').textContent = jobInput.value;
        document.querySelector('.profile__modal').classList.remove('opened');
        document.querySelector('.profile__overlay').classList.remove('opened');
    }
});

/////////////////////////////////////////////////////////

const titleInput = document.querySelector("#titleInput");
const linkInput = document.querySelector("#linkInput");
const saveAddButton = formAddCard.querySelector(".profile__modal-button");

// Função para validar a URL
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// Função para validar os campos e exibir mensagens de erro
function validateAddCardForm() {
    let isValid = true;

    if (titleInput.value.length < 2 || titleInput.value.length > 30) {
        showError(titleInput, "O título deve ter entre 2 e 30 caracteres.");
        isValid = false;
    } else {
        clearError(titleInput);
    }

    if (!isValidUrl(linkInput.value)) {
        showError(linkInput, "Insira uma URL válida.");
        isValid = false;
    } else {
        clearError(linkInput);
    }

    saveAddButton.disabled = !isValid;
    saveAddButton.style.backgroundColor = isValid ? "#000" : "#ddd"; // Fundo preto quando ativo, cinza quando inativo
    saveAddButton.style.color = isValid ? "#fff" : "#777"; // Texto branco quando ativo, cinza escuro quando inativo
}

// Garante que o botão começa desativado ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    saveAddButton.disabled = true;
    saveAddButton.style.backgroundColor = "#ddd";
    saveAddButton.style.color = "#777";
});

// Eventos para validar os inputs em tempo real
titleInput.addEventListener("input", validateAddCardForm);
linkInput.addEventListener("input", validateAddCardForm);

// Impedir envio do formulário se não for válido
formAddCard.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!titleInput.value || !linkInput.value || !isValidUrl(linkInput.value)) {
        validateAddCardForm();
        return;
    }

    initialCards.unshift({ name: titleInput.value, link: linkInput.value });
    renderCards();

    formAddCard.reset();
    validateAddCardForm();

    modalAdd.classList.remove("opened");
    overlay.classList.remove("opened");
});