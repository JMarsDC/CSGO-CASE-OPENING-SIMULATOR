const AVAILABLE_CASES = [
    { name: "Kilowatt",         emoji: "⚡", caseID: "Kilowatt" },
    { name: "Revolution",       emoji: "🔥", caseID: "Revolution" },
    { name: "Dreams & Nightmares", emoji: "👻", caseID: "DreamsNightmare" },
    { name: "Knife",            emoji: "🔪", caseID: "Knife" },
    { name: "Glove",            emoji: "🧤", caseID: "Glove" }
];

function updateCaseCount() {
    const storage = player.getStorage();
    const cases = storage.getCases();
    let totalCount = 0;
    
    AVAILABLE_CASES.forEach(c => {
        if (cases[c.caseID]) {
            totalCount += cases[c.caseID];
        }
    });
    
    document.getElementById('caseCountDisplay').textContent = totalCount;
}

let toastTimer;
function showToast(msg, type) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.className = 'show ' + type;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.className = '', 2200);
}

function renderCases() {
    const container = document.getElementById('caseContainer');
    const storage = player.getStorage();
    const cases = storage.getCases();
    
    container.innerHTML = '';

    AVAILABLE_CASES.forEach((caseItem) => {
        const count = cases[caseItem.caseID] || 0;
        const div = document.createElement('div');
        div.className = 'case-card' + (count === 0 ? ' disabled' : '');
        div.innerHTML = `
            <div class="case-img-area">
                <span>${caseItem.emoji}</span>
            </div>
            <div class="case-body">
                <div class="case-name">${caseItem.name}</div>
                <div class="case-count">
                    <span class="count-badge">${count}</span> in inventory
                </div>
                <button class="open-btn" ${count === 0 ? 'disabled' : ''} onclick="openCasePage
                ('Open${caseItem.caseID.replace(/s$/, '')}Case.html', '${caseItem.name}')">
                    ${count === 0 ? 'Not Available' : 'Open'}
                </button>
            </div>
        `;
        container.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    renderCases();
    updateCaseCount();
});

function openCasePage(page,currentCase) {
        location.href = page;
}