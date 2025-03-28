import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');
  }

  open({ link, title }) {
    this._image.src = link;
    this._image.alt = title;
    this._caption.textContent = title;
    this._popup.classList.add("opened");
    super.open();
  }
  close() {
    this._popup.classList.remove("opened");
    super.close();
  }
}

