let allProducts = [];
let currentCategory = "all";

fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data.products;
    loadCategories();
    showProducts(allProducts);
  })
  .catch(err => console.error(err));


function loadCategories() {
  let categorySelect = document.getElementById("categorySelect");
  let categoryHTML = '<option value="all">All Categories</option>';

  let seenCategories = {};

  for (let i in allProducts) {
    let cat = allProducts[i].category;

    if (!seenCategories[cat]) {
      categoryHTML += `<option value="${cat}">${cat}</option>`;
      seenCategories[cat] = true;
    }
  }

  categorySelect.innerHTML = categoryHTML;
  loadBrands();
}

function loadBrands() {
  let brandSelect = document.getElementById("brandSelect");
  let brandHTML = '<option value="all">All Brands</option>';

  let seenBrands = {};

  for (let i in allProducts) {
    let product = allProducts[i];

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


function categoryChanged() {
  let categorySelect = document.getElementById("categorySelect");
  currentCategory = categorySelect.value;
  loadBrands();
  filterProducts();
}


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


function viewAllProducts() {
  currentCategory = "all";
  document.getElementById("categorySelect").value = "all";
  loadBrands();
  showProducts(allProducts);
}
