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
        /*this.market = new Market();
        this.trade = new TradeUp();
        this.sell = new SellSkin();
        this.openCase = new OpenCase();
        this.buyCase = new CaseShop();*/
        this._populate();
    }

    _populate(){
    this.skins.push(new GunSkin("RubyRed", 0.002, 3000, "AK47","images/ak47_ruby.png"));
    this.skins.push(new GunSkin("EmeraldGreen", 0.123, 4500, "M4A1","images/m4a1_emerald.png"));
    this.skins.push(new GunSkin("Talon", 0.256, 2400, "Deagle","images/deagle_talon.png"));
    }

    getGunSkins(){ return this.skins.filter(skin => skin instanceof GunSkin); }
    }



class Skin{
    constructor(skinName, floatVal, price,image){

        //To make the class an abstract class IG
        if(new.target === Skin){
    throw new Error("Skin is an abstract class and cannot be instantiated directly.");
        }

        this.skinName = skinName;
        this.floatVal = floatVal;
        this.price = price;
        this.image = image;
    }

    getSkinName(){return this.skinName;}
    getPrice(){return this.price;}
    getFloat(){return this.floatVal}
    getImage(){return this.image;}

    //The abstract method
    printWeapon(){
        throw new Error("printWeapon() must be implemented by subclass.");
    }
}

class GunSkin extends Skin{
    constructor(skinName, floatVal, price, gun, image){
        super(skinName,floatVal,price, image)
        this.gun = gun
    }

    //The overriden method
    printWeapon() {
    console.log(`${this.gun} - ${this.getSkinName()}`);
  }
}