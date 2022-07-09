//query selector definitions
import { shuffleArray } from "./utilis.mjs";

const deck = document.querySelector(".shuffled-deck");
const drawCont = document.querySelector("#draw-container");
const baseURL = "http://localhost:2100";
const choices = [];

//insert card function
const MakeTarotCard = (cards) => {
  function pickCard() {
    choices.push(MakeTarotCard(cards));
    // for (let index = 0; index < choices.length; index++) {
    //   if (deck.includes(choices[index])) {
    //     deck.removeAttribute(choices[index]);
    //   }
    // }
    displayChoices();
    console.log(choices);
  }
  if (choices.length < 3) {
    const li = document.createElement(`li`);
    const img = document.createElement(`img`);
    li.className = "tarot-card";
    li.onclick = pickCard;
    img.src = `./Assets/${cards.img}`;
    img.alt = `${cards.name}`;
    li.appendChild(img);
    return li;
  }
};

//display deck
const getDeck = () => {
  axios.get(`${baseURL}/api/cards`).then(({ data }) => {
    deck.innerHTML = "";

    data.cards.forEach((card) => {
      let cardHTML = MakeTarotCard(card);
      deck.appendChild(cardHTML);
    });
  });
};

const displayChoices = () => {
  console.log(choices);
  drawCont.innerHTML = "";
  choices.forEach((card) => {
    drawCont.appendChild(card);
  });
};

//add card to spread
//function testing area
getDeck();
