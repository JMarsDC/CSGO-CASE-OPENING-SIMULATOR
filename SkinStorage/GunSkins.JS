  const gunSkins = player.getStorage().getGunSkins();


  const container = document.getElementById("skins-list");

  gunSkins.forEach(skin => {
    const gunImage = document.createElement("img");
    gunImage.src = "../" + skin.getImage();
    gunImage.alt = "../" + skin.getImage();

    const gunDesc = document.createElement("p");
    gunDesc.textContent = `${skin.getWeapon().getName()} - ${skin.getSkinName()} | $${skin.getPrice()} 
    | Float: ${skin.getFloat()}`;

    const card = document.createElement("div");
    card.className = "skin-card";
    card.appendChild(gunImage)
    card.appendChild(gunDesc);

    container.appendChild(card);
  });