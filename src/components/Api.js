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

  addLike(cardId) {
	console.log(`Enviando solicitação PUT para curtir o cartão com ID: ${cardId}`);
	return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
	  method: "PUT",
	  headers: this._headers,
	})
	  .then((res) => {
		console.log(`Resposta da API para curtir o cartão com ID: ${cardId}`, res);
		if (!res.ok) {
		  return Promise.reject(`Erro ao curtir o cartão: ${res.status}`);
		}
		return res.json();
	  })
	  .then((data) => {
		console.log(`Dados retornados pela API após curtir o cartão com ID: ${cardId}`, data);
		return data;
	  });
  }

  removeLike(cardId) {
	console.log(`Enviando solicitação DELETE para remover curtida do cartão com ID: ${cardId}`);
	return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
	  method: "DELETE",
	  headers: this._headers,
	})
	  .then((res) => {
		console.log(`Resposta da API para remover curtida do cartão com ID: ${cardId}`, res);
		if (!res.ok) {
		  return Promise.reject(`Erro ao remover a curtida: ${res.status}`);
		}
		return res.json();
	  })
	  .then((data) => {
		console.log(`Dados retornados pela API após remover curtida do cartão com ID: ${cardId}`, data);
		return data;
	  });
  }
}


