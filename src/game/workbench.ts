import * as d from "./data";

export class Workbench {
    readonly dataPack: d.d.v1.DataPack;

    constructor(dataPack: d.d.v1.DataPack) {
        this.dataPack = dataPack;
    }

    static fromRaw(raw: unknown): Workbench {
        return new Workbench(d.d.loader.load(raw));
    }

    static newDatapack(name: string, author: string, locale: string): Workbench {
        return new Workbench({
            identifier: "sg_datapack",
            version: 1,
            name: name,
            author: author,
            description: "",
            gameData: {
                identifier: "sg_gamedata",
                version: 2,
                crops: {},
                mutations: [],
                trophies: {},
                initialCrops: [],
                fieldSize: [6, 6],
            },
            i18n: {
                defaultLocale: locale,
                locales: {},
            },
        });
    }

    get name(): string {
        return this.dataPack.name;
    }

    set name(value: string) {
        this.dataPack.name = value;
    }

    get author(): string {
        return this.dataPack.author;
    }

    set author(value: string) {
        this.dataPack.author = value;
    }

    get defaultLocale(): string {
        return this.dataPack.i18n.defaultLocale
    }
}
