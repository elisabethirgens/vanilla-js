// Declare constants where values are elements the script will need
const textarea = document.querySelector(".text");
const result = document.querySelector(".result");
// Turn this node list into an array, so it happens just once on page load
const filterOptions = Array.from(document.querySelectorAll('[name="filter"]'));
// Create an object with name/value pairs of letters to be switched

const norwegianDictionary = {
    a: "å",
    A: "Æ",
    e: "æ",
    o: "ø",
    O: "Ø",
};

// Store methods together in an object, making it possible to later
// look them up on the object with a property from an external value
const filters = {
    annoying(key, value) {
        if (value % 2) {
            // nifty modulo truthy trick to check for odd numbers
            return key.toUpperCase();
        }
        return key.toLowerCase();
    },
    norwegian(letter) {
        const nordicLetter = norwegianDictionary[letter];
        if (nordicLetter) return nordicLetter;
        return letter;
    },
    happy(char) {
        const random = Math.floor(Math.random() * 4);
        if (char === " " && random === 2) {
            return " 😊 ";
        }
        if (char === " " && random === 3) {
            return " 😀 ";
        }
        return char;
    },
};

function transformText(text) {
    // Find checked input in filterOptions array and grab value
    const selected = filterOptions.find((input) => input.checked).value;
    // Property lookup with bracket notation because selected is a variable
    const modifiedText = Array.from(text).map(filters[selected]);
    // Use array method join() to concat elements in array to a string
    result.textContent = modifiedText.join("");
}

// Set up function to be called when input event is delivered to target
// in this case, the target is any user input in the textarea
textarea.addEventListener("input", (event) =>
    transformText(event.target.value)
);

// Use the array method forEach() to add an event listener to each
// element in the array of filterOptions, so the transformText function
// is also called every time the user changes the radio button input
filterOptions.forEach((el) =>
    el.addEventListener("input", () => {
        transformText(textarea.value);
    })
);
