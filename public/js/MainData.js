let muslim_boy_name;
let muslim_girl_name;
let allMuslimNames;
async function fatching_muslimname() {
  try {
       [muslim_boy_name, muslim_girl_name] = await Promise.all([
          gettext("/jsonsdata/muslimboyname.json"),
          gettext("/jsonsdata/muslimgirlname.json")
      ]);

      allMuslimNames = await combineArrays(muslim_boy_name, muslim_girl_name);
      // console.log("All Muslim Names:", allMuslimNames);
      showingnamedata();
      // Add any additional code to run after allMuslimNames is calculated
  } catch (error) {
      console.error("Error fetching Muslim names:", error);
  }
}
// Call the function to fetch and combine Muslim names
fatching_muslimname();

async function gettext(file){
  try{
 let  mytxt = await fetch(file);
 data = await mytxt.json();
 return data
}
 catch(error){
  console.log("i am getting this error",error)
}
}

// this is the function for combining muslim boy and girls array
function combineArrays(boyArray, girlArray) {
  const combinedArray = [];
  let i = 0;
  let j = 0;

  while (i < boyArray.length && j < girlArray.length) {
    const boyName = boyArray[i].name.toLowerCase();
    const girlName = girlArray[j].name.toLowerCase();

    if (boyName.localeCompare(girlName) < 0) {
      combinedArray.push(boyArray[i]);
      i++;
    } else {
      combinedArray.push(girlArray[j]);
      j++;
    }
  }

  // Add remaining names if any
  while (i < boyArray.length) {
    combinedArray.push(boyArray[i]);
    i++;
  }

  while (j < girlArray.length) {
    combinedArray.push(girlArray[j]);
    j++;
  }

  return combinedArray;
}

// i will grt my first religion key here [1]
const urlParams = new URLSearchParams(window.location.search);
const idValue = urlParams.get('id');
const gendervalue = urlParams.get("gender")
console.log(idValue,gendervalue)

// its add function to quick search btn [2]
const common_gender_btn = document.querySelectorAll(".common_gender_btn");
let quicksearchID = "all"
let final_quicksearchID ;

// sub categori value got here [3]
const subcategories_btn = document.querySelectorAll(".subcategories")
let subcategorie = "all"

// alphabetical filter [4]
let letter ;
console.log(letter)


let seprater;
const namecontainercounting = document.getElementById("name_container_counting")
function showingnamedata() {
console.log("function is runing now")
  // this is indexa for spesefy the index
  let indexa = 0;
  if (idValue == "muslim") {
    if (quicksearchID === "all") {
      if (subcategorie === "all")
        namecontainercounting.textContent = `total ${allMuslimNames.length} name available`;
      seprater = allMuslimNames;
      final_quicksearchID = allMuslimNames;
    }
    else if (quicksearchID === "boy") {
      if (subcategorie === "all")
        namecontainercounting.textContent = `total ${muslim_boy_name.length} name available`;
      seprater = muslim_boy_name;
      final_quicksearchID = muslim_boy_name;
    }
    else if(quicksearchID === "girl"){
      if (subcategorie === "all")
        namecontainercounting.textContent = `total ${muslim_girl_name.length} name available`;
      seprater = muslim_girl_name;
      final_quicksearchID = muslim_girl_name;
    }

  }

  else if (idValue == "hindu") {
    namecontainercounting.textContent = `total ${hindu_boy_name.length} name available`;
  }

  else if (idValue == "sikh") {
    namecontainercounting.textContent = `total ${sikh_boy_name.length} name available`;
  }

  if (typeof letter === "string"){
    function filterNamesStartingWith(namesArray) {
      return namesArray.filter(function (item) {
          // Convert the name to lowercase for case-insensitive comparison
          const uppercaseName = item.name.toUpperCase();
          
          // Check if the lowercase name starts with 'a'
          return uppercaseName.startsWith(letter);
      });
  }
  
  // Example usage:
  const names_starting_with_alphabet = filterNamesStartingWith(seprater);
  // console.log(names_starting_with_alphabet);
  seprater = names_starting_with_alphabet;
  final_quicksearchID = names_starting_with_alphabet;
  namecontainercounting.textContent = `total ${seprater.length} name available`;
  
  }else if (typeof letter === "undefined"){
    console.log("letter is undefine")
  }

  let boy = "/images and icon/gender/boys_gender_64.png"
  let girl = "/images and icon/gender/girls_gender_64.png"
  const name_divs_container = document.getElementById("name_divs_container")
  // this is remove exiting div from  name_divs_container
  
  while (name_divs_container.firstChild) {
    name_divs_container.removeChild(name_divs_container.firstChild);
  }
  seprater.forEach((data, index) => {
    const name_divs = document.createElement("div");
    name_divs.className = "divs_style";
    name_divs.addEventListener("click",function() {
      redirectinnameinfo(this);
    })
    
    const gendersection = document.createElement("div")
    gendersection.className = "gender_div";
    const img_tag = document.createElement("img");
  //  console.log(indexa)
    if (final_quicksearchID[indexa].Gender == "Male") {
      img_tag.src = boy;
    } else if (final_quicksearchID[indexa].Gender == "Female") {
      img_tag.src = girl;
    }
    img_tag.alt = "png";
    gendersection.appendChild(img_tag)

    const namesection = document.createElement("div")
    const namesection_text_element = document.createElement("h2");

    namesection_text_element.textContent = final_quicksearchID[indexa].name;
    namesection.className = "namesection";
    namesection.appendChild(namesection_text_element)

    const meaningsection = document.createElement("div")
    const meaningsection_text_element = document.createElement("p");
    meaningsection_text_element.textContent = final_quicksearchID[indexa].meaning
    meaningsection.className = "meaningsection";
    meaningsection.appendChild(meaningsection_text_element)

    const likesection = document.createElement("div")
    likesection.className = "likesection";
    const likesection_img_tag = document.createElement("img");
    likesection_img_tag.src = `/images and icon/footer_favlik_icon/like_64.png`;
    likesection_img_tag.alt = "png";
    likesection.appendChild(likesection_img_tag)

    const more_btn = document.createElement("div")
    more_btn.className = "more_btn";
    const more_btn_img_tag = document.createElement("img");
    more_btn_img_tag.src = `/images and icon/arrow_icon/right_arrow_64.png`;
    more_btn_img_tag.alt = "png";
    more_btn.appendChild(more_btn_img_tag)

    name_divs.appendChild(gendersection);
    name_divs.appendChild(namesection);
    name_divs.appendChild(meaningsection);
    name_divs.appendChild(likesection);
    name_divs.appendChild(more_btn);

    // Append the div to the container
    name_divs_container.appendChild(name_divs);
    indexa = indexa + 1
  })
}

function togglefunction(event) {
  quicksearchID = event.currentTarget.id;
  console.log(quicksearchID)
  showingnamedata()
  common_gender_btn.forEach((div) => {
    div.style.border = div.id === quicksearchID ? "2px solid black" : "0px solid black";
  })
}
for (let i = 0; i < 3; i++) {
  common_gender_btn[i].addEventListener("click", togglefunction)
}
// end

function subcategories_togglefunction(event) {
  subcategorie = event.currentTarget.id;
  console.log(subcategorie)
  showingnamedata()
  subcategories_btn.forEach((div) => {
    div.style.border = div.id === subcategorie ? "2px solid black" : "0px solid black";
  })
}
for (let i = 0; i < 5; i++) {
  subcategories_btn[i].addEventListener("click", subcategories_togglefunction)
}


let alphabeticle_content = document.querySelectorAll(".alphabeticle_content");
alphabeticle_content.forEach(function(div){
  div.addEventListener("click",function(){
    alphabeticle_content.forEach(function(alldiv){
        alldiv.classList.remove("alphabeticle_content_focus")
    })
  letter = div.textContent
  div.classList.add("alphabeticle_content_focus")
    console.log(letter)
    showingnamedata()

  })
})


function goBack(){
  console.log('Button clicked!');  // Add this line
  window.location.href = '../index.html';
  window.close();
  console.log('Button clicked!');  // Add this line
}
function redirectinnameinfo(clickedDiv){
  var h1Element = clickedDiv.querySelector('.namesection');
  console.log(h1Element)
  var h2element = h1Element.querySelector('h2')
  console.log(h2element)
  let text1 = h2element.textContent;
  console.log(text1)
  window.open(`/nameinfo.html?name=${text1}`, '_blank');
}