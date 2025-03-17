export class FormValidator {
	constructor(config, formElement) {
	  this._config = config;
	  this._form = formElement;
	  this._inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
	  this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
	}

	enableValidation() {
	  this._setEventListeners();
	  this._toggleButtonState();
	}

	_setEventListeners() {
	  this._inputs.forEach(input => {
		input.addEventListener('input', () => {
		  this._checkInputValidity(input);
		  this._toggleButtonState();
		});
	  });

	  this._form.addEventListener('submit', (e) => {
		e.preventDefault();
		if (this._isFormValid()) {
		  // Lógica de submit específica de cada formulário
		  this._form.dispatchEvent(new CustomEvent('formvalid', { detail: this._form }));
		}
	  });
	}

	_checkInputValidity(input) {
	  const errorElement = input.nextElementSibling;

	  // Validação customizada para URLs
	  if (input.type === 'url' && !this._isValidUrl(input.value)) {
		this._showError(input, errorElement, 'Insira uma URL válida.');
		return;
	  }

	  if (!input.validity.valid) {
		this._showError(input, errorElement, input.validationMessage);
	  } else {
		this._hideError(input, errorElement);
	  }
	}

	_showError(input, errorElement, message) {
	  input.classList.add(this._config.inputErrorClass);
	  errorElement.textContent = message;
	  errorElement.classList.add(this._config.errorClass);
	}

	_hideError(input, errorElement) {
	  input.classList.remove(this._config.inputErrorClass);
	  errorElement.textContent = '';
	  errorElement.classList.remove(this._config.errorClass);
	}

	_toggleButtonState() {
	  const isValid = this._inputs.every(input =>
		input.validity.valid &&
		!(input.type === 'url' && !this._isValidUrl(input.value))
	  );

	  this._submitButton.disabled = !isValid;
	  this._submitButton.classList.toggle(this._config.inactiveButtonClass, !isValid);
	}

	_isValidUrl(url) {
	  try {
		new URL(url);
		return true;
	  } catch {
		return false;
	  }
	}

	_isFormValid() {
	  return this._inputs.every(input =>
		input.validity.valid &&
		!(input.type === 'url' && !this._isValidUrl(input.value))
	  );
	}
  }
