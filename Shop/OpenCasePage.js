const AVAILABLE_CASES = [
    { name: "Kilowatt",         img: "../images/kilowattCase.png", caseID: "Kilowatt" },
    { name: "Revolution",       img: "../images/revolutionCase.png", caseID: "Revolution" },
    { name: "Dreams & Nightmares", img: "../images/dreamsAndNightmares.png", caseID: "DreamsAndNightmares" },
    { name: "Knife",            img: "../images/knifeCase.png", caseID: "Knife" },
    { name: "Glove",            img: "../images/gloveCase.png", caseID: "Glove" }
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
                <img src="${caseItem.img}" alt="${caseItem.name}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
            </div>
            <div class="case-body">
                <div class="case-name">${caseItem.name}</div>
                <div class="case-count">
                    <span class="count-badge">${count}</span> in inventory
                </div>
                <button class="open-btn" ${count === 0 ? 'disabled' : ''} onclick="openCasePage('Open${caseItem.caseID}Case.html', '${caseItem.name}')">
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