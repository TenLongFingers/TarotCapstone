//imports
const express = require("express");
const cors = require("cors");
const app = express();
const cards = require("./tarot-images.json");
const savedDrawsArr = [];
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
    res.sendStatus(400);
  }
});

//post request
app.post("/api/savedraw", (req, res) => {
  const cardSpread = req.body;
  savedDrawsArr.push(cardSpread);
  res.status(200).send(savedDrawsArr);
});

//server port info
const port = process.env.PORT || 2100;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
