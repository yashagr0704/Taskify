

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items=["Buy Food","Cook Food","Eat Food"];
var workItems=["Homework"];

app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({     
  extended: true
}));


app.set('view engine', 'ejs');

app.use(express.static('public'));

var options = { weekday: 'long',  month: 'long', day: 'numeric' };
var today  = new Date();

var day=today.toLocaleDateString("en-US", options);

app.get('/', (req, res) => {
  res.render('list', {kindOfDay: day , newListItem: items});
});

app.post('/',(req,res)=>{
  var item=req.body.newItem;
  if(req.body.submit==="Work")
  {
    
    workItems.push(item);
    res.redirect("/work");
  }
  else
  {
  items.push(item);

  res.redirect("/");
  }
})

app.get("/work",(req,res)=>{
   console.log("working");
  res.render('list', {kindOfDay: "Work" , newListItem: workItems});

})


port = process.env.PORT || 80;
app.listen(port, function(){
  console.log("Server started on port "+port);
});
