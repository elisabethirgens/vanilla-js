// Grab some elements and store them in constants
const ipsum = document.querySelector(".cupcake-ipsum");
const theCupcake = document.querySelector(".peek-a-boo");

/*
Use the Intersection Observer API to configure a callback function
that will be called when a target intersects with a parent element.
The IntersectionObserver constructor has observe() and unobserve() methods,
and I can set optional options to customize root, rootMargin and threshold.
*/

// Declare a function to be used as the callback for the observer
function obsCallback(paragraphs) {
    // When should this function do it’s thing?
    // Check for when we’ve got a full intersection ratio
    if (paragraphs[0].intersectionRatio === 1) {
        theCupcake.classList.remove("hidden");
        myLookout.unobserve(ipsum.lastElementChild);
    }
}

// Store some options for the Intersection observer in a variable
const obsOptions = {
    root: ipsum, // Set a parent element to use as viewport
    // Define levels of visibility for when the callback should run
    threshold: 1,
};

// Create the intersection observer by calling its constructor
//   and passing it my callback function and my options
const myLookout = new IntersectionObserver(obsCallback, obsOptions);

// Target a specific element with the observe() method
myLookout.observe(ipsum.lastElementChild);
