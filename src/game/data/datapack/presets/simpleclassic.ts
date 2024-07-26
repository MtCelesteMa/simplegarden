import * as v1 from "../v1";

export const simpleClassic: v1.DataPack = {
    identifier: "sg_datapack",
    version: 1,
    name: "Simple Classic",
    author: "Orteil",
    description: "The v0.1.0 experience. Great for short playthroughs.",
    gameData: {
        identifier: "sg_gamedata",
        version: 2,
        crops: {
            wheat: {
                displayName: "Wheat",
                shortName: "W",
                description: "A versatile crop used in the making of many staple foods.",
                maturity: 5,
                lifespan: 13,
                infectionValue: null,
                infectable: true,
                spreadOnHarvest: [],
            },
            corn: {
                displayName: "Corn",
                shortName: "C",
                description: "Another versatile crop used in the making of many staple foods.",
                maturity: 3,
                lifespan: 15,
                infectionValue: null,
                infectable: true,
                spreadOnHarvest: [],
            },
            rice: {
                displayName: "Rice",
                shortName: "R",
                description: "A versatile crop used in many dishes across the world.",
                maturity: 74,
                lifespan: 135,
                infectionValue: null,
                infectable: true,
                spreadOnHarvest: [],
            },
            millet: {
                displayName: "Millet",
                shortName: "M",
                description: "A hardy crop that is resistant to many environmental factors.",
                maturity: 15,
                lifespan: 37,
                infectionValue: null,
                infectable: true,
                spreadOnHarvest: [],
            },
            clover: {
                displayName: "Clover",
                shortName: "Cl",
                description: "A common plant seen as a symbol of good fortune.",
                maturity: 20,
                lifespan: 58,
                infectionValue: null,
                infectable: true,
                spreadOnHarvest: [],
            },
            gclover: {
                displayName: "Golden Clover",
                shortName: "GC",
                description: "A clover made out of gold.",
                maturity: 5,
                lifespan: 10,
                infectionValue: null,
                infectable: true,
                spreadOnHarvest: [],
            },
            lily: {
                displayName: "Lily",
                shortName: "L",
                description: "A flower that grows in water.",
                maturity: 9,
                lifespan: 13,
                infectionValue: null,
                infectable: true,
                spreadOnHarvest: [],
            },
            wort: {
                displayName: "Wort",
                shortName: "Wo",
                description: "An immortal plant.",
                maturity: 164,
                lifespan: null,
                infectionValue: null,
                infectable: false,
                spreadOnHarvest: [],
            },
            weed: {
                displayName: "Weed",
                shortName: "X",
                description: "An unwanted plant that kills nearby crops. Cannot be smoked.",
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
        trophies: {
            corn100: {
                displayName: "Acres of Corn",
                flavorText: "The corn will die soon.",
                description: "Amass 100 Corn",
                target: "corn",
                quantity: 100,
            },
            weed100: {
                displayName: "Drug Lord",
                flavorText: "No, you still can't smoke them.",
                description: "Amass 100 Weed",
                target: "weed",
                quantity: 100,
            },
        },
        initialCrops: ["wheat"],
        fieldSize: [6, 6],
    },
    i18n: {
        defaultLocale: "en-US",
        locales: {
            "zh-TW": {
                name: "簡易經典",
                description: "v0.1.0 體驗。適合短時間通關。",
                crops: {
                    wheat: {
                        displayName: "小麥",
                        shortName: "小麥",
                        description: "一種用途廣泛的莊稼，用於製作許多主食。",
                    },
                    corn: {
                        displayName: "玉米",
                        shortName: "玉米",
                        description: "另一種用途廣泛的莊稼，用於製作許多主食。",
                    },
                    rice: {
                        displayName: "稻米",
                        shortName: "稻米",
                        description: "一種用途廣泛的莊稼，用於世界各地的許多菜餚中。",
                    },
                    millet: {
                        displayName: "小米",
                        shortName: "小米",
                        description: "一種耐多種環境因素的耐寒莊稼。",
                    },
                    clover: {
                        displayName: "三葉草",
                        shortName: "三葉",
                        description: "一種常見的植物，被視為吉祥的象徵。",
                    },
                    gclover: {
                        displayName: "金色三葉草",
                        shortName: "金三",
                        description: "黃金製成的三葉草。",
                    },
                    lily: {
                        displayName: "百合",
                        shortName: "百合",
                        description: "一種生長在水中的花。",
                    },
                    wort: {
                        displayName: "麥芽汁",
                        shortName: "麥芽",
                        description: "一個永生的植物。",
                    },
                    weed: {
                        displayName: "雜草",
                        shortName: "雜草",
                        description: "一種不需要的植物，會殺死附近的莊稼。",
                    },
                },
                trophies: {
                    corn100: {
                        displayName: "無數的玉米",
                        flavorText: "玉米很快也會滅亡",
                        description: "得到100個玉米",
                    },
                    weed100: {
                        displayName: "毒梟",
                        flavorText: "你仍然吸不了雜草",
                        description: "得到100個雜草",
                    },
                },
            },
            "zh-CN": {
                name: "简易经典",
                description: "v0.1.0 体验。适合短时间通关。",
                crops: {
                    wheat: {
                        displayName: "小麦",
                        shortName: "小麦",
                        description: "一种用途广泛的庄稼，用于制作许多主食。",
                    },
                    corn: {
                        displayName: "玉米",
                        shortName: "玉米",
                        description: "另一种用途广泛的庄稼，用于制作许多主食。",
                    },
                    rice: {
                        displayName: "稻米",
                        shortName: "稻米",
                        description: "一种用途广泛的庄稼，用于世界各地的许多菜肴中。",
                    },
                    millet: {
                        displayName: "小米",
                        shortName: "小米",
                        description: "一种耐多种环境因素的耐寒庄稼。",
                    },
                    clover: {
                        displayName: "三叶草",
                        shortName: "三叶",
                        description: "一种常见的植物，被视为吉祥的象征。",
                    },
                    gclover: {
                        displayName: "金色三叶草",
                        shortName: "金三",
                        description: "黄金制成的三叶草。",
                    },
                    lily: {
                        displayName: "百合",
                        shortName: "百合",
                        description: "一种生长在水中的花。",
                    },
                    wort: {
                        displayName: "麦芽汁",
                        shortName: "麦芽",
                        description: "一个永生的植物。",
                    },
                    weed: {
                        displayName: "杂草",
                        shortName: "杂草",
                        description: "一种不需要的植物，会杀死附近的庄稼。",
                    },
                },
                trophies: {
                    corn100: {
                        displayName: "无数的玉米",
                        flavorText: "玉米很快也会灭亡",
                        description: "得到100个玉米",
                    },
                    weed100: {
                        displayName: "毒枭",
                        flavorText: "你仍然吸不了杂草",
                        description: "得到100个杂草",
                    },
                },
            },
        },
    },
};
