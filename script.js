let balance = 10000;
const requests = [];

// Update Balance
function updateBalanceDisplay() {
    document.getElementById("balance").textContent = balance;
}

// Blackjack Logic
function playBlackjack() {
    const bet = parseInt(document.getElementById("blackjackBet").value);
    if (!validateBet(bet)) return;

    balance -= bet;
    updateBalanceDisplay();

    const playerCards = [getCard(), getCard()];
    const dealerCards = [getCard(), getCard()];

    renderCards(playerCards, "player-cards");
    renderCards(dealerCards, "dealer-cards");

    const playerScore = calculateScore(playerCards);
    const dealerScore = calculateScore(dealerCards);

    document.getElementById("player-score").textContent = `Player's Score: ${playerScore}`;
    document.getElementById("dealer-score").textContent = `Dealer's Score: ${dealerScore}`;

    if (playerScore > 21 || (dealerScore <= 21 && dealerScore >= playerScore)) {
        alert("You lose!");
    } else {
        balance += bet * 2;
        updateBalanceDisplay();
        alert("You win!");
    }
}

// Slots Logic
function playSlots() {
    const bet = parseInt(document.getElementById("slotBet").value);
    if (!validateBet(bet)) return;

    balance -= bet;
    updateBalanceDisplay();

    const symbols = ["🍒", "🍋", "🔔", "🍇", "7️⃣"];
    const reels = Array(3).fill(0).map(() => symbols[Math.floor(Math.random() * symbols.length)]);

    const reelsContainer = document.getElementById("slot-reels");
    reelsContainer.innerHTML = reels.map(s => `<span class="slot-reel">${s}</span>`).join("");

    if (new Set(reels).size === 1) {
        balance += bet * 10;
        alert("Jackpot! You win!");
    } else {
        alert("Better luck next time.");
    }
    updateBalanceDisplay();
}

// Utility Functions
function validateBet(bet) {
    if (isNaN(bet) || bet < 2000 || bet > 500000) {
        alert("Bet must be between 2,000 and 500,000 ALSilver.");
        return false;
    }
    if (balance < bet) {
        alert("Insufficient balance.");
        return false;
    }
    return true;
}

function applyForSilver() {
    const amount = parseInt(document.getElementById("applyAmount").value);
    if (isNaN(amount) || amount <= 0) {
        alert("Enter a valid amount.");
        return;
    }
    requests.push({ id: Date.now(), amount });
    alert("Request submitted!");
}

function getCard() {
    const suits = ["hearts", "diamonds", "clubs", "spades"];
    const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    return { suit: suits[Math.floor(Math.random() * 4)], rank: ranks[Math.floor(Math.random() * 13)] };
}

function renderCards(cards, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = cards.map(card => `<div class="card suit-${card.suit}">${card.rank}</div>`).join("");
}

function calculateScore(cards) {
    return cards.reduce((sum, card) => sum + (isNaN(card.rank) ? (card.rank === "A" ? 11 : 10) : +card.rank), 0);
}
