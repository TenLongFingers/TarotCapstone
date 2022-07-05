const express = require("express");
const cors = require("cors");
const app = express();

//the json calls the images already. Do I need to add in the image assets to this controller file as well?
app.use(`tarot-images.json`());

const port = process.env.PORT || 2100;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
