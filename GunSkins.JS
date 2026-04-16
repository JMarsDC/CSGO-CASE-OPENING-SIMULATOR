  const gunSkins = player.getStorage().getGunSkins();

  //This is grabbing the DOM or HTML which is the div with the ID of gun-skins-list
  const container = document.getElementById("gun-skins-list");

  gunSkins.forEach(skin => {
    const gunImage = document.createElement("img");
    gunImage.src = skin.getImage();
    gunImage.alt = skin.getImage();

    const gunDesc = document.createElement("p"); // 1. Creates <p></p> in memory
    gunDesc.textContent = `${skin.gun} - ${skin.getSkinName()} | $${skin.getPrice()} 
    | Float: ${skin.getFloat()}`; // 3. Makes it <p class="skin-card">GUN - SKIN | $PRICE</p>

    const card = document.createElement("div");
    card.className = "skin-card"; // 2. Makes it <p class="skin-card"></p>
    card.appendChild(gunImage)
    card.appendChild(gunDesc);

    container.appendChild(card);  // 4. NOW it appears on the page inside the div

  });