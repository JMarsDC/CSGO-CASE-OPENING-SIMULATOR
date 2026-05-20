let currentCase = null

function setCase(caseObj) {
    if (!caseObj) {
        console.error('setCase requires a Case instance')
        return
    }
    currentCase = caseObj
}


function generate() {
	$('.raffle-roller-container').css({
		transition: 'none',
		transform: 'translateX(0px)'
	}).html('');
	
	$('.inventory').html(''); // Clear previous items

	if (!currentCase) {
		console.error('No case set for OpenCaseLogic')
		return
	}

	if(!(player.getStorage().hasCase(currentCase.getName()))){
		alert(`You dont have any ${currentCase.getName()}`);
		return;
	}

	//decrements the case counter
	player.getStorage().setCounter(currentCase.getName());

	const allItems = Object.values(currentCase.getItems())
	const reward = currentCase.rollItem() // roll once

	for (var i = 0; i < 101; i++) {
		var item = (i === 80) ? reward : currentCase.rollItem() // place reward at index 80
		var element = '<div id="CardNumber'+i+'" class="item rarity-'+item.rarity+'" style="background-image:url('+item.img+');"></div>'
		$(element).appendTo('.raffle-roller-container')
	}

	setTimeout(function() {
		goRoll(reward.skinName, reward.img, reward)
	}, 500);

}

function goRoll(skinName, skinimg, reward) {
	$('.raffle-roller-container').css({
		transition: 'transform 8s cubic-bezier(.08,.6,0,1)'
	});
	$('#CardNumber78').css({
		"background-image": "url("+skinimg+")"
	});

	setTimeout(function() {
		$('#CardNumber78').addClass('winning-item');
		$('#rolled').html(skinName);
		var win_element = "<div class='item rarity-"+reward.rarity+"' style='background-image:url(../"+skinimg+");'></div>";
		$(win_element).appendTo('.inventory');

        player.getStorage().addSkin(reward)

	}, 8500);
	// compute dynamic shift so the winning card (CardNumber78) lands at holder center
	setTimeout(function() {
		var $container = $('.raffle-roller-container');
		var $holder = $('.raffle-roller-holder');
		var $items = $container.find('.item');
		var targetIndex = 78;
		var itemWidth = $items.first().outerWidth(true) || 85;
		var targetCenter = targetIndex * itemWidth + (itemWidth / 2);
		var holderCenter = $holder.width() / 2;
		var shift = targetCenter - holderCenter;
		$container.css('transform', 'translateX(' + (-shift) + 'px)');
	}, 20);
}
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}