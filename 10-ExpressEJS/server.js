const express = require("express");
const app = express();

const bodyParser = require("body-parser"); //npm install teh content of the parentesis
app.use(bodyParser.urlencoded({ extended: true })); //Recive parameters like req.body, params, etc
app.use(express.static("public")); //Static content, the public folder
app.engine("ejs", require("ejs").renderFile); //Confihure EJS
app.set("view engine", "ejs"); //Configure view engine
//app.use = midleware


// TODO: configure the express server

const longContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

let posts = [];
let name;

app.get("/", (req, res) => {
  //res.sendFile(__dirname + "/public/html/index.html");
  res.render("index", { name });
});

app.post("/login", (req, res) => {
  name = req.body.name;
  res.redirect("home");
});

app.route("/home")
  .get((req, res) => {
    res.render("home", { name, posts });
  }).post((req, res) => {
    const BlogTitle = req.body.Title;
    const BlogBody = req.body.Body;
    const id = posts.length; 
    posts.push({ title: BlogTitle, content: BlogBody, id: id });
    res.redirect("home");ZZZ
  });

  app.get("/post/:id", (req, res) => {
    const postId = req.params.id;
    const post = posts.find(post => post.id == postId);
    if (post) {
      res.render("post", { post });
    } else {
      res.status(404).send('Post not found');
    }
  });

  app.get("/edit/:id", (req, res) => {
    const postId = req.params.id;
    const post = posts.find(post => post.id == postId);
    if (post) {
      res.render("edit", { post });
    } else {
      res.status(404).send('Post not found');
    }
  });
  
  app.post("/edit/:id", (req, res) => {
    const postId = req.params.id;
    const postIndex = posts.findIndex(post => post.id == postId);
    if (postIndex > -1) {
      posts[postIndex].title = req.body.Title;
      posts[postIndex].content = req.body.Body;
      res.redirect("/post/" + postId);
    } else {
      res.status(404).send('Post not found');
    }
  });
  
  app.get("/delete/:id", (req, res) => {
    const postId = req.params.id;
    const postIndex = posts.findIndex(post => post.id == postId);
    if (postIndex > -1) {
      posts.splice(postIndex, 1);
      res.redirect("/home");
    } else {
      res.status(404).send('Post not found');
    }
  });





app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});
