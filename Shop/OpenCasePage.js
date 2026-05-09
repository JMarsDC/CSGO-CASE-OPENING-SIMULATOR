document.addEventListener('DOMContentLoaded', function() {
    updateAllCounters();
});

function updateAllCounters() {
    document.getElementById('KilowattCount').textContent = 
    player.getStorage().getCounter('Kilowatt');

    document.getElementById('RevolutionCount').textContent = 
    player.getStorage().getCounter('Revolution');
    
    document.getElementById('DreamsAndNightmaresCount').textContent = 
    player.getStorage().getCounter('DreamsNightmare');

    document.getElementById('KnifeCount').textContent = 
    player.getStorage().getCounter('Knife');

    document.getElementById('GloveCount').textContent = 
    player.getStorage().getCounter('Glove');
}

function openCasePage(page,caseBtn,caseCount,currentCase) {
    const button = document.getElementById(caseBtn);
    const countText = document.getElementById(caseCount);

    countText.textContent = player.getStorage().getCounter(currentCase);

	if(!(player.getStorage().hasCase(currentCase))){
		alert(`You dont have any ${currentCase}`);
        countText.textContent = "0";
	} else{
        location.href = page;
    }
}