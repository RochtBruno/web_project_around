import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');
    this._popupCloseButton = this._popup.querySelector('.popup__close');
  }

  open({ link, name }) {
    // Cria o conteúdo do pop-up
    this._image.src = link;
    this._image.alt = `Imagem de ${name}`;
    this._caption.textContent = name;

    // Chama o método do Popup pai para abrir o pop-up
    super.open();

    // Fechar o pop-up ao clicar na área externa ou na tecla Esc
    this._setEventListeners();
  }

  _setEventListeners() {
    // Fechar o pop-up ao clicar no botão de fechar
    this._popupCloseButton.addEventListener("click", () => this.close());

    // Fechar ao clicar na área externa (overlay)
    this._popup.addEventListener("click", (e) => {
      if (e.target === this._popup) {
        this.close();
      }
    });

    // Fechar ao pressionar a tecla Esc
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.close();
      }
    });
  }

  close() {
    super.close();
  }
}
