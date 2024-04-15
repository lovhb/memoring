// Retrieve cart items from localStorage or initialize an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Display cart on load
window.onload = function () {
  displayCart();
};

// Function to display cart items
function displayCart() {
  const cartItemsContainer = document.querySelector('.cart-items');
  cartItemsContainer.innerHTML = '';
  let totalAmount = 0;

  cart.forEach((item, index) => {
    const itemElement = document.createElement('div');
    const imgElement = document.createElement('img');
    imgElement.src = `../store/bilder/${item.color.toLowerCase()}.png`;

    // Append the img element to the item element before setting its innerHTML
    itemElement.appendChild(imgElement);

    itemElement.innerHTML += `
        <p>${item.color} ${item.version} - $${item.price}</p>
        <button onclick="removeItem('${item.id}')">Remove</button>
    `;

    cartItemsContainer.appendChild(itemElement);
    totalAmount += item.price;
  });

  // Convert the cart array to a JSON string
  const cartJson = JSON.stringify(cart);

  // Create a hidden input element for the cart data
  const cartInput = document.createElement('input');
  cartInput.type = 'hidden';
  cartInput.name = 'cart';
  cartInput.value = cartJson;

  // Create a hidden input element for the total cost
  const totalInput = document.createElement('input');
  totalInput.type = 'hidden';
  totalInput.name = 'total';
  totalInput.value = totalAmount;

  // Append the hidden input elements to the form
  const form = document.querySelector('form');
  form.appendChild(cartInput);
  form.appendChild(totalInput);

  document.getElementById('total-amount').textContent = totalAmount;
}

// Function to remove an item from the cart based on id
function removeItem(id) {
  cart = cart.filter(item => item.id !== id.toString());
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}