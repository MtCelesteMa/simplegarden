import * as d from "./data";
import * as l from "./logic";

export class Game {
    readonly gameData: d.g.v1.GameData;
    readonly saveData: d.s.v1.SaveData;
    readonly field: l.Field;
    readonly sessStartTime: number;
    lastSaveTime: number;
    selectedTile: [number, number] | null = null;
    paintMode: boolean = false;
    selectedCrop: string | null = null;

    constructor(gameData: d.g.v1.GameData, saveData: d.s.v1.SaveData) {
        this.gameData = gameData;
        this.saveData = saveData;

        this.field = new l.Field(gameData, saveData);
        this.sessStartTime = new Date().getTime();
        this.lastSaveTime = this.sessStartTime;
    }

    static fromRaw(raw: unknown): Game {
        let saveData = d.s.loader.load(raw);
        if (saveData.gameData == null) return new Game(d.g.loader.load(d.g.simpleClassic), saveData);
        d.g.loader.loadInPlace(saveData.gameData);
        return new Game(saveData.gameData as d.g.v1.GameData, saveData);
    }

    private static emptyField(dims: [number, number]): d.s.v1.FieldTile[][] {
        let field = Array<d.s.v1.FieldTile[]>(dims[0]).fill(
            Array<d.s.v1.FieldTile>(dims[1]).fill({ crop: null, age: 0 }),
        );
        return JSON.parse(JSON.stringify(field));
    }

    static newGame(raw: unknown, cheatMode: boolean = false): Game {
        let tickRate: number = 60000;
        let gameData = raw == null ? d.g.loader.load(d.g.simpleClassic) : d.g.loader.load(raw);
        let saveData: d.s.v1.SaveData = {
            identifier: "sg_savedata",
            version: 1,
            gameData: raw == null ? null : gameData,
            cheat: cheatMode,
            playTime: 0,
            tickRate: tickRate,
            lastTick: new Date().getTime(),
            field: this.emptyField(gameData.fieldSize),
            unlockedCrops: JSON.parse(JSON.stringify(gameData.initialCrops)),
        };
        return new Game(gameData, saveData);
    }
}
