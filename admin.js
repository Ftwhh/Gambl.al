// Admin Panel Logic

// Simulated backend storage for pending requests
let pendingRequests = JSON.parse(localStorage.getItem("pendingRequests")) || [];

// Update the list of pending requests in the admin panel
function renderRequests() {
  const pendingRequestsList = document.getElementById("pending-requests");
  pendingRequestsList.innerHTML = "";

  if (pendingRequests.length === 0) {
    const noRequests = document.createElement("li");
    noRequests.textContent = "No pending requests.";
    pendingRequestsList.appendChild(noRequests);
    return;
  }

  pendingRequests.forEach((req, index) => {
    const li = document.createElement("li");
    li.textContent = `Request ${index + 1}: ${req.amount} ALSilver from User ID: ${req.userId}`;
    const approveBtn = document.createElement("button");
    approveBtn.textContent = "Approve";
    approveBtn.className = "approve-btn";
    approveBtn.addEventListener("click", () => approveRequest(index));

    li.appendChild(approveBtn);
    pendingRequestsList.appendChild(li);
  });
}

// Approve a request and remove it from the pending list
function approveRequest(index) {
  const approvedRequest = pendingRequests[index];
  alert(`Approved ${approvedRequest.amount} ALSilver for User ID: ${approvedRequest.userId}`);
  pendingRequests.splice(index, 1);
  saveRequests();
  renderRequests();
}

// Save pending requests to localStorage
function saveRequests() {
  localStorage.setItem("pendingRequests", JSON.stringify(pendingRequests));
}

// Initialize the admin panel
document.addEventListener("DOMContentLoaded", () => {
  renderRequests();
});
