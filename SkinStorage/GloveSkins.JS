const gloveSkins = player.getStorage().getGloveSkins();

const container = document.getElementById("skins-list");

gloveSkins.forEach(skin => {
    const gloveImage = document.createElement("img");
    gloveImage.src = "../" + skin.getImage();
    gloveImage.alt = "../" + skin.getImage();

    const gloveDesc = document.createElement("p");
    gloveDesc.textContent = `${skin.getSkinName()} | $${skin.getPrice()} 
    | Float: ${skin.getFloat()}`;

    const card = document.createElement("div");
    card.className = "skin-card";
    card.appendChild(gloveImage);
    card.appendChild(gloveDesc);

    container.appendChild(card);
});