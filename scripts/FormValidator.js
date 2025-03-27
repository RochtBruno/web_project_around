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

	_hideError(inputElement) {
	  const errorElement = inputElement.nextElementSibling;
	  if (errorElement && errorElement.classList.contains(this._config.errorClass)) {
		errorElement.textContent = '';
	  }
	  inputElement.classList.remove(this._config.inputErrorClass);
	}

	_checkInputValidity(inputElement) {
	  if (!inputElement.validity.valid) {
		this._showError(inputElement, inputElement.validationMessage);
	  } else {
		this._hideError(inputElement);
	  }
	}

	_hasInvalidInput() {
	  return this._inputList.some(inputElement => !inputElement.validity.valid);
	}

	_toggleButtonState() {
	  if (this._hasInvalidInput()) {
		this._submitButton.disabled = true;
		this._submitButton.classList.add(this._config.inactiveButtonClass);
	  } else {
		this._submitButton.disabled = false;
		this._submitButton.classList.remove(this._config.inactiveButtonClass);
	  }
	}

	_setEventListeners() {
	  this._toggleButtonState();
	  this._inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', () => {
		  this._checkInputValidity(inputElement);
		  this._toggleButtonState();
		});
	  });
	}

	enableValidation() {
	  this._setEventListeners();
	}
  }
