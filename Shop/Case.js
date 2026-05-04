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