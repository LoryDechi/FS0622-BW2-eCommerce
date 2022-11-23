// definizone della classe per creare gli utenti
class Users {
    constructor(_nome, _email, _password, _carrello) {
        this.nome = _nome;
        this.email = _email;
        this.password = _password;
        this.carrello = _carrello;
    }
}

// definizione variabli globali
var nome;
var email;
var password;
var confermaPass;
var logBtn;
var regBtn;
var errore;
var invalidEmail;
var invalidPass;
var invalidMatch;
var lettera;
var maiuscola;
var numero;
var lunghezza;
var passInfo;
var emailLogin;
var passwordLogin;
var erroreLogin;
var openLogin;
var logout;
var navbarSupportedContent;
var logged;
var cart;
var numeroCarrello;
var success;
var saluto;
var dropdown;
var arr;
var notifica;
var elenco = [];

window.addEventListener('DOMContentLoaded', init);

// funzione che parte al caricamento della pagina
function init() {
    // raccolta e assegnazione di tutti gli id necessari al funzionamento 
    nome = document.getElementById('nomeUtente');
    email = document.getElementById('emailUtente');
    password = document.getElementById('passwordRegistrati');
    confermaPass = document.getElementById('confermaPassword');
    logBtn = document.getElementById('accedi');
    regBtn = document.getElementById('registrati');
    errore = document.getElementById('errore');
    invalidEmail = document.getElementById('invalidEmail');
    lettera = document.getElementById('lettera');
    maiuscola = document.getElementById('maiuscola');
    numero = document.getElementById('numero');
    lunghezza = document.getElementById('lunghezza');
    passInfo = document.getElementById('passInfo');
    invalidPass = document.getElementById('invalidPass');
    invalidMatch = document.getElementById('invalidMatch');
    emailLogin = document.getElementById('email');
    passwordLogin = document.getElementById('password');
    erroreLogin = document.getElementById('erroreLogin');
    openLogin = document.getElementById('openLogin');
    logout = document.getElementById('logout');
    navbarSupportedContent = document.getElementById('navbarSupportedContent');
    cart = document.getElementById('cart');
    numeroCarrello = document.getElementById('numeroCarrello');
    success = document.getElementById('success');
    saluto = document.getElementById('saluto');
    dropdown = document.getElementById('dropdown');
    notifica = document.getElementById('notifica');
    arr = [];
    // funzione che gestisce lo stato dell'utente (loggato oppure no)
    registrato();

    // comprato();
    // funzione che al caricamento aggiorna il numero sul carrello
    aggiornaCarrello();
    // funzione raccoglitrice di tutte le altre
    eventhandler();
}

function eventhandler() {
    // EL per il funzionamento del tasto logout e chiamata alla relative funzioni
    logout.addEventListener('click', function () {
        localStorage.setItem('logged', 'false');
        localStorage.setItem('user', '');
        registrato();
    });

    // EL per l'apertura e il funzionamento della modale login
    openLogin.addEventListener('click', function () {
        emailLogin.value = '';
        passwordLogin.value = '';
        erroreLogin.innerHTML = '';
        raccoltaDati();
    });

    // EL che mostrano o nascondono la sezione delle regole della password
    password.addEventListener('focus', function () {
        errore.innerHTML = '';
        passInfo.style.display = 'block';
    });
    password.addEventListener('blur', function () {
        errore.innerHTML = '';
        passInfo.style.display = 'none';
    });

    // funzione che controlla la validità della password
    validazionePassword(password);

    regBtn.addEventListener('click', function () {
        controllo();
    })
}

// funzione di controllo riempimento campi input
function controllo() {
    if (nome.value == '' || email.value == '' || password.value == '' || confermaPass.value == '') {
        errore.innerHTML = 'Compilare correttamente tutti i campi!';
        return;
    }
}

// funzione che tramite regeEx verifica il formato della password e aggiorna live la lista delle regole rispettate aggiungendo o rmiuovendo la classe 'fatto'
function validazionePassword(password) {
    password.onkeyup = function () {
        // controllo lettere
        var lowerCaseLetters = /[a-z]/g;
        var letters = password.value.match(lowerCaseLetters);
        if (letters == null) {
            lettera.classList.remove("fatto");
        } else {
            lettera.classList.add("fatto");
        }

        // controllo almeno una maiuscola
        var upperCaseLetters = /[A-Z]/g;
        var caps = password.value.match(upperCaseLetters);
        if (caps == null) {
            maiuscola.classList.remove("fatto");
        } else {
            maiuscola.classList.add("fatto");
        }

        // controllo almeno un numero
        var numbers = /[0-9]/g;
        var num = password.value.match(numbers);
        if (num == null) {
            numero.classList.remove("fatto");
        } else {
            numero.classList.add("fatto");
        }

        // controllo lunghezza minima
        if (password.value.length >= 6) {
            lunghezza.classList.add("fatto");
        } else {
            lunghezza.classList.remove("fatto");
        }

        // ciclo if, se un criterio non è rispettato mostra un errore altrimenti invoca la funzione per il confronto con il conferma password
        if (letters == null || caps == null || num == null || password.value.length < 6) {
            invalidPass.innerHTML = '<i class="text-danger ms-2">La password non è valida!</i>';
        } else {
            invalidPass.innerHTML = '';
            confermaPass.removeAttribute('disabled');
            matchPass();
        }
    }

}

// funzione che si occupa di confrontare i valori dei campi di input password e confermaPassword, se uguali procede al controllo della email altriementi errore 
function matchPass() {
    //EL onkeyup serve per fare la verifica all'inserimento di ogni carattere all'interno del campo di input cosi da avere un riscontro live
    confermaPass.onkeyup = function () {
        if (password.value === confermaPass.value) {
            invalidMatch.innerHTML = '';
            regBtn.addEventListener('click', function () {
                validazioneEmail(email.value);
            });

        } else {
            invalidMatch.innerHTML = '<i class="text-danger ms-2">La password non corrsiponde!</i>';
        }
    }
}

// funzione che tramite regeEx verifica il formato dell'email
function validazioneEmail(email) {
    var ok;
    // regex per il controllo dell'email inserita
    var regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    verifica = regEx.test(email);
    // ciclo for che all'interno del JSON utenti verifica che non esista un utente con la stessa email, altrimenti restituisce errore
    for (var i = 0; i < elenco.length; i++) {
        if (elenco[i].email == email) {
            document.getElementById('emailUtente').style.border = '2px solid red';
            invalidEmail.innerHTML = '<i class="text-danger ms-2">Utente già registrato!</i>';
            return ok = false;
        }
    }
    // se la mail inserita è valida e non utilizzata avviene la registrazione utente, altrimenti restituisce un errore
    if (verifica == true && ok != false) {
        errore.innerHTML = '';
        invalidEmail.innerHTML = '';
        document.getElementById('emailUtente').style.border = '2px solid green';
        var utente = new Users(nome.value, email, password.value, []);
        success.style.display = 'block';
        // impostato un timeout alla chimata della funzione per avere il tempo di dare un feddbacik visivo di avvenuta registrazione
        setTimeout(() => {
            registrazioneSuccess(utente);
        }, 1000);
    } else {
        document.getElementById('emailUtente').style.border = '2px solid red';
        invalidEmail.innerHTML = '<i class="text-danger ms-2">Email non valida!</i>';
    }
}

// funzione di "appoggio" per poter impostare il timeout ad aggiungi utente
function registrazioneSuccess(utente) {
    aggiungiUtente(utente);
}

// funzione effettiva di aggiunta dell'utente tramite fetch
async function aggiungiUtente(utente) {
    let response = await fetch('http://localhost:3000/utenti', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(utente),
    });
}

// -------LOGIN-----------

// funzione che al click del button di login raccoglie i dati di input e si richiama i dati dell'utente dal file JSON, dopodichè invoca la funzione di login
function raccoltaDati() {
    emailLogin.value;
    passwordLogin.value;
    fetch('http://localhost:3000/utenti').then((response) => {
        return response.json();
    }).then((data) => {
        elenco = data;
        elenco.map(function (element) {
            effettuaLogin(element);
        });
    });
}

// funzione di login, viene verificata la corrispondenza tra i dati inseriti e quelli salvati nel JSON, se corrispondono viene effetuato il login impostando alcuni valori nel localStorage e viene invocata la funzione registrato
function effettuaLogin(element) {
    logBtn.addEventListener('click', function (e) {
        e.preventDefault();
        emailLogin.value;
        passwordLogin.value;
        if (element.email == emailLogin.value && element.password == passwordLogin.value) {
            erroreLogin.innerHTML = '';
            openLogin.style.display = 'none';
            localStorage.setItem('logged', 'true');
            userId = `${element.id}`;
            localStorage.setItem('user', userId);
            numeroArticoli = element.carrello.length;
            numeroCarrello.innerHTML = numeroArticoli;
            registrato()
        } else if (emailLogin.value == '' || passwordLogin.value == '') {
            erroreLogin.innerHTML = '<i class="text-danger ms-2">Verifica di aver compilato tutti i campi!</i>';
        } else {
            erroreLogin.innerHTML = '<i class="text-danger ms-2">Email o password errati!</i>';
        }
    });

    passwordLogin.addEventListener('keyup', function () {
        if (element.email == emailLogin.value && element.password == passwordLogin.value) {
            logBtn.setAttribute('data-bs-dismiss', 'modal');
            logBtn.setAttribute('aria-label', 'Close');
        }
    });

    emailLogin.addEventListener('keyup', function () {
        if (element.email == emailLogin.value && element.password == passwordLogin.value) {
            logBtn.setAttribute('data-bs-dismiss', 'modal');
            logBtn.setAttribute('aria-label', 'Close');
        }
    });
}

// funzione che quando l'utente è loggato cambia alcune impostazioni stilistiche
function registrato() {
    logged = localStorage.getItem('logged');

    if (logged == 'false') {
        saluto.innerHTML = '';
        logout.style.display = 'none';
        cart.style.display = 'none';
        openLogin.style.display = 'inline-block';
    } else {

        saluto.style.display = 'inline-block';
        salutoUtente();
        openLogin.style.display = 'none';
        logout.style.display = 'inline-block';
        cart.style.display = 'inline-block';
    }
}

// STRANCA NOMI AL LOGIN (NAVBAR)
function truncateName(str) {
    if (str.length > 10) {
        return str.split(' ')[0] + ''
    } else {
        return str
    }

}
// funzione che ottiene il nome utente e invoca una fuznione stilistica e di stampa
function salutoUtente() {
    id = localStorage.getItem('user');
    userId = localStorage.getItem('user');
    fetch('http://localhost:3000/utenti/' + userId).then((response) => {
        return response.json();
    }).then((utente) => {
        letteraMaiuscola(utente.nome);
    });
}

// funzione che mette la prima lettera del nome maiuscola e poi stampa
function letteraMaiuscola(nome) {
    var maiusc = nome.charAt(0).toUpperCase() + nome.slice(1);
    saluto.innerHTML = 'Ciao, ' + truncateName(maiusc);
}

// funzione che al tasto mostra sulla password cambia il type dell'input da password a text e viceversa per mostrare la password
function mostra() {
    if (passwordLogin.type == "password") {
        passwordLogin.type = "text";
    } else {
        passwordLogin.type = "password";
    }
}

function mostraRegistrazione() {
    if (password.type == "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}
// carrello

// funzione lanciata al click sull'icona che stampa ed apre il carrello
function toggleCart() {
    document.querySelector('.sidecart').classList.toggle('open-cart');
    userId = localStorage.getItem('user');
    fetch('http://localhost:3000/utenti/' + userId).then((response) => {
        return response.json();
    }).then((utente) => {
        stampaCarrello(utente);
    });
}

// EL che al click sulla freccia per chiudere il carrello aggiorna l'utente con i nuovi valori 
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

// funzione che asseegna i giusti valori ai giusti elementi del carrello da aggiornare 
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

// funzione che rende possibile l'aggiunta di un elemento all'intenro del carrello al click sul +
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

// funzione che rende possibile la sottrazione di un elemento all'intenro del carrello al click sul -
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

// funzione che stampa il contenuto del carrello
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

// funzione che permette la cancellazione di un elemento dal carrello
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

// funzione che al caricamento aggiorna il numero sul carrello
function aggiornaCarrello() {
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
}

// EL che gestisce il click sul tasto acquista cancellando il carrello e mostrando un feedback visivo
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

// funzione che aggiorna i valopri ricevuti nell'utente
function aggiornaUtente(user, id) {
    fetch('http://localhost:3000/utenti/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user),
    });
}

// function comprato() {
//     localStorage.getItem('comprato');
//     if (comprato == 'true') {
//         notifica.style.display = 'inline-block';
//     } else {
//         notifica.style.display = 'none';
//     }
// }