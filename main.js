// ================== Product Data ===================
const products = {
  sunglasses: [
    { id: 1, name: "Aviator Black", price: "₹999", img: "images/sun1.jpg" },
    { id: 2, name: "Classic Square", price: "₹1099", img: "images/sun2.jpg" },
    { id: 3, name: "Gold Frame Brown", price: "₹1499", img: "images/sun3.jpg" },
    { id: 4, name: "Jet Black Pro", price: "₹1299", img: "images/sun4.jpg" },
    { id: 5, name: "Silver Mirror", price: "₹1199", img: "images/sun5.jpg" },
    { id: 6, name: "Bold Square", price: "₹1399", img: "images/sun6.jpg" }
  ],
  powerframes: [
    { id: 7, name: "Flexi Frame", price: "₹799", img: "images/frame1.jpg" }
  ],
  contactlens: [
    { id: 8, name: "Blue Contact Lens", price: "₹499", img: "images/lens1.jpg" }
  ],
  accessories: [
    { id: 9, name: "Cleaning Spray", price: "₹199", img: "images/spray.jpg" }
  ]
};

// ================== Render Products ===================
function showProducts(category) {
  const container = document.getElementById('product-container');
  container.innerHTML = '';
  products[category].forEach(prod => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${prod.img}" alt="${prod.name}">
        <h3>${prod.name}</h3>
        <p>${prod.price}</p>
        <button onclick="addToCart(${prod.id}, '${category}')">Add to Cart</button>
      </div>
    `;
  });
}

// ================== Cart ===================
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id, category) {
  const product = products[category].find(p => p.id === id);
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} added to cart`);
}

function loadCart() {
  const container = document.getElementById('cart-container');
  const totalSpan = document.getElementById('total');
  container.innerHTML = '';
  let total = 0;

  cart.forEach((item, i) => {
    const price = parseInt(item.price.replace('₹',''));
    total += price;
    container.innerHTML += `
      <div>
        <img src="${item.img}" width="60" />
        ${item.name} - ${item.price}
        <button onclick="removeFromCart(${i})">Remove</button>
      </div>
    `;
  });

  totalSpan.innerText = `₹${total}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

// ================== Checkout ===================
function placeOrder() {
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const payment = document.getElementById("payment").value;

  if (!name || !address || !payment) {
    alert("Please fill in all details");
    return;
  }

  const order = {
    customer: name,
    address: address,
    payment: payment,
    items: cart,
    status: "Pending"
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.removeItem("cart");
  window.location.href = "product.html";
}

// ================== Admin View ===================
function loadOrders() {
  const container = document.getElementById("admin-orders");
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  container.innerHTML = '';

  orders.forEach((order, i) => {
    container.innerHTML += `
      <div class="order-card">
        <h3>Order #${i + 1}</h3>
        <p><strong>Customer:</strong> ${order.customer}</p>
        <p><strong>Address:</strong> ${order.address}</p>
        <p><strong>Payment:</strong> ${order.payment}</p>
        <p><strong>Status:</strong> ${order.status}</p>
        <ul>
          ${order.items.map(item => `<li>${item.name} - ${item.price}</li>`).join('')}
        </ul>
        <button onclick="updateStatus(${i})">Mark as Shipped</button>
      </div>
    `;
  });
}

function updateStatus(index) {
  const orders = JSON.parse(localStorage.getItem("orders"));
  orders[index].status = "Shipped";
  localStorage.setItem("orders", JSON.stringify(orders));
  loadOrders();
}

// ================== Search (Optional Extension) ===================
function searchProduct() {
  const query = document.getElementById("search").value.toLowerCase();
  const results = [];
  Object.keys(products).forEach(category => {
    products[category].forEach(prod => {
      if (prod.name.toLowerCase().includes(query)) {
        results.push({ ...prod, category });
      }
    });
  });

  const container = document.getElementById("product-container");
  container.innerHTML = '';
  results.forEach(prod => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${prod.img}" alt="${prod.name}">
        <h3>${prod.name}</h3>
        <p>${prod.price}</p>
        <button onclick="addToCart(${prod.id}, '${prod.category}')">Add to Cart</button>
      </div>
    `;
  });
}