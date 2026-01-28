let allProducts = [];
let currentCategory = "all"; // track selected category

// Fetch products
fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data.products;
    loadCategories();
    showProducts(allProducts);
  })
  .catch(err => console.error(err));

// Populate category dropdown
function loadCategories() {
  let categorySelect = document.getElementById("categorySelect");
  let categoryHTML = '<option value="all">All Categories</option>';

  let seenCategories = {}; // temporary object to track added categories

  for (let i in allProducts) {
    let cat = allProducts[i].category;

    if (!seenCategories[cat]) { // only add if not already added
      categoryHTML += `<option value="${cat}">${cat}</option>`;
      seenCategories[cat] = true;
    }
  }

  categorySelect.innerHTML = categoryHTML;
  loadBrands(); // initially load all brands
}

// Load brands dynamically based on selected category
function loadBrands() {
  let brandSelect = document.getElementById("brandSelect");
  let brandHTML = '<option value="all">All Brands</option>';

  let seenBrands = {}; // temporary object to track added brands

  for (let i in allProducts) {
    let product = allProducts[i];

    // Only include brands in selected category (or all if category = all)
    if (currentCategory === "all" || product.category === currentCategory) {
      let brand = product.brand;
      if (!seenBrands[brand]) {
        brandHTML += `<option value="${brand}">${brand}</option>`;
        seenBrands[brand] = true;
      }
    }
  }

  brandSelect.innerHTML = brandHTML;
}

// Display products
function showProducts(products) {
  let row = document.getElementById("productRow");
  row.innerHTML = "";

  for (let i in products) {
    let product = products[i];
    row.innerHTML += `
      <div class="col">
        <div class="card h-100">
          <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <p class="fw-bold">$${product.price}</p>
            <button class="btn w-100"
              onclick="Swal.fire({title: 'Added to cart successfully!', icon: 'success'})">
              Add to Cart 🛒
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

// When category changes
function categoryChanged() {
  let categorySelect = document.getElementById("categorySelect");
  currentCategory = categorySelect.value;
  loadBrands();  // Update brands based on selected category
  filterProducts(); // Show filtered products
}

// Filter products by category + brand
function filterProducts() {
  let brandSelect = document.getElementById("brandSelect");
  let selectedBrand = brandSelect.value;

  let filteredHTML = "";

  for (let i in allProducts) {
    let product = allProducts[i];

    let categoryMatch = (currentCategory === "all" || product.category === currentCategory);
    let brandMatch = (selectedBrand === "all" || product.brand === selectedBrand);

    if (categoryMatch && brandMatch) {
      filteredHTML += `
        <div class="col">
          <div class="card h-100">
            <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">${product.description}</p>
              <p class="fw-bold">$${product.price}</p>
              <button class="btn w-100"
                onclick="Swal.fire({title: 'Added to cart successfully!', icon: 'success'})">
                Add to Cart 🛒
              </button>
            </div>
          </div>
        </div>
      `;
    }
  }

  document.getElementById("productRow").innerHTML = filteredHTML;
}

// View all products button
function viewAllProducts() {
  currentCategory = "all";
  document.getElementById("categorySelect").value = "all";
  loadBrands(); // reset brands dropdown
  showProducts(allProducts);
}
