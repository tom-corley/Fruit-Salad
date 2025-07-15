const x = require('./script2');
const fruitList = document.querySelector("#fruitSection ul");
const fruitNutrition = document.querySelector("#nutritionSection");
const fruitFrom = document.querySelector("#inputSection form");
fruitFrom.addEventListener("submit", extractFruit);
function extractFruit(e){
    e.preventDefault();
    fetchFruitData(e.target.fruitInput.value);
    e.target.fruitInput.value = "";
}
 let cal = 0;
function addFruit(fruit){
    const li = document.createElement("li");
    li.textContent = fruit.name;
    li.dataset.calories = fruit.nutritions.calories; // Store calories in the element's dataset
    li.addEventListener("click", (e) => removeFruitCalories(e)); // Add click event listener to delete the item when clicked
    fruitList.appendChild(li);
    // Create image element for this specific fruit
    const liImage = document.createElement("img");
    liImage.style.width = "50px";
    liImage.style.height = "50px";
    liImage.style.objectFit = "cover";
    liImage.style.marginRight = "10px";
    liImage.style.borderRadius = "4px";
    // Fetch and display the fruit image
    fetchFruitImage(fruit.name, liImage, li);
    cal += fruit.nutritions.calories;
    nutritionSection.textContent = "The current calorie count is: " + cal;
}
function removeFruitCalories(e){
    // Get the list item element (either the clicked element or its parent)
    const listItem = e.target.tagName === 'LI' ? e.target : e.target.closest('li');
    const fruitCalories = parseInt(listItem.dataset.calories);
    cal -= fruitCalories; // Subtract the calories from the total
    nutritionSection.textContent = "The current calorie count is: " + cal; // Update the display
    listItem.remove(); // Remove the entire list item
}
function fetchFruitData(fruit) {
    fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`) //returns a promise
        .then((resp) => resp.json()) //converts response to JSON
        .then(data => addFruit(data))
        .catch((e) => console.log(e));
}
function fetchFruitImage(fruit, imageElement, listItem) {
    fetch(`https://api.pexels.com/v1/search?query=${fruit}&per_page=1`, {
        headers: {
            Authorization: 'xnTYNA70Tn02biufBTuo25RcUESEXwPExGFeCeOC57SQaZaxvyhmRY7u'
        }
    })
        .then((resp) => resp.json())
        .then(data => {
            if (data.photos && data.photos.length > 0) {
                imageElement.src = data.photos[0].src.small;
                imageElement.alt = fruit;
                listItem.prepend(imageElement); // Add image to the beginning of the list item
            }
        })
        .catch((e) => console.error(e));
}