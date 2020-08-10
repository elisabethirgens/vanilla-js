// Grab the elements and store them in constants
const cardButtons = document.querySelectorAll('.card button');
const modalOuter = document.querySelector('.modal-backdrop');
const modalInner = document.querySelector('.modal-inner');

// Function declaration for a named function with parameter
// This function creates the modals with content from data attributes
function handleCardButtonClick(e) {
    // e for event (but could be named whatever)
    const myButton = e.currentTarget; // property of Event interface
    const myCard = myButton.closest('.card'); // like querySelect but upward in the DOM
    const { pinyin } = myCard.dataset; // grabs the data-pinyin attribute
    const { character } = myCard.dataset; // grabs the data-character attribute

    // Change the content with Element.innerHTML that gets or sets HTML
    //   but remember security considerations and XSS
    modalInner.innerHTML = `
    <div class="character">${character}</div>
    <div class="pinyin">${pinyin}</div>
  `; // That was a template literal with ${expression} placeholders

    // Use the property Element.classList with method add()
    modalOuter.classList.add('activated');
}

// and then the method remove() to modify the same DOMTokenList collection
function closeModal() {
    modalOuter.classList.remove('activated');
}

// Here is the functionality to click outside the modal
// closeModal() is called only when a click is registered outside the closest modal
modalOuter.addEventListener('click', function (e) {
    const isOutside = !e.target.closest('.modal-inner'); // NOT an event in current open card
    if (isOutside) {
        // if statement will execute next statements if condition is truthy
        closeModal();
    }
});

// Also listen for the event.key Escape to call the closeModal function
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        // condition is truthy if key is strict equal to Escape
        closeModal();
    }
});

// This method will execute a function for each array element
//   and the array here is cardButtons holding all the buttons
cardButtons.forEach((button) =>
    button.addEventListener('click', handleCardButtonClick)
);
