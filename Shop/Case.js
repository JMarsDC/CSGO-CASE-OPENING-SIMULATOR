class Case {
    #name;
    #items;
    #price;
    #caseType;

    constructor(name, items, price, caseType) {
        this.#name = name;
        this.#items = items;
        this.#price = price;
        this.#caseType = caseType;
    }

    // abstract
    rollItem() {
        throw new Error("rollItem() must be implemented by subclass");
    }

    getName() {
        return this.#name;
    }

    getPrice() {
        return this.#price;
    }

    getCaseType() {
        return this.#caseType;
    }

    getItems() {
        return this.#items;
    }

    #randomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    _randomInt(min, max) {
        return this.#randomInt(min, max);
    }

    _getItems() {
        return this.#items;
    }
}

class Kilowatt extends Case {
    constructor() {
        super("Kilowatt", {
            covert: {
                skinName: "Inheritance",
                floatVal: Math.pow(Math.random(), 2),
                price: 1800,
                weaponName: "AK-47",
                weapon: "Gun",
                img: "../images/Inheritance.png",
                rarity: "covert"
            },

            classified: {
                skinName: "Chrome Cannon",
                floatVal: Math.pow(Math.random(), 2),
                price: 500,
                weaponName: "AWP",
                weapon: "Gun",
                img: "../images/ChromeCannon.png",
                rarity: "classified"
            },

            restricted: {
                skinName: "Black Lotus",
                floatVal: Math.pow(Math.random(), 2),
                price: 140,
                weaponName: "M4A1-S",
                weapon: "Gun",
                img: "../images/BlackLotus.png",
                rarity: "restricted"
            },

            milspec: {
                skinName: "Just Smile",
                floatVal: Math.pow(Math.random(), 2),
                price: 25,
                weaponName: "MP7",
                weapon: "Gun",
                img: "../images/JustSmile.png",
                rarity: "milspec"
            }
        }, 90, "weapon_case");
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
                price: 1750,
                weaponName: "M4A1-S",
                weapon: "Gun",
                img: "../images/Printstream.png",
                rarity: "covert"
            },

            classified: {
                skinName: "Boost Protocol",
                floatVal: Math.pow(Math.random(), 2),
                price: 520,
                weaponName: "Desert Eagle",
                weapon: "Gun",
                img: "../images/BoostProtocol.png",
                rarity: "classified"
            },

            restricted: {
                skinName: "Emphorosaur",
                floatVal: Math.pow(Math.random(), 2),
                price: 145,
                weaponName: "M4A1-S",
                weapon: "Gun",
                img: "../images/Emphorosaur.png",
                rarity: "restricted"
            },

            milspec: {
                skinName: "Featherweight",
                floatVal: Math.pow(Math.random(), 2),
                price: 28,
                weaponName: "MP9",
                weapon: "Gun",
                img: "../images/Featherweight.png",
                rarity: "milspec"
            }
        }, 95, "weapon_case");
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

class DreamsAndNightmares extends Case {
    constructor() {
        super("DreamsAndNightmares", {
            covert: {
                skinName: "Nightwish",
                floatVal: Math.pow(Math.random(), 2),
                price: 1900,
                weaponName: "AK-47",
                weapon: "Gun",
                img: "../images/Nightwish.png",
                rarity: "covert"
            },

            classified: {
                skinName: "Melondrama",
                floatVal: Math.pow(Math.random(), 2),
                price: 480,
                weaponName: "Dual Berettas",
                weapon: "Gun",
                img: "../images/Melondrama.png",
                rarity: "classified"
            },

            restricted: {
                skinName: "Dream Glade",
                floatVal: Math.pow(Math.random(), 2),
                price: 135,
                weaponName: "G3SG1",
                weapon: "Gun",
                img: "../images/DreamGlade.png",
                rarity: "restricted"
            },

            milspec: {
                skinName: "Ensnared",
                floatVal: Math.pow(Math.random(), 2),
                price: 26,
                weaponName: "MAC-10",
                weapon: "Gun",
                img: "../images/Ensnared.png",
                rarity: "milspec"
            }
        }, 100, "weapon_case");
    }

    rollItem() {
        const chance = this._randomInt(1, 1000);
        const items = this._getItems();

        if (chance <= 8) return items.covert;
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
                price: 7000,
                weaponName: "Karambit",
                weapon: "Knife",
                img: "../images/Fade.png",
                rarity: "covert"
            },

            classified: {
                skinName: "M9 Bayonet | Slaughter",
                floatVal: Math.pow(Math.random(), 2),
                price: 4500,
                weaponName: "M9 Bayonet",
                weapon: "Knife",
                img: "../images/Slaughter.png",
                rarity: "classified"
            },

            restricted: {
                skinName: "Butterfly Knife | Case Hardened",
                floatVal: Math.pow(Math.random(), 2),
                price: 2600,
                weaponName: "Butterfly Knife",
                weapon: "Knife",
                img: "../images/CaseHardened.png",
                rarity: "restricted"
            },

            milspec: {
                skinName: "Gut Knife | Safari Mesh",
                floatVal: Math.pow(Math.random(), 2),
                price: 700,
                weaponName: "Gut Knife",
                weapon: "Knife",
                img: "../images/SafariMesh.png",
                rarity: "milspec"
            }
        }, 450, "knife_case");
    }

    rollItem() {
        const chance = this._randomInt(1, 1000);
        const items = this._getItems();

        if (chance <= 5) return items.covert;
        if (chance <= 25) return items.classified;
        if (chance <= 120) return items.restricted;
        return items.milspec;
    }
}

class GloveCase extends Case {
    constructor() {
        super("Glove", {
            covert: {
                skinName: "Sport Gloves | Pandora's Box",
                floatVal: Math.pow(Math.random(), 2),
                price: 8500,
                weaponName: "Sport Gloves",
                weapon: "Glove",
                img: "../images/Pandora.png",
                rarity: "covert"
            },

            classified: {
                skinName: "Specialist Gloves | Crimson Kimono",
                floatVal: Math.pow(Math.random(), 2),
                price: 5200,
                weaponName: "Specialist Gloves",
                weapon: "Glove",
                img: "../images/CrimsonKimono.png",
                rarity: "classified"
            },

            restricted: {
                skinName: "Driver Gloves | Overtake",
                floatVal: Math.pow(Math.random(), 2),
                price: 2300,
                weaponName: "Driver Gloves",
                weapon: "Glove",
                img: "../images/Overtake.png",
                rarity: "restricted"
            },

            milspec: {
                skinName: "Hand Wraps | Leather",
                floatVal: Math.pow(Math.random(), 2),
                price: 650,
                weaponName: "Hand Wraps",
                weapon: "Glove",
                img: "../images/Leather.png",
                rarity: "milspec"
            }
        }, 550, "glove_case");
    }

    rollItem() {
        const chance = this._randomInt(1, 1000);
        const items = this._getItems();

        if (chance <= 7) return items.covert;
        if (chance <= 35) return items.classified;
        if (chance <= 150) return items.restricted;
        return items.milspec;
    }
}