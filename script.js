const x = require('./script2.js');
console.log(x);

const fruitForm = document.querySelector("#inputSection form");
console.log(fruitForm);

fruitForm.addEventListener(
    "submit",
    extractFruit
);

const FruitList = document.querySelector("#fruitSection ul");
const fruitNutrition = document.querySelector("#nutritionSection p");

// e for event here
function extractFruit(e) {
    e.preventDefault();
    new_fruit = e.target.fruitInput.value;
    if (new_fruit == "") {
        return;
    }
    fetchFruitData(new_fruit);
    return;
}
let cal = 0;
function addFruit(fruit) {
    const li = document.createElement("li");
    li.addEventListener(
        "click",
        () => li.remove()
    )
    li.textContent = fruit.name;
    FruitList.appendChild(li);

    cal += fruit.nutritions.calories;
    fruitNutrition.textContent = "Total Calories: " + cal;
}

function fetchFruitData(fruit) {
    fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`)
    // returns promise
        .then((resp) => resp.json())
        // convert the response into a json
        .then(data => addFruit(data))
        // addFruit by extracting field from the json
        .catch((e) => console.log(e))
}