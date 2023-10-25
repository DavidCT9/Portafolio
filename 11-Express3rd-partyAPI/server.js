const express = require("express");
const https = require("http");
const bodyParser = require("body-parser");

const app = express();

const apiKey = "3b51f587c9136446d3267689e1ff990a";

var city="";
let url = "http://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=3b51f587c9136446d3267689e1ff990a&format=json";

app.get("/", (req, res) => {
  https.get(url, (response) => {
    console.log(response.statusCode);
    response.on("data", (data) => {
        res.setHeader("Content-Type", "text/html");

        while (response.statusCode == 200){
            res.write(main.temp);
            res.write(clouds.all);

        }
      
      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
