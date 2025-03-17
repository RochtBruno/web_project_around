// FormValidator.js
export class FormValidator {

	constructor(config, formElement) {
	  this._config = config;
	  this._formElement = formElement;
	  this._inputList = Array.from(
		this._formElement.querySelectorAll(this._config.inputSelector)
	  );
	  this._submitButton = this._formElement.querySelector(
		this._config.submitButtonSelector
	  );
	}

	// Método privado para exibir a mensagem de erro para um input
	_showError(inputElement, message) {
	  let errorElement = inputElement.nextElementSibling;
	  if (!errorElement || !errorElement.classList.contains(this._config.errorClass)) {
		errorElement = document.createElement('span');
		errorElement.classList.add(this._config.errorClass);
		inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
	  }
	  inputElement.classList.add(this._config.inputErrorClass);
	  errorElement.textContent = message;
	}

	// Método privado para esconder a mensagem de erro de um input
	_hideError(inputElement) {
	  const errorElement = inputElement.nextElementSibling;
	  if (errorElement && errorElement.classList.contains(this._config.errorClass)) {
		errorElement.textContent = '';
	  }
	  inputElement.classList.remove(this._config.inputErrorClass);
	}

	// Método privado que verifica a validade do input e exibe ou esconde erros
	_checkInputValidity(inputElement) {
	  if (!inputElement.validity.valid) {
		// Utiliza a mensagem padrão do navegador (pode ser customizada, se necessário)
		this._showError(inputElement, inputElement.validationMessage);
	  } else {
		this._hideError(inputElement);
	  }
	}

	// Método privado que retorna true se algum input for inválido
	_hasInvalidInput() {
	  return this._inputList.some(inputElement => !inputElement.validity.valid);
	}

	// Método privado que ativa ou desativa o botão de submit com base na validade do formulário
	_toggleButtonState() {
	  if (this._hasInvalidInput()) {
		this._submitButton.disabled = true;
		this._submitButton.classList.add(this._config.inactiveButtonClass);
	  } else {
		this._submitButton.disabled = false;
		this._submitButton.classList.remove(this._config.inactiveButtonClass);
	  }
	}

	// Método privado que adiciona os manipuladores de evento aos inputs do formulário
	_setEventListeners() {
	  // Inicializa o estado do botão
	  this._toggleButtonState();
	  // Para cada input, adiciona o listener para validação em tempo real
	  this._inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', () => {
		  this._checkInputValidity(inputElement);
		  this._toggleButtonState();
		});
	  });
	}

	// Método público que habilita a validação do formulário
	enableValidation() {
	  this._setEventListeners();
	}
  }
