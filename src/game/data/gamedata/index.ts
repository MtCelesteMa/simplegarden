import { Loader } from "../loader";
import * as v1 from "./v1";
export * as v1 from "./v1";

export const loader = new Loader("sg_gamedata", 1, v1.gameData, []);

export const simpleClassic: v1.GameData = {
    identifier: "sg_gamedata",
    version: 1,
    crops: {
        wheat: {
            displayName: $localize`:@@game.crop.wheat.displayname:Wheat`,
            shortName: $localize`:@@game.crop.wheat.shortname:W`,
            description: $localize`:@@game.crop.wheat.description:A versatile crop used in the making of many staple foods.`,
            maturity: 5,
            lifespan: 13,
            infectionValue: null,
            infectable: true,
            spreadOnHarvest: [],
        },
        corn: {
            displayName: $localize`:@@game.crop.corn.displayname:Corn`,
            shortName: $localize`:@@game.crop.corn.shortname:C`,
            description: $localize`:@@game.crop.corn.description:Another versatile crop used in the making of many staple foods.`,
            maturity: 3,
            lifespan: 15,
            infectionValue: null,
            infectable: true,
            spreadOnHarvest: [],
        },
        rice: {
            displayName: $localize`:@@game.crop.rice.displayname:Rice`,
            shortName: $localize`:@@game.crop.rice.shortname:R`,
            description: $localize`:@@game.crop.rice.description:A versatile crop used in many dishes across the world.`,
            maturity: 74,
            lifespan: 135,
            infectionValue: null,
            infectable: true,
            spreadOnHarvest: [],
        },
        millet: {
            displayName: $localize`:@@game.crop.millet.displayname:Millet`,
            shortName: $localize`:@@game.crop.millet.shortname:M`,
            description: $localize`:@@game.crop.millet.description:A hardy crop that is resistant to many environmental factors.`,
            maturity: 15,
            lifespan: 37,
            infectionValue: null,
            infectable: true,
            spreadOnHarvest: [],
        },
        clover: {
            displayName: $localize`:@@game.crop.clover.displayname:Clover`,
            shortName: $localize`:@@game.crop.clover.shortname:Cl`,
            description: $localize`:@@game.crop.clover.description:A common plant seen as a symbol of good fortune.`,
            maturity: 20,
            lifespan: 58,
            infectionValue: null,
            infectable: true,
            spreadOnHarvest: [],
        },
        gclover: {
            displayName: $localize`:@@game.crop.gclover.displayname:Golden Clover`,
            shortName: $localize`:@@game.crop.gclover.shortname:GC`,
            description: $localize`:@@game.crop.gclover.description:A clover made out of gold.`,
            maturity: 5,
            lifespan: 10,
            infectionValue: null,
            infectable: true,
            spreadOnHarvest: [],
        },
        lily: {
            displayName: $localize`:@@game.crop.lily.displayname:Lily`,
            shortName: $localize`:@@game.crop.lily.shortname:L`,
            description: $localize`:@@game.crop.lily.description:A flower that grows in water.`,
            maturity: 9,
            lifespan: 13,
            infectionValue: null,
            infectable: true,
            spreadOnHarvest: [],
        },
        wort: {
            displayName: $localize`:@@game.crop.wort.displayname:Wort`,
            shortName: $localize`:@@game.crop.wort.shortname:Wo`,
            description: $localize`:@@game.crop.wort.description:An immortal plant.`,
            maturity: 164,
            lifespan: null,
            infectionValue: null,
            infectable: false,
            spreadOnHarvest: [],
        },
        berry: {
            displayName: $localize`:@@game.crop.berry.displayname:Berry`,
            shortName: $localize`:@@game.crop.berry.shortname:B`,
            description: $localize`:@@game.crop.berry.description:A small fruit often eaten as a snack.`,
            maturity: 34,
            lifespan: 67,
            infectionValue: null,
            infectable: true,
            spreadOnHarvest: []
        },
        root: {
            displayName: $localize`:@@game.crop.root.displayname:Root`,
            shortName: $localize`:@@game.crop.root.shortname:Ro`,
            description: $localize`:@@game.crop.root.description:A plant seemingly only consisting of underground components.`,
            maturity: 7,
            lifespan: 25,
            infectionValue: null,
            infectable: true,
            spreadOnHarvest: []
        },
        wroot: {
            displayName: $localize`:@@game.crop.wroot.displayname:White Root`,
            shortName: $localize`:@@game.crop.wroot.shortname:WR`,
            description: $localize`:@@game.crop.wroot.description:A pure-white root.`,
            maturity: 7,
            lifespan: 25,
            infectionValue: null,
            infectable: true,
            spreadOnHarvest: []
        },
        weed: {
            displayName: $localize`:@@game.crop.weed.displayname:Weed`,
            shortName: $localize`:@@game.crop.weed.shortname:X`,
            description: $localize`:@@game.crop.weed.description:An unwanted plant that kills nearby crops. Cannot be smoked.`,
            maturity: 4,
            lifespan: 8,
            infectionValue: 0.05,
            infectable: true,
            spreadOnHarvest: ["mold", "spore"],
        },
        bloom: {
            displayName: $localize`:@@game.crop.bloom.displayname:Bloom`,
            shortName: $localize`:@@game.crop.bloom.shortname:Bl`,
            description: $localize`:@@game.crop.bloom.description:A flowering plant producing large and beautiful flowers.`,
            maturity: 20,
            lifespan: 34,
            infectionValue: null,
            infectable: true,
            spreadOnHarvest: []
        },
        rose: {
            displayName: $localize`:@@game.crop.rose.displayname:Rose`,
            shortName: $localize`:@@game.crop.rose.shortname:Rs`,
            description: $localize`:@@game.crop.rose.description:A beautiful flower with a thorny stem.`,
            maturity: 18,
            lifespan: 58,
            infectionValue: null,
            infectable: true,
            spreadOnHarvest: []
        },
        tulip: {
            displayName: $localize`:@@game.crop.tulip.displayname:Tulip`,
            shortName: $localize`:@@game.crop.tulip.shortname:Tu`,
            description: $localize`:@@game.crop.tulip.description:A bulbous herb that grows in temperate regions.`,
            maturity: 40,
            lifespan: 67,
            infectionValue: null,
            infectable: true,
            spreadOnHarvest: []
        },
        fern: {
            displayName: $localize`:@@game.crop.fern.displayname:Fern`,
            shortName: $localize`:@@game.crop.fern.shortname:Fe`,
            description: $localize`:@@game.crop.fern.description:A non-flowering plant that reproduces by spores rather than seeds.`,
            maturity: 300,
            lifespan: 1000,
            infectionValue: null,
            infectable: true,
            spreadOnHarvest: []
        },
        lichen: {
            displayName: $localize`:@@game.crop.lichen.displayname:Lichen`,
            shortName: $localize`:@@game.crop.lichen.shortname:Li`,
            description: $localize`:@@game.crop.lichen.description:A fungus and a plant living under mutual symbiosis.`,
            maturity: 10,
            lifespan: 15,
            infectionValue: null,
            infectable: true,
            spreadOnHarvest: []
        },
        moss: {
            displayName: $localize`:@@game.crop.moss.displayname:Moss`,
            shortName: $localize`:@@game.crop.moss.shortname:Mo`,
            description: $localize`:@@game.crop.moss.description:A flowerless plant that's able to grow in the toughest conditions.`,
            maturity: 10,
            lifespan: 16,
            infectionValue: null,
            infectable: true,
            spreadOnHarvest: []
        },
        beet: {
            displayName: $localize`:@@game.crop.beet.displayname:Beet`,
            shortName: $localize`:@@game.crop.beet.shortname:BT`,
            description: $localize`:@@game.crop.beet.description:A plant often used to make sugar.`,
            maturity: 67,
            lifespan: 84,
            infectionValue: null,
            infectable: false,
            spreadOnHarvest: []
        },
        jbeet: {
            displayName: $localize`:@@game.crop.jbeet.displayname:Juicy Beet`,
            shortName: $localize`:@@game.crop.jbeet.shortname:JB`,
            description: $localize`:@@game.crop.jbeet.description:An extremely sugary variant of the beet.`,
            maturity: 1063,
            lifespan: 1250,
            infectionValue: null,
            infectable: false,
            spreadOnHarvest: []
        },
        tater: {
            displayName: $localize`:@@game.crop.tater.displayname:Tater`,
            shortName: $localize`:@@game.crop.tater.shortname:Ta`,
            description: $localize`:@@game.crop.tater.description:A potato.`,
            maturity: 212,
            lifespan: 223,
            infectionValue: null,
            infectable: false,
            spreadOnHarvest: []
        },
        bulb: {
            displayName: $localize`:@@game.crop.bulb.displayname:Bulb`,
            shortName: $localize`:@@game.crop.bulb.shortname:Bu`,
            description: $localize`:@@game.crop.bulb.description:A toxic bulbous plant that is extremely dangerous to harvest.`,
            maturity: 18,
            lifespan: 29,
            infectionValue: null,
            infectable: false,
            spreadOnHarvest: []
        },
        grass: {
            displayName: $localize`:@@game.crop.grass.displayname:Grass`,
            shortName: $localize`:@@game.crop.grass.shortname:G`,
            description: $localize`:@@game.crop.grass.description:A common plant found everywhere.`,
            maturity: 80,
            lifespan: 200,
            infectionValue: null,
            infectable: true,
            spreadOnHarvest: []
        },
        daisy: {
            displayName: $localize`:@@game.crop.daisy.displayname:Daisy`,
            shortName: $localize`:@@game.crop.daisy.shortname:D`,
            description: $localize`:@@game.crop.daisy.description:A symbol of purity and rebirth.`,
            maturity: 250,
            lifespan: null,
            infectionValue: null,
            infectable: false,
            spreadOnHarvest: []
        },
        mildew: {
            displayName: $localize`:@@game.crop.mildew.displayname:Mildew`,
            shortName: $localize`:@@game.crop.mildew.shortname:WM`,
            description: $localize`:@@game.crop.mildew.description:A fungus commonly found in damp areas.`,
            maturity: 5,
            lifespan: 8,
            infectionValue: null,
            infectable: true,
            spreadOnHarvest: []
        },
        mold: {
            displayName: $localize`:@@game.crop.mold.displayname:Mold`,
            shortName: $localize`:@@game.crop.mold.shortname:BM`,
            description: $localize`:@@game.crop.mold.description:A fungus commonly found in damp areas.`,
            maturity: 5,
            lifespan: 8,
            infectionValue: null,
            infectable: true,
            spreadOnHarvest: []
        },
        spore: {
            displayName: $localize`:@@game.crop.spore.displayname:Spore`,
            shortName: $localize`:@@game.crop.spore.shortname:Sp`,
            description: $localize`:@@game.crop.spore.description:A simple fungus consisting of a single pod.`,
            maturity: 15,
            lifespan: 23,
            infectionValue: 0.03,
            infectable: false,
            spreadOnHarvest: []
        },
        shroom: {
            displayName: $localize`:@@game.crop.shroom.displayname:Shroom`,
            shortName: $localize`:@@game.crop.shroom.shortname:Sh`,
            description: $localize`:@@game.crop.shroom.description:A more complex fungus sometimes eaten as food. Sometimes poisonous.`,
            maturity: 43,
            lifespan: 50,
            infectionValue: 0.03,
            infectable: false,
            spreadOnHarvest: []
        },
        morel: {
            displayName: $localize`:@@game.crop.morel.displayname:Morel`,
            shortName: $localize`:@@game.crop.morel.shortname:Mr`,
            description: $localize`:@@game.crop.morel.description:An edible sac fungus.`,
            maturity: 7,
            lifespan: 9,
            infectionValue: null,
            infectable: true,
            spreadOnHarvest: []
        },
        cap: {
            displayName: $localize`:@@game.crop.cap.displayname:Cap`,
            shortName: $localize`:@@game.crop.cap.shortname:Ca`,
            description: $localize`:@@game.crop.cap.description:A small toadstool consisting of a hard cap.`,
            maturity: 3,
            lifespan: 8,
            infectionValue: null,
            infectable: true,
            spreadOnHarvest: []
        },
        bolete: {
            displayName: $localize`:@@game.crop.bolete.displayname:Bolete`,
            shortName: $localize`:@@game.crop.bolete.shortname:Bo`,
            description: $localize`:@@game.crop.bolete.description:A toadstool with a unique cap.`,
            maturity: 3,
            lifespan: 6,
            infectionValue: null,
            infectable: true,
            spreadOnHarvest: []
        },
        gill: {
            displayName: $localize`:@@game.crop.gill.displayname:Gill`,
            shortName: $localize`:@@game.crop.gill.shortname:Gi`,
            description: $localize`:@@game.crop.gill.description:A wrinkly fungus that repels pests.`,
            maturity: 26,
            lifespan: 40,
            infectionValue: null,
            infectable: true,
            spreadOnHarvest: []
        },
        rot: {
            displayName: $localize`:@@game.crop.rot.displayname:Dry Rot`,
            shortName: $localize`:@@game.crop.rot.shortname:DR`,
            description: $localize`:@@game.crop.rot.description:A dangerous fungus that poses a serious threat to wooden infrastructure.`,
            maturity: 4,
            lifespan: 6,
            infectionValue: null,
            infectable: true,
            spreadOnHarvest: []
        },
        ichor: {
            displayName: $localize`:@@game.crop.ichor.displayname:Ichor`,
            shortName: $localize`:@@game.crop.ichor.shortname:Ic`,
            description: $localize`:@@game.crop.ichor.description:A fungus that oozes a poisonous sap.`,
            maturity: 20,
            lifespan: 58,
            infectionValue: null,
            infectable: true,
            spreadOnHarvest: []
        }
    },
    mutations: [
        {
            target: "wheat",
            requires: { wheat: { min: 2, max: 8, mature: true } },
            chance: 0.2,
        },
        {
            target: "wheat",
            requires: { corn: { min: 2, max: 8, mature: true } },
            chance: 0.05,
        },
        {
            target: "corn",
            requires: { wheat: { min: 2, max: 8, mature: true } },
            chance: 0.05,
        },
        {
            target: "corn",
            requires: { corn: { min: 2, max: 8, mature: true } },
            chance: 0.1,
        },
        {
            target: "corn",
            requires: { rice: { min: 2, max: 8, mature: true } },
            chance: 0.02,
        },
        {
            target: "rice",
            requires: {
                wheat: { min: 1, max: 8, mature: true },
                corn: { min: 1, max: 8, mature: true },
            },
            chance: 0.01,
        },
        {
            target: "millet",
            requires: {
                rice: { min: 1, max: 8, mature: true },
                corn: { min: 1, max: 8, mature: true },
            },
            chance: 0.03,
        },
        {
            target: "clover",
            requires: {
                wheat: { min: 1, max: 8, mature: true },
                millet: { min: 1, max: 8, mature: true },
            },
            chance: 0.03,
        },
        {
            target: "clover",
            requires: {
                clover: { min: 2, max: 4, mature: true },
            },
            chance: 0.007,
        },
        {
            target: "gclover",
            requires: {
                wheat: { min: 1, max: 8, mature: true },
                millet: { min: 1, max: 8, mature: true },
            },
            chance: 0.0007,
        },
        {
            target: "gclover",
            requires: {
                clover: { min: 2, max: 4, mature: true },
            },
            chance: 0.000098,
        },
        {
            target: "gclover",
            requires: {
                clover: { min: 4, max: 4, mature: true },
            },
            chance: 0.000792,
        },
        {
            target: "gclover",
            requires: {
                clover: { min: 5, max: 8, mature: true },
            },
            chance: 0.0007,
        },
        {
            target: "lily",
            requires: {
                clover: { min: 1, max: 8, mature: true },
                millet: { min: 1, max: 8, mature: true },
            },
            chance: 0.02,
        },
        {
            target: "wort",
            requires: {
                lily: { min: 1, max: 8, mature: true },
                rice: { min: 1, max: 8, mature: true },
            },
            chance: 0.01,
        },
        {
            target: "wort",
            requires: {
                gill: { min: 1, max: 8, mature: true },
                rice: { min: 1, max: 8, mature: true },
            },
            chance: 0.002,
        },
        {
            target: "berry",
            requires: {
                wheat: { min: 2, max: 8, mature: true },
            },
            chance: 0.001,
        },
        {
            target: "root",
            requires: {
                wheat: { min: 1, max: 8, mature: true },
                mold: { min: 1, max: 8, mature: false },
            },
            chance: 0.1,
        },
        {
            target: "wroot",
            requires: {
                wheat: { min: 1, max: 8, mature: true },
                mildew: { min: 1, max: 8, mature: false },
            },
            chance: 0.1,
        },
        {
            target: "weed",
            requires: { weed: { min: 1, max: 3, mature: true } },
            chance: 0.15,
        },
        {
            target: "weed",
            requires: { "": { min: 8, max: 8, mature: false } },
            chance: 0.002,
        },
        {
            target: "bloom",
            requires: {
                lily: { min: 1, max: 8, mature: true },
                wroot: { min: 1, max: 8, mature: true },
            },
            chance: 0.01,
        },
        {
            target: "rose",
            requires: {
                lily: { min: 1, max: 8, mature: true },
                bloom: { min: 1, max: 8, mature: true },
            },
            chance: 0.05,
        },
        {
            target: "rose",
            requires: {
                rose: { min: 2, max: 8, mature: true },
            },
            chance: 0.005,
        },
        {
            target: "tulip",
            requires: {
                bloom: { min: 2, max: 8, mature: true },
            },
            chance: 0.05,
        },
        {
            target: "fern",
            requires: {
                root: { min: 1, max: 8, mature: true },
                moss: { min: 1, max: 8, mature: true },
            },
            chance: 0.005,
        },
        {
            target: "lichen",
            requires: {
                rice: { min: 1, max: 8, mature: true },
                moss: { min: 1, max: 8, mature: true },
            },
            chance: 0.005,
        },
        {
            target: "lichen",
            requires: {
                rice: { min: 1, max: 8, mature: true },
                mildew: { min: 1, max: 8, mature: true },
            },
            chance: 0.005,
        },
        {
            target: "lichen",
            requires: {
                lichen: { min: 1, max: 1, mature: true },
            },
            chance: 0.05,
        },
        {
            target: "moss",
            requires: {
                rot: { min: 1, max: 8, mature: true },
                mold: { min: 1, max: 8, mature: true },
            },
            chance: 0.1,
        },
        {
            target: "moss",
            requires: {
                moss: { min: 1, max: 1, mature: true },
            },
            chance: 0.05,
        },
        {
            target: "beet",
            requires: {
                berry: { min: 1, max: 8, mature: true },
                root: { min: 1, max: 8, mature: true },
            },
            chance: 0.01,
        },
        {
            target: "jbeet",
            requires: {
                beet: { min: 8, max: 8, mature: true },
            },
            chance: 0.001,
        },
        {
            target: "tater",
            requires: {
                beet: { min: 2, max: 8, mature: true },
            },
            chance: 0.001,
        },
        {
            target: "bulb",
            requires: {
                gill: { min: 1, max: 8, mature: true },
                wort: { min: 1, max: 8, mature: true },
            },
            chance: 0.001,
        },
        {
            target: "bulb",
            requires: {
                wort: { min: 5, max: 8, mature: true },
            },
            chance: 0.001,
        },
        {
            target: "bulb",
            requires: {
                tater: { min: 3, max: 8, mature: false },
            },
            chance: 0.005,
        },
        {
            target: "bulb",
            requires: {
                shroom: { min: 4, max: 8, mature: false },
            },
            chance: 0.002,
        },
        {
            target: "bulb",
            requires: {
                beet: { min: 5, max: 8, mature: true },
            },
            chance: 0.001,
        },
        {
            target: "bulb",
            requires: {
                bulb: { min: 1, max: 1, mature: false },
            },
            chance: 0.005,
        },
        {
            target: "grass",
            requires: {
                wheat: {min: 1, max: 8, mature: true},
                wroot: {min: 1, max: 8, mature: true}
            },
            chance: 0.002,
        },
        {
            target: "daisy",
            requires: {
                grass: {min: 3, max: 8, mature: true},
                wort: {min: 3, max: 8, mature: true}
            },
            chance: 0.002,
        },
        {
            target: "mildew",
            requires: {
                mold: {min: 1, max: 8, mature: true},
                mildew: {min: 0, max: 1, mature: true}
            },
            chance: 0.5,
        },
        {
            target: "mildew",
            requires: {
                mold: {min: 1, max: 8, mature: true},
                mildew: {min: 0, max: 1, mature: true}
            },
            chance: 0.5,
        },
        {
            target: "mold",
            requires: {
                mildew: {min: 1, max: 8, mature: true},
                mold: {min: 0, max: 1, mature: true}
            },
            chance: 0.5,
        },
        {
            target: "spore",
            requires: {
                spore: {min: 1, max: 1, mature: true},
            },
            chance: 0.07,
        },
        {
            target: "spore",
            requires: {
                shroom: {min: 2, max: 8, mature: true},
            },
            chance: 0.005,
        },
        {
            target: "shroom",
            requires: {
                spore: {min: 2, max: 8, mature: true},
            },
            chance: 0.005,
        },
        {
            target: "shroom",
            requires: {
                shroom: {min: 1, max: 1, mature: true},
            },
            chance: 0.07,
        },
        {
            target: "morel",
            requires: {
                spore: {min: 1, max: 8, mature: true},
                corn: {min: 1, max: 8, mature: true},
            },
            chance: 0.02,
        },
        {
            target: "cap",
            requires: {
                spore: {min: 1, max: 8, mature: true},
                lily: {min: 1, max: 8, mature: true},
            },
            chance: 0.04,
        },
        {
            target: "bolete",
            requires: {
                shroom: {min: 1, max: 8, mature: true},
                rot: {min: 1, max: 8, mature: true},
            },
            chance: 0.04,
        },
        {
            target: "gill",
            requires: {
                spore: {min: 1, max: 8, mature: true},
                mold: {min: 1, max: 8, mature: true},
            },
            chance: 0.06,
        },
        {
            target: "rot",
            requires: {
                mildew: {min: 1, max: 8, mature: true},
                clover: {min: 1, max: 8, mature: true},
            },
            chance: 0.05,
        },
        {
            target: "ichor",
            requires: {
                spore: {min: 1, max: 8, mature: true},
                wort: {min: 1, max: 8, mature: true},
            },
            chance: 0.002,
        },
    ],
    initialCrops: ["wheat"],
    fieldSize: [6, 6],
};
