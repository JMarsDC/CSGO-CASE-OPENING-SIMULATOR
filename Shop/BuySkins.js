//connected to player.js for balance and storage management
//code from BuySkins.html is split into this file for better organization and readability
// JANELLE WAS HERE

const SHOP_SKINS = [
    { skinName: "Asiimov",          weaponName: "AWP",    weapon: "Gun", floatVal: 0.2412, price: 1200, rarity: "classified", img: "/images/AWP_Asiimov.png" },
    { skinName: "Hyper Beast",      weaponName: "M4A4",   weapon: "Gun", floatVal: 0.0823, price: 800,  rarity: "classified", img: "/images/M4A4_Hyperbeast.png" },
    { skinName: "Redline",          weaponName: "AK-47",  weapon: "Gun", floatVal: 0.1547, price: 220,  rarity: "restricted", img: "/images/AK-47_Redline.png" },
    { skinName: "Orion",            weaponName: "AWP",    weapon: "Gun", floatVal: 0.0411, price: 3500, rarity: "covert",     img: "/images/AWP_Orion.png" },
    { skinName: "Hot Rod",          weaponName: "M4A1-S", weapon: "Gun", floatVal: 0.0134, price: 450,  rarity: "milspec",    img: "/images/M4A1-S_hotrod.png" }
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

function buySkin(index) {
    const quantity = Math.max(1, parseInt(document.getElementById('qty' + index).value) || 1);
    const skin = SHOP_SKINS[index];
    const total = skin.price * quantity;
    const storage = player.getStorage();
    const balance = player.getBalance();

    if (balance < total) {
        showToast(`Need $${total.toLocaleString()} — only $${balance.toLocaleString()} available`, 'err');
        return;
    }

    player.deductBalance(total);

    for (let i = 0; i < quantity; i++) {
        storage.addSkin({ ...skin });
    }

    updateBalanceDisplay();
    showToast(`Bought ${quantity}× ${skin.weaponName} | ${skin.skinName}`, 'ok');
}

function renderShop() {
    const container = document.getElementById('shopContainer');
    container.innerHTML = '';

    SHOP_SKINS.forEach((skin, index) => {
        const div = document.createElement('div');
        div.className = `skin-card rarity-${skin.rarity}`;
        div.innerHTML = `
            <div class="skin-img-area">
                ${skin.img ? `<img src="../${skin.img}" style="max-height:90%;max-width:90%;object-fit:contain;">` : `<span>${skin.emoji}</span>`}
                <span class="rarity-tag">${skin.rarity}</span>
            </div>
            <div class="skin-body">
                <div class="skin-weapon">${skin.weaponName}</div>
                <div class="skin-name">${skin.skinName}</div>
                <div class="skin-data">
                    <span class="data-pill float-val">F: ${skin.floatVal}</span>
                    <span class="data-pill">${skin.weapon}</span>
                </div>
                <div class="skin-price">${skin.price.toLocaleString()}</div>
                <div class="buy-row">
                    <div class="qty-wrap">
                        <button class="qty-btn" onclick="adjustQty(${index}, -1)">−</button>
                        <input class="qty-input" type="number" id="qty${index}" value="1" min="1" max="99">
                        <button class="qty-btn" onclick="adjustQty(${index}, 1)">+</button>
                    </div>
                    <button class="buy-btn" onclick="buySkin(${index})">Buy</button>
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