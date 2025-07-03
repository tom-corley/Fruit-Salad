(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{"./script2.js":2}],2:[function(require,module,exports){
const x = 42;

module.exports = x;
},{}]},{},[1]);
