const search = document.getElementById("search"),
    submit = document.getElementById("submit"),
    random = document.getElementById("random"),
    oneMeal = document.getElementById("oneMeal"),
    resultHeading = document.getElementById("result-heading"),
    singleMeal = document.getElementById("single-meal");

//Search Meal and fetch from API
const searchMeal = (e) => {
    e.preventDefault();

    //clear meal
    singleMeal.innerHTML = "";

    //GET search team
    const term = search.value;

    //check for empty
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                resultHeading.innerHTML = `<h3> Search results for '${term}':</h3>`;
                if (data.meals === null) {
                    resultHeading.innerHTML = `<p> No results are coming up with that entry. Please, try again</p>`;
                } else {
                    //use dot notation to access the data object
                    oneMeal.innerHTML = data.meals
                        .map(
                            (meal) =>
                                `<div class="meal">
                            <img src= "${meal.strMealThumb}" alt="${meal.strMeal}" />
                            <div class="meal-info" data-mealID="${meal.idMeal}">
                            <h3> ${meal.strMeal}</h3>
                            </div>
                        </div>
                    `
                        )
                        .join("");
                }
            });
        //clear search
        search.value = "";
    } else {
        alert("Entry cannot be blank. Please enter in item");
    }
};

//fetch random meal
const getRandomMeal = () => {
    //clear meals and heading
    oneMeal.innerHTML = "";
    resultHeading.innerHTML = "";

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then((res) => res.json())
        .then((data) => {
            const meal = data.meals[0];

            addMealtoDOM(meal);
        });
};

//fetch meal by ID
const getMealById = (mealID) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then((res) => res.json())
        .then((data) => {
            const meal = data.meals[0];

            addMealtoDOM(meal);
        });
};

//Add meal to DOM
const addMealtoDOM = (meal) => {
    const ingredients = [];

    //due to how the api formatted their API this is how we grab it from the data
    for (let x = 1; x <= 20; x++) {
        if (meal[`strIngredient${x}`]) {
            ingredients.push(
                `${meal[`strIngredient${x}`]} - ${meal[`strMeasure${x}`]}`
            );
        } else {
            break;
        }
    }
    singleMeal.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class ="single-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory} </p>` : ""}
                ${meal.strArea ? `<p>${meal.strArea} </p>` : ""}
            </div>
            <div class="main">
                <p> ${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
                </ul>
            </div>  
        </div>
    `;
};

//Event Listener
submit.addEventListener("submit", searchMeal);

random.addEventListener("click", getRandomMeal);

oneMeal.addEventListener("click", (e) => {
    const mealInfo = e.path.find((item) => {
        if (item.classList) {
            return item.classList.contains("meal-info");
        } else {
            return false;
        }
    });
    // console.log(mealInfo);
    if (mealInfo) {
        const mealID = mealInfo.getAttribute("data-mealid");
        getMealById(mealID);
    }
});
