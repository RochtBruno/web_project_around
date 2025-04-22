export class Card {
	constructor({ name, link, owner, _id, deleteCard, canDelete}, templateSelector, handleCardClick, deleteConfirmationPopup, api) {
		this._name = name;
		this._link = link;
		this._owner = owner;
		this._id = _id;
		this._deleteCard = deleteCard
		this._canDelete = canDelete;
		this._templateSelector = templateSelector;
		this._handleCardClick = handleCardClick;
		this._deleteConfirmationPopup = deleteConfirmationPopup;
		this._api = api
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
		const isLiked = this._likeButton.classList.contains("active");
	  
		const apiCall = isLiked
		  ? this._api.removeLike(this._id) // Remove curtida
		  : this._api.addLike(this._id);  // Adiciona curtida
	  
		apiCall
		  .then((updatedCard) => {
			console.log("Dados retornados pela API após curtir/descurtir:", updatedCard);
	  
			// Atualiza o estado do botão de curtida com base na resposta da API
			this._isLiked = updatedCard.isLiked;
			this._likeButton.classList.toggle("active", this._isLiked);
			this._likeButton.src = this._isLiked
			  ? "images/Union.svg" // Ícone de curtida ativa
			  : "images/Group.svg"; // Ícone de curtida inativa
		  })
		  .catch((err) => {
			console.error("Erro ao alternar curtida:", err);
		  });
	  }

	_handleDelete() {
		this._deleteConfirmationPopup.setSubmitAction(() => {
		  this._deleteCard(this);
		});
		this._deleteConfirmationPopup.open();
	  }

	getCardElement() {
		this._cardElement = this._getTemplate();
		this._likeButton = this._cardElement.querySelector(".cards__card-like");
		this._cardElement.querySelector(".cards__card-title").textContent = this._name;
		this._cardElement.querySelector(".cards__card-image-inner").src = this._link;
		this._cardElement.querySelector(".cards__card-image-inner").alt = `Imagem de ${this._name}`;

		if (this._isLiked) {
			this._likeButton.classList.add("active");
			this._likeButton.src = "images/Union.svg";
		  } else {
			this._likeButton.classList.remove("active");
			this._likeButton.src = "images/Group.svg";
		  }
		this._setEventListeners();
		this._element = this._cardElement;
		return this._cardElement;
	}
  }
