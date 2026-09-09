// Imports to be decided 
const { trips, tickets } =  require('./Services/data.js');
const {spChar, nums} = require('./Services/verif.js')
const prompt = require('prompt-sync')();
let tickId = 1;

// Home menu

function homeMenu() {
    console.clear();
    RMList = ['Afficher les trajets', 'Acheter un ticket', 'Afficher les tickets', 'Annuler un ticket',
    'Rechercher un ticket', 'Filtrer les trajets', 'Trier les trajets', 'Quitter']
    console.log('===================================================')
    console.log('================= Railway Manager =================')
    console.log('===================================================')
    for(let i = 0; i < RMList.length; i++) {
        if(i == RMList.length - 1) {
            console.log(`[${0}] ${RMList[i]}`)
            break;
        }
        console.log(`[${i + 1}] ${RMList[i]}`)
    }
}

function backBtn() {
    let choice;
    do {
        choice = Number(prompt('Pour Revenir au menu precedent entrer [0]'));
    } while (choice !== 0)
    if(choice === 0) {
        return choicePick()
    }
}

// Afficher Les trajets


function affTrajet() {
    console.clear();
    console.table(trips)
    backBtn();
}
// Buying System
function checkingSystem() {
    console.log('Choisir Votre Trajet.');
    let choice;
    let depart = prompt('De : ')
    let arrive = prompt('A : ')
    let trip = false
    for (let i = 0; i < trips.length; i++) {
        if (depart === trips[i].departure && arrive === trips[i].destination) {
            trip = true;
            console.table(trips[i])
            if (confirmationSystem(trips[i])) { trips[i].availableSeats = trips[i].availableSeats - 1 }
            else {
                console.log("Le trip est deja plein.")
                do {
                    choice = Number(prompt('Press [0] to go back.'))
                } while (choice !== 0)
            }
        }
    }
    if (!trip) { console.log(`Aucune trajet trouvable de ${depart} a ${arrive}.`) }
    choice = prompt(`Clicker pour revenir au page d'acceuil\n`)
    return choicePick()
}

function confirmationSystem(trip) {
    if (trip.availableSeats > 0) {
        ticketMaker(trip)
        return true;
    }
    return false
}

function ticketMaker(trip) {
    const ticket = {};
    let name = '';
    let id;
    console.clear()
    console.log('===================================================')
    console.log('================== Tickets Maker ==================')
    console.log('===================================================')
    console.table(trip)
    console.log(`[0] pour annuler et retourner au menu d'acceuil`)
    while (name === '') {
        name = prompt('Entre Votre Nom : ')
        if (name === '') {
            console.log('Votre nom ne doit pas etre vide.')
            continue;
        }
        if (Number(name) === 0) { return choicePick() };
        for (let i = 0; i < name.length; i++) {
            if (spChar.includes(name[i])) {
                console.log(`Il y'a une symbol dans votre nom ? `)
                name = '';
            } if (nums.includes(name[i])) {
                console.log(`Il y'a une nombre dans votre nom ? `)
                name = '';
            }
        }
    }
    do {
        id = Number(prompt(`Entrer l'id de votre trip : `))
        if (id === 0) { return choicePick() }
        if (id > 0 && id <= trips.length) {
            break;
        }
        else {
            console.log(`id n'est pas valide`)
        }
    } while (id !== 0);
    ticket.id = tickId;
    ticket.passengerName = name;
    ticket.tripId = trip.id;
    ticket.price = trip.price;
    ticket.depart = trip.departure
    ticket.destination = trip.destination
    tickId++;

    tickets.push(ticket)
    console.table(ticket)

    console.log()
    let x = Number(prompt(`le ticket a etez creer avec success, Clicker pour reviendre a la d'accueil.`))

    return choicePick();
}


// function ticketSync() {
//     for (let i = 0; i < tickets.length; i++) {
//         console.log(ticket)
//     }
// }

// Show ticket inventory




function choicePick() {
    let choice;
    let retry = 0;

    do {
        homeMenu()
        choice = Number(prompt('Enter une nombre de votre choix : '))
        while (choice < 0 || choice > RMList.length || isNaN(choice)) {
            console.log('Svp entrer une nomber valid de 0 a 7')
            choice = Number(prompt('Enter une nombre de votre choix : '))
            retry += 1;
            if(retry === 2) {
                console.log('Trop tentatives incorrect.')
                break;
            }
        }

        switch (choice) {
            case 1:
                return affTrajet();
            case 2: 
                return checkingSystem();
            case 3:
                return affTickets();
            case 4:
                return delTicket();
            case 5:
                return searchTicket();
        }


    } while (choice !== 0 && retry !== 2)
}


function affTickets() {
    console.clear()
    console.log('========================================================================')
    console.log('=========================== Tickets ====================================')
    console.log('========================================================================')
    console.table(tickets)
    backBtn()
}

function delTicket() {
    if (tickets.length < 1) {
        console.log(`Vous avez aucune ticket`)
        backBtn()
    } else {console.table(tickets)
    let choice = Number(prompt(`Entrer l'id de votre ticket : `))
    for(let i = 0; i < tickets.length; i++) {
        if (tickets[i].id === choice) {
            console.table(tickets[i])
            choice = Number(prompt(`Confirmer l'annulation par [1] ou clicker [0] pour revenir a la page d'acceuil`))
            if(choice === 1) {
                tickets.splice(i, 1)
                backBtn()
            }
        }
    
    }}
}

choicePick()