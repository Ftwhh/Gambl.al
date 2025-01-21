let deck = [];
let dealer = { cards: [], score: 0 };
let players = Array(5).fill(null).map(() => ({ cards: [], score: 0, standing: false }));
let currentPlayer = 0;

// Initialize the game
function startGame() {
  deck = generateDeck();
  shuffleDeck(deck);

  dealer.cards = [drawCard(), drawCard()];
  dealer.score = calculateScore(dealer.cards);

  players.forEach((player, index) => {
    player.cards = [drawCard(), drawCard()];
    player.score = calculateScore(player.cards);
    player.standing = false;

    updateUI(index + 1);
  });

  updateDealerUI();
}

// Generate a deck of cards
function generateDeck() {
  const suits = ['♥', '♦', '♣', '♠'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  return suits.flatMap(suit => values.map(value => ({ suit, value })));
}

// Shuffle the deck
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Draw a card
function drawCard() {
  return deck.pop();
}

// Calculate the score
function calculateScore(cards) {
  let score = 0;
  let aces = 0;

  cards.forEach(card => {
    if (['J', 'Q', 'K'].includes(card.value)) {
      score += 10;
    } else if (card.value === 'A') {
      aces += 1;
      score += 11;
    } else {
      score += parseInt(card.value);
    }
  });

  while (score > 21 && aces > 0) {
    score -= 10;
    aces -= 1;
  }

  return score;
}

// Update the UI
function updateUI(playerIndex) {
  const player = players[playerIndex - 1];
  const cardsDiv = document.getElementById(`player-${playerIndex}-cards`);
  const scoreP = document.getElementById(`player-${playerIndex}-score`);

  cardsDiv.innerHTML = player.cards.map(card => `<div>${card.value} ${card.suit}</div>`).join('');
  scoreP.textContent = `Score: ${player.score}`;
}

function updateDealerUI() {
  const cardsDiv = document.getElementById('dealer-cards');
  const scoreP = document.getElementById('dealer-score');

  cardsDiv.innerHTML = dealer.cards.map(card => `<div>${card.value} ${card.suit}</div>`).join('');
  scoreP.textContent = `Score: ${dealer.score}`;
}

// Player actions
function hit(playerIndex) {
  if (players[playerIndex - 1].standing) return;

  players[playerIndex - 1].cards.push(drawCard());
  players[playerIndex - 1].score = calculateScore(players[playerIndex - 1].cards);

  if (players[playerIndex - 1].score > 21) {
    alert(`Player ${playerIndex} busts!`);
    players[playerIndex - 1].standing = true;
  }

  updateUI(playerIndex);

  checkGameOver();
}

function stand(playerIndex) {
  players[playerIndex - 1].standing = true;
  checkGameOver();
}

function checkGameOver() {
  if (players.every(player => player.standing)) {
    // Dealer's turn
    while (dealer.score < 17) {
      dealer.cards.push(drawCard());
      dealer.score = calculateScore(dealer.cards);
    }

    updateDealerUI();

    // Determine winners
    players.forEach((player, index) => {
      if (player.score > 21 || (dealer.score <= 21 && dealer.score >= player.score)) {
        alert(`Player ${index + 1} loses!`);
      } else {
        alert(`Player ${index + 1} wins!`);
      }
    });
  }
}
