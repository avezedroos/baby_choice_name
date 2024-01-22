const express = require("express");
const fs = require("fs");
const path = require("path");
const hbs = require('hbs');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');

const app = express();

// setting directory path section
const currentDir = __dirname;
const parentDir = path.dirname(currentDir);
const JsonDir = path.join(parentDir,"public","jsonsdata")
const userdata = path.join(JsonDir,"userdata.json")
const templatesPath = path.join(parentDir,"templates")
console.log(templatesPath)

// section end

// reding data and doing action for searchbar section
const JsonDirfile = fs.readdirSync(JsonDir).filter(file =>file.endsWith(".json") && !file.startsWith("topname"));
const fileDataarray = [];
let emailverify=false;
let flattenedArray;
JsonDirfile.forEach(fileName => {
  const filePath = path.join(JsonDir, fileName);
  const fileData= JSON.parse(fs.readFileSync(filePath, 'utf8'));
  fileDataarray.push(fileData)
  flattenedArray = [].concat(...fileDataarray);
});
function getDataByName(name) {
  // Use the find method to search for an object with the specified name
  const result = flattenedArray.find(obj => obj.name === name);
  // Check if an object with the specified name was found
  if (result) {
    console.log("Data found:", result);
    } else {
      console.log("Data not found for name:", name);
    }
    return result;
  }
function generateRandomCookie(length, existingData) {
    // console.log("this is existingdata in generateRandomCookie",existingData)
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
    // Function to check if the generated string already exists in the array
    function isCookieUnique(newString, array) {
      // console.log("yes this is array",array)
      let isUnique = true;
    array.forEach(item => {
      if (item.cookie === newString) {
        isUnique = false; // If any element has the same cookie, set isUnique to false
      }
    });
  
    return isUnique;
    }
  
    let result;
  
    do {
      const randomBytes = crypto.randomBytes(length);
      result = '';
  
      for (let i = 0; i < length; i++) {
        const randomIndex = randomBytes[i] % charset.length;
        result += charset.charAt(randomIndex);
      }
    } while (!isCookieUnique(result, existingData));
  
    return result;
  }
  // section end
  
  app.set("view engine","hbs");
  app.set('views', path.join(templatesPath, "views"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());

  
// const fileData = JSON.parse(fs.readFileSync(JsonDirfile));
app.use(express.static(path.join(parentDir,"public")));


app.get("/search", (req, res) => {
    const searchTerm = req.query.name;
    searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1).toLowerCase();
    const result1 = getDataByName(searchTerm);
    res.render('nameinfo', { result1 });
    
});
let exitingdata =[];
app.post("/signup",(req,res)=>{
  const requestData = req.body;
  // console.log(requestData)
  
  try{
  exitingdata = JSON.parse(fs.readFileSync(userdata,"utf8"))
  }catch (error) {
    console.error('Error reading existing data:', error);
  }
  // Check if the email already exists
  const emailExists = exitingdata.some((user) => user.email === requestData.email);

  if (emailExists) {
    console.log("emailexit")
    // If the email already exists, send an error response or take appropriate action
    emailverify = true;
    // res.sendFile(path.join(parentDir,"public","login.html"))
    res.json({ emailverify: false });

  } else {
    // console.log("avez iam ",exitingdata)
    let new_cookie = generateRandomCookie(10,exitingdata);
    requestData.cookie = new_cookie;
    console.log("mai yaha tak pohncha",requestData)
    // If the email doesn't exist, add the new data to existing data
    exitingdata.push(requestData);
  fs.writeFileSync(userdata,JSON.stringify(exitingdata, null, 2), 'utf8');
  // res.cookie('yourCookieName', new_cookie, { path: '/' });
  // res.redirect("/")
  res.json({emailverify: true,redirect: true,usercookie:new_cookie});
  }
  
})

app.get("/emailverify",(req, res)=>{
  res.json({ emailverify });
})

app.listen(8000,()=>{
    console.log(`server is running at port localhost:8000`)
})
