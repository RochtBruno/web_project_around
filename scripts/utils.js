// utils.js

export function openModal(modal, overlay) {
	modal.classList.add('opened');
	overlay.classList.add('opened');
}
export function closeModal(modal, overlay) {
	modal.classList.remove('opened');
	overlay.classList.remove('opened');
}

export function setupModalHandlers({ triggerSelector, modalSelector, closeSelector, overlaySelector }) {
	const trigger = document.querySelector(triggerSelector);
	const modal = document.querySelector(modalSelector);
	const closeButton = document.querySelector(closeSelector);
	const overlay = document.querySelector(overlaySelector);

	// Ao clicar no gatilho, abre a modal
	if (trigger) {
	  trigger.addEventListener('click', () => openModal(modal, overlay));
	}

	// Ao clicar no botão de fechar, fecha a modal
	if (closeButton) {
	  closeButton.addEventListener('click', () => closeModal(modal, overlay));
	}
  }
