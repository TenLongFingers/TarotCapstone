//query selector definitions
// const card1 = document.querySelector("#card-1");

import { shuffleArray } from "./utilis.mjs";

// const card2 = document.querySelector("#card-2");
const deck = document.querySelector("#deck");
const baseURL = "http://localhost:2100";

// const card3 = document.querySelector("#card-3");
const drawCont = document.queryCommandIndeterm("#draw-container");
const choices = [];

//insert card function
const MakeTarotCard = (cards) => {
  let description = shuffleArray(cards.fortune_telling);
  return `
    <div class = "drawn-tarot">
    <img src = "./Assets/${cards.img}" alt = "${cards.name}"/>
    <h3>${cards.name}</h3>
    <p>Fortune: ${description[0]}
    `;
};

//display deck
const getDeck = () => {
  axios.get(`${baseURL}/api/cards`).then(({ data }) => {
    deck.innerHTML = "";

    data.cards.forEach((card) => {
      let cardHTML = MakeTarotCard(card);
      deck.innerHTML += cardHTML;
    });
  });
};

//add card to spread

//function testing area
getDeck();
