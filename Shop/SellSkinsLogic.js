// JANELLE WAS HERE

// Skibidi Rizzler 67 89 1011 SellSkinsLogic.js

// 67% (haha funny n`umber) market value ang pag sell sa skins puede nato ilisan but mao lang ni para fair
function calculateSellPrice(marketPrice) {
    return Math.floor(marketPrice * 0.67);
}

// display balance
function updateBalanceDisplay() {
    const el = document.getElementById('balanceDisplay');
    if (el) el.textContent = '$' + player.getBalance().toLocaleString();
}

// toast
let _toastTimer;
function showToast(msg, type) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.className = 'show ' + type;
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => { el.className = ''; }, 2200);
}

// sell the skins by index
function sellSkin(skinIndex) {
    const storage = player.getStorage();
    const skins   = storage.getSkins();

    if (!skins || skinIndex < 0 || skinIndex >= skins.length) {
        showToast('Skin not found', 'err');
        return;
    }

    const skin      = skins[skinIndex];
    const sellPrice = calculateSellPrice(skin.price);

    player.addBalance(sellPrice);
    storage.removeSkin(skinIndex);

    updateBalanceDisplay();
    renderInventory(); // re-render so indices are gucci/correct
    showToast(`Sold ${skin.weaponName} | ${skin.skinName} for $${sellPrice.toLocaleString()}`, 'ok');
}

// render inventory
function renderInventory() {
    const storage   = player.getStorage();
    const skins     = storage.getSkins();
    const container = document.getElementById('inventoryContainer');
    const metaEl    = document.getElementById('inventoryMeta');

    if (!container) return;

    if (!skins || skins.length === 0) {
        metaEl.textContent = '0 SKINS AVAILABLE';
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📦</div>
                <div class="empty-state-text">Your inventory is empty. Buy some skins first!</div>
                <a href="BuySkins.html" class="empty-state-link">Browse Market</a>
            </div>`;
        return;
    }

    metaEl.textContent = skins.length + ' SKIN' + (skins.length !== 1 ? 'S' : '') + ' AVAILABLE';
    container.innerHTML = '';

    const grid = document.createElement('div');
    grid.className = 'skin-grid';

    skins.forEach((skin, index) => {
        const sellPrice    = calculateSellPrice(skin.price);
        const floatDisplay = typeof skin.floatVal === 'number'
            ? skin.floatVal.toFixed(4)
            : skin.floatVal ?? '—';

        const imgContent = skin.img
            ? `<img src="../${skin.img}" style="max-height:90%;max-width:90%;object-fit:contain;" alt="${skin.skinName}">`
            : `<span>🎯</span>`;

        const div = document.createElement('div');
        div.className = `skin-card rarity-${skin.rarity ?? 'milspec'}`;
        div.innerHTML = `
            <div class="skin-img-area">
                ${imgContent}
                <span class="rarity-tag">${skin.rarity ?? 'milspec'}</span>
            </div>
            <div class="skin-body">
                <div class="skin-weapon">${skin.weaponName}</div>
                <div class="skin-name">${skin.skinName}</div>
                <div class="skin-data">
                    <span class="data-pill float-val">F: ${floatDisplay}</span>
                    <span class="data-pill">${skin.weapon ?? ''}</span>
                </div>
                <div class="skin-price">${sellPrice.toLocaleString()}</div>
                <div class="sell-row">
                    <button class="sell-btn" onclick="sellSkin(${index})">Sell</button>
                </div>
            </div>`;
        grid.appendChild(div);
    });

    container.appendChild(grid);
}

// Jarvis initialize this event
document.addEventListener('DOMContentLoaded', function () {
    renderInventory();
    updateBalanceDisplay();
});
