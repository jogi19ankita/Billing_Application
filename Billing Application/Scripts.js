// scripts.js
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const inventorySection = document.getElementById('inventory');
const notificationsSection = document.getElementById('notifications');
const addItemForm = document.getElementById('addItemForm');
const inventoryTable = document.getElementById('inventoryTable');
const notificationList = document.getElementById('notificationList');
const registerLink = document.getElementById('registerLink');
const loginLink = document.getElementById('loginLink');

// Dummy data to simulate inventory items
let inventoryData = [
  { itemName: 'Item 1', quantity: 10 },
  { itemName: 'Item 2', quantity: 5 },
  { itemName: 'Item 3', quantity: 15 }
];

// Function to show inventory items
function showInventory() {
  inventoryTable.innerHTML = `
    <tr>
      <th>Item Name</th>
      <th>Quantity</th>
      <th>Actions</th>
    </tr>
  `;

  inventoryData.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.itemName}</td>
      <td>${item.quantity}</td>
      <td>
        <button onclick="updateItem(${index})">Update</button>
        <button onclick="deleteItem(${index})">Delete</button>
      </td>
    `;
    inventoryTable.appendChild(row);
  });
}

// Function to add a new item to inventory
function addItem(event) {
  event.preventDefault();
  const itemName = document.getElementById('itemName').value;
  const quantity = document.getElementById('quantity').value;
  inventoryData.push({ itemName, quantity });
  showInventory();
  addItemForm.reset();
  showNotification('Item added successfully', 'success');
}

// Function to update an existing item in inventory
function updateItem(index) {
  const newItemName = prompt('Enter new item name:');
  const newQuantity = prompt('Enter new quantity:');
  if (newItemName && newQuantity) {
    inventoryData[index].itemName = newItemName;
    inventoryData[index].quantity = newQuantity;
    showInventory();
    showNotification('Item updated successfully', 'success');
  }
}

// Function to delete an item from inventory
function deleteItem(index) {
  if (confirm('Are you sure you want to delete this item?')) {
    inventoryData.splice(index, 1);
    showInventory();
    showNotification('Item deleted successfully', 'success');
  }
}

// Function to show notifications
function showNotification(message, type) {
  const notification = document.createElement('li');
  notification.textContent = message;
  notification.classList.add(type);
  notificationList.appendChild(notification);
  setTimeout(() => {
    notificationList.removeChild(notification);
  }, 3000);
}

// Event listeners
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // Handle login logic here
  inventorySection.classList.remove('hidden');
  notificationsSection.classList.remove('hidden');
  loginForm.reset();
});

registerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // Handle registration logic here
  inventorySection.classList.remove('hidden');
  notificationsSection.classList.remove('hidden');
  registerForm.reset();
});

addItemForm.addEventListener('submit', addItem);

registerLink.addEventListener('click', () => {
  loginForm.classList.add('hidden');
  registerForm.classList.remove('hidden');
});

loginLink.addEventListener('click', () => {
  registerForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
});

// Show initial inventory
showInventory();
