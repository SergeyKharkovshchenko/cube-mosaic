import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";

const qa__icon = document.querySelectorAll('.qa__icon');

qa__icon.forEach(item => item.addEventListener('click', (e) => {
  console.log(e.target);
  console.log(e.target.closest('.qa__col'));
  e.target.closest('.qa__col').querySelector('.qa__header').classList.toggle('qa__opened');
  e.target.closest('.qa__col').querySelector('.qa__content').classList.toggle('qa__opened');
  e.target.closest('.qa__col').querySelector('.qa__lines').classList.toggle('qa__opened');
}));

const popup__atom = document.querySelector('.popup__atom');
const popup = new Popup('.popup');
popup.setEventListeners();

popup__atom.addEventListener('click', () => {
  popup.open();
  popupFormValidation.enableValidation();
});


const popupFormValidation = new FormValidator(popup__form);

