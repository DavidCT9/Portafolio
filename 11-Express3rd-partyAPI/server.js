const express = require("express");
const app = express();

const bodyParser = require("body-parser"); //npm install the content of the parentesis
app.use(bodyParser.urlencoded({ extended: true })); //Recive parameters like req.body, params, etc
app.use(express.static("public")); //Static content, the public folder
app.engine("ejs", require("ejs").renderFile); //Configure EJS
app.set("view engine", "ejs"); //Configure view engine

const https = require("http");

const apiKey = "3b51f587c9136446d3267689e1ff990a";


/*app.route("/")
  .get((req, res) => {
    res.render("index")


  });*/



app.route("/")
  .get((req, res) => {
    res.render("index");
  })
  .post((req, res) => {
    var city = req.body.cityName;
    let url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    https.get(url, (response) => {
      console.log("Status code: " + response.statusCode);
      if (response.statusCode == 200) {
        response.on("data", (data) => {

          var cityData = JSON.parse(data);
          console.log(cityData);

          var tempeture = cityData.main.temp;
          console.log("Tempeture: " + tempeture);

          var desc = cityData.weather[0].description;
          console.log("Description: " + desc);

          tempetureCelsius = tempeture - 273.15;
          tempetureCelsius = tempetureCelsius.toFixed(1);
          
          var index = cityData.weather[0].icon;

          var img = "http://openweathermap.org/img/wn/" + index + "@2x.png"
          res.render("city", { tempetureCelsius, desc, img});
        });
      } else {
        console.log("error");
        res.render("error");
      }
    });

  });


app.listen(3000, () => {
  console.log("Listening to port 3000");

});

/*app.get("/", (req, res) => {
  https.get(url, (response) => {
    console.log(response.statusCode);
    response.on("data", (data) => {
        res.setHeader("Content-Type", "text/html");

        while (response.statusCode == 200){
            res.write(main.temp);
            res.write(clouds.all);
            res.send("index.html")

        }
      
      res.send();
    });
  });
});*/