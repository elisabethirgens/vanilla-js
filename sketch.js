// Grab the elements and store them in constants
const myCanvas = document.querySelector('#sketch');
const clearButton = document.querySelector('#clear');

// Use a method for HTMLCanvasElement to return a drawing context
const ctx = myCanvas.getContext('2d');

// Declare a constant with number of pixels for each key stroke
// (some naming conventions will UPPERCASE a const with a value)
const MOVE_AMOUNT = 10;

// Use properties for the CanvasRenderingContext2D interface
ctx.lineJoin = 'square';
ctx.lineCap = 'square';
ctx.lineWidth = 40;

// Initialize a variable that will change (so not a constant!)
let colourHue = 310;
// This is a template literal with ${expression} placeholder
ctx.strokeStyle = `hsl(${colourHue}, 100%, 40%)`;

// We need to store the w/h and could do this:
//   const width = myCanvas.width;
//   const height = myCanvas.height;
// but we can also deconstruct when const naming comes from
//   the properties of the canvas element itself:
//   HTMLCanvasElement.width and HTMLCanvasElement.height
const { width, height } = myCanvas;

// Use standard built-in object Math
// with it’s methods random() and floor()
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

// Use methods from the CanvasRenderingContext2D interface
//   which btw is part of the Canvas API
ctx.beginPath();
ctx.moveTo(x, y); // Use the random starting point
ctx.lineTo(x, y);
ctx.stroke();

// Declare a function named draw and give it a parameter
function draw({ key }) {
    colourHue += 1;
    ctx.strokeStyle = `hsl(${colourHue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    // Use a switch statement to match the expression value (key)
    switch (key) {
        case 'ArrowUp': // to a case clause
            y -= MOVE_AMOUNT;
            break;
        case 'ArrowRight':
            x += MOVE_AMOUNT;
            break;
        case 'ArrowDown':
            y += MOVE_AMOUNT; // increment (addition assignment operator)
            break;
        case 'ArrowLeft':
            x -= MOVE_AMOUNT; // decrement (subtraction assignment operator)
            break;
        // switch should have a default
        default:
            break;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
}

// Declare a function to handle keys
function handleKey(e) {
    // e for event (but could be named whatever)
    if (e.key.includes('Arrow')) {
        // array method to return a boolean
        e.preventDefault(); // tell user agent to not scroll with arrow keys
        draw({ key: e.key }); // call the draw function and pass object as an argument
    }
}
// includes() will return true for ArrowUp, ArrowRight, ArrowDown, ArrowLeft
// find other event keycodes on https://keycode.info/

// Declare a function to clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, width, height);
}

// The method addEventListener() will set up a function that is called when the target
//   receives a specific event (keyboard, mouse + a whole bunch more categories)
// SYNTAX: target.addEventListener(type, listener [, options]);
window.addEventListener('keydown', handleKey);
clearButton.addEventListener('click', clearCanvas);

// Those targets were the global Window or the element stored in clearButton,
//   and the listeners are the objects that will receive notifications.
