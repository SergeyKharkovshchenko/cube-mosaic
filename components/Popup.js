export default class Popup {

    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._popup__checkbox = document.querySelectorAll('.popup__checkbox-indicator');
        this._popup__rangevalue = document.querySelector('.popup__range-value');
        this._popup_window = document.querySelector('.popup__window');
        this._rng = document.getElementById('popup__range');
        this._popup__submit = document.getElementById('popup__submit');
        this._popup__form = document.getElementById('popup__form');
        this._popup__checkboxs = document.querySelectorAll('.popup__checkbox');
        this._message = "";
        this._phone = document.getElementById('phone');
        this._email = document.getElementById('email');
    }

    _sendEmail(message) {
        Email.send({
                SecureToken: "8d8ec6a1-ace9-4718-a935-0308c89f375e",
                To: 'kharkovchenko@mail.ru',
                From: "kharkovchenko@gmail.com",
                Subject: "Информация от Cube-mosaic",
                Body: message
            })
            .then(function () {
                alert("Email successfully sent")
            });
    }

    _showRangeInPopup() {
        this._popup__rangevalue.textContent = this._rng.value;
        this._popup__rangevalue.style = `left: ${this._rng.value*9}px`;
    }

    _submitHandler(e) {
        e.preventDefault()
        this._popup__checkboxs.forEach(checkbox => {
            if (checkbox.checked) {
                this._message +=
                    `V - ${checkbox.value},
    `;
                checkbox.checked = false;
            };
        })

        this._message += `
    Площадь: ${this._rng.value}
    Моб: ${this._phone.value}
    Мейл: ${this._email.value}`
        this._sendEmail(this._message);
        this.close();
        this.cleanPopup();
    }

    close() {
        this._popup.classList.remove('popup_type_open');
        this._popup_window.classList.remove('popup_type_open');
        document.removeEventListener('keydown', this._handleEscClose);
        document.body.style.overflow = "visible";
    }

    cleanPopup() {
        this._popup__checkbox.forEach(checkbox => {
            checkbox.classList.remove('checked');
        })
        this._popup__rangevalue.textContent = "5";
        this._popup__rangevalue.style = `left: 45px`;
        this._rng.value = "5";
        this._phone.value = "";
        this._email.value = "";
        this._message = "";
    }

    open() {
        this._popup.classList.add('popup_type_open');
        this._popup_window.classList.add('popup_type_open');
        document.addEventListener('keydown', this._handleEscClose);
        document.body.style.overflow = "hidden";
    }

    _handleEscClose(event) {
        if (event.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        this._popup_window.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_type_open')) {
                this.close();
            }
            if (evt.target.classList.contains('popup__close')) {
                this.close();
            }
        });

        this._popup__checkbox.forEach(checkbox => {
            checkbox.addEventListener('click', () => {
                checkbox.classList.toggle('checked');
            });
        })

        this._rng.addEventListener('input', () => this._showRangeInPopup());
        this._popup__submit.addEventListener('click', (e) => this._submitHandler(e));
        this._popup__form.addEventListener('submit', (e) => this._submitHandler(e));
    }
}