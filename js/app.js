// app.js

// Create local variables to work with it in this file.
const { products, categories } = window;

// Function to format price in dollars and cents
function formatPrice(priceInCents) {
  return `$${(priceInCents / 100).toFixed(2)}`;
}

// Function to create a product card
function createProductCard(product) {
  // Create a <div> to hold the card
  const card = document.createElement("div");
  card.classList.add("card");

  // Create a product image, use the .card-image class
  const productImage = document.createElement("img");
  productImage.src = product.imageUrl;
  productImage.alt = product.title; // Add alt text for accessibility
  productImage.classList.add("card-image");
  card.appendChild(productImage);

  // Create and append the product name
  const productName = document.createElement("h3");
  productName.textContent = product.title;
  productName.classList.add("card-title");
  card.appendChild(productName);

  // Create and append the product description
  const productDescription = document.createElement("p");
  productDescription.textContent = product.description;
  productDescription.classList.add("card-description");
  card.appendChild(productDescription);

  // Create and append the product price
  const productPrice = document.createElement("span");
  productPrice.textContent = formatPrice(product.price);
  productPrice.classList.add("card-price");
  card.appendChild(productPrice);

  // Return the card's <div> element to the caller
  return card;
}

// Function to display products for the given category
function showProducts(category) {
  // Update the selected category name
  const selectedCategoryElement = document.querySelector("#selected-category");
  selectedCategoryElement.textContent = category.name;

  // Clear the current product cards
  const productsContainer = document.querySelector("#products-container");
  productsContainer.innerHTML = "";

  // Filter products for the selected category and that are not discontinued
  const filteredProducts = products.filter(
    (product) =>
      product.categories.includes(category.id) && !product.discontinued
  );

  // Create and append product cards to the container
  filteredProducts.forEach((product) => {
    const productCard = createProductCard(product);
    productsContainer.appendChild(productCard);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Create buttons for each category and add them to the menu
  const menu = document.querySelector("#menu");
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category.name;
    button.addEventListener("click", function () {
      showProducts(category);
    });
    menu.appendChild(button);
  });

  // Default display for the first category
  showProducts(categories[0]);
});

// For debugging, display all of our data in the console
console.log({ products, categories }, "Store Data");
