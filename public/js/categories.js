
// let muslim_div = document.getElementById("muslim")
// let hindu_div = document.getElementById("hindu")
// let sikh_div = document.getElementById("sikh")
// let mainname = "avez";
//  async function redirecting_fuction(event){
//      const divId = event.target.id;
//     //  mainname = DivId;
//      console.log(divId)  
//      console.log(mainname)  
//      await new Promise(resolve => setTimeout(resolve, 10000));
//      window.open('/name_page/name.html?id=${mainname}`', '_blank');
//     }
    
//     muslim_div.addEventListener("click",redirecting_fuction)
//     hindu_div.addEventListener("click",redirecting_fuction)
//     sikh_div.addEventListener("click",redirecting_fuction);

document.addEventListener("DOMContentLoaded", function () {
    let muslim_div = document.getElementById("muslim");
    let hindu_div = document.getElementById("hindu");
    let sikh_div = document.getElementById("sikh");
    // let mainname = "avez";

    async function redirecting_fuction(event) {
        // console.log(event)
        const divId = event.currentTarget.id;
        console.log(divId);
        await new Promise(resolve => setTimeout(resolve, 1));
        window.open(`/name.html?id=${divId}`, '_blank');



    }

    muslim_div.addEventListener("click", redirecting_fuction);
    hindu_div.addEventListener("click", redirecting_fuction);
    sikh_div.addEventListener("click", redirecting_fuction);
});

let displayElements = document.getElementsByClassName("display");
let nonedisplayElements = document.getElementsByClassName("non_display");


// Loop through each element with the class "display"
for (let i = 0; i < displayElements.length; i++) {
    // Add a click event listener to each element
    displayElements[i].addEventListener("click", function(){
        toggledisplay(i)
    });
}

function toggledisplay(index) {
    for(j=0;j<nonedisplayElements.length;j++) {
        let currentDisplay = window.getComputedStyle(nonedisplayElements[j]).display;
   nonedisplayElements[j].style.display = j===index && currentDisplay === "none" ? "flex" : "none";}

}





    
