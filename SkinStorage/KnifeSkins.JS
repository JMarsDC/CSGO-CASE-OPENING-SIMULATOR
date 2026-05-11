const knifeSkins = player.getStorage().getKnifeSkins();

const container = document.getElementById("knife-skins-list");

knifeSkins.forEach(skin => {
    const knifeImage = document.createElement("img");
    knifeImage.src = "../" + skin.getImage();
    knifeImage.alt = "../" + skin.getImage();

    const knifeDesc = document.createElement("p");
    knifeDesc.textContent = `${skin.getWeapon().getName()} - ${skin.getSkinName()} | $${skin.getPrice()} 
    | Float: ${skin.getFloat()}`;

    const card = document.createElement("div");
    card.className = "skin-card";
    card.appendChild(knifeImage);
    card.appendChild(knifeDesc);

    container.appendChild(card);
});