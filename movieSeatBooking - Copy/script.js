// grab from the DOM
const container = document.querySelector(".container"); //selects the fist one- container-- class"container"
const seats = document.querySelectorAll(".row .seat:not(.occupied)"); // selects all of them--seats---specifically grabs all the seats in a row that are not occupied
const count = document.getElementById("count"); //id
const total = document.getElementById("total"); //id
const movieSelect = document.getElementById("movie"); //id

populateUI();

let ticketPrice = +movieSelect.value;

//save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}

//update total and count
function updatedSelectedCount() {
    //grabs all the seleceted seats
    const selectedSeats = document.querySelectorAll(".row .seat.selected"); //nodelist

    //copy selected seats into arr
    //map through array
    //return a new arr indexes

    //copies everything in the variable selectedSeats into the array of seatsIndex---spread operator copies the elements of an array and adds into the array we are currently using
    //--converts the nodelists into an array
    //forEach which is a high order array method doesn't return anything, but loops through like a for loop
    //.map creates a new array
    const seatsIndex = [...selectedSeats].map(
        (seat) => [...seats].indexOf(seat) //array of indexes---indexOf
    );
    // console.log(seatsIndex);

    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex)); //turing into a string
    // console.log(selectedSeats);
    const selectedSeatsCount = selectedSeats.length; //length of the nodelist- number of elements in the array
    // console.log(selectedSeatsCount);
    //property called innerText
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

//get data from local storage and populate UI
function populateUI() {
    //pull out selected seats from local storage
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")); //puts it back into an array
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            //check to see if value is in the array when using indexOf- using -1 because that indicates a value is not there- if it's greater than -1 that means it is there
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    //if it is in storage
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//movie select event
//change event listener
movieSelect.addEventListener("change", (e) => {
    //adds ticket price
    ticketPrice = +e.target.value;
    // console.log(e.target.selectedIndex, e.target.value); //what we want to save in local storage
    setMovieData(e.target.selectedIndex, e.target.value);
    //calls function
    updatedSelectedCount();
});

// seat click event
//adds an event listener on the class named "container"
container.addEventListener("click", (e) => {
    // console.log(e.target);
    //checking to see what we click on has a class of "seat" AND not a class  of "occupied"
    if (
        e.target.classList.contains("seat") &&
        !e.target.classList.contains("occupied")
    ) {
        //if so we add a class of "selected" which makes it blue
        e.target.classList.toggle("selected");
        //then calls this function
        updatedSelectedCount();
    }
});

//initial ccount and total set
updatedSelectedCount();
