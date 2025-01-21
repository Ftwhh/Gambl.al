// Function to handle tab switching
function showTab(tabName) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.classList.remove('active'));

  const activeTab = document.getElementById(tabName);
  if (activeTab) activeTab.classList.add('active');
}

// Blackjack Game
let blackjackDeck = [];
let blackjackPlayerHand = [];
let blackjackDealerHand = [];

// Initialize Blackjack
function startBlackjack() {
  blackjackDeck = createDeck();
  blackjackPlayerHand = [drawCard(), drawCard()];
  blackjackDealerHand = [drawCard(), drawCard()];
  showBlackjackGame();
}

function createDeck() {
  const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  const values = [
    "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "Jack", "Queen", "King", "Ace"
  ];
  let deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  return deck.sort(() => Math.random() - 0.5);
}

function drawCard() {
  return blackjackDeck.pop();
}

function calculateHandValue(hand) {
  let value = 0;
  let aces = 0;

  hand.forEach(card => {
    if (["Jack", "Queen", "King"].includes(card.value)) {
      value += 10;
    } else if (card.value === "Ace") {
      aces += 1;
      value += 11;
    } else {
      value += parseInt(card.value);
    }
  });

  while (value > 21 && aces > 0) {
    value -= 10;
    aces -= 1;
  }

  return value;
}

function showBlackjackGame() {
  const playerValue = calculateHandValue(blackjackPlayerHand);
  const dealerValue = calculateHandValue(blackjackDealerHand);

  alert(`
    Player Hand: ${blackjackPlayerHand.map(c => c.value).join(", ")} (Value: ${playerValue})
    Dealer Hand: ${blackjackDealerHand.map(c => c.value).join(", ")} (Value: ${dealerValue})
  `);

  if (playerValue > 21) {
    alert("You bust! Dealer wins.");
  } else if (dealerValue > 21) {
    alert("Dealer busts! You win.");
  } else if (playerValue === 21) {
    alert("Blackjack! You win.");
  }
}

// Slots Game
function spinSlots() {
  const symbols = ["🍒", "🍋", "🔔", "💎", "⭐"];
  const result = [
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
  ];

  alert(`Slot Result: ${result.join(" | ")}`);
  if (result[0] === result[1] && result[1] === result[2]) {
    alert("Jackpot! You win!");
  } else {
    alert("Try again!");
  }
}
