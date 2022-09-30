export default class FormValidator {
    // constructor(settings, formElement) {
        constructor(formElement) {
        // this._settings = settings;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
        this.checkInputValidity = this.checkInputValidity.bind(this);
        this.toggleButtonState = this.toggleButtonState.bind(this);        
        this.resetValidation = this.resetValidation.bind(this);
        this.buttonElement = this._formElement.querySelector('.popup__submit');
    }

    enableValidation = () => {
        this.setEventListeners();
    }

    setEventListeners = () => {
        // чтобы проверить состояние кнопки в самом начале
        this.toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this.checkInputValidity(inputElement);
                this.toggleButtonState();
            })
        });
    }

    checkInputValidity = (inputElement) => {
        // setErrorText(inputElement);
        if (!inputElement.validity.valid) {
            this.showInputError(inputElement, inputElement.validationMessage);
        } else {
            this.hideInputError(inputElement);
        }
    };

    showInputError = (inputElement, errorMessage) => {
        const errorElement = this._formElement.querySelector(`.popup__error_${inputElement.id}`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add('error_visible');
        inputElement.classList.add('error_visible');
    };

    hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`.popup__error_${inputElement.id}`);
        errorElement.classList.remove('error_visible');
        errorElement.textContent = '';
        inputElement.classList.remove('error_visible');
    };

    toggleButtonState = () => {
        if (this.hasInvalidInput()) {
            this.buttonElement.setAttribute('disabled', true);
            this.buttonElement.classList.add('popup__submit_invalid');
        } else {
            this.buttonElement.removeAttribute('disabled');
            this.buttonElement.classList.remove('popup__submit_invalid');
        }
    }

    hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    resetValidation () {
        // управляем кнопкой  
        this.toggleButtonState();
        //очищаем ошибки 
        this._inputList.forEach((inputElement) => {
            this.hideInputError(inputElement);
        });
    }
}




// function setErrorText(input) {
//     const validity = input.validity;
//     input.setCustomValidity('');
//     if (validity.valueMissing) {
//         input.setCustomValidity('Поле пустое');
//     }
//     if (validity.tooLong) {
//         input.setCustomValidity('Много символов');
//     }
//     if (validity.tooShort) {
//         input.setCustomValidity('Мало символов');
//     }
//     if (validity.typeMismatch && input.type === 'url') {
//         input.setCustomValidity('Введите ссылку');
//     }
// }