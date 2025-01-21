document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("requests");
    requests.forEach(request => {
        const item = document.createElement("li");
        item.textContent = `Request ID: ${request.id}, Amount: ${request.amount} ALSilver`;
        const approveBtn = document.createElement("button");
        approveBtn.textContent = "Approve";
        approveBtn.onclick = () => approveRequest(request.id);
        item.appendChild(approveBtn);
        list.appendChild(item);
    });
});

function approveRequest(id) {
    const request = requests.find(r => r.id === id);
    if (request) {
        balance += request.amount;
        alert(`Request approved for ${request.amount} ALSilver.`);
        updateBalanceDisplay();
    }
}
