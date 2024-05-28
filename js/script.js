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
           fetchPage(e.target, [data.name, data.house, data.image])
    })
   });
}

function fetchPage(target, characteristics){
  if(target){
    history.pushState(null,null, 'character.html')
    const content = document.querySelector(".content");
    console.log(characteristics[2])
    content.innerHTML = `
        <div>
            <div>
                <button>← Back</button>
            </div>
            <div>
                <img src=${characteristics[2]} alt=${characteristics[0]}/>
                <h2>${characteristics[0]}</h2>
                <p>${characteristics[1]}</p>
            </div>
        </div>
    `
    content.style.height= "45vh";
    const button = document.querySelector("button");
    const house = document.querySelector("p");
    const pages = document.querySelector(".pages");

    pages.style.visibility= 'hidden';

    
    
    button.style.backgroundColor= "transparent";
    button.style.color = "rgb(23, 14, 44)";
    button.style.fontSize = "1.2rem";
    button.style.border = "none";
    button.style.paddingBottom = "1rem";

    house.style.backgroundColor = "#07041b";
    house.style.padding = "1%";
    house.style.color = "#d9d7db";
    house.style.textAlign = "center";
    house.style.width = "32%";

    button.addEventListener("click", () => {
        history.back();

        displayFirstPage()
    })
  }
}
console.log(imgs)
function updateContent(state) {
    // Your logic to update the content based on the state
    console.log('Updating content for state:', state);
}


async function displayFirstPage(){
    const div = document.querySelector(".content");
    const pages = document.querySelector('.pages');
    pages.style.visibility= 'visible';
    div.classList.remove("activeImg")
    dataArray = await fetchData();
    dataSlice = dataArray.slice(0,16)
   div.style.height= "auto";
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

