const products = [
  { id: 1, name: "Stylish Frame", price: 799, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Blue Lens", price: 1199, image: "https://via.placeholder.com/150" },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];

function renderProducts() {
  const productSection = document.querySelector('.product-list');
  productSection.innerHTML = "";
  products.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" width="100%">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    productSection.appendChild(div);
  });
}

function addToCart(productId) {
  const item = products.find(p => p.id === productId);
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

function updateCart() {
  const list = document.getElementById('cart-items');
  list.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ₹${item.price}`;
    list.appendChild(li);
    total += item.price;
  });
  document.getElementById('total-amount').textContent = total;
}

function checkout() {
  if (cart.length === 0) return alert("Cart is empty");

  const paymentMethod = document.getElementById("payment-method").value;
  const orderId = "ORD" + Math.floor(Math.random() * 100000);
  const order = {
    id: orderId,
    items: [...cart],
    payment: paymentMethod,
    total: cart.reduce((a, b) => a + b.price, 0),
    status: "Pending",
    date: new Date().toLocaleString()
  };

  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));

  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
  renderOrders();

  alert(`Order Placed! ID: ${orderId}`);
}

function renderOrders() {
  const list = document.getElementById('order-list');
  list.innerHTML = "";

  if (orders.length === 0) {
    list.innerHTML = "<p>No orders yet.</p>";
    return;
  }

  orders.forEach(order => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>ID:</strong> ${order.id}<br/>
      <strong>Status:</strong> ${order.status}<br/>
      <strong>Payment:</strong> ${order.payment}<br/>
      <strong>Total:</strong> ₹${order.total}<br/>
      <strong>Placed On:</strong> ${order.date}<br/>
      <em>Items:</em> ${order.items.map(i => i.name).join(', ')}
    `;
    list.appendChild(li);
  });
}

renderProducts();
updateCart();
renderOrders();