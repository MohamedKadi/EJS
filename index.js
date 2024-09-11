const express = require("express")

const app = express();
const path = require('path');

const redditData = require('./data.json');
app.use(express.static('public'));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/views'))

app.get("/", (req,res) =>{
    res.render("home");
})
app.get("/cats", (req,res) =>{
    const cats = [
        'blue',
        'rocket',
        'monty',
        'stephanie',
        'winston'
    ]
    res.render("cats", {
        cats: cats
    });
})

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random()*10)+1;
    res.render('random', {
        rand: num,
    });
})

app.get('/r/:subreddit', (req,res) => {
    const subreddit = req.params.subreddit;
    const data = redditData[subreddit];
    if(!data){
        res.send("this page does not exist")
    }else{
        res.render('subreddit', {subreddit: data})
    }
    
})

app.listen(3000,() =>{
    console.log("LISTENING ON PORT 3000");
})