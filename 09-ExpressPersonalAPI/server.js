const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.route("/")
    .get((req, res) => {
        res.sendFile(__dirname + "/public/html/index.html");

    })
    .post((req, res) => {


    });

var names = [];
var tasks = [];
var idCounter = 0;

/*Error hanalding is not necessary in the wazzup part is not necessar, because i have a names list, and mi app dont allows that the user inputs no name, also the app dont write wazzup links for empty names*/


app.route("/greet")
    .get((req, res) => {
        var name = req.query.name;
        names.push(name);
        res.render("index", { names: names, tasks: tasks });

    })
    .put((req, res) => {
        var name = req.params.name;
        names.push(name);
        res.json({ names: names });
    });

app.get("/wazzup", (req, res) => {
    var index = req.query.index;
    console.log(names)
    var nombre = names[index];
    res.render("wazzup", { nombre: nombre })

});




app.route("/task")
    .get((req, res) => {
        res.json(tasks);
    })
    .post((req, res) => {
        var task = { id: idCounter++, task: req.body.task };
        tasks.push(task);
        res.render("index", { names: names, tasks: tasks });
    });

app.post("/deleteTask", (req, res) => {
    var id = req.body.id;
    tasks = tasks.filter(task => task.id != id);
    res.redirect('/greet');

});

app.post("/moveUp", (req, res) => {
    var id = req.body.id;
    var index = tasks.findIndex(task => task.id == id);
    if (index > 0) {
        var temp = tasks[index];
        tasks[index] = tasks[index - 1];
        tasks[index - 1] = temp;
    }
    res.redirect('/greet');

});

app.post("/moveDown", (req, res) => {
    var id = req.body.id;
    var index = tasks.findIndex(task => task.id == id);
    if (index < tasks.length - 1) {
        var temp = tasks[index];
        tasks[index] = tasks[index + 1];
        tasks[index + 1] = temp;
    }
    res.redirect('/greet');

});


//Number(req.body.num1)


app.listen(3000, () => {
    console.log("Listening to port 3000");
});


