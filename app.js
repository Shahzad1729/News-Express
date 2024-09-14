const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');

const app=express();
const port=3000;

// Static files
app.use(express.static(path.join(__dirname,'public')));

// Parsing html info
app.use(bodyParser.urlencoded({extended:true}));

// Template engine
app.set('views','./src/views');
app.set('view engine','ejs');

// Router
const newsRouter=require("./src/routes/news");
app.use("/",newsRouter);

app.get("/",(req,res)=>{
    res.render('news');
});

app.get("/about",(req,res)=>{
    res.render('about');
});

app.get("/contactus",(req,res)=>{
    res.render('contactus');
});


// Server
app.listen(port,()=>console.log('Server is running on port 3000'));