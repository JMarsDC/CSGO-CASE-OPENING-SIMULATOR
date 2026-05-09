class Case{
    constructor(name,items,price,caseType){
        this.name = name;
        this.items = items;
        this.price = price;
        this.caseType = caseType;
    }

    //abstract
    rollItem() {
        throw new Error("rollItem() must be implemented by subclass");
    }

    getName(){
        return this.name;
    }

    randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
    }

}

class Kilowatt extends Case{
    constructor(){
        super("Kilowatt",{
    covert: {
        skinName: "Inheritance",
        floatVal: 0.00045,
        price: 3200,
        weaponName: "AK-47",
        weapon: "Gun",
        img: ""
    },
    classified: {
        skinName: "Chrome Cannon",
        floatVal: 0.0123,
        price: 900,
        weaponName: "AWP",
        weapon: "Gun",
        img: ""
    },
    restricted: {
        skinName: "Black Lotus",
        floatVal: 0.087,
        price: 250,
        weaponName: "M4A1-S",
        weapon: "Gun",
        img: ""
    },
    milspec: {
        skinName: "Just Smile",
        floatVal: 0.23,
        price: 45,
        weaponName: "MP7",
        weapon: "Gun",
        img: ""
    }
}, 30, "weapon_case")
    }

    rollItem() {
        const chance = this.randomInt(1, 1000);

        if (chance <= 10) return this.items.covert;
        if (chance <= 50) return this.items.classified;
        if (chance <= 200) return this.items.restricted;
        return this.items.milspec;
    }

}


class Revolution extends Case {
    constructor() {
        super("Revolution", {
            covert: {
                skinName: "Printstream",
                floatVal: 0.0031,
                price: 3100,
                weaponName: "AK-47",
                weapon: "Gun",
                img: ""
            },
            classified: {
                skinName: "Wildfire Protocol",
                floatVal: 0.0142,
                price: 950,
                weaponName: "Desert Eagle",
                weapon: "Gun",
                img: ""
            },
            restricted: {
                skinName: "Circuit Breaker",
                floatVal: 0.081,
                price: 260,
                weaponName: "M4A1-S",
                weapon: "Gun",
                img: ""
            },
            milspec: {
                skinName: "Reboot",
                floatVal: 0.21,
                price: 55,
                weaponName: "MP9",
                weapon: "Gun",
                img: ""
            }
        }, 30, "weapon_case");
    }

    rollItem() {
        const chance = randomInt(1, 1000);

        if (chance <= 12) return this.items.covert;
        if (chance <= 60) return this.items.classified;
        if (chance <= 210) return this.items.restricted;
        return this.items.milspec;
    }
}

class DreamsAndNightmares extends Case{
    constructor() {
    super("Dreams & Nightmares", {
        covert: {
            skinName: "Night Terror",
            floatVal: 0.0028,
            price: 3400,
            weaponName: "AK-47",
            weapon: "Gun",
            img: ""
        },
        classified: {
            skinName: "Phantom Pulse",
            floatVal: 0.0165,
            price: 880,
            weaponName: "USP-S",
            weapon: "Gun",
            img: ""
        },
        restricted: {
            skinName: "Dream Glade",
            floatVal: 0.079,
            price: 240,
            weaponName: "M4A1-S",
            weapon: "Gun",
            img: ""
        },
        milspec: {
            skinName: "Sleep Paralysis",
            floatVal: 0.25,
            price: 50,
            weaponName: "P90",
            weapon: "Gun",
            img: ""
        }
    }, 30, "weapon_case");
}

rollItem() {
    const chance = randomInt(1, 1000);

    if (chance <= 8) return this.items.covert;        // rarer covert
    if (chance <= 45) return this.items.classified;
    if (chance <= 180) return this.items.restricted;
    return this.items.milspec;
}

}

class KnifeCase extends Case {
    constructor() {
        super("Knife Case", {
            covert: {
                skinName: "Karambit | Fade",
                floatVal: 0.01,
                price: 12000,
                weaponName: "Karambit",
                weapon: "Knife",
                img: ""
            },
            classified: {
                skinName: "M9 Bayonet | Slaughter",
                floatVal: 0.03,
                price: 8000,
                weaponName: "M9 Bayonet",
                weapon: "Knife",
                img: ""
            },
            restricted: {
                skinName: "Butterfly Knife | Case Hardened",
                floatVal: 0.12,
                price: 5000,
                weaponName: "Butterfly Knife",
                weapon: "Knife",
                img: ""
            },
            milspec: {
                skinName: "Gut Knife | Safari Mesh",
                floatVal: 0.35,
                price: 1500,
                weaponName: "Gut Knife",
                weapon: "Knife",
                img: ""
            }
        }, 100, "knife_case"); // higher price
    }

    rollItem() {
        const chance = randomInt(1, 1000);

        if (chance <= 5) return this.items.covert;       // 0.5%
        if (chance <= 25) return this.items.classified;  // 2%
        if (chance <= 120) return this.items.restricted; // 9.5%
        return this.items.milspec;                       // 88%
    }
}

class GloveCase extends Case {
    constructor() {
        super("Glove Case", {
            covert: {
                skinName: "Sport Gloves | Pandora's Box",
                floatVal: 0.02,
                price: 15000,
                weaponName: "Sport Gloves",
                weapon: "Glove",
                img: ""
            },
            classified: {
                skinName: "Specialist Gloves | Crimson Kimono",
                floatVal: 0.05,
                price: 9000,
                weaponName: "Specialist Gloves",
                weapon: "Glove",
                img: ""
            },
            restricted: {
                skinName: "Driver Gloves | Overtake",
                floatVal: 0.15,
                price: 4000,
                weaponName: "Driver Gloves",
                weapon: "Glove",
                img: ""
            },
            milspec: {
                skinName: "Hand Wraps | Leather",
                floatVal: 0.30,
                price: 1200,
                weaponName: "Hand Wraps",
                weapon: "Glove",
                img: ""
            }
        }, 100, "glove_case");
    }

    rollItem() {
        const chance = randomInt(1, 1000);

        if (chance <= 7) return this.items.covert;       // 0.7%
        if (chance <= 35) return this.items.classified;  // 2.8%
        if (chance <= 150) return this.items.restricted; // 11.5%
        return this.items.milspec;                       // ~85%
    }
}