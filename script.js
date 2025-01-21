// script.js

// Function to handle tab switching
function showTab(tabName) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.classList.remove('active'));

  const activeTab = document.getElementById(tabName);
  if (activeTab) activeTab.classList.add('active');
}

// Function to start Blackjack
function startBlackjack() {
  alert("Starting Blackjack...");
  // Add actual Blackjack logic here
}

// Function to spin slots
function spinSlots() {
  alert("Spinning Slots...");
  // Add actual Slots logic here
}

// Additional animations or interactive features can go here
