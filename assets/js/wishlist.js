var lista;
var wishlist;

window.addEventListener('DOMContentLoaded', init);
function init() {
    lista = document.getElementById('contenuto');
    wishlist = [];
    printWish();
}

function printWish() {
    userId = localStorage.getItem('user');
    fetch('http://localhost:3000/utenti/' + userId).then((response) => {
        return response.json();
    }).then((utente) => {
        wishlist = utente;
        wishlist.wish.forEach(element => {
            lista.innerHTML += `
            <li class="my-4 border-bottom">
                <div class="row">
                    <div class="col-4">
                        <img src="${element.img}" width="150px" class="mx-auto d-block">
                    </div>
                    <div class="col-8">
                        <h3>${element.marca}</h3>
                        <p>${element.descrizione}</p>
                        <p>Prezzo: ${element.prezzo}</p>
                    </div>
                </div>
            </li>`
        });
    });

}