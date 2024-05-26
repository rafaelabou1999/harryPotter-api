const input = document.querySelector("input");
let dataJson = [];  // Global variable to store the fetched data

async function fetchData() {
    try {
        const response = await fetch("https://hp-api.onrender.com/api/characters");
        if (!response.ok) {
            throw new Error("Error in the response");
        }

        dataJson = await response.json();
        console.log(dataJson);

        addContent(dataJson);
    } catch (error) {
        console.error("Problem during the fetch", error);
    }
}

async function addContent(data) {
    const slytherin = data.filter(dt => dt.house === "Slytherin");
    const gryffindor = data.filter(dt => dt.house === "Gryffindor");
    const hufflepuff = data.filter(dt => dt.house === "Hufflepuff");
    const ravenclaw = data.filter(dt => dt.house === "Ravenclaw");

    console.log(slytherin);
    // Here you can add the filtered content to the DOM if needed
}

document.querySelector("button").addEventListener("click", fetchData);

document.addEventListener("keyup", () => {
    const inputValue = input.value.toLowerCase();
    const filteredData = dataJson.filter(dt => dt.name.toLowerCase().includes(inputValue));
    const content = document.querySelector(".content");
    content.innerHTML = "";  // Clear previous results

    filteredData.forEach(dt => {
        const newDiv = document.createElement("div");
        newDiv.textContent = dt.name;
        content.appendChild(newDiv);

        const newImg = document.createElement("img");
        newImg.src = dt.image;
        newImg.style.width = "150px";
        newImg.style.height = "150px";
        newImg.style.objectFit = "cover"
        content.appendChild(newImg);

        
    });

});

