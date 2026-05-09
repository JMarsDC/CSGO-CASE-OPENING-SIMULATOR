document.addEventListener('DOMContentLoaded', function() {
    updateAllCounters();
});

const counters = {
    Kilowatt: document.getElementById('KilowattCount'),
    Revolution: document.getElementById('RevolutionCount'),
    DreamsNightmare: document.getElementById('DreamsAndNightmaresCount'),
    Knife: document.getElementById('KnifeCount'),
    Glove: document.getElementById('GloveCount')
};

function updateAllCounters() {
    const storage = player.getStorage();

    for (const key in counters) {
        counters[key].textContent = storage.getCounter(key);
    }
}

function openCasePage(page,caseBtn,caseCount,currentCase) {
    // const button = document.getElementById(caseBtn);
    const countText = document.getElementById(caseCount);

    countText.textContent = player.getStorage().getCounter(currentCase);

	if(!(player.getStorage().hasCase(currentCase))){
		alert(`You dont have any ${currentCase}`);
        countText.textContent = "0";
	} else{
        location.href = page;
    }
}