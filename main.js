// Imports
const { trips, tickets } =  require('./data.js');
const {spChar, nums} = require('./verif.js')
const prompt = require('prompt-sync')();

// Home Menu 

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

function choicePick(func) {
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
        }


    } while (choice !== 0 && retry !== 2)
}

// Ticket Buying System

function checkingSystem() {
    console.log('Choisir Votre Trajet');
    globalThis.tripPicked;
    let depart = prompt('De : ')
    let arrive = prompt('A : ')
    let trip = false
    for (let i = 0; i < trips.length; i++) {
        if (depart === trips[i].departure && arrive === trips[i].destination) {
            trip = true;
            console.table(trips[i])
            tripPicked = trips[i]
        }
    }
    if(!trip) {console.log(`Aucune trajet trouvable de ${depart} a ${arrive}.`)}

    return {trip}
}

function confirmationSystem() {
    let choice;
    if (checkingSystem) {
        choice = Number(prompt('Pour confirmer votre trajet entrer [1] : '))
        if (choice === 1) {
            return ticketMaker()
        }
    }
    else if (!bool) {
        let choice = 1;
        let count = 0;

        do {
            checkingSystem()
            choice = Number(prompt('Entrer [0] pour retourner au menu precedent ou [1] pour ressayer : '))
        } while (choice === 1 && count < 3);

        if(count >= 3) {console.log('Trop tentative incorrect.')}
}

    return choicePick();
}

function ticketMaker() {
    const ticket = {};
    let name = '';
    let id;
    console.clear()
        console.log('===================================================')
        console.log('================== Tickets Maker ==================')
        console.log('===================================================')
        console.table(tripPicked)
        console.log(`[0] pour annuler et retourner au menu d'acceuil`)
        while (name === '') {
            name = prompt('Entre Votre Nom : ')
            if (name.length < 1) {
                console.log('Votre nom ne doit pas etre vide.')
                continue;
            }
            if(Number(name) === 0) { return homeMenu()}
            for (let i = 0; i < name.length; i++) {
                if (spChar.includes(name)) {
                    console.log(`Il y'a une symbol dans votre nom ? `)
                    name = ''
                } if (nums.includes(name)) {
                    console.log(`Il y'a une nombre dans votre nom ? `)
                    name = ''
                }
            }
        }
        ticket.name = name;
        do {
            id = Number(prompt(`Entrer l'id de votre trip : `))
            if(id === 0) {return homeMenu()}
            if(id > 0 && id <= trips.length) {
                ticket.id = id;
                break;
            }
            else {
                console.log(`id n'est pas valide`)
            }
        } while (id !== 0)
    tickets.push(ticket)

    function ticketSync() {
        for(let i = 0; i < trips.length)
    }

    console.log()
    let x = Number(prompt(`le ticket a etez creer avec success, Clicker pour reviendre a la d'accueil.`))
    return choicePick()
}

function affTrajet() {
    console.table(trips)
    let choice;
    do {
        choice = Number(prompt('Pour Revenir au menu precedent entrer [0]'));
        console.log('Pour Revenir au menu precedent entrer [0]')
    } while (choice !== 0)
    if(choice === 0) {
        return choicePick()
    }
}

choicePick()