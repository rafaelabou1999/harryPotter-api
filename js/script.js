
const input = document.querySelector("input")


async function fetchData(){
    try{
        const data = await fetch("https://hp-api.onrender.com/api/characters")
        console.log(data)
        if(!data.ok){
            throw new Error("Error in the response, " + error)
        }

      
        const dataJson = await data.json();
        console.log(dataJson)

        addContent(dataJson)
    
    } catch{
        console.error("Problem during the fetch")
    }
        
}

async function addContent(data){
    const div = document.querySelector(".content");
    const value = input.value;
    
    data.forEach(each => {
        const valueChosen = value;
        if(value.toLowerCase === each.name.toLowerCase){
            
            const newElement = document.createElement("div");
            const newImg = document.createElement("img");
    
            newElement.textContent = each.name;
            newImg.src = each.image;
            div.appendChild(newElement)
            div.appendChild(newImg)
    
        } else{

        }
       
    })
}

const fetchButton = document.querySelector("button")
document.addEventListener("click", fetchData)