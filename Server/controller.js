//imports
const express = require("express");
const cors = require("cors");
const app = express();
const cards = require("./tarot-images.json");
// const { shuffleArray } = require("../Client/utilis.mjs");
//Shuffle on client

app.use(cors());
app.use(express.json());

//ENDPOINTS
//all cards
app.get("/api/cards", (req, res) => {
  try {
    res.status(200).send(cards);
  } catch (error) {
    console.log("Error fetching cards", error);
  }
  //   res.sendStatus(400);
});

//shuffled cards
// app.get("/api/cards/draw", (req, res) => {
//   try {
//     let shuffledDeck = shuffleArray(cards);
//     res.status(200).send(shuffledDeck[0]);
//   } catch (error) {
//     console.log("Error getting card", error);
//     res.sendStatus(400);
//   }
// });

//I'll need a post request here soon

//server port info
const port = process.env.PORT || 2100;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
