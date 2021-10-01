const categoryList = document.querySelector("#category");
const productsList = document.querySelector("#products");
const addcategory = document.querySelector(".addcategory");
const addproduct = document.querySelector(".addproduct");

// variables
let products = ["rice-1", "rice-2", "rice-3", "shampoo-1", "shampoo-2", "shampoo-3", "soap-1", "soap-2", "soap-3", "spaghetti-1", "spaghetti-2", "spaghetti3"];

let categories = ["", "rice", "spaghetti", "shampoo", "soap"];

let selectProduct = [];




// DOM 

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("categories")) {
        categories = JSON.parse(localStorage.getItem("categories"));
        products = JSON.parse(localStorage.getItem("products"));
    } else {
        saveTolocal(products, categories);
    }
    categories.forEach(item => appendChilds(item, categoryList));
})

// events 
categoryList.addEventListener('click', (e) => {
    const categoryValues = e.target.value;
    // const product = JSON.parse(localStorage.getItem("products"));
    const listFilter = products.filter(p => p.toLowerCase().includes(categoryValues));
    selectProduct = [...listFilter];
    productsList.innerHTML = '';
    selectProduct.forEach(item => {
        appendChilds(item, productsList);
    });
});

addcategory.addEventListener('click', () => {
    let newCategory = document.querySelector('#add-category').value;
    if (newCategory.trim() !== "")
        if (!categories.includes(newCategory)) {
            categories.push(newCategory);
            appendChilds(newCategory, categoryList);
        }
    newCategory = "";
    productSave("categories", categories);
});

addproduct.addEventListener('click', () => {
    let newproduct = document.querySelector('#add-product').value;
    if (newproduct.trim() !== "")
        if (!products.includes(newproduct))
            products.push(newproduct);
    productSave("products", products);
});



// functions

function appendChilds(_item, parentTag) {
    const optionTag = document.createElement("option");
    optionTag.value = _item;
    optionTag.innerHTML = _item;
    parentTag.appendChild(optionTag);
}

// local storage
function productSave(localName, dataUpdate) {
    localStorage.setItem(localName, JSON.stringify(dataUpdate));
}

function saveTolocal(products, categories) {
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("categories", JSON.stringify(categories));
}