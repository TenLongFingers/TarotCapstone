//shuffle array (import wasn't working so I'm just pasting it here)

const shuffleArray = (array) => {
  for (let i = 0; i < array.length - 1; i++) {
    let j = 1 + Math.floor(Math.random() * (array.length - i));
    let tempArr = array[j];
    array[j] = array[i];
    array[i] = tempArr;
  }
  return array;
};

//query selector definitions
const baseURL = "http://localhost:2100";
const deck = document.querySelector(".shuffled-deck");
const drawCont = document.querySelector("#draw-container");
let cardSpread = [];
let deckArr = [1, 2, 3];
let shuffledDeck = shuffleArray(deckArr);
let refreshBtn = document.querySelector("#refresh");
let saveDrawBtn = document.querySelector("#save-draw");
let savedSpreadsCont = document.querySelector("#saved-spreads");
let deckData;

//refresh button empties out cardSpread array
//function
const refreshFunction = () => {
  cardSpread = [];
  drawCont.innerHTML = "";
};

//button
refreshBtn.onclick = refreshFunction;

//create html for cards (it's not shuffled yet)
const deckList = (card) => {
  const cardImage = document.createElement(`img`);
  const li = document.createElement("li");
  li.className = "tarot-card";
  cardImage.onclick = pickCard;
  cardImage.src = `./Assets/back.svg`;
  cardImage.alt = "unkown tarot card";
  cardImage.id = card.number;
  li.appendChild(cardImage);
  return li;
};

//Draw a card to the spread (basically copy/paste the deckList function)
const drawCardToSpread = (card) => {
  const cardImage = document.createElement(`img`);
  const li = document.createElement("li");
  li.className = "tarot-card";
  // cardImage.onclick = `./Assets/${card.img}`;
  // cardImage.onmouseover =
  cardImage.src = `./Assets/${card.img}`;
  cardImage.alt = card.name;
  cardImage.id = card.number;
  li.appendChild(cardImage);
  drawCont.appendChild(li);
};

//Script for what happens when the card has a click event.
const pickCard = (event) => {
  let targetId = event.target.id; // index of the card in the deckData array
  if (cardSpread.length === 0) {
    cardSpread.push(deckData[targetId]);
    drawCardToSpread(deckData[targetId]);
    return;
  }
  //This could maybe be a forloop but I only have three options and this seemed simpler for now.
  if (cardSpread.length === 1) {
    if (cardSpread[0].number === targetId) {
      return alert("You already drew that card! Please pick a different one.");
    }
    cardSpread.push(deckData[targetId]);
    drawCardToSpread(deckData[targetId]);
    return;
  }
  if (cardSpread.length === 2) {
    if (
      cardSpread[0].number === targetId ||
      cardSpread[1].number === targetId
    ) {
      return alert("You already drew that card! Please pick a different one.");
    }
    cardSpread.push(deckData[targetId]);
    drawCardToSpread(deckData[targetId]);
    return;
  }
  if (cardSpread.length >= 3) {
    return alert(
      "You can only draw three cards! Check the instruction page for help with reading a three card spread"
    );
  }
};

//using the deckData to get called later
const initialDraw = async () => {
  deck.innerHTML = "";
  deckData.forEach((card) => {
    let cardHTML = deckList(card);
    deck.appendChild(cardHTML);
  });
};

//retrieving the deckData with a get request to display cards to draw
const getDeck = async () => {
  axios.get(`${baseURL}/api/cards`).then(({ data }) => {
    deckData = data.cards;
    initialDraw();
    return;
  });
};

//post request sending the current card spread to the backend
const saveCardsToDrawArr = async () => {
  if (cardSpread.length === 3) {
    axios.post(`${baseURL}/api/savedraw`, cardSpread).then(({ data }) => {
      savedSpreadsCont.innerHTML = "";
      data.forEach((array) => {
        console.log(array);
        let spread = document.createElement("div");
        spread.innerHTML = `<h2>${array[0].name}, ${array[1].name}, ${array[2].name}</h2>`;
        savedSpreadsCont.append(spread);
      });
    });
  }
};

//save card button function
saveDrawBtn.onclick = saveCardsToDrawArr;

//retreiving the saved spreads with a get request
// const newSpreadToSave = async () => {
//   spread.innerHTML = "";

// }

//use async to get the functions in the right order
const init = async () => {
  await getDeck();
};

//run the deck functions to get the cards ready to draw
init();
