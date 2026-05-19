const RARITY_ORDER = ['milspec', 'restricted', 'classified', 'covert'];

const UPGRADE_POOL = {
    milspec: [
        { skinName: "Flashback",           weaponName: "USP-S",  weapon: "Gun",   rarity: "restricted", price: 280, img: "images/USPS-S_Flashback.png" },
        { skinName: "Aquamarine Revenge",   weaponName: "AK-47",  weapon: "Gun",   rarity: "restricted", price: 420, img: "images/AK47_AquamarineRevenge.png" }
    ],
    restricted: [
        { skinName: "Guardian",            weaponName: "AWP",    weapon: "Gun",   rarity: "classified", price: 750, img: "images/AWP_Guardian.png" },
        { skinName: "Wasteland Rebel",      weaponName: "AK-47",   weapon: "Gun",   rarity: "classified", price: 820, img: "images/AK47_WastelandRebel.png" }
    ],
    classified: [
        { skinName: "Fire Serpent",        weaponName: "AK-47",  weapon: "Gun",   rarity: "covert",     price: 4200, img: "images/AK47_FireSerpent.png" },
        { skinName: "Dragon Lore",          weaponName: "AWP",    weapon: "Gun",   rarity: "covert",     price: 9500, img: "images/AWP_DragonLore.png" }
    ],
    covert: [
        { skinName: "Karambit | Marble Fade", weaponName: "Karambit", weapon: "Knife", rarity: "covert", price: 15000, emoji: "🟥", img: "images/Karambit_MarbleFade.png" }
    ]
};

let selectedIndices = [];

function getSkins() {
    return player.getStorage().getSkins();
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// ── Inventory render ──────────────────────────────────────────────────────
function renderInventory() {
    const skins = getSkins();
    const list  = document.getElementById('invList');
    document.getElementById('invCount').textContent = `${skins.length} skin${skins.length !== 1 ? 's' : ''}`;

    if (skins.length === 0) {
        list.innerHTML = `<div class="empty-state"><div class="icon">🎒</div>No skins in inventory.<br>Open some cases first!</div>`;
        return;
    }

    

    list.innerHTML = '';
    skins.forEach((skin, idx) => {
        const rarity     = skin.rarity || 'milspec';
        const isSelected = selectedIndices.includes(idx);
        const isLocked   = selectedIndices.length >= 3 && !isSelected;

        const div = document.createElement('div');
        div.className = `inv-item${isSelected ? ' selected' : ''}${isLocked ? ' locked' : ''}`;

        div.innerHTML = `
    <div class="rarity-pip pip-${rarity}"></div>
    <img src="../${skin.img}" style="width:60px;height:40px;object-fit:contain;">
    <div class="inv-info">
        <div class="inv-name">${skin.weaponName} | ${skin.skinName}</div>
        <div class="inv-sub">Float: ${(skin.floatVal ?? 0).toFixed(4)}</div>
    </div>
    <div class="inv-checkbox"><span class="checkmark">✓</span></div>
`;

        
        if (!isLocked || isSelected) {
            div.addEventListener('click', () => toggleSkin(idx));
        }
        list.appendChild(div);
    });
}

// ── Toggle selection ──────────────────────────────────────────────────────
function toggleSkin(idx) {
    const pos = selectedIndices.indexOf(idx);
    if (pos > -1) {
        selectedIndices.splice(pos, 1);
    } else {
        if (selectedIndices.length >= 3) return;
        selectedIndices.push(idx);
    }
    renderInventory();
    renderSlots();
    updateProgress();
}

// ── Slots render ──────────────────────────────────────────────────────────
function renderSlots() {
    const skins = getSkins();
    for (let s = 0; s < 3; s++) {
        const slot = document.getElementById('slot-' + s);
        const skin = selectedIndices[s] !== undefined ? skins[selectedIndices[s]] : null;

        if (skin) {
            slot.className = 'slot filled';
            slot.innerHTML = `
                <span class="slot-num">${s + 1}</span>
                <div class="slot-content">
                    <div class="slot-name">${skin.weaponName} | ${skin.skinName}</div>
                    <div class="slot-float">Float: ${(skin.floatVal ?? 0).toFixed(4)}</div>
                </div>
                <button class="slot-x" onclick="toggleSkin(${selectedIndices[s]})">×</button>
            `;
        } else {
            slot.className = 'slot';
            slot.innerHTML = `<span class="slot-num">${s + 1}</span><span class="slot-empty">Empty</span>`;
        }
    }
}

// ── Progress ──────────────────────────────────────────────────────────────
function updateProgress() {
    const n = selectedIndices.length;
    document.getElementById('selCount').textContent = n;
    document.getElementById('progressFill').style.width = `${(n / 3) * 100}%`;
    document.getElementById('tradeBtn').disabled = n < 3;
}

// ── Trade-up ──────────────────────────────────────────────────────────────
function tradeUp() {
    if (selectedIndices.length < 3) return;

    const storage = player.getStorage();
    const skins   = getSkins();

    // Best rarity among selected
    const bestIdx = selectedIndices.reduce((best, i) => {
        const r = RARITY_ORDER.indexOf(skins[i].rarity || 'milspec');
        return r > best ? r : best;
    }, 0);
    const bestRarity = RARITY_ORDER[bestIdx];

    // Pick reward
    const pool   = UPGRADE_POOL[bestRarity];
    const reward = { ...pool[randomInt(0, pool.length)] };
    reward.floatVal = parseFloat((Math.random() * 0.88 + 0.01).toFixed(4));

    // Remove selected skins in reverse order
    [...selectedIndices].sort((a, b) => b - a).forEach(i => storage.removeSkin(i));

    storage.addSkin(reward);

    selectedIndices = [];
    renderInventory();
    renderSlots();
    updateProgress();
    showResult(reward);
}

// ── Result modal ──────────────────────────────────────────────────────────
function showResult(skin) {
    document.getElementById('modalIcon').src = `../${skin.img}`;
    document.getElementById('modalSkinName').textContent = skin.skinName;
    document.getElementById('modalWeapon').textContent   = `${skin.weaponName} — ${skin.weapon}`;

    const rarityEl = document.getElementById('modalRarity');
    rarityEl.textContent = skin.rarity?.toUpperCase() ?? '';
    rarityEl.className   = `modal-pill rarity-${skin.rarity}`;

    document.getElementById('modalFloat').textContent = `Float ${skin.floatVal.toFixed(4)}`;
    document.getElementById('modalOverlay').classList.add('show');
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('show');
    renderInventory();
}

// ── Toast ─────────────────────────────────────────────────────────────────
let toastTimer;
function showToast(msg, type) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.className = 'show ' + type;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.className = '', 2200);
}

// ── Init ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
    renderInventory();
    renderSlots();
    updateProgress();
});
