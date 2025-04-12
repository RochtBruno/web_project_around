// utils.js

export const ownerId = "22f4bd5bf1df5dcb2823c979";

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

	if (trigger) {
	  trigger.addEventListener('click', () => openModal(modal, overlay));
	}

	if (closeButton) {
	  closeButton.addEventListener('click', () => closeModal(modal, overlay));
	}
  }
