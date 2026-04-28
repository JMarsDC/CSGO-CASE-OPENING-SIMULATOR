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
        this._populate();
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

    //The abstract method
    printWeapon(){
        throw new Error("printWeapon() must be implemented by subclass.");
    }
}

class Weapon{
    constructor(name,type){
        this.name = name;
        this.type = type;
    }

    getName(){ return this.name; }
    getType(){ return this.type; }
}