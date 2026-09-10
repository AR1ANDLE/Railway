const { trips, tickets, deletedTickets } = require("./databases/data.js");
const { spChar, nums } = require("./databases/verif.js");
const prompt = require("prompt-sync")({ sigint: true });
let tickId = 1;
const RMList = [
  "Afficher les trajets",
  "Acheter un ticket",
  "Afficher les tickets",
  "Annuler un ticket",
  "Rechercher un ticket",
  "Filtrer les trajets",
  "Trier les trajets",
  "Quitter",
];

// Home menu
function homeMenu() {
  console.clear();
  console.log("===================================================");
  console.log("================= Railway Manager =================");
  console.log("===================================================");
  for (let i = 0; i < RMList.length; i++) {
    if (i == RMList.length - 1) {
      console.log(`[${0}] ${RMList[i]}`);
      break;
    }
    console.log(`[${i + 1}] ${RMList[i]}`);
  }
}

function backBtn() {
  let choice;
  do {
    choice = Number(prompt("Pour revenir au menu precedent, entrer [0] : "));
  } while (choice !== 0);
  if (choice === 0) {
    return choicePick();
  }
}

// Afficher Les trajets
function affTrajet() {
  console.clear();
  console.table(trips);
  return backBtn();
}

function confirmationSystem(trip) {
  return trip.availableSeats > 0;
}

function ticketMaker() {
  let name = "";
  let choice;
  let id;
  console.clear();
  console.log("===================================================");
  console.log("================== Tickets Maker ==================");
  console.log("===================================================");
  console.log(`[0] pour annuler et retourner au menu d'accueil`);

  while (name === "") {
    name = prompt("Entrez votre nom : ");
    if (name === "") {
      console.log("Votre nom ne doit pas etre vide.");
      continue;
    }
    if (Number(name) === 0) {
      return choicePick();
    }
    for (let i = 0; i < name.length; i++) {
      if (spChar.includes(name[i])) {
        console.log(`Il y a un symbole dans votre nom ?`);
        name = "";
        break;
      }
      if (nums.includes(name[i])) {
        console.log(`Il y a un nombre dans votre nom ?`);
        name = "";
        break;
      }
    }
  }

  do {
    id = Number(prompt(`Entrez l'id de votre trajet ou [0] pour quitter : `));
    if (id === 0) {
      return choicePick();
    }
    if (id > 0 && id <= trips.length) {
      if (!confirmationSystem(trips[id - 1])) {
        console.log(`Il n'y a aucune place disponible.`);
      } else {
        break;
      }
    }
  } while (id !== 0);

  const selectedTrip = trips[id - 1];
  console.table(selectedTrip);
  choice = Number(
    prompt("Appuyez sur [1] pour confirmer ou [0] pour revenir : "),
  );

  if (choice === 0) {
    return choicePick();
  } else if (choice === 1) {
    const ticket = {
      id: tickId,
      passengerName: name,
      tripId: id,
      price: selectedTrip.price,
      depart: selectedTrip.departure,
      destination: selectedTrip.destination
    };
    let assignedSeat;

    for (let i = 0; i < deletedTickets.length; i++) {
      if (ticket.tripId === deletedTickets[i].tripId) {
        assignedSeat = deletedTickets[i].seatNumber;
        deletedTickets.splice(i, 1);
        break;
      }
    }
    if (!assignedSeat) {
      let count = 0;
      for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].tripId === id) count++;
      }
      for (let i = 0; i < deletedTickets.length; i++) {
        if (deletedTickets[i].tripId === id) count++;
      }
      ticket.seatNumber = count + 1;
    } else {
      ticket.seatNumber = assignedSeat;
    }
    selectedTrip.availableSeats--;
    tickets.push(ticket);
    tickId++;
  }

  Number(prompt(`Le ticket a ete cree avec succes. Appuyez sur Entree pour revenir a l'accueil.`))
  return choicePick();
}

function choicePick() {
  let choice;

  do {
    homeMenu();
    choice = Number(prompt("Entrez un nombre de votre choix : "));

    while (isNaN(choice) || choice < 0 || choice > 7) {
      console.log("Svp entrez un nombre valide de 0 a 7.");
      choice = Number(prompt("Entrez un nombre de votre choix : "));
    }

    if (choice === 0) {
        break;
    }
    switch (choice) {
      case 1:
        return affTrajet();
      case 2:
        return ticketMaker();
      case 3:
        return affTickets();
      case 4:
        return delTicket();
      case 5:
        return searchTicket();
      case 6:
        return filterTrajet();
      case 7:
        return sortTrajer();
    }
  } while (true);
}

function affTickets() {
  console.clear();
  console.log("========================================================================")
  console.log("=========================== Tickets ====================================")
  console.log("========================================================================")
  console.table(tickets);
  return backBtn();
}

function delTicket() {
  if (tickets.length < 1) {
    console.log(`Vous n'avez aucun ticket.`);
    return backBtn();
  }

  console.table(tickets);
  let choice = Number(prompt(`Entrez l'id de votre ticket : `));

  for (let i = 0; i < tickets.length; i++) {
    if (tickets[i].id === choice) {
      let confirmChoice = Number(
        prompt(`Confirmez l'annulation par [1] ou cliquez [0] pour revenir : `),
      );
      if (confirmChoice === 1) {
        deletedTickets.push(tickets[i]);
        const targetTrip = trips[tickets[i].tripId - 1];
        if (targetTrip) targetTrip.availableSeats++;
        tickets.splice(i, 1);
        console.log("Ticket annule avec succes.");
        console.table(tickets);
        return backBtn();
      }
    }
  }
  return backBtn();
}

function searchTicket() {
  const personTickets = [];
  let choice = prompt("Entrez le nom du passager : ");
  for (let i = 0; i < tickets.length; i++) {
    if (tickets[i].passengerName.toUpperCase() === choice.toUpperCase()) {
      personTickets.push(tickets[i]);
    }
  }
  console.table(personTickets);
  return backBtn();
}

function filterTrajet() {
  const filtered = [];
  let choice = prompt("Entrez votre ville de depart : ");
  for (let i = 0; i < trips.length; i++) {
    if (trips[i].departure.toUpperCase() === choice.toUpperCase()) {
      filtered.push(trips[i]);
    }
  }
  console.table(filtered);
  return backBtn();
}

function sortTrajer() {
  const sorted = [...trips];
  console.log("Trier par prix croissant");

  for (let i = 0; i < sorted.length; i++) {
    let swapped = false;
    for (let j = 0; j < sorted.length - 1; j++) {
      if (sorted[j].price > sorted[j + 1].price) {
        let temp = sorted[j];
        sorted[j] = sorted[j + 1];
        sorted[j + 1] = temp;
        swapped = true;
      }
    }
    if (!swapped) {
      break;
    }
  }
  console.table(sorted);
  return backBtn();
}

choicePick();
