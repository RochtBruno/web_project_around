export class Card {
	constructor({ name, link }, templateSelector, handleCardClick) {
	  this._name = name;
	  this._link = link;
	  this._templateSelector = templateSelector;
	  this._handleCardClick = handleCardClick;
	}

	_getTemplate() {
	  const template = document.querySelector(this._templateSelector).content;
	  return template.querySelector(".cards__card").cloneNode(true);
	}

	_setEventListeners() {
	  this._likeButton = this._cardElement.querySelector(".cards__card-like");
	  this._deleteButton = this._cardElement.querySelector(".cards__card-delete");
	  this._cardImage = this._cardElement.querySelector(".cards__card-image-inner");

	  this._likeButton.addEventListener("click", () => this._handleLike());
	  this._deleteButton.addEventListener("click", () => this._handleDelete());

	  this._cardImage.addEventListener("click", () => this._handleCardClick({
		link: this._link,
		name: this._name
	  }));
	}

	_handleLike() {
	  this._likeButton.classList.toggle("active");
	  this._likeButton.src = this._likeButton.src.includes("Group.svg")
		? "images/Union.svg"
		: "images/Group.svg";
	}

	_handleDelete() {
	  this._cardElement.remove();
	}

	getCardElement() {
	  this._cardElement = this._getTemplate();
	  this._cardElement.querySelector(".cards__card-title").textContent = this._name;
	  this._cardElement.querySelector(".cards__card-image-inner").src = this._link;
	  this._cardElement.querySelector(".cards__card-image-inner").alt = `Imagem de ${this._name}`;

	  this._setEventListeners();
	  return this._cardElement;
	}
  }
