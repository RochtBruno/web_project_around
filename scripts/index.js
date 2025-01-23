let	editProfile = document.querySelector('.profile__infos-icon');
let	modal = document.querySelector('.profile__modal');
let overlay = document.querySelector('.profile__overlay');
let closeModal = document.querySelector('.profile__modal-icon');
let formElement = document.querySelector('.profile__modal-form');
let nameInput = document.querySelector('#nameInput');
let jobInput = document.querySelector('#jobInput');
let title = document.querySelector('.profile__infos-title');
let job = document.querySelector('.profile__infos-description');
let submitButton = document.querySelector('.profile__modal-button');

nameInput.value = title.textContent;
jobInput.value = job.textContent;

editProfile.addEventListener('click', function() {
	modal.classList.add('opened');
	overlay.classList.add('opened');
});

closeModal.addEventListener('click', function() {
	modal.classList.remove('opened');
	overlay.classList.remove('opened');
});

function handleSubmit(e){
	e.preventDefault();

	title.textContent = nameInput.value;
	job.textContent = jobInput.value;

	modal.classList.remove('opened');
	overlay.classList.remove('opened');
}

submitButton.addEventListener('click', handleSubmit);
