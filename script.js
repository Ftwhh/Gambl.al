// Shared Variables
let balance = 0; // Player starts with 0 ALSilver
let pendingRequests = [];

// Update Balance on All Pages
function updateBalanceDisplay() {
  const balanceElements = document.querySelectorAll("#balance, #slots-balance");
  balanceElements.forEach((el) => (el.textContent = balance));
}

// Blackjack Logic
if (document.getElementById("blackjack")) {
  const startBtn = document.getElementById("start-blackjack");
  const hitBtn = document.getElementById("hit");
  const standBtn = document.getElementById("stand");
  const playerCardsDiv = document.getElementById("player-cards");
  const dealerCardsDiv = document.getElementById("dealer-cards");
  const playerScoreSpan = document.getElementById("player-score");
  const dealerScoreSpan = document.getElementById("dealer-score");
  const resultMessage = document.getElementById("result-message");

  let playerCards = [];
  let dealerCards = [];
  let playerScore = 0;
  let dealerScore = 0;

  function dealCard() {
    const cardValue = Math.floor(Math.random() * 10) + 1; // Random card between 1 and 10
    const cardDiv = document.createElement("div");
    cardDiv.textContent = cardValue;
    cardDiv.className = "card";
    return { value: cardValue, cardDiv };
  }

  function calculateScore(cards) {
    return cards.reduce((sum, card) => sum + card.value, 0);
  }

  function resetGame() {
    playerCards = [];
    dealerCards = [];
    playerScore = 0;
    dealerScore = 0;
    playerCardsDiv.innerHTML = "";
    dealerCardsDiv.innerHTML = "";
    playerScoreSpan.textContent = "";
    dealerScoreSpan.textContent = "";
    resultMessage.textContent = "";
  }

  startBtn.addEventListener("click", () => {
    const betAmount = parseInt(document.getElementById("bet-amount").value, 10);
    if (betAmount < 2000 || betAmount > 500000 || isNaN(betAmount)) {
      alert("Bet amount must be between 2000 and 500000 ALSilver.");
      return;
    }
    if (balance < betAmount) {
      alert("You don't have enough ALSilver to place this bet.");
      return;
    }

    balance -= betAmount;
    updateBalanceDisplay();
    resetGame();

    // Deal initial cards
    for (let i = 0; i < 2; i++) {
      const playerCard = dealCard();
      const dealerCard = dealCard();
      playerCards.push(playerCard);
      dealerCards.push(dealerCard);
      playerCardsDiv.appendChild(playerCard.cardDiv);
      dealerCardsDiv.appendChild(dealerCard.cardDiv);
    }

    playerScore = calculateScore(playerCards);
    dealerScore = calculateScore(dealerCards);

    playerScoreSpan.textContent = playerScore;
    dealerScoreSpan.textContent = dealerScore;

    document.getElementById("game-area").style.display = "block";

    if (playerScore === 21) {
      resultMessage.textContent = "Blackjack! You win!";
      balance += betAmount * 2.5;
      updateBalanceDisplay();
    }
  });

  hitBtn.addEventListener("click", () => {
    const playerCard = dealCard();
    playerCards.push(playerCard);
    playerCardsDiv.appendChild(playerCard.cardDiv);
    playerScore = calculateScore(playerCards);
    playerScoreSpan.textContent = playerScore;

    if (playerScore > 21) {
      resultMessage.textContent = "Bust! You lose.";
      document.getElementById("game-area").style.display = "none";
    }
  });

  standBtn.addEventListener("click", () => {
    while (dealerScore < 17) {
      const dealerCard = dealCard();
      dealerCards.push(dealerCard);
      dealerCardsDiv.appendChild(dealerCard.cardDiv);
      dealerScore = calculateScore(dealerCards);
      dealerScoreSpan.textContent = dealerScore;
    }

    if (dealerScore > 21 || playerScore > dealerScore) {
      resultMessage.textContent = "You win!";
      balance += parseInt(document.getElementById("bet-amount").value, 10) * 2;
    } else if (playerScore < dealerScore) {
      resultMessage.textContent = "You lose.";
    } else {
      resultMessage.textContent = "It's a tie.";
      balance += parseInt(document.getElementById("bet-amount").value, 10);
    }
    updateBalanceDisplay();
    document.getElementById("game-area").style.display = "none";
  });
}

// Slots Logic
if (document.getElementById("slots")) {
  const spinBtn = document.getElementById("spin-slots");
  const slot1 = document.getElementById("slot1");
  const slot2 = document.getElementById("slot2");
  const slot3 = document.getElementById("slot3");
  const slotResultMessage = document.getElementById("slot-result-message");

  const symbols = ["🍒", "🍋", "🍇", "🍉", "⭐", "7"];

  spinBtn.addEventListener("click", () => {
    const betAmount = parseInt(document.getElementById("slot-bet-amount").value, 10);
    if (betAmount < 2000 || betAmount > 500000 || isNaN(betAmount)) {
      alert("Bet amount must be between 2000 and 500000 ALSilver.");
      return;
    }
    if (balance < betAmount) {
      alert("You don't have enough ALSilver to place this bet.");
      return;
    }

    balance -= betAmount;
    updateBalanceDisplay();

    // Spin the slots
    const results = [
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
    ];

    slot1.textContent = results[0];
    slot2.textContent = results[1];
    slot3.textContent = results[2];

    if (results[0] === results[1] && results[1] === results[2]) {
      slotResultMessage.textContent = "Jackpot! You win 5x your bet!";
      balance += betAmount * 5;
    } else if (results[0] === results[1] || results[1] === results[2] || results[0] === results[2]) {
      slotResultMessage.textContent = "You win 2x your bet!";
      balance += betAmount * 2;
    } else {
      slotResultMessage.textContent = "You lose. Try again!";
    }
    updateBalanceDisplay();
  });
}

// Admin Panel Logic
if (document.getElementById("pending-requests")) {
  const pendingRequestsList = document.getElementById("pending-requests");

  function renderRequests() {
    pendingRequestsList.innerHTML = "";
    pendingRequests.forEach((req, index) => {
      const li = document.createElement("li");
      li.textContent = `Request ${index + 1}: ${req} ALSilver`;
      pendingRequestsList.appendChild(li);
    });
  }

  document.body.onload = renderRequests;
}
