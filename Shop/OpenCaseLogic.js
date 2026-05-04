let currentCase = null

function setCase(caseObj) {
    if (!caseObj) {
        console.error('setCase requires a Case instance')
        return
    }
    currentCase = caseObj
}

function openCase(caseObj) {
    setCase(caseObj)
}

function generate() {
	$('.raffle-roller-container').css({
		transition: "sdf",
		"margin-left": "0px"
	}, 10).html('');

	if (!currentCase) {
		console.error('No case set for OpenCaseLogic')
		return
	}

	const allItems = Object.values(currentCase.items)
	const defaultImg = allItems[0]?.img || ''

	for (var i = 0; i < 101; i++) {
		var randed = randomInt(1, 1000)
		var img = defaultImg
		if (randed < 50 && allItems.length > 0) {
			img = allItems[allItems.length - 1].img
		} else if (randed > 500 && allItems.length > 1) {
			img = allItems[Math.floor(allItems.length / 2)].img
		}
		var element = '<div id="CardNumber'+i+'" class="item class_red_item" style="background-image:url('+"../"+img+');"></div>';
		$(element).appendTo('.raffle-roller-container');
	}

    setTimeout(function() {
    var reward = currentCase.rollItem();
    goRoll(reward.skinName, reward.img, reward);
}, 500);

}

function goRoll(skin, skinimg, reward) {
	$('.raffle-roller-container').css({
		transition: "all 8s cubic-bezier(.08,.6,0,1)"
	});
	$('#CardNumber78').css({
		"background-image": "url("+"../"+skinimg+")"
	});

	setTimeout(function() {
		$('#CardNumber78').addClass('winning-item');
		$('#rolled').html(skin);
		var win_element = "<div class='item class_red_item' style='background-image: url("+"../"+skinimg+")'></div>";
		$(win_element).appendTo('.inventory');

        player.getStorage().addSkin(reward)

	}, 8500);
	$('.raffle-roller-container').css('margin-left', '-6770px');
}
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}