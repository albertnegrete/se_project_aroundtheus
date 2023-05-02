const initialCards = [
	{
		title: "Yosemite Valley",
		link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
	},
	{
		title: "Lake Louise",
		link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
	},
	{
		title: "Bald Mountains",
		link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
	},
	{
		title: "Latemar",
		link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
	},
	{
		title: "Vanoise National Park",
		link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
	},
	{
		title: "Lago di Braies",
		link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
	},
];

/*Elements */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditModalCloseButton = profileEditModal.querySelector(
	"#profile-edit-modal-close"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
	"#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector("#profile-edit-form");
const cardTemplate =
	document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".gallery__cards");

//new card modal

const addNewCardButton = document.querySelector("#add-card-button");
const newCardModal = document.querySelector("#new-card-modal");
const addNewCardModalCloseButton = newCardModal.querySelector(
	"#new-card-modal-close"
);
const newCardSubmitButton = newCardModal.querySelector(
	"#add-card-modal-submit-button"
);

const addCardFormEl = newCardModal.querySelector("#add-card-form");
const cardTitleInput = addCardFormEl.querySelector("#input-title");
const cardLinkInput = addCardFormEl.querySelector("#input-url");

/*Functions */

function openProfileEditModal() {
	profileEditModal.classList.add("modal_opened");
}

function closeProfileEditModal() {
	profileEditModal.classList.remove("modal_opened");
}

function openNewCardModal() {
	newCardModal.classList.add("modal_opened");
}

function closeAddModal() {
	newCardModal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
	const cardElement = cardTemplate.cloneNode(true);
	const cardImageEl = cardElement.querySelector(".card__image");
	const cardTitleEl = cardElement.querySelector(".card__title");
	const likeButton = cardElement.querySelector(".card__like-button");

	likeButton.addEventListener("click", () => {
		likeButton.classList.toggle("card__like-button_active");
	});

	cardTitleEl.textContent = cardData.title;

	cardImageEl.src = cardData.link;
	cardImageEl.alt = cardData.title;
	return cardElement;
}

function renderCard(cardData) {
	const cardElement = getCardElement(cardData);
	cardListEl.apppend(cardElement);
}

/*Event Handlers */

function handleProfileEditSubmit(e) {
	e.preventDefault();

	profileTitle.textContent = profileTitleInput.value;
	profileDescription.textContent = profileDescriptionInput.value;
	closeProfileEditModal();
}

function handleAddCardFormSubmit(e) {
	e.preventDefault();
	const title = cardTitleInput.value;
	const link = cardLinkInput.value;
	const cardElement = getCardElement({
		title,
		link,
	});
	cardListEl.prepend(cardElement);
	closeAddModal();
}

/*Event Listeners */

profileEditButton.addEventListener("click", () => {
	profileTitleInput.value = profileTitle.textContent;
	profileDescriptionInput.value = profileDescription.textContent;

	profileEditModal.classList.add("modal_opened");
});

profileEditModalCloseButton.addEventListener("click", () => {
	closeProfileEditModal();
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((cardData) => {
	cardListEl.prepend(getCardElement(cardData));
});

//add new card modal

addNewCardButton.addEventListener("click", () => openNewCardModal());

addCardFormEl.addEventListener("submit", handleAddCardFormSubmit);

addNewCardModalCloseButton.addEventListener("click", () => {
	closeAddModal();
});
