var items = {
	simple: {
		skinName: "Cyrex",
        floatVal: 0.002,
        price: 2000,
        weaponName: "M4A1-S",
        weapon: "Gun",
		img: "../images/m4a1_emerald.png"
	},
	middle: {
		skinName: "Chantico's Fire",
        floatVal: 0.023,
        price: 2600,
        weaponName: "M4A1-S",
        weapon: "Gun",
		img: "../images/m4a1_emerald.png"
	},
	super: {
		skinName: "Asiimov",
        floatVal: 0.00067,
        price: 3000,
        weaponName: "M4A4",
        weapon: "Gun",
		img: "../images/m4a1_emerald.png"
	}
};
function generate(ng) {
	$('.raffle-roller-container').css({
		transition: "sdf",
		"margin-left": "0px"
	}, 10).html('');

	for(var i = 0;i < 101; i++) {
		var element = '<div id="CardNumber'+i+'" class="item class_red_item" style="background-image:url('+items.simple.img+');"></div>';
		var randed = randomInt(1,1000);
		if(randed < 50) {
			element = '<div id="CardNumber'+i+'" class="item class_red_item" style="background-image:url('+items.super.img+');"></div>';
		} else if(500 < randed) {
			element = '<div id="CardNumber'+i+'" class="item class_red_item" style="background-image:url('+items.middle.img+');"></div>';
		}
		$(element).appendTo('.raffle-roller-container');
	}

    setTimeout(function() {
    var reward = rollItem();
    goRoll(reward.skinName, reward.img, reward);
}, 500);

}

function rollItem(){
    var chance = randomInt(1,1000);

    if(chance<50){
        return items.super;
    } else if(chance > 500){
        return items.middle;
    } else{
        return items.simple;
    }
}

function goRoll(skin, skinimg, reward) {
	$('.raffle-roller-container').css({
		transition: "all 8s cubic-bezier(.08,.6,0,1)"
	});
	$('#CardNumber78').css({
		"background-image": "url("+skinimg+")"
	});

	setTimeout(function() {
		$('#CardNumber78').addClass('winning-item');
		$('#rolled').html(skin);
		var win_element = "<div class='item class_red_item' style='background-image: url("+skinimg+")'></div>";
		$(win_element).appendTo('.inventory');

        player.getStorage().addSkin(reward)

	}, 8500);
	$('.raffle-roller-container').css('margin-left', '-6770px');
}
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}