let	editProfile = document.querySelector('.profile__infos-icon');
let	modal = document.querySelector('.profile__modal');
let overlay = document.querySelector('.profile__overlay');
let closeModal = document.querySelector('.profile__modal-icon');

editProfile.addEventListener('click', function() {
	modal.classList.add('opened');
	overlay.classList.add('opened');
});

closeModal.addEventListener('click', function() {
	modal.classList.remove('opened');
	overlay.classList.remove('opened');
});