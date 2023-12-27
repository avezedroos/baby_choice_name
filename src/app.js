const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const currentDir = __dirname;
const parentDir = path.dirname(currentDir);
console.log(parentDir);
app.set("view engine","hbs");

app.use(express.static(path.join(parentDir,"public")));

app.get("/avez",(req,res)=>{
    console.log("hii");
    // res.sendFile(path.join(parentDir,"public","index.html"))
    res.send("helo")
});

app.get("/search", (req, res) => {
    const searchTerm = req.query.search;
    // Handle the searchTerm on the server side
    // res.sendFile(path.join(parentDir,"public","index.html"));
    console.log(`Search query: ${searchTerm}`)
    res.send(`Search query: ${searchTerm}`);
});

app.listen(8000,()=>{
    console.log(`server is running at port localhost:8000`)
})
