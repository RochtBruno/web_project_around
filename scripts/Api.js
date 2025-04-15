export default class Api {
  constructor({baseUrl, headers}) {
	this._baseUrl = baseUrl;
	this._headers = headers;
  }

  getInitialCards() {
	return fetch(`${this._baseUrl}/cards`, {
	  headers: this._headers
	})
  }

  createCard(card){
	return fetch(`${this._baseUrl}/cards`, {
		headers: this._headers,
		method: "POST",
		body: JSON.stringify(card)
	  })
  }

  deleteCard(cardId){
	return fetch(`${this._baseUrl}/cards/${cardId}`,{
		headers: this._headers,
		method: "DELETE"
	})
  }
}


