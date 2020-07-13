// Collect NodeLists of elements that match roles and store in variables
const tabButtons = document.querySelectorAll('[role="tab"]');
const tabPanels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

// Array.from() is a method that lets me create an array instance from
  // either array-like objects (like that NodeList) or iterable objects.
  // Here it will let me use the find() method on tabPanels later on.

// Declare a function for the eventlistener
function handleTabClick(event) {
    // Use forEach() method to execute a function for each element
    tabPanels.forEach(panel => {
        panel.hidden = true;
    });
    // Hide all panels! Set all buttons to aria-selected="false"!
    tabButtons.forEach(tab => {
        tab.setAttribute('aria-selected', false);
    });
    // and then flip it for the element to which the event handler is attatched
    event.currentTarget.setAttribute('aria-selected', true);

    // Destructuring of `const id = event.currentTarget.id;`
    // will make a variable named id (and could do others in the same line!)
    const { id } = event.currentTarget;

    // Use the find() method to return the first element in the tabPanels array
    // that satisfies the provided testing function ("does the id match?")
    const showTabPanel = tabPanels.find(
        panel => panel.getAttribute('aria-labelledby') === id
    );
    showTabPanel.hidden = false;
}

// Execute a function (listen for a click event and run handleTabClick)
// for each element in the NodeList that is tabButtons
tabButtons.forEach(button => button.addEventListener('click', handleTabClick));
