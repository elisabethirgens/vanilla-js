const shoppingInput = document.querySelector(".shopping-input");
const list = document.querySelector(".shopping-list");

let itemsArray = [];

function handleSubmit(event) {
    event.preventDefault();
    const name = event.currentTarget.item.value;
    if (!name) return;
    const item = {
        name: name,
        id: Date.now(),
        complete: false,
    };
    itemsArray.push(item);
    event.target.reset();
    list.dispatchEvent(new CustomEvent("itemsUpdated"));
}

function displayItems() {
    const html = itemsArray
        .map(
            (item) => `
            <li class="list-item">
                <label>
                    <input class="list-complete" value="${
                        item.id
                    }" type="checkbox"
                        ${item.complete ? "checked" : ""}
                    >
                    <span>${item.name}</span>
                </label>
                <button class="list-remove" value="${item.id}"
                    aria-label="Remove ${item.name}">&times;</button>
            </li>`
        )
        .join("");
    list.innerHTML = html;
}

function saveToLocalStorage() {
    localStorage.setItem("itemsArray", JSON.stringify(itemsArray));
}

function grabFromLocalStorage() {
    const newItemsArray = JSON.parse(localStorage.getItem("itemsArray"));
    if (newItemsArray.length) {
        itemsArray.push(...newItemsArray);
        list.dispatchEvent(new CustomEvent("itemsUpdated"));
    }
}

function deleteItem(id) {
    itemsArray = itemsArray.filter((item) => item.id !== id);
    list.dispatchEvent(new CustomEvent("itemsUpdated"));
}

function markAsComplete(id) {
    const itemRef = itemsArray.find((item) => item.id === id);
    itemRef.complete = !itemRef.complete;
    list.dispatchEvent(new CustomEvent("itemsUpdated"));
}

shoppingInput.addEventListener("submit", handleSubmit);
list.addEventListener("itemsUpdated", displayItems);
list.addEventListener("itemsUpdated", saveToLocalStorage);
list.addEventListener("click", function (e) {
    const id = parseInt(e.target.value);
    if (e.target.matches("button")) {
        deleteItem(id);
    }
    if (e.target.matches('input[type="checkbox"]')) {
        markAsComplete(id);
    }
});

grabFromLocalStorage();
