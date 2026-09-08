// Imports
const { trips } = require('./data.js')
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