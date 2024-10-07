document.addEventListener("DOMContentLoaded", () => {
    const products = [
      { id: 1, name: "Product1", price: 29.99 },
      { id: 2, name: "Product2", price: 59.99 },
      { id: 3, name: "Product3", price: 19.99 },
    ];
  
    const carts = [];
    const productList = document.getElementById("product-list");
    const cartsItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkOutBtn = document.getElementById("checkout-btn");
    const cartTotalMessage = document.getElementById("cart-total");
  
    // Render products dynamically
    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
  
      productDiv.innerHTML = `
          <span>${product.name} - $${product.price.toFixed(2)}</span>
          <button data-id="${product.id}">Add to Cart</button>
      `;
      productList.appendChild(productDiv);
    });
  
    // Add to Cart event listener
    productList.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        const productId = parseInt(e.target.getAttribute("data-id"));
        const product = products.find((p) => p.id === productId);
        if (product) {
          addTocart(product);
        }
      }
    });
  
    function addTocart(product) {
      carts.push(product);
      renderCart();
    }
  
    // Render cart items and calculate the total price
    function renderCart() {
      cartsItems.innerHTML = ""; // Clear cart items
      let totalPrice = 0;
  
      if (carts.length) {
        emptyCartMessage.classList.add("hidden");
        cartTotalMessage.classList.remove("hidden");
  
        carts.forEach((item) => {
          totalPrice += item.price;
  
          const cartItemDiv = document.createElement("div");
          cartItemDiv.innerHTML = `
              ${item.name} - $${item.price.toFixed(2)}
          `;
          cartsItems.appendChild(cartItemDiv); // Append each item
        });
  
        totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`; // Update total price
      } else {
        emptyCartMessage.classList.remove("hidden");
        cartTotalMessage.classList.add("hidden");
      }
    }
  
    // Checkout button functionality
    checkOutBtn.addEventListener("click", () => {
      carts.length = 0; // Empty the cart
      alert("Checkout successfully completed!");
      renderCart();
    });
  });
  