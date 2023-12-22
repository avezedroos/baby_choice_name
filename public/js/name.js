// import {mainname} from '/categories/categories.js'
// console.log(mainname)

const categorieName = document.getElementById("categorie_name")
const namecontainerheading = document.getElementById("name_container_heading")
const urlParams = new URLSearchParams(window.location.search);
    const idValue = urlParams.get('id');
console.log(idValue);
if (idValue == "muslim"){
    categorieName.textContent = "islamic name";
    namecontainerheading.textContent ="Muslim/Islamic Name";
}
else if(idValue == "hindu"){
    categorieName.textContent = "Hindu name"
    namecontainerheading.textContent ="Hindu Name"
}
else if(idValue == "sikh"){
    categorieName.textContent = "sikhs name";
    namecontainerheading.textContent ="Sikh Name"
}

