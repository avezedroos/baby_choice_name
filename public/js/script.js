// trending name fatching code 
let topname;
topnamefatching("jsonsdata/topname.json");
async function topnamefatching(file){
    try {
        let fatchdata = await fetch(file);
        topname = await fatchdata.json();
        randomtopname();
    } catch (error) {
        console.log(`i will get this error when i fatching top name data ${error}`)
    }
};

function randomtopname(){
// Combine boy and girl names
const allNames = [...topname.top_muslim_boy_names, ...topname.top_muslim_girl_name];
// Function to get a specified number of random names
function getRandomNames(count) {
  const randomNames = [];
  const totalNames = allNames.length;

  if (count > totalNames) {
    console.error("Count exceeds the total number of available names.");
    return randomNames;
  }

  // Generate random indices and get corresponding names
  while (randomNames.length < count) {
    const randomIndex = Math.floor(Math.random() * totalNames);
    const selectedName = allNames[randomIndex];

    // Avoid duplicates
    if (!randomNames.includes(selectedName)) {
      randomNames.push(selectedName);
    }
  }
  return randomNames;
}
// Get 10 random names
const randomNamesArray = getRandomNames(10);
// Display the result
console.log(randomNamesArray);
let boy = "/images and icon/gender/boys_gender_64.png"
let girl = "/images and icon/gender/girls_gender_64.png"
for (let i=0;i<10;i++){
    let topgenderdiv = document.querySelectorAll(".gender_div")[i];
    let topgenderimgdiv = topgenderdiv.querySelector("img");
    let topnamesection = document.querySelectorAll(".namesection")[i]
    let topnamediv = topnamesection.querySelector("h1");
    let topmeaningsection = document.querySelectorAll(".meaningsection")[i]
    let topmeaningdiv = topmeaningsection.querySelector("p");
    // console.log(topgenderdiv)

    // for inserting gender img
    if(randomNamesArray[i].gender == "male"){
        topgenderimgdiv.src= boy;
    }else if(randomNamesArray[i].gender == "female"){
        topgenderimgdiv.src= girl;
    }
    // for inserting name
        topnamediv.textContent = randomNamesArray[i].name;
    // for inserting meaning
        topmeaningdiv.textContent = randomNamesArray[i].meaning;
}
}
// trending name fatching code end here

function loadPage2(name) {
    var main = document.querySelector('main');
    maincontent = document.getElementById("containt")
    console.log(main)
    if (!main.querySelector('iframe')) {
        maincontent.style.display = 'none'; // Hide the existing content
        // let maincontent = document.getElementById("main")
        var iframe = document.createElement('iframe');
        iframe.name = 'pageFrame';
        iframe.id = 'pageFrame';
        iframe.width = '100%';
        // iframe.height = '100%';
        main.appendChild(iframe);

        iframe.onload = function () {
            // maincontent.style.display= "none"
            var iframeContentHeight = iframe.contentWindow.document.body.scrollHeight + 'px';
            iframe.style.height = iframeContentHeight;
            main.style.display = 'block'; // Show the iframe content

        };

        iframe.src = `/${name}.html`;
    }
}

function clickonhome() {
    main = document.querySelector("main")
    iframe = main.querySelector("iframe")
    maincontent = document.getElementById("containt")

    if (iframe) {
        main.removeChild(iframe);
        maincontent.style.display = 'block';
    }
}

// header start here
let app_categorieas = document.getElementById("app_categories");
let app_categorie_box = document.querySelectorAll(".app_categorie_box");


function removeEventListenerin_categorie() {
    for (let i = 0; i < app_categorie_box.length; i++) {
    app_categorie_box[i].style.height= "0%";
    document.removeEventListener("click", removeEventListenerin_categorie);
    recent_activity_option.addEventListener("click",Open_recent_activity_option);
}
}
 function open_app_categorieas(event){
    for (let i = 0; i < app_categorie_box.length; i++) {
    event.stopPropagation();
    app_categorie_box[i].style.height = "50%";
    // app_categorie_box[i].style.boxShadow = "100px 0px 10px 0px #666666";
    recent_activity_option.removeEventListener("click",Open_recent_activity_option);
    document.addEventListener("click", removeEventListenerin_categorie);
    app_categorie_box[i].addEventListener("click", function (event) {
        event.stopPropagation();
    });
    console.log(window.innerHeight);
    if(window.innerHeight > 670 && i == 1 && window.innerHeight<810){
        let app_categorie_box_height_incriment =(window.innerHeight-670)/13;
        console.log("this is me 1",app_categorie_box_height_incriment);
        app_categorie_box[1].style.height = `${50+app_categorie_box_height_incriment}%`;
        // console.log("this is math ",Math.floor((window.innerHeight-670)/11))
    }else if(window.innerHeight > 809 && i == 1 && window.innerHeight<910){
        let app_categorie_box_height_incriment =(window.innerHeight-670)/16;
        console.log("this is me 2",app_categorie_box_height_incriment);
        app_categorie_box[1].style.height = `${50+app_categorie_box_height_incriment}%`;
    }else if(window.innerHeight > 909 && i == 1){
        let app_categorie_box_height_incriment =(window.innerHeight-670)/18;
        console.log("this is me 3",app_categorie_box_height_incriment);
        app_categorie_box[1].style.height = `${50+app_categorie_box_height_incriment}%`;
    }
 }
}
app_categorieas.addEventListener("click", open_app_categorieas);


// search box start here
let serach_icon = document.getElementsByClassName("search_option_mobile")[0]
let search_box = document.querySelector(".search_box")
let search_back_btn = document.getElementsByClassName("search_back_btn")[0]
serach_icon.addEventListener("click", function (){
            search_box.style.display = "block";

});
search_back_btn.addEventListener("click",function(event){
            event.stopPropagation()
            search_box.style.display = "none";

})
// recent activity box start here

let recent_activity_option = document.getElementsByClassName("recent_activity_option")[0];
let recent_activity_box = document.querySelector(".recent_activity_box");


function removeEventListenerin_recentactivity() {
    recent_activity_box.style.display= "none";
    document.removeEventListener("click", removeEventListenerin_recentactivity);
    app_categorieas.addEventListener("click", open_app_categorieas);
}

function Open_recent_activity_option(event){
    event.stopPropagation();
    recent_activity_box.style.display = "block";
    app_categorieas.removeEventListener("click", open_app_categorieas);
    document.addEventListener("click", removeEventListenerin_recentactivity);
    recent_activity_box.addEventListener("click", function (event) {
        event.stopPropagation();
    });
}

recent_activity_option.addEventListener("click",Open_recent_activity_option);

// login option start here
let loginOption = document.getElementsByClassName("login_option")[0];
loginOption.addEventListener("click",()=>{
    console.log("this is login.html,line no. 187")
    window.location.href = "login.html";
})
// image slider start here
const slider = document.querySelector('.image_slider');
const images = document.querySelectorAll('.image_slider img');
let imageIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

function nextSlide() {
    imageIndex = (imageIndex + 1) % images.length;
    updateSlider();
}

function prevSlide() {
    imageIndex = (imageIndex - 1 + images.length) % images.length;
    updateSlider();
}

function updateSlider() {
    const offset = -imageIndex * 100;
    slider.style.transform = `translateX(${offset}%)`;
}
function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
}

function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].clientX;
    const swipeThreshold = 50; // Adjust as needed

    if (touchStartX - touchEndX > swipeThreshold) {
        nextSlide();
    } else if (touchEndX - touchStartX > swipeThreshold) {
        prevSlide();
    }
}
setInterval(nextSlide, 3000); // Auto slide every 3 seconds

// Allow user interaction to change images
document.querySelector('.image_slider_box').addEventListener('click', nextSlide);

document.querySelector('.image_slider_box').addEventListener('touchstart', handleTouchStart);
document.querySelector('.image_slider_box').addEventListener('touchend', handleTouchEnd)
// You can also add buttons for prev and next if desired
// Example: document.getElementById('prev-button').addEventListener('click', prevSlide);
// Example: document.getElementById('next-button').addEventListener('click', nextSlide);

// trending name section start here
const mainDiv = document.getElementById("trending_name_mainDiv");
const childDivs = mainDiv.querySelectorAll(".trending_name_child-div");
const showButton = document.getElementById("trending_name_showButton");
let allVisible = false;
console.log(allVisible)

showButton.addEventListener("click", () => {
    if (!allVisible) {
        childDivs.forEach((div) => {
            div.style.display = "grid";
        });
        showButton.innerText = "Hide All";
    } else {
        childDivs.forEach((div, index) => {
            if (index >= 3) {
                div.style.display = "none";
                console.log(div)
            }
        });
        showButton.innerText = "Show All";
    }
    allVisible = !allVisible;
    console.log(allVisible)
});

// for laptop and pc coding
if(window.innerWidth >= 768){
let categorie_cards = document.querySelector(".categorie_cards");
document.querySelector(".sidebar").appendChild(categorie_cards);

}
console.log(window.innerWidth)