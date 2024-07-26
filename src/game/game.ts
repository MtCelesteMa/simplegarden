import { inject, LOCALE_ID } from "@angular/core";
import * as d from "./data";
import * as l from "./logic";

export class Game {
    readonly gameData: d.g.v2.GameData;
    readonly saveData: d.s.v3.SaveData;
    readonly field: l.Field;
    readonly sessStartTime: number;
    lastSaveTime: number;
    selectedTile: [number, number] | null = null;
    paintMode: boolean = false;
    selectedCrop: string | null = null;

    constructor(saveData: d.s.v3.SaveData, locale: string | null = null, startTime: number | null = null) {
        this.gameData = d.d.gameDataL10n(
            typeof saveData.dataPack == "string" ? d.d.classic : saveData.dataPack,
            locale,
        );
        this.saveData = saveData;

        this.field = new l.Field(this.gameData, saveData);
        this.sessStartTime = startTime == null ? new Date().getTime() : startTime;
        this.lastSaveTime = this.sessStartTime;
    }

    static fromRaw(raw: unknown, locale: string | null = null, startTime: number | null = null): Game {
        let saveData = d.s.loader.load(raw);
        return new Game(saveData, locale, startTime);
    }

    private static emptyField(dims: [number, number]): d.s.v3.FieldTile[][] {
        let field = Array<d.s.v3.FieldTile[]>(dims[0]).fill(
            Array<d.s.v3.FieldTile>(dims[1]).fill({ crop: null, age: 0, manual: false }),
        );
        return JSON.parse(JSON.stringify(field));
    }

    static newGame(rawDataPack: unknown, difficulty: string, locale: string | null = null): Game {
        let tickRate: number = 60000;
        let dataPack: d.d.v1.DataPack = d.d.loader.load(typeof rawDataPack == "string" ? d.d.classic : rawDataPack);
        let saveData: d.s.v3.SaveData = {
            identifier: "sg_savedata",
            version: 3,
            dataPack: typeof rawDataPack == "string" ? rawDataPack : dataPack,
            difficulty: {
                limitResources: difficulty == "hard" || difficulty == "brutal",
                lrExploitPatch: difficulty == "brutal",
            },
            playTime: 0,
            freeze: false,
            tickRate: tickRate,
            lastTick: new Date().getTime(),
            field: this.emptyField(dataPack.gameData.fieldSize),
            cropsUnlocked: Object.fromEntries(
                dataPack.gameData.initialCrops.map((name: string): [string, d.s.v3.CropUnlockData] => [
                    name,
                    { quantity: null, timeDiscovered: null },
                ]),
            ),
            trophies: {},
        };
        return new Game(saveData, locale);
    }
}
