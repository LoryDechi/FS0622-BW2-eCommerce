class Prodotto {
    constructor(_name, _price, _count, _img) {
        this.name = _name;
        this.price = _price;
        this.count = _count;
        this.img = _img
    }
}

var img = document.getElementById('img');
var title = document.getElementById('title');
var desc = document.getElementById('desc');
var price = document.getElementById('price');
var addShop = document.getElementById('addShop');
var carrello = document.getElementById('carrello');
var numeroCarrello = document.getElementById('numeroCarrello');
var totaleCarrello = document.getElementById('totaleCarrello');
var acquista = document.getElementById('acquista');
var chiudi = document.getElementById('chiudi');
var quantita;
var marca;
var numeroArticoli;
var comprato;
var arr = [];
var cart = [];
user = [];

window.addEventListener('DOMContentLoaded', init)

function init() {
    logged = localStorage.getItem('logged')
    if (logged == 'true') {
        userId = localStorage.getItem('user');
        fetch('http://localhost:3000/utenti/' + userId).then((response) => {
            return response.json();
        }).then((utente) => {
            numeroArticoli = utente.carrello.length;
            numeroCarrello.innerHTML = numeroArticoli;
        });
    }

    // comprato = localStorage.getItem('comprato');
    // if (comprato == 'true') {
    //     notifica.style.display = 'inline-block';
    // } else {
    //     notifica.style.display = 'none';
    // }


}

fetch('http://localhost:3000/articoli')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        // STAMPARE LE CATEGORIE
        function addCategory() {
            let categoriesWrapper = document.querySelector('#categoriesWrapper')

            let categories = Array.from(new Set(data.map(el => el.category)))

            categories.forEach(category => {
                let div = document.createElement('div')
                div.classList.add('form-check')
                div.innerHTML =
                    `
            <input class="form-check-input" type="radio"
             name="categories" id="${category}">
            <label class="form-check-label" for="${category}">
            ${category} 
            </label>      
             `
                categoriesWrapper.appendChild(div)
            })
        }
        addCategory()
        // STAMPA GLI ARTICOLI
        function printArticoli(array) {

            let elenco = document.querySelector('#elenco');
            elenco.innerHTML = ''

            array.forEach(el => {
                let div = document.createElement('div')


                if (el.category == "Caffe") {
                    elenco.innerHTML +=
                        `
                        <div class="card mx-auto mt-3" data-aos="fade-left" data-aos-duration="700" data-aos-delay="300">
                        <div class="figure" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="dettaglio(${el.id})">
                            <img src="${el.img}" class="card-img-top" alt="...">
                            <img src="${el.imgDue}" class="card-img-top image-hover position-absolute top-0 end-0 start-0 bottom-0" alt="...">
                        </div>
                         <div class="card-body text-center">
                          <h5 class="card-title">${truncateWord(el.marca)}</h5>
                          
                          <p class="card-text mb-3">${el.prezzo} €</p>
                         
                         
                        </div>
                    </div>
                     `
                } else if (el.category == "Capsule") {
                    elenco.innerHTML +=
                        `
                    <div class="card mx-auto mt-3" data-aos="fade-left" data-aos-duration="700" data-aos-delay="600">
                    <div class="figure" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="dettaglio(${el.id})">
                    <img src="${el.img}" class="card-img-top" alt="...">
                    <img src="${el.imgDue}" class="card-img-top image-hover position-absolute top-0 end-0 start-0 bottom-0" alt="...">
                </div>
                        <div class="card-body text-center">
                        <h5 class="card-title">${el.marca}</h5>
                        <p class="card-text">${el.tipologia}</p>
                        <p class="card-text">${el.gusto}</p>
                        <p class="card-text">&#8364; ${el.prezzo}</p>
                        </div>
                        </div>
                    `
                } else if (el.category == "Macchinetta") {
                    elenco.innerHTML +=
                        `
                    <div class="card mx-auto mt-3" data-aos="fade-left" data-aos-duration="700" data-aos-delay="900">
                    <div class="figure" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="dettaglio(${el.id})">
                    <img src="${el.img}" class="card-img-top" alt="...">
                    <img src="${el.imgDue}" class="card-img-top image-hover position-absolute top-0 end-0 start-0 bottom-0" alt="...">
                </div>
                        <div class="card-body text-center">
                        <h5 class="card-title">${el.marca}</h5>
                        <p class="card-text">${el.descrizione}</p>
                        <p class="card-text">&#8364; ${el.prezzo}</p>
                        </div>
                        </div>
            `
                } else {
                    elenco.innerHTML +=
                        `
            <div class="card mx-auto mt-3" data-aos="fade-left" data-aos-duration="700" data-aos-delay="1200">
                <img src="${el.img}" class="card-img-top" alt="...">
                <div class="card-body text-center">
                <h5 class="card-title">${el.marca}</h5>
                <p class="card-text">${el.descrizione}</p>
                <p class="card-text">${el.prezzo} €</p>
                </div>
            </div>
             `
                }
                elenco.appendChild(div)
            })
        }
        printArticoli(data)
        // STAMPA IN BASA ALLA CATEGORIA
        function filterCategory() {

            var checkRadio = document.querySelectorAll('.form-check-input');

            checkRadio.forEach(el => {

                el.addEventListener('click', function () {

                    if (el.id == "tutte") {
                        printArticoli(data)
                    } else {
                        let filtered = data.filter(element => element.category == el.id)
                        printArticoli(filtered)
                    }
                })
            })
        }
        filterCategory()
        // PREZZO MASSIMO
        function priceRange() {

            let maxPrice = data.map(el => Number(el.prezzo)).pop()

            let customRange = document.querySelector('#customRange');
            customRange.max = Math.round(maxPrice);
            customRange.value = customRange.max


            let priceValue = document.querySelector('#priceValue');

            priceValue.innerHTML = `${customRange.max} &#8364;`

            customRange.addEventListener('input', () => {

                priceValue.innerHTML = `${customRange.value}&#8364;`

            })
        }
        priceRange()
        // FILTRO PER PREZZO
        function priceFilter() {

            let customRange = document.querySelector('#customRange')

            customRange.addEventListener('input', () => {

                let filtered = data.filter(el => Number(el.prezzo) <= customRange.value)
                printArticoli(filtered)
            })
        }
        priceFilter()
        // FILTRA PER PAROLA
        function filterByWord() {
            let inputWord = document.querySelector('#inputWord')

            inputWord.addEventListener('input', () => {
                let filtered = data.filter(el => el.marca.toLowerCase().includes(inputWord.value.toLowerCase()))
                printArticoli(filtered)
            })
        }
        filterByWord();

        // STRANCA TITOLI
        function truncateWord(str) {
            if (str.length > 35) {
                return str.split(' ')[0] + '...'
            } else {
                return str
            }

        }
    })

function dettaglio(id) {
    fetch('http://localhost:3000/articoli/' + id).then((response) => {
        return response.json();
    }).then((data) => {
        img.setAttribute('src', `${data.img}`);
        title.innerHTML = `${data.marca}`;
        desc.innerHTML = `${data.descrizione}`;
        price.innerHTML = `Prezzo: ${data.prezzo} €`;
        addShop.addEventListener('click', function () {
            logged = localStorage.getItem('logged')
            if (logged == 'true') {
                aggiungiProdotto(data);
            } else {
                console.log('Non sei loggato');
            }
        });
    });

}

// CARRELLO

function aggiungiProdotto(data) {
    userId = localStorage.getItem('user');
    fetch('http://localhost:3000/utenti/' + userId).then((response) => {
        return response.json();
    }).then((utente) => {
        user = utente;
        carrelloUser = user.carrello;
        for (var item in carrelloUser) {
            if (carrelloUser[item].name === data.marca) {
                carrelloUser[item].count++;
                aggiornaUtente(user, userId);
                return;
            }
        }
        var newProdotto = new Prodotto(data.marca, data.prezzo, 1, data.img);
        newCarrello = user.carrello.push(newProdotto);
        aggiornaUtente(user, userId);

    });
}

function toggleCart() {
    document.querySelector('.sidecart').classList.toggle('open-cart');
    userId = localStorage.getItem('user');
    fetch('http://localhost:3000/utenti/' + userId).then((response) => {
        return response.json();
    }).then((utente) => {
        stampaCarrello(utente);
    });
}

chiudi.addEventListener('click', function () {
    for (item in li) {
        if (item < li.length) {
            marca = li[item].getElementsByClassName('marca');
            marcaName = marca[0].innerHTML;
            quantita = li[item].getElementsByClassName('product-quantity');
            newQuan = quantita[0].innerHTML;
            var obj = {
                newMarca: marcaName,
                newQuantita: newQuan
            };
            newArr = arr.push(obj)
        }
    }
    aggiorna();
    toggleCart();
});

function aggiorna() {
    userId = localStorage.getItem('user');
    fetch('http://localhost:3000/utenti/' + userId).then((response) => {
        return response.json();
    }).then((utente) => {
        user = utente;
        carrelloUser = user.carrello;
        newCart = arr;
        for (item in newCart) {
            for (var i in carrelloUser) {
                if (carrelloUser[i].name === newCart[item].newMarca) {
                    carrelloUser[i].count = newCart[item].newQuantita;
                    aggiornaUtente(user, userId);
                }
            }
        }
        aggiornaUtente(user, userId);
    });
}

function plus1(price, name) {

    for (item in li) {
        marca = li[item].getElementsByClassName('marca');
        quantita = li[item].getElementsByClassName('product-quantity');
        parziale = li[item].getElementsByClassName('parziale');
        if (marca[0].innerHTML === name) {

            for (item in quantita) {
                temp = quantita[item].innerHTML;
                temp++
                quantita[item].innerHTML = `${temp}`;
                totaleArticolo = price * temp;
                parziale[0].innerHTML = `${Number(totaleArticolo.toFixed(2))} €`;
                tot = parseFloat(totaleCarrello.innerHTML);
                newtot = tot + Number(price);
                totaleCarrello.innerHTML = Number(newtot.toFixed(2)) + ' €';
                return
            }
        }
    }
}

function minus1(price, name) {

    for (item in li) {
        marca = li[item].getElementsByClassName('marca');
        quantita = li[item].getElementsByClassName('product-quantity');
        parziale = li[item].getElementsByClassName('parziale');
        if (marca[0].innerHTML === name) {

            for (item in quantita) {
                temp = quantita[item].innerHTML;
                if (temp === '0') {
                    break
                } else {
                    temp--
                    quantita[item].innerHTML = `${temp}`;
                    totaleArticolo = price * temp;
                    parziale[0].innerHTML = `${Number(totaleArticolo.toFixed(2))} €`;
                    tot = parseFloat(totaleCarrello.innerHTML);
                    newtot = tot - Number(price);
                    totaleCarrello.innerHTML = Number(newtot.toFixed(2)) + ' €';
                    return
                }
            }
        }
    }
}

function stampaCarrello(utente) {
    li = document.getElementsByClassName('prova');
    car = utente.carrello;
    carrello.innerHTML = '';

    if (car.length == 0) {
        carrello.innerHTML = '<h2 class="text-light my-5 ms-3">Non sono presenti aritcoli!</h2>'
    } else {
        car.forEach(element => {

            totaleArticolo = element.price * element.count;
            carrello.innerHTML += `
            <li class="nav-link d-flex flex-wrap flex-row align-items-center border-bottom border-white p-3 ms-5 prova">
        <div class="col-3 text-light text-center p-sm-2 marca">${element.name}</div>
        <div class="col-3">
          <img class="img-fluid" src="${element.img}">
        </div>
        <div class="col-2  text-light justify-content-around d-flex flex-column p-sm-3">
            <button type="button" class="btn text-light fs-4 d-flex justify-content-center" id="plus" onclick="plus1('${element.price}','${element.name}')">
                <i class="bi bi-plus"></i>
            </button>
            <div class="product-quantity text-center m-0 p-0 h5">${element.count}</div>
            <button type="button" class="btn text-light fs-4 d-flex justify-content-center" id="minus" onclick="minus1('${element.price}','${element.name}')">
                <i class="bi bi-dash"></i>
            </button>
        </div>
        <div class="sidecart-price pl-0 col-4  text-right d-flex flex-wrap text-light">
          <div class="text-center text-dark d-flex flex-row justify-content-end h6 ms-5">
            <span class="product-price text-light d-flex align-items-center parziale">${totaleArticolo}€</span>
            <button class=" btn fs-5 ms-5 text-danger" onclick="cancellaElemento('${element.name}')"><b>X</b></button>
          </div>
        
          </div>
        </div>
      </li>`
        });

        var totalCart = 0;
        for (var item in car) {
            totalCart += car[item].price * car[item].count;
        }
        totaleCarrello.innerHTML = Number(totalCart.toFixed(2)) + ' €';
    }
}

function cancellaElemento(name) {
    userId = localStorage.getItem('user');
    fetch('http://localhost:3000/utenti/' + userId).then((response) => {
        return response.json();
    }).then((utente) => {
        user = utente;
        carrelloUser = user.carrello;
        for (var item in carrelloUser) {
            if (carrelloUser[item].name === name) {
                carrelloUser.splice(item, 1);
                break;
            }
        }
        aggiornaUtente(user, userId);
    });
}

acquista.addEventListener('click', function () {
    userId = localStorage.getItem('user');
    fetch('http://localhost:3000/utenti/' + userId).then((response) => {
        return response.json();
    }).then((utente) => {
        user = utente;
        if (user.carrello.length == 0) {
            return
        } else {
            user.carrello = [];
            notifica.style.display = 'inline-block';
            notify();
        }

    });
});


function notify() {
    setTimeout(() => {
        notifica.style.display = 'none';
        aggiornaUtente(user, userId);
    }, 2000);
}



function aggiornaUtente(user, id) {
    fetch('http://localhost:3000/utenti/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user),
    });
}
