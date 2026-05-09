class Case{
    #name;
    #items;
    #price;
    #caseType;
    constructor(name,items,price,caseType){
        this.#name = name;
        this.#items = items;
        this.#price = price;
        this.#caseType = caseType;
    }

    //abstract
    rollItem() {
        throw new Error("rollItem() must be implemented by subclass");
    }

    getName(){
        return this.#name;
    }

    getPrice(){
        return this.#price;
    }

    getCaseType(){
        return this.#caseType;
    }

    getItems(){
        return this.#items;
    }

    #randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
    }

    _randomInt(min,max){
        return this.#randomInt(min,max);
    }

    _getItems(){
        return this.#items;
    }

}

class Kilowatt extends Case{
    constructor(){

        super("Kilowatt",{
    covert: {
        skinName: "Inheritance",
        floatVal: Math.pow(Math.random(), 2),
        price: 3200,
        weaponName: "AK-47",
        weapon: "Gun",
        img: ""
    },
    classified: {
        skinName: "Chrome Cannon",
        floatVal: Math.pow(Math.random(), 2),
        price: 900,
        weaponName: "AWP",
        weapon: "Gun",
        img: ""
    },
    restricted: {
        skinName: "Black Lotus",
        floatVal: Math.pow(Math.random(), 2),
        price: 250,
        weaponName: "M4A1-S",
        weapon: "Gun",
        img: ""
    },
    milspec: {
        skinName: "Just Smile",
        floatVal: Math.pow(Math.random(), 2),
        price: 45,
        weaponName: "MP7",
        weapon: "Gun",
        img: ""
    }
}, 30, "weapon_case")
    }

    rollItem() {
        const chance = this._randomInt(1, 1000);
        const items = this._getItems();

        if (chance <= 10) return items.covert;
        if (chance <= 50) return items.classified;
        if (chance <= 200) return items.restricted;
        return items.milspec;
    }

}


class Revolution extends Case {
    constructor() {
        super("Revolution", {
            covert: {
                skinName: "Printstream",
                floatVal: Math.pow(Math.random(), 2),
                price: 3100,
                weaponName: "AK-47",
                weapon: "Gun",
                img: ""
            },
            classified: {
                skinName: "Wildfire Protocol",
                floatVal: Math.pow(Math.random(), 2),
                price: 950,
                weaponName: "Desert Eagle",
                weapon: "Gun",
                img: ""
            },
            restricted: {
                skinName: "Circuit Breaker",
                floatVal: Math.pow(Math.random(), 2),
                price: 260,
                weaponName: "M4A1-S",
                weapon: "Gun",
                img: ""
            },
            milspec: {
                skinName: "Reboot",
                floatVal: Math.pow(Math.random(), 2),
                price: 55,
                weaponName: "MP9",
                weapon: "Gun",
                img: ""
            }
        }, 30, "weapon_case");
    }

    rollItem() {
        const chance = this._randomInt(1, 1000);
        const items = this._getItems();

        if (chance <= 12) return items.covert;
        if (chance <= 60) return items.classified;
        if (chance <= 210) return items.restricted;
        return items.milspec;
    }
}

class DreamsAndNightmares extends Case{
    constructor() {
    super("DreamsNightmare", {
        covert: {
            skinName: "Night Terror",
            floatVal: Math.pow(Math.random(), 2),
            price: 3400,
            weaponName: "AK-47",
            weapon: "Gun",
            img: ""
        },
        classified: {
            skinName: "Phantom Pulse",
            floatVal: Math.pow(Math.random(), 2),
            price: 880,
            weaponName: "USP-S",
            weapon: "Gun",
            img: ""
        },
        restricted: {
            skinName: "Dream Glade",
            floatVal: Math.pow(Math.random(), 2),
            price: 240,
            weaponName: "M4A1-S",
            weapon: "Gun",
            img: ""
        },
        milspec: {
            skinName: "Sleep Paralysis",
            floatVal: Math.pow(Math.random(), 2),
            price: 50,
            weaponName: "P90",
            weapon: "Gun",
            img: ""
        }
    }, 30, "weapon_case");
}

rollItem() {
    const chance = this._randomInt(1, 1000);
    const items = this._getItems();

    if (chance <= 8) return items.covert;        // rarer covert
    if (chance <= 45) return items.classified;
    if (chance <= 180) return items.restricted;
    return items.milspec;
}

}

class KnifeCase extends Case {
    constructor() {
        super("Knife", {
            covert: {
                skinName: "Karambit | Fade",
                floatVal: Math.pow(Math.random(), 2),
                price: 12000,
                weaponName: "Karambit",
                weapon: "Knife",
                img: ""
            },
            classified: {
                skinName: "M9 Bayonet | Slaughter",
                floatVal: Math.pow(Math.random(), 2),
                price: 8000,
                weaponName: "M9 Bayonet",
                weapon: "Knife",
                img: ""
            },
            restricted: {
                skinName: "Butterfly Knife | Case Hardened",
                floatVal: Math.pow(Math.random(), 2),
                price: 5000,
                weaponName: "Butterfly Knife",
                weapon: "Knife",
                img: ""
            },
            milspec: {
                skinName: "Gut Knife | Safari Mesh",
                floatVal: Math.pow(Math.random(), 2),
                price: 1500,
                weaponName: "Gut Knife",
                weapon: "Knife",
                img: ""
            }
        }, 100, "knife_case"); // higher price
    }

    rollItem() {
        const chance = this._randomInt(1, 1000);
        const items = this._getItems();

        if (chance <= 5) return items.covert;       // 0.5%
        if (chance <= 25) return items.classified;  // 2%
        if (chance <= 120) return items.restricted; // 9.5%
        return items.milspec;                       // 88%
    }
}

class GloveCase extends Case {
    constructor() {
        super("Glove", {
            covert: {
                skinName: "Sport Gloves | Pandora's Box",
                floatVal: Math.pow(Math.random(), 2),
                price: 15000,
                weaponName: "Sport Gloves",
                weapon: "Glove",
                img: ""
            },
            classified: {
                skinName: "Specialist Gloves | Crimson Kimono",
                floatVal: Math.pow(Math.random(), 2),
                price: 9000,
                weaponName: "Specialist Gloves",
                weapon: "Glove",
                img: ""
            },
            restricted: {
                skinName: "Driver Gloves | Overtake",
                floatVal: Math.pow(Math.random(), 2),
                price: 4000,
                weaponName: "Driver Gloves",
                weapon: "Glove",
                img: ""
            },
            milspec: {
                skinName: "Hand Wraps | Leather",
                floatVal: Math.pow(Math.random(), 2),
                price: 1200,
                weaponName: "Hand Wraps",
                weapon: "Glove",
                img: ""
            }
        }, 100, "glove_case");
    }

    rollItem() {
        const chance = this._randomInt(1, 1000);
        const items = this._getItems();

        if (chance <= 7) return items.covert;       // 0.7%
        if (chance <= 35) return items.classified;  // 2.8%
        if (chance <= 150) return items.restricted; // 11.5%
        return items.milspec;                       // ~85%
    }
}