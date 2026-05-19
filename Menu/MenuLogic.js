function getCurrentUser() {
    return localStorage.getItem('currentUser');
}

function getPlayerBalanceKey(name) {
    return `player_${name}_balance`;
}

function getPlayerStorageKey(name) {
    return `player_${name}_storage`;
}

class Player{
    #name;
    #balance;
    #inventory;
    constructor(name,balance){
        this.#name = name;
        this.#balance = balance;
        this.#inventory = new Storage(name);

        if (!this._load()) {
            this._save();
        }
    }

    _load(){
        let saved = localStorage.getItem(getPlayerBalanceKey(this.#name));
        if (!saved) {
            // fallback to old storage key for compatibility
            saved = localStorage.getItem("playerBalance");
        }
        if(!saved) return false;

        try {
            const data = JSON.parse(saved);
            this.#balance = data.balance;
            return true;
        } catch (error) {
            console.error("Failed to load player balance:", error);
            return false;
        }
    }

    _save(){
        const data = {
            balance: this.#balance
        };
        localStorage.setItem(getPlayerBalanceKey(this.#name), JSON.stringify(data));
    }

    save(){
        this._save();
    }

    getName() {return this.#name;}
    getBalance() {return this.#balance;}
    getStorage() {return this.#inventory;}
    deductBalance(amount) {this.#balance -= amount; this._save();}
    addBalance(amount) {this.#balance += amount; this._save();}
}

class Storage{
    #skins;
    #cases;
    #owner;

    constructor(owner){
        this.#owner = owner;
        this.#skins = [];
        this.#cases = {
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
        this.#cases[caseName] += amount;
        this._save();
    }

    hasCase(caseName){
        return this.#cases[caseName] > 0;
    }

    getCounter(caseName){
        return this.#cases[caseName];
    }

    setCounter(caseName){
        this.#cases[caseName]--;
        this._save();
    }

    removeSkin(index){
        this.#skins.splice(index,1);
        this._save();
    }

    addSkin(skin){
        this.#skins.push(
            new Skin(
                skin.skinName,
                skin.floatVal,
                skin.price,
                new Weapon(skin.weaponName, skin.weapon),
                skin.image || skin.img,
                skin.rarity
            )
        );
        this._save();
    }

    _load(){
        let saved = localStorage.getItem(getPlayerStorageKey(this.#owner));

        if (!saved) {
            console.warn(`No saved data for player ${this.#owner}`);
            return false;
        }

        try {
            const data = JSON.parse(saved);
            console.log(`Raw data from localStorage for ${this.#owner}:`, data);
            
            // Validate data structure
            if (!data.skins || !Array.isArray(data.skins)) {
                console.error("Invalid skins data structure");
                return false;
            }
            
            this.#skins = data.skins.map(item => new Skin(
                item.skinName,
                item.floatVal,
                item.price,
                new Weapon(item.weaponName, item.weapon),
                item.image || item.img,
                item.rarity
            ));
            
            this.#cases = data.cases || this.#cases;
            console.log(`Loaded ${this.#skins.length} skins for ${this.#owner}`);
            return true;
        } catch (error) {
            console.error("Failed to load player storage:", error);
            return false;
        }
    }

    _save(){
        const data = {
            skins: this.#skins.map(skin => ({
                skinName: skin.getSkinName(),
                floatVal: skin.getFloat(),
                price: skin.getPrice(),
                weaponName: skin.getWeapon().getName(),
                weapon: skin.getWeapon().getType(),
                image: skin.getImage(),
                rarity: skin.getRarity()
            })),
            cases: this.#cases
        };

        console.log(`Saving ${data.skins.length} skins for ${this.#owner}:`, data.skins.length === 0 ? '(empty)' : data.skins.map(s => s.skinName));
        localStorage.setItem(getPlayerStorageKey(this.#owner), JSON.stringify(data));
    }

    save(){
        this._save();
    }

    _populate(){
    this.#skins.push(
        new Skin("RubyRed", 0.002, 3000, 
            new Weapon("AK47","Gun"), 
            "images/ak47_ruby.png", "covert")
    );

    this.#skins.push(
        new Skin("EmeraldGreen", 0.123, 4500, 
            new Weapon("M4A1","Gun"), 
            "images/m4a1_emerald.png", "classified")
    );

    this.#skins.push(
        new Skin("Talon", 0.256, 2400, 
            new Weapon("Deagle","Gun"), 
            "images/deagle_talon.png", "restricted")
    );
    }

    getGunSkins(){ 
        return this.#skins.filter(skin => skin.getWeapon().getType() === "Gun"); 
    }
    getKnifeSkins(){ 
        return this.#skins.filter(skin => skin.getWeapon().getType() === "Knife"); 
    }
    getGloveSkins(){ 
        return this.#skins.filter(skin => skin.getWeapon().getType() === "Glove"); 
    }
    getSkins() {
    return this.#skins.map(skin => ({
        skinName:   skin.getSkinName(),
        floatVal:   skin.getFloat(),
        price:      skin.getPrice(),
        weaponName: skin.getWeapon().getName(),
        weapon:     skin.getWeapon().getType(),
        img:        skin.getImage(),
        rarity:     skin.getRarity()
    }));
}

getCases() { return this.#cases; }
}



class Skin{
    #skinName;
    #floatVal;
    #price;
    #weapon;
    #image;
    #rarity;


    constructor(skinName, floatVal, price, weapon, image, rarity){
        this.#skinName = skinName;
        this.#floatVal = floatVal;
        this.#price = price;
        this.#weapon = weapon;
        this.#image = image;
        this.#rarity = rarity;
    }

    getSkinName(){return this.#skinName;}
    getPrice(){return this.#price;}
    getFloat(){return this.#floatVal}
    getImage(){return this.#image;}
    getWeapon(){return this.#weapon;}
    getRarity(){return this.#rarity}

}

class Weapon{
    #name;
    #type;

    constructor(name,type){
        this.#name = name;
        this.#type = type;
    }

    getName(){ return this.#name; }
    getType(){ return this.#type; }
}