
const SHOP_CASES = [
    { caseName: "Kilowatt",         price: 90,   img: "../images/kilowattCase.png", caseID: "Kilowatt" },
    { caseName: "Revolution",       price: 95,   img: "../images/revolutionCase.png", caseID: "Revolution" },
    { caseName: "Dreams & Nightmares", price: 100, img: "../images/dreamsAndNightmares.png", caseID: "DreamsAndNightmares" },
    { caseName: "Knife",            price: 450,   img: "../images/knifeCase.png", caseID: "Knife" },
    { caseName: "Glove",            price: 550,   img: "../images/gloveCase.png", caseID: "Glove" }
];

function updateBalanceDisplay() {
    document.getElementById('balanceDisplay').textContent = '$' + player.getBalance().toLocaleString();
}

let toastTimer;
function showToast(msg, type) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.className = 'show ' + type;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.className = '', 2200);
}

function adjustQty(index, delta) {
    const input = document.getElementById('qty' + index);
    const val = Math.max(1, Math.min(99, (parseInt(input.value) || 1) + delta));
    input.value = val;
}

function buyCase(index) {
    const quantity = Math.max(1, parseInt(document.getElementById('qty' + index).value) || 1);
    const caseItem = SHOP_CASES[index];
    const total = caseItem.price * quantity;
    const storage = player.getStorage();
    const balance = player.getBalance();

    if (balance < total) {
        showToast(`Need $${total.toLocaleString()} — only $${balance.toLocaleString()} available`, 'err');
        return;
    }

    player.deductBalance(total);

    for (let i = 0; i < quantity; i++) {
        storage.addCase(caseItem.caseID);
    }

    updateBalanceDisplay();
    showToast(`Bought ${quantity}× ${caseItem.caseName} Case`, 'ok');
}

function renderShop() {
    const container = document.getElementById('shopContainer');
    container.innerHTML = '';

    SHOP_CASES.forEach((caseItem, index) => {
        const div = document.createElement('div');
        div.className = 'case-card';
        div.innerHTML = `
            <div class="case-img-area">
                <img src="${caseItem.img}" alt="${caseItem.caseName}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
            </div>
            <div class="case-body">
                <div class="case-name">${caseItem.caseName}</div>
                <div class="case-data">
                    <span class="data-pill">Case</span>
                </div>
                <div class="case-price">${caseItem.price}</div>
                <div class="case-qty-row">
                    <div class="qty-wrap">
                        <button class="qty-btn" onclick="adjustQty(${index}, -1)">−</button>
                        <input class="qty-input" type="number" id="qty${index}" value="1" min="1" max="99">
                        <button class="qty-btn" onclick="adjustQty(${index}, 1)">+</button>
                    </div>
                    <button class="buy-btn" onclick="buyCase(${index})">Buy</button>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    renderShop();
    updateBalanceDisplay();
});