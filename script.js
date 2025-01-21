// Tab Navigation
document.getElementById("home-tab").addEventListener("click", function () {
  setActiveTab("home");
});

document.getElementById("games-tab").addEventListener("click", function () {
  setActiveTab("games");
});

function setActiveTab(tab) {
  document.querySelectorAll("nav a").forEach((el) => el.classList.remove("active"));
  document.querySelectorAll("main section").forEach((el) => el.classList.remove("active"));

  if (tab === "home") {
    document.getElementById("home-tab").classList.add("active");
    document.getElementById("home-content").classList.add("active");
  } else if (tab === "games") {
    document.getElementById("games-tab").classList.add("active");
    document.getElementById("games-content").classList.add("active");
  }
}

// Game Functions
function startBlackjack() {
  alert("Blackjack game started! (Add interactive logic here)");
}

function startSlots() {
  alert("Slots game started! (Add interactive logic here)");
}
