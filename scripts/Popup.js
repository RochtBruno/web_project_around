export default class Popup {
	constructor(popupSelector) {
		this._popup = document.querySelector(popupSelector);
		this._handleEscClose = this._handleEscClose.bind(this);
	}

	open() {
		this._popup.classList.add('opened');
		document.addEventListener('keydown', this._handleEscClose);
	}

	close() {
		this._popup.classList.remove('opened');
		document.removeEventListener('keydown', this._handleEscClose);
	}

	_handleEscClose(e) {
		if (e.key === 'Escape') {
			this.close();
		}
	}

	setEventListeners() {
		this._popup.addEventListener('click', (event) => {
			if (
				event.target.classList.contains('profile__modal-close') ||
				event.target.classList.contains('profile__modal-add-close') ||
				event.target.classList.contains("popup__close") ||
				event.target === this._popup
			) {
				this.close();
			}
		});
		const overlay = document.querySelector('.profile__overlay');
		if (overlay) {
		  overlay.addEventListener('click', () => {
			this.close();
		  });
		}
	}
}
