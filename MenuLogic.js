class Player{
    constructor(name,balance){
        this.name = name;
        this.balance = balance;
        this.inventory = new Storage();
    }

    getName() {return this.name;}
    getBalance() {return this.balance;}
    getStorage() {return this.inventory;}
    setBalance() {this.balance = balance;}
}

class Storage{

    constructor(){
        this.skins = [];
        this.cases = {
            Kilowatt: 1,
            Revolution: 1,
            DreamsNightmare: 1,
            Knife: 1,
            Glove: 1
        };
        
        if (!this._load()) {
            this._populate();
            this._save();
        }
    }

    addCase(caseName, amount=1){
        this.cases[caseName] += amount;
    }

    hasCase(caseName){
        return this.cases[caseName] > 0;
    }

    getCounter(caseName){
        return this.cases[caseName];
    }

    setCounter(caseName){
        this.cases[caseName]--;
        this._save();
    }

    removeSkin(index){
        this.skins.splice(index,1);
        this._save();
    }

    /*clearStorage(){
        this.skins = [];
        this._save();
        localStorage.removeItem("playerStorage");
    }*/

    addSkin(skin){
        this.skins.push(
            new Skin(
                skin.skinName,
                skin.floatVal,
                skin.price,
                new Weapon(skin.weaponName, skin.weapon),
                skin.image || skin.img
            )
        );
        this._save();
    }

    _load(){
        const saved = localStorage.getItem("playerStorage");
        if (!saved) return false;

        try {
            const data = JSON.parse(saved);
            
            this.skins = data.skins.map(item => new Skin(
                item.skinName,
                item.floatVal,
                item.price,
                new Weapon(item.weaponName, item.weapon),
                item.image || item.img
            ));
            
            this.cases = data.cases;
            return true;
        } catch (error) {
            console.error("Failed to load player storage:", error);
            return false;
        }
    }

    _save(){
        const data = {
            skins: this.skins.map(skin => ({
                skinName: skin.getSkinName(),
                floatVal: skin.getFloat(),
                price: skin.getPrice(),
                weaponName: skin.getWeapon().getName(),
                weapon: skin.getWeapon().getType(),
                image: skin.getImage()
            })),
            cases: this.cases
        };

        localStorage.setItem("playerStorage", JSON.stringify(data));
    }

    _populate(){
        this.skins.push(
            new Skin("RubyRed", 0.002, 3000, 
                new Weapon("AK47","Gun"), 
                "images/ak47_ruby.png")
        );

        
        this.skins.push(
            new Skin("EmeraldGreen", 0.123, 4500, 
                new Weapon("M4A1","Gun"), 
                "images/m4a1_emerald.png")
        );

        this.skins.push(
            new Skin("Talon", 0.256, 2400, 
                new Weapon("Deagle","Gun"), 
                "images/deagle_talon.png")
        );
    }

    getGunSkins(){ 
        return this.skins.filter(skin => skin.getWeapon().getType() === "Gun"); 
    }
    getKnifeSkins(){ 
        return this.skins.filter(skin => skin.getWeapon().getType() === "Knife"); 
    }
    getGloveSkins(){ 
        return this.skins.filter(skin => skin.getWeapon().getType() === "Glove"); 
    }
}



class Skin{
    constructor(skinName, floatVal, price, weapon, image){

        this.skinName = skinName;
        this.floatVal = floatVal;
        this.price = price;
        this.weapon = weapon;
        this.image = image;
    }

    getSkinName(){return this.skinName;}
    getPrice(){return this.price;}
    getFloat(){return this.floatVal}
    getImage(){return this.image;}
    getWeapon(){return this.weapon;}

}

class Weapon{
    constructor(name,type){
        this.name = name;
        this.type = type;
    }

    getName(){ return this.name; }
    getType(){ return this.type; }
}