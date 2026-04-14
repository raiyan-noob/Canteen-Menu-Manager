let cart = {};

let menuMap = {
  "pizza": {name: "MeatLoaf", price: 60},
  "burger": {name: "Burger", price: 50},
  "salad": {name: "Shingara", price: 10},
  "pasta": {name: "Pasta", price: 40},
  "sandwich": {name: "Sandwich", price: 40},
  "chicken": {name: "Noodles", price: 40},
  "biryani": {name: "Crunchy Roll", price: 60},
  "dal": {name: "Donut", price: 30}
};

function addItemToCart(key) {
  if (!cart[key]) {
    cart[key] = { ...menuMap[key], quantity: 0 };
  }
  cart[key].quantity += 1;
}

function removeItemFromCart(key) {
  if (!cart[key]) return;
  cart[key].quantity -= 1;
  if (cart[key].quantity <= 0) {
    delete cart[key];
  }
}

function updateDisplay() {
  let html = '';
  let total = 0;
  const itemKeys = Object.keys(cart);

  if (itemKeys.length === 0) {
    html = '<p class="empty-message">Menu is empty. Add an item to get started!</p>';
  } else {
    html = '<div class="menu-items">';
    itemKeys.forEach((key, index) => {
      const item = cart[key];
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      html += `
        <div class="menu-item">
          <div class="item-info">
            <span class="item-index">${index + 1}</span>
            <div>
              <div class="item-name">${item.name}</div>
              <div class="item-price">Tk.${item.price} each</div>
            </div>
          </div>
          <div class="item-actions">
            <div class="item-controls">
              <button class="qty-btn" data-action="decrease" data-key="${key}">−</button>
              <span class="qty-label">${item.quantity}×${item.price}</span>
              <button class="qty-btn" data-action="increase" data-key="${key}">+</button>
            </div>
            <div class="item-total">Tk.${itemTotal}</div>
          </div>
        </div>`;
    });
    html += '</div>';
  }

  document.getElementById('menuDisplay').innerHTML = html;
  document.getElementById('totalAmount').innerHTML = 'Total: Tk.' + total;
}

for (let key in menuMap) {
  let button = document.createElement('button');
  button.textContent = menuMap[key].name;
  button.className = 'btn btn-primary';
  button.onclick = function() {
    addItemToCart(key);
    updateDisplay();
  };
  document.getElementById('premenus').appendChild(button);
}

document.getElementById('menuDisplay').addEventListener('click', function(event) {
  const target = event.target;
  if (!target.matches('.qty-btn')) return;
  const action = target.dataset.action;
  const key = target.dataset.key;

  if (action === 'increase') {
    addItemToCart(key);
  } else if (action === 'decrease') {
    removeItemFromCart(key);
  }
  updateDisplay();
});

document.getElementById('clearBtn').onclick = function() {
  cart = {};
  updateDisplay();
};

updateDisplay();