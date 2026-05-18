const gunSkins = player.getStorage().getGunSkins();

const container = document.getElementById("skins-list");
const originalEmpty = container.querySelector('.empty-state')?.outerHTML || `
    <div class="empty-state">
        <div class="empty-state-icon">🔫</div>
        <div class="empty-state-text">No gun skins yet. Check the market!</div>
        <a href="../Shop/BuySkins.html" class="empty-state-link">Browse Market</a>
    </div>
`;

function getImage(s) { return s.img || (s.getImage && s.getImage()) || s.image || ""; }
function getSkinName(s) {return s.skinName || (s.getSkinName && s.getSkinName()) || s.name || "";}
function getPrice(s) { return s.price || (s.getPrice && s.getPrice()) || 0; }
function getFloatVal(s) { return s.floatVal || s.float || (s.getFloat && s.getFloat()) || 0; }
function getWeaponName(s) {
    if (s.weaponName) return s.weaponName;
    if (s.getWeapon) {
        const w = s.getWeapon();
        if (!w) return '';
        return (typeof w === 'string') ? w : (w.getName ? w.getName() : w.name || '');
    }
    if (s.weapon && typeof s.weapon === 'string') return s.weapon;
    return '';
}
function getRarity(s){ return s.rarity || (s.getRarity && s.getRarity()) || 'milspec'; }

container.innerHTML = '';
if (!gunSkins || gunSkins.length === 0) {
    container.innerHTML = originalEmpty;
    document.getElementById('skinCount')?.replaceWith(
        (() => { const el = document.createElement('span'); el.id = 'skinCount'; el.className = 'page-meta'; el.textContent = '0 SKINS'; return el; })()
    );
} else {
    const grid = document.createElement('div');
    grid.className = 'skin-grid';

    gunSkins.forEach(skin => {
        const imgPath = getImage(skin);
        const rarity = getRarity(skin);
        const card = document.createElement('div');
        card.className = `skin-card rarity-${rarity}`;

        card.innerHTML = `
            <div class="skin-img-area">
                ${imgPath ? `<img src="../${imgPath.replace(/^\/+/, '')}" style="max-height:90%;max-width:90%;object-fit:contain;">` : `<span>🔫</span>`}
                <span class="rarity-tag">${rarity}</span>
            </div>
            <div class="skin-body">
                <div class="skin-weapon">${getWeaponName(skin)}</div>
                <div class="skin-name">${getSkinName(skin)}</div>
                <div class="skin-data">
                    <span class="data-pill float-val">F: ${getFloatVal(skin)}</span>
                    <span class="data-pill">${getWeaponName(skin)}</span>
                </div>
                <div class="skin-price">${getPrice(skin).toLocaleString()}</div>
            </div>
        `;

        grid.appendChild(card);
    });

    container.appendChild(grid);

    const countEl = document.getElementById('skinCount');
    if (countEl) countEl.textContent = `${gunSkins.length} SKINS`;
}