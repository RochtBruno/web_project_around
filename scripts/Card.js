export class Card {
	constructor({ name, link }, templateSelector) {
	  this._name = name;
	  this._link = link;
	  this._templateSelector = templateSelector;
	}

	// Método privado para pegar o template do HTML
	_getTemplate() {
	  const template = document.querySelector(this._templateSelector).content;
	  return template.querySelector(".cards__card").cloneNode(true);
	}

	// Método privado para configurar os eventos
	_setEventListeners() {
	  this._likeButton = this._cardElement.querySelector(".cards__card-like");
	  this._deleteButton = this._cardElement.querySelector(".cards__card-delete");
	  this._cardImage = this._cardElement.querySelector(".cards__card-image-inner");

	  this._likeButton.addEventListener("click", () => this._handleLike());
	  this._deleteButton.addEventListener("click", () => this._handleDelete());
	  this._cardImage.addEventListener("click", () => this._handleImageClick());
	}

	// Método privado para curtir
	_handleLike() {
	  this._likeButton.classList.toggle("active");
	  this._likeButton.src = this._likeButton.src.includes("Group.svg")
		? "images/Union.svg"
		: "images/Group.svg";
	}

	// Método privado para deletar
	_handleDelete() {
	  this._cardElement.remove();
	}

	// Método privado para abrir popup da imagem
	_handleImageClick() {
	  const popup = document.createElement("div");
	  popup.classList.add("popup__overlay");
	  popup.innerHTML = `
		<div class="popup__content">
		  <img src="${this._link}" alt="Imagem Expandida">
		  <img src="images/close-modal.png" class="popup__close">
		  <p class="popup__description">${this._name}</p>
		</div>
	  `;

	  document.body.appendChild(popup);

	  const closePopup = () => popup.remove();
	  popup.querySelector(".popup__close").addEventListener("click", closePopup);
	  popup.addEventListener("click", (e) => e.target === popup && closePopup());
	  document.addEventListener("keydown", (e) => e.key === "Escape" && closePopup());
	}

	// Método público que retorna o card completo
	getCardElement() {
	  this._cardElement = this._getTemplate();
	  this._cardElement.querySelector(".cards__card-title").textContent = this._name;
	  this._cardElement.querySelector(".cards__card-image-inner").src = this._link;
	  this._cardElement.querySelector(".cards__card-image-inner").alt = `Imagem de ${this._name}`;

	  this._setEventListeners();
	  return this._cardElement;
	}
  }
