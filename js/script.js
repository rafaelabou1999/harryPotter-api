const input = document.querySelector("input");
const inputValue = input.value;
const searchIcon = document.querySelector(".search i");
const secondPage = document.querySelector(".secondPage");
const firstPage = document.querySelector(".firstPage");
let dataJson = []; 
let allCharacters = [];
const imgs = [];


async function fetchData() {
    try {
        const response = await fetch("https://hp-api.onrender.com/api/characters");
        if (!response.ok) {
            throw new Error("Error in the response");
        }

        dataJson = await response.json();
        return dataJson;
    } catch (error) {
        console.error("Problem during the fetch", error);
    }
}

function renderCharacter(characters){
    const div = document.querySelector(".content");
    div.innerHTML = "";
    characters.forEach(data => {
        const newImg = document.createElement("img");
        newImg.src = data.image;
        div.appendChild(newImg);
        imgs.push(newImg);
        allCharacters.push(data);
        newImg.addEventListener("click", (e) => {
           fetchPage(e.target, [data.name, data.house])
    })
   });
}

function fetchPage(target, characteristics){
  if(target){
    history.pushState(null,null, 'character.html')
    const content = document.querySelector(".content");
    content.innerHTML = characteristics[0]
  }
}
console.log(imgs)

async function displayFirstPage(){
    const div = document.querySelector(".content");
    div.classList.remove("activeImg")
    dataArray = await fetchData();
    dataSlice = dataArray.slice(0,16)
    renderCharacter(dataSlice)
}



async function displaySecondPage(){
    const div = document.querySelector(".content");
    dataArray = await fetchData();
    div.classList.add("activeImg")
    dataSlice = dataArray.slice(16,25)
    renderCharacter(dataSlice)
}


async function findCharacter(){
    
    const inputValue = input.value.toLowerCase();
    const dataSlice = dataJson.slice(0,20)
    const filteredData = dataSlice.filter(data => data.name.toLowerCase().includes(inputValue));
    console.log(filteredData)
    const div = document.querySelector(".content");
    div.innerHTML = "";  

    renderCharacter(filteredData)
   
}




input.addEventListener("keyup", () => findCharacter())
firstPage.addEventListener("click", displayFirstPage)
secondPage.addEventListener("click", displaySecondPage)
displayFirstPage()

