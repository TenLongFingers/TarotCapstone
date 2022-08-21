//imports
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../Client/home.html"));
});
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../Client/howto.html"));
});

const cards = require("./tarot-images.json");
const savedDrawsArr = [];
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
