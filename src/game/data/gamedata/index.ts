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
        weed: {
            displayName: $localize`:@@game.crop.weed.displayname:Weed`,
            shortName: $localize`:@@game.crop.weed.shortname:X`,
            description: $localize`:@@game.crop.weed.description:An unwanted plant that kill nearby crops. Cannot be smoked.`,
            maturity: 4,
            lifespan: 8,
            infectionValue: 0.05,
            infectable: true,
            spreadOnHarvest: [],
        },
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
            target: "weed",
            requires: { weed: { min: 1, max: 3, mature: true } },
            chance: 0.15,
        },
        {
            target: "weed",
            requires: { "": { min: 8, max: 8, mature: false } },
            chance: 0.002,
        },
    ],
    initialCrops: ["wheat"],
    fieldSize: [6, 6],
};
