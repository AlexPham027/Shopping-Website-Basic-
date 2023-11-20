// Create local variables to work with it in this file.
const { products, categories } = window;

document.addEventListener("DOMContentLoaded", function () {
  // Create buttons for each category and add them to the menu
  const menu = document.querySelector("#menu");
  window.categories.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category.name;
    button.addEventListener("click", function () {
      showProducts(category);
    });
    menu.appendChild(button);
  });

  // Default display for the first category
  showProducts(window.categories[0]);

  // Remove clicked-row class from all rows
  function clearClickedState() {
    document.querySelectorAll(".clicked-row").forEach((row) => {
      row.classList.remove("clicked-row");
    });
  }

  // Function to display products for the given category
  function showProducts(category) {
    // Update the selected category name
    document.querySelector("#selected-category").textContent = category.name;

    // Clear the current product rows
    const tbody = document.querySelector("#category-products");
    tbody.innerHTML = "";

    // Filter products for the selected category and that are not discontinued
    const filteredProducts = window.products.filter(
      (product) =>
        product.categories.includes(category.id) && !product.discontinued
    );

    // Create and append product rows to the table body
    filteredProducts.forEach((product) => {
      const tr = document.createElement("tr");
      tr.addEventListener("click", () => {
        clearClickedState(); // Clear before setting the new clicked state
        tr.classList.add("clicked-row");
        console.log(product);
      });

      // Create and append the item, description, and price cells
      const itemTd = document.createElement("td");
      const descriptionTd = document.createElement("td");
      const priceTd = document.createElement("td");

      itemTd.textContent = product.title;
      descriptionTd.textContent = product.description;
      priceTd.textContent = formatPrice(product.price);

      // Add the class for styling
      itemTd.classList.add("product-cell");
      descriptionTd.classList.add("product-cell");
      priceTd.classList.add("product-cell");

      tr.appendChild(itemTd);
      tr.appendChild(descriptionTd);
      tr.appendChild(priceTd);

      tbody.appendChild(tr);
    });
  }

  // Function to format the price in dollars and cents
  function formatPrice(cents) {
    return (cents / 100).toLocaleString("en-CA", {
      style: "currency",
      currency: "CAD",
    });
  }
});

// For debugging, display all of our data in the console
console.log({ products, categories }, "Store Data");
