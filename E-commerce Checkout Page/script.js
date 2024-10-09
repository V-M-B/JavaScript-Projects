// document.addEventListener("DOMContentLoaded", () => {
//   const products = [
//     { id: 1, name: "Product1", price: 29.99 },
//     { id: 2, name: "Product2", price: 59.99 },
//     { id: 3, name: "Product3", price: 19.99 },
//   ];

//   let carts = [];

//   const productList = document.getElementById("product-list");
//   const cartsItems = document.getElementById("cart-items");
//   const emptyCartMessage = document.getElementById("empty-cart");
//   const totalPriceDisplay = document.getElementById("total-price");
//   const checkOutBtn = document.getElementById("checkout-btn");
//   const cartTotalMessage = document.getElementById("cart-total");

//   // Render products dynamically
//   products.map((product) => {
//     const productDiv = document.createElement("div");
//     productDiv.classList.add("product");

//     productDiv.innerHTML = `
//           <span>${product.name} - $${product.price.toFixed(2)}</span>
//           <button data-id="${product.id}">Add to Cart</button>
//       `;
//     productList.appendChild(productDiv);
//   });

//   // Add to Cart event listener
//   productList.addEventListener("click", (e) => {
//     if (e.target.tagName === "BUTTON") {
//       const productId = parseInt(e.target.getAttribute("data-id"));
//       const product = products.find((p) => p.id === productId);
//       if (product) {
//         addTocart(product);
//       }
//     }
//   });

//   function addTocart(product) {
//     carts.push(product);
//     localStorage.setItem("carts", JSON.stringify(carts));
//     renderCart();
//   }

//   // Render cart items and calculate the total price
//   function renderCart() {
//     cartsItems.innerHTML = ""; // Clear cart item message that cart is empty
//     let totalPrice = 0;

//     if (carts.length) {
//       emptyCartMessage.classList.add("hidden");
//       cartTotalMessage.classList.remove("hidden");

//       carts.forEach((item) => {
//         totalPrice += item.price;

//         //product in cart item is showed here
//         const cartItemDiv = document.createElement("div");
//         cartItemDiv.innerHTML = `
//               ${item.name} - $${item.price.toFixed(2)}
//           `;
//         cartsItems.appendChild(cartItemDiv); // Append each item
//         console.log(typeof cartsItems);

//         //add a remove button
//         const removeBtn = document.createElement("BUTTON");
//         removeBtn.innerHTML = "Remove";
//         removeBtn.id = "productremovebtn"; //CSS
//         removeBtn.setAttribute("data-id", item.id); // Add the product ID

//         removeBtn.addEventListener("click", (e) => {
//           const productId = parseInt(e.target.getAttribute("data-id")); // Get the product ID
//           console.log(`Removing product with ID: ${productId}`);

//           // Now you can use this ID to remove the product from the cart array
//           const index = carts.findIndex((item) => item.id === productId);
//           console.log(index);

//           if (index > -1) {
//             carts.splice(index, 1); // Remove the product from the array
//           }

//           renderCart();

      
//         });
//         cartsItems.appendChild(removeBtn);
//       });

//       totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`; // Update total price
//     } else {
//       emptyCartMessage.classList.remove("hidden");
//       cartTotalMessage.classList.add("hidden");
//     }
//   }

//   // Checkout button functionality
//   checkOutBtn.addEventListener("click", () => {
//     carts.length = 0; // Empty the cart

//     alert("Checkout successfully completed!");

//     renderCart();
//   });
// });









document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product1", price: 29.99 },
    { id: 2, name: "Product2", price: 59.99 },
    { id: 3, name: "Product3", price: 19.99 },
  ];

  let carts =  [];

  const productList = document.getElementById("product-list");
  const cartsItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");
  const cartTotalMessage = document.getElementById("cart-total");

  // Load cart from localStorage if it exists
  loadCartFromLocalStorage();

  // Render products dynamically
  products.map((product) => {
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
    saveCartToLocalStorage(); // Save cart to localStorage after adding
    renderCart();
  }

  // Render cart items and calculate the total price
  function renderCart() {
    cartsItems.innerHTML = ""; // Clear cart item message that cart is empty
    let totalPrice = 0;

    if (carts.length) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");

      carts.map((item) => {
        totalPrice += item.price;

        // product in cart item is shown here
        const cartItemDiv = document.createElement("div");
        cartItemDiv.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)}
        `;
        cartsItems.appendChild(cartItemDiv); // Append each item

        // add a remove button
        const removeBtn = document.createElement("BUTTON");
        removeBtn.innerHTML = 'Remove';
        removeBtn.id = 'productremovebtn'; // CSS
        removeBtn.setAttribute('data-id', item.id); // Add the product ID 

        removeBtn.addEventListener('click', (e) => {
          const productId = parseInt(e.target.getAttribute('data-id')); // Get the product ID
          console.log(`Removing product with ID: ${productId}`);

          // Now you can use this ID to remove the product from the cart array
          const index = carts.findIndex((item) => item.id === productId);
          console.log(index);

          if (index > -1) {
            carts.splice(index, 1);  // Remove the product from the array
          }

          saveCartToLocalStorage(); // Save updated cart to localStorage
          renderCart();
        });

        cartsItems.appendChild(removeBtn);
      });

      totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`; // Update total price
    } else {
      emptyCartMessage.classList.remove("hidden");
      cartTotalMessage.classList.add("hidden");
    }
  }

  // Save the cart array to localStorage
  function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(carts)); // Store as a JSON string
  }

  // Load the cart from localStorage
  function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      carts = JSON.parse(storedCart); // Convert back to an array from JSON string
    }
    renderCart(); // Render the cart after loading from localStorage
  }

  // Checkout button functionality
  checkOutBtn.addEventListener("click", () => {
    carts.length = 0; // Empty the cart
    localStorage.removeItem('cart'); // Clear cart from localStorage
    alert("Checkout successfully completed!");
    renderCart();
  });
});





