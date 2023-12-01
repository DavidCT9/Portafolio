const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config(); //Access from my process variable

/*INITIALIZE THE PROJECT
npm init
npm install express
npm install ejs
npm instal ejs
npm install dotenv
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

//const mongoUrl = "mongodb://127.0.0.1:27017/f1";
//mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }); //Structure or our schema, every parameter is a column
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const mongoUrl = `mongodb+srv://${user}:${password}@cluster0.vmafkex.mongodb.net/f1?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }); //Structure or our schema, every parameter is a column

// Definition of a schema
const teamSchema = new mongoose.Schema({
  id: Number,
  code: String,
  label: String,
  country: String,
  url: String,
});
teamSchema.set("strictQuery", true); //Mandoatory Line

const driverSchema = new mongoose.Schema({
  num: Number,
  code: String,
  forename: String,
  surname: String,
  dob: Date,
  nationality: String,
  url: String,
  team: teamSchema,
});
driverSchema.set("strictQuery", true);

const Team = mongoose.model("Team", teamSchema); //First parameter: name of the "file", second one: the content of the file
const Driver = mongoose.model("Driver", driverSchema);

let countries = [
  { code: "ENG", label: "England" },
  { code: "SPA", label: "Spain" },
  { code: "GER", label: "Germany" },
  { code: "FRA", label: "France" },
  { code: "MEX", label: "Mexico" },
  { code: "AUS", label: "Australia" },
  { code: "FIN", label: "Finland" },
  { code: "NET", label: "Netherlands" },
  { code: "CAN", label: "Canada" },
  { code: "MON", label: "Monaco" },
  { code: "THA", label: "Thailand" },
  { code: "JAP", label: "Japan" },
  { code: "CHI", label: "China" },
  { code: "USA", label: "USA" },
  { code: "DEN", label: "Denmark" },
];

let teamsRaw = [
  { code: "mercedes", label: "Mercedes", country: "GER" },
  { code: "ferrari", label: "Ferrari", country: "ITA" },
  { code: "red_bull", label: "Red Bull Racing", country: "AUT" },

]

let teams = []; //cache variable for teams
let drivers = [];

app.use("/", async (req, res, next) => { //MIDDLE WARE - get the code flow and then let the flow go
  //TODO: get the name of the names of the teams from the DB to show in the form
  if (teams.length === 0) {
    console.log("Inicia vacio");
    //load info from db
    var teamsDB = await Team.find({}).exec(); //Quering my DB in mongoose, inside {"filtering"}, exec() = execution. await = wait until i get a response
    if (!Array.isArray(teamsDB) || teamsDB.length === 0) { //!Array.isArray(teamsDB) not an array
      //I have an empty array, I nedd to populate
      console.log("Los equipos no han sido cargados");
      await Team.insertMany(teamsRaw).then(() => {
        console.log("Teams loaded");
      }).catch((error) => {
        console.error(error);
      });
      //TODO: load again records from the DB

      await Team.find({}).then((docs) => {
        console.log("Found the following teams:");
        console.log(docs);
        teams = docs;
      }).catch((error) => {
        console.error(error);
      });

    } else {
      teams = teamsDB;
    }
  }
  console.log(teams);

  next(); //Let the code flow
});


app.route("/driver")
  .post(async (req, res) => {
    var team = await Team.findOne({ code: { $eq: req.body.team } }).exec();


    const driver = new Driver({
      num: req.body.num,
      code: req.body.code,
      forename: req.body.forename,
      surname: req.body.surname,
      dob: req.body.dob,
      nationality: req.body.nationality,
      url: req.body.url,
      team: team,
    });

    var num = req.body.num;
    const existing = await Driver.findOne({ num }); //SEARCH A REPEATED ELEMENT

    if (existing) {
      return res.status(400).send('Duplicate driver number');
    }

    driver.save();
    drivers.push(driver);

    res.redirect("/");

    console.log(driver);
    console.log("Driver Num: " + driver.num);


  });

app.get("/", (req, res) => {
  //res.sendFile(__dirname + "/public/html/index.html");
  res.render("index", { countries, teams, drivers });
});


app.post('/driver/:id', async (req, res) => {


  const { forename, surname, num, code, dob, url, nationality } = req.body;

  await Driver.findByIdAndUpdate(req.params.id, {
    forename,
    surname,
    num,
    code,
    dob,
    url,
    nationality
  });


  drivers = await Driver.find().select('+_id');
  res.redirect('/');

});

app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});
