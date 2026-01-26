fetch("https://dummyjson.com/products")
    .then(res => res.json())
    .then(data => {
        const products = data.products;
        const row = document.getElementById("productRow");

        products.forEach(product => {
            row.innerHTML += `
        <div class="col">
          <div class="card h-100">
            <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">${product.description}</p>
              <p class="fw-bold">$${product.price}</p>
              <button 
  class="btn w-100"
  onclick="Swal.fire({
    title: 'Added to cart successfully!',
    icon: 'success'
  })">
  Add to Cart 🛒
</button>

            </div>
          </div>
        </div>
      `;
        });
    })
    .catch(err => console.error(err));
