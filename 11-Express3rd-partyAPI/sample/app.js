const express = require("express");
const https = require("http");
const bodyParser = require("body-parser");

const app = express();

const apiKey = "3b51f587c9136446d3267689e1ff990a";


let url = "http://placekitten.com/g/300/300";

app.get("/", (req, res) => {
  https.get(url, (response) => {
    console.log(response.statusCode);
    response.on("data", (data) => {
      res.write(data);
      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
