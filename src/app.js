const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const currentDir = __dirname;
const parentDir = path.dirname(currentDir);
console.log(parentDir);

app.use(express.static(path.join(parentDir,"public")));
app.get("/",(req,res)=>{
    console.log(req.url , "hii");
    res.sendFile(path.join(__dirname,"public","index.html"))
});
app.post("/search", (req, res) => {
    // Assuming you want to handle the search on the server
    const searchTerm = req.body.searchTerm; // Assuming you are using body-parser middleware
    console.log("Received search term:", searchTerm);
    // Perform your search logic here

    // Send a response back to the client
    res.send(`Search results for: ${searchTerm}`);
});


app.listen(8000,()=>{
    console.log(`server is running at port localhost:8000`)
})
