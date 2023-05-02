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
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageModalCloseButton = document.querySelector(
	"#preview-modal-close"
);

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

function openModal(modal) {
	modal.classList.add("modal_opened");
	modal.classList.remove("modal_hidden_transition");
	modal.classList.add("modal_visible_transition");
}

function closeModal(modal) {
	modal.classList.remove("modal_opened");
	modal.classList.remove("modal_visible_transition");
	modal.classList.add("modal_hidden_transition");
}

function getCardElement(cardData) {
	const cardElement = cardTemplate.cloneNode(true);
	const cardImageEl = cardElement.querySelector(".card__image");
	const cardTitleEl = cardElement.querySelector(".card__title");
	const likeButton = cardElement.querySelector(".card__like-button");
	const deleteButton = cardElement.querySelector("#card-delete-button");
	const previewImageModalContainer = previewImageModal.querySelector(
		".modal__preview-container"
	);
	const modalPreviewTitle = previewImageModal.querySelector(
		".modal__preview-title"
	);

	deleteButton.addEventListener("click", () => {
		cardElement.remove();
	});

	cardImageEl.addEventListener("click", () => {
		openModal(previewImageModal);
		previewImageModalContainer.style.backgroundImage =
			"url(" + cardImageEl.src + ")";
		modalPreviewTitle.textContent = cardTitleEl.textContent;
	});
	//add click listener to cardImage
	//card image size
	//open modal previewImageModal

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
	closeModal(profileEditModal);
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
	closeModal(newCardModal);
}

/*Event Listeners */

profileEditButton.addEventListener("click", () => {
	profileTitleInput.value = profileTitle.textContent;
	profileDescriptionInput.value = profileDescription.textContent;
	openModal(profileEditModal);
});

profileEditModalCloseButton.addEventListener("click", () => {
	closeModal(profileEditModal);
});

previewImageModalCloseButton.addEventListener("click", () => {
	closeModal(previewImageModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((cardData) => {
	cardListEl.prepend(getCardElement(cardData));
});

//add new card modal

addNewCardButton.addEventListener("click", () => openModal(newCardModal));

addCardFormEl.addEventListener("submit", handleAddCardFormSubmit);

addNewCardModalCloseButton.addEventListener("click", () => {
	closeModal(newCardModal);
});
