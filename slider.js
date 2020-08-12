function Slider(slider) {
    // Check if an HTML element is passed into the function
    if (!(slider instanceof Element)) {
        throw new Error("Nope, no slider here!");
    }

    // Declare empty block-scoped local variables inside this closure
    let prev;
    let current;
    let next;

    const slides = slider.querySelector(".slideshow");
    const prevButton = slider.querySelector(".flipPrev");
    const nextButton = slider.querySelector(".flipNext");

    function startSlider() {
        // Update value of the already declared variables to their elements
        current = slider.querySelector(".current") || slides.firstElementChild;
        prev = current.previousElementSibling || slides.lastElementChild;
        next = current.nextElementSibling || slides.firstElementChild;
    }

    function applyClasses() {
        current.classList.add("current");
        prev.classList.add("prev");
        next.classList.add("next");
    }

    // Declare function with the parameter it needs
    function move(direction) {
        const classesToRemove = ["prev", "current", "next"];
        // Spread that array into these remove() methods
        prev.classList.remove(...classesToRemove);
        current.classList.remove(...classesToRemove);
        next.classList.remove(...classesToRemove);
        // The function call within button listeners can have a direction
        if (direction === "back") {
            // Use destructuring to reassign variables
            [prev, current, next] = [
                prev.previousElementSibling || slides.lastElementChild,
                prev,
                current,
            ];
        } else {
            [prev, current, next] = [
                current, // Reassign current to prev
                next, // Reassign next to current
                // Reassign next to next OR if last slide use first 😅
                next.nextElementSibling || slides.firstElementChild,
            ];
        }
        // Re-run the function to shift classes after the move function
        applyClasses();
    }

    // Call these functions inside the closure 🎉
    startSlider();
    applyClasses();

    // Use arrow function and pass argument for direction back
    prevButton.addEventListener("click", () => move("back"));
    nextButton.addEventListener("click", move);
}

// Call function and pass it the ID from slider HTML
Slider(document.querySelector("#show-food"));
Slider(document.querySelector("#show-drinks"));
