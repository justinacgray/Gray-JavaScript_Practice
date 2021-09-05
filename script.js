const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

//using async functions avoids using .then promises
//Fetch random user and add money
async function getRandomUser() {
    const res = await fetch("https://randomuser.me/api");
    const data = await res.json();

    // console.log(data);
    const user = data.results[0];
    const newUser = {
        //using dot notation to access the data in the response
        name: `${user.name.first} ${user.name.last}`,
        //choosing to round a random number  and multiply it by 1 million
        money: Math.floor(Math.random() * 1000000),
    };
    // console.log(newUser);
    addData(newUser);
}

//Double Money
function doubleMoney() {
    //.map returns an array
    //reassigning data to this map function
    data = data.map((user) => {
        //spead operator
        return { ...user, money: user.money * 2 };
    });
    //everytime we change something we want to update the DOM
    updateDOM();
}

//Sort user by riches
function sortbyRichest() {
    data.sort((a, b) => b.money - a.money);
    updateDOM();
}

//filter only millionaires
function showMillionaires() {
    //reassigning data
    data = data.filter((user) => user.money > 1000000);
    updateDOM();
}

//calculate all users wealth
function calculateWealth() {
    //user is the object and wwe're using dot notation to access the money portion or value of the object
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);
    // console.log(formatMoney(wealth));
    const wealthEl = document.createElement("div");
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
        wealth
    )}</strong></h3>`;
    main.appendChild(wealthEl);
}

//Add new oject to data array
function addData(object) {
    data.push(object);
    //as we add data we want to update the DOM
    updateDOM();
}

//Function to Update DOM
//set default value in function
//if nothing is pass in then we're just going to use data
function updateDOM(providedData = data) {
    //clear main div
    main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

    //looping through provided data. high order array method
    providedData.forEach((person) => {
        //creating a new element for each of the people
        const element = document.createElement("div"); //creates an HTMl element
        //styled this in CSS
        element.classList.add("person");
        element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(
            person.money
        )}`;
        //inserts in the DOM
        main.appendChild(element);
    });
}
// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
    return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//Event Listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortbyRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);

//when you're sorting things numerically you can't use .sort but have to use a compare function as well

//.map does is that it loops through an array just like .forEach, exept it turns another array from it. forEach just loops through it and then you do whatever you want inside the .forEach loop. .map actually returns something and usually requires another array
