const wordEl = document.getElementById("word");
const wrongLetterEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

//using querySelectorAll becuase they are multiple classes of them all
const figureParts = document.querySelectorAll(".figure-part");

// const words = () => {
//     let oneWord = fetch("https://api.dictionaryapi.dev/api/v2/entries/en/")
//         .then((res) => res.json())
//         .then((data) => {
//             console.log(data);
//         });
// };

// words();

const words = [
    "consistent",
    "concentrate",
    "obedient",
    "fearless",
    "support",
    "brave",
    "encouragement",
    "persistent",
];

// randomly select a word
let selectedWord = words[Math.floor(Math.random() * words.length)];
// console.log(selectedWord);

const correctLetters = [];
const wrongLetters = [];

//show hidden word
function displayWord() {
    //setting the inner HTMl of wordEl
    wordEl.innerHTML = `
    ${selectedWord
        //spliting the selectedWord
        .split("")
        //and mapping through it to see if the letter is included in that array. if it is we're going to output the letter it it's not output an empty string. then turn it back into a string
        .map(
            (letter) => `
                <span class="letter">
                    ${correctLetters.includes(letter) ? letter : ""}
                </span>
            `
        )
        .join("")}
    `;
    const innerWord = wordEl.innerText.replace(/\n/g, "");
    // console.log(wordEl.innerText);
    if (innerWord === selectedWord) {
        finalMessage.innerText = "Congratulations! You won!";
        popup.style.display = "flex";
    }
}

//update the wrong letters
const updateWrongLettersEl = () => {
    // console.log("Update Wrong");
    //ternary operators
    //display wrong letters
    wrongLetterEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;
    //display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
        if (index < errors) {
            part.style.display = "block";
        } else {
            part.style.display = "none";
        }
    });
    //if we lost the game
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = "So, sorry you lost";
        popup.style.display = "flex";
    }
};

//show notification
const showNotification = () => {
    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 2000);
};

//keydown letter press
//we want it on the window object which is the very top level object of the dom
window.addEventListener("keydown", (e) => {
    // console.log(e.keyCode);
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        // console.log("This is a letter");
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
});

//restart game and play game
playAgainBtn.addEventListener("click", () => {
    //empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersEl();

    popup.style.display = "none";
});

displayWord();
