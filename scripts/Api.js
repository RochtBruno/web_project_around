export default class Api {
  constructor({baseUrl, headers}) {
	this._baseUrl = baseUrl;
	this._headers = headers;
  }

  getUser(){
	return fetch(`${this._baseUrl}/users/me`,{
		headers:this._headers
	})
  }

  updateUser(name,about){
	return fetch(`${this._baseUrl}/users/me`,{
		headers: this._headers,
		method: "PATCH",
		body: JSON.stringify({
			name: name,
			about: about
		})
	})
  }

  updateAvatar(avatarLink){
	return fetch(`${this._baseUrl}/users/me/avatar`,{
		headers: this._headers,
		method: "PATCH",
		body: JSON.stringify({
			avatar:avatarLink
		})
	})
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


