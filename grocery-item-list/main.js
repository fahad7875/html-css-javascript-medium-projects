// selecting all necessary DOM element

// add items container

const addItemsAction = document.querySelector(".addItems-action");
const input = document.querySelector(".addItems-input");
const submit = document.querySelector(".addItems-submit");

// display items container

const list = document.querySelector(".grocery-list");
const displayItemsAction = document.querySelector(".displayItems-action");
const clear = document.querySelector(".displayItems-clear");

// all add event listeners here

// submit event listener

submit.addEventListener("click", (event) => {
  event.preventDefault();
  addItem();
});

// check for local storage

document.addEventListener("DOMContentLoaded", () => {
  // console.log("dom loded successfully");
  displayStorage();
});

// clear list event

clear.addEventListener("click", () => {
  removeAllItem();
});

// remove single item listener

list.addEventListener("click", (event) => {
  event.preventDefault();
  removeSingleItem(event);
});

// all functions here
// addItem function

const addItem = () => {
  let value = input.value;
  // input validity check
  if (value === "") {
    showAction(addItemsAction, "please add grocery item", false);
  } else {
    showAction(addItemsAction, `${value} added to the list`, true);
    createItem(value);
    updateStorage(value);
  }
};

// showAction function

const showAction = (element, text, value) => {
  if (value === true) {
    element.classList.add("success");
    element.innerText = text;
    input.value = "";

    setTimeout(() => {
      element.classList.remove("success");
    }, 3000);
  } else {
    element.classList.add("alert");
    element.innerText = text;
    input.value = "";

    setTimeout(() => {
      element.classList.remove("alert");
    }, 3000);
  }
};

// createItem function

const createItem = (value) => {
  //create dive element for showing list
  let parent = document.createElement("div");
  parent.classList.add("grocery-item");

  // puting element on grocery-item div
  parent.innerHTML = `<h4 class="grocery-item-title">${value}</h4>
  <a href="#" class="grocery-item-link">
    <img src="./icon-png/delete.png" alt="Delete" />
  </a>`;

  // let appent parent element with list
  list.appendChild(parent);
};

// updateStorage function

const updateStorage = (value) => {
  let groceryList;

  // local storage management
  groceryList = localStorage.getItem("groceryList")
    ? JSON.parse(localStorage.getItem("groceryList"))
    : [];

  // pushing grocery on groceryList array
  groceryList.push(value);
  localStorage.setItem("groceryList", JSON.stringify(groceryList));
};

// displayStorage function

const displayStorage = () => {
  let storageItems, exists;
  exists = localStorage.getItem("groceryList");

  if (exists) {
    storageItems = JSON.parse(localStorage.getItem("groceryList"));

    // array for each

    storageItems.forEach((element) => {
      console.log(element);
      createItem(element);
    });
  }
};

// removeAllItem function

const removeAllItem = () => {
  let con, items, len;

  // delete from local storage
  localStorage.removeItem("groceryList");

  items = document.querySelectorAll(".grocery-item");
  len = items.length;

  if (len > 0) {
    //  take confirmation from user
    con = confirm("Are Yuo Sure To Delete All Item parmanently ?");

    if (con) {
      // remove each item from the list

      showAction(displayItemsAction, "all items deleted", false);

      items.forEach((element) => {
        list.removeChild(element);
      });
    } else {
      showAction(displayItemsAction, "items are not deleted", false);
    }
  } else {
    showAction(displayItemsAction, "no more items to delete", false);
  }
};

// removeSingleItem function

const removeSingleItem = (event) => {
  let link, text, groceryItem, val;

  link = event.target.parentElement;
  val = link.classList.contains("grocery-item-link");

  if (val) {
    text = link.previousElementSibling.innerHTML;
    groceryItem = event.target.parentElement.parentElement;

    // remove from list
    list.removeChild(groceryItem);
    showAction(displayItemsAction, `${text} successfully removed from the list`, true);

    // remove from local storage
    editStorage(text);
  }
};

// editStorage function

const editStorage = (item) => {
  let groceryItems, index;

  groceryItems = JSON.parse(localStorage.getItem("groceryList"));
  index = groceryItems.indexOf(item);

  // first delete existing list
  groceryItems.splice(index, 1);

  // delete groceryList from localStorage
  localStorage.removeItem("groceryList");

  // adding new updated list
  localStorage.setItem("groceryList", JSON.stringify(groceryItems));
};

// happy coding ?
// this project is really good for a new developer to learn and practices
