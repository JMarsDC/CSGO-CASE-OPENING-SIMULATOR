document.addEventListener('DOMContentLoaded', function() {
    updateBalance();
});

function updateBalance() {
    document.getElementById('Balance').textContent = player.getBalance();
}

function buyCase(caseName, price) {
    if (player.getBalance() >= price) {
        player.deductBalance(price);
        updateBalance();
        player.getStorage().addCase(caseName);
        alert(`You bought a ${caseName} for $${price}!`);
    } else {
        alert("You don't have enough balance to buy this case.");
    }
}