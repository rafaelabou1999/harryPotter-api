const input = document.querySelector("input");
let dataJson = []; 

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

async function displayCharacter(){
    dataArray = await fetchData();
    dataSlice = dataArray.slice(0,20)
    dataSlice.forEach(data => {
        console.log(data)
        
        const div = document.querySelector(".content");
        const newImg = document.createElement("img");
        newImg.src = data.image;
        console.log(data.image)
        div.appendChild(newImg); 
      
})}
displayCharacter()
const inputValue = input.value;

async function findCharacter(){
    
    const inputValue = input.value.toLowerCase();
    const dataSlice = dataJson.slice(0,20)
    const filteredData = dataSlice.filter(data => data.name.toLowerCase().includes(inputValue));
    
    const div = document.querySelector(".content");
    div.innerHTML = "";  

    if(filteredData){
        filteredData.forEach(data => {
            const newImg= document.createElement("img");
            newImg.src= data.image;
            div.appendChild(newImg);
        });
    } else{
        console.log("Personagem não encontrado")
    }
}
const searchIcon = document.querySelector(".search i");

input.addEventListener("keyup", () => findCharacter())