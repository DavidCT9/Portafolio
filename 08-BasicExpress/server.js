const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); 
app.use(express.static("public"));

app
    .route("/")
    .get((req, res) => {
        res.render('index.ejs', { result: '' });    
    })
    .post((req, res) => {
        var weight = req.body.weight;
        var height = req.body.height;
        var result = weight / (height ** 2);

        res.render('index', { result: result });
    });

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('There was an error in the app');
});

app.listen(3000, () => {
    console.log("Listening to port 3000");
});
