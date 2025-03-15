export class FormValidator {
	constructor(config, formElement) {
	  this._config = config;
	  this._form = formElement;
	  this._inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
	  this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
	}
  
	// Método público para habilitar a validação
	enableValidation() {
	  this._setEventListeners();
	  this._toggleButtonState(); // Atualiza o estado do botão ao carregar a página
	}
  
	// Métodos privados
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
		  this._handleSubmit();
		}
	  });
	}
  
	_checkInputValidity(input) {
	  const errorElement = input.nextElementSibling; // Pega o próximo irmão (span de erro)
  
	  // Validação customizada para URLs
	  if (input.type === 'url' && !this._isValidUrl(input.value)) {
		this._showError(input, errorElement, 'Insira uma URL válida.');
		return;
	  }
  
	  // Validação padrão do HTML5
	  if (!input.validity.valid) {
		this._showError(input, errorElement, input.validationMessage);
	  } else {
		this._hideError(input, errorElement);
	  }
	}
  
	_showError(input, errorElement, message) {
	  input.classList.add(this._config.inputErrorClass);
	  if (errorElement) {
		errorElement.textContent = message;
		errorElement.classList.add(this._config.errorClass);
	  }
	}
  
	_hideError(input, errorElement) {
	  input.classList.remove(this._config.inputErrorClass);
	  if (errorElement) {
		errorElement.textContent = '';
		errorElement.classList.remove(this._config.errorClass);
	  }
	}
  
	_toggleButtonState() {
	  const isValid = this._inputs.every(input => input.validity.valid);
	  
	  if (isValid) {
		this._submitButton.classList.remove(this._config.inactiveButtonClass);
		this._submitButton.disabled = false;
	  } else {
		this._submitButton.classList.add(this._config.inactiveButtonClass);
		this._submitButton.disabled = true;
	  }
	}
  
	_isFormValid() {
	  return this._inputs.every(input => input.validity.valid);
	}
  
	// Validação de URL
	_isValidUrl(url) {
	  try {
		new URL(url);
		return true;
	  } catch {
		return false;
	  }
	}
  }