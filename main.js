// Imports
const prompt = require('prompt-sync')();

// Home Menu 

function homeMenu() {
    console.clear();
    const RMList = ['Afficher les trajets', 'Acheter un ticket', 'Afficher les tickets', 'Annuler un ticket',
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