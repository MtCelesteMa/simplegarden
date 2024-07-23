import * as d from "./data";
import * as l from "./logic";

export class Game {
    readonly gameData: d.g.v2.GameData;
    readonly saveData: d.s.v2.SaveData;
    readonly field: l.Field;
    readonly sessStartTime: number;
    lastSaveTime: number;
    selectedTile: [number, number] | null = null;
    paintMode: boolean = false;
    selectedCrop: string | null = null;

    constructor(gameData: d.g.v2.GameData, saveData: d.s.v2.SaveData, startTime: number | null = null) {
        this.gameData = gameData;
        this.saveData = saveData;

        this.field = new l.Field(gameData, saveData);
        this.sessStartTime = startTime == null ? new Date().getTime() : startTime;
        this.lastSaveTime = this.sessStartTime;
    }

    static fromRaw(raw: unknown, startTime: number | null = null): Game {
        let saveData = d.s.loader.load(raw);
        if (saveData.gameData == null) return new Game(d.g.loader.load(d.g.simpleClassic), saveData, startTime);
        d.g.loader.loadInPlace(saveData.gameData);
        return new Game(saveData.gameData as d.g.v2.GameData, saveData, startTime);
    }

    private static emptyField(dims: [number, number]): d.s.v2.FieldTile[][] {
        let field = Array<d.s.v2.FieldTile[]>(dims[0]).fill(
            Array<d.s.v2.FieldTile>(dims[1]).fill({ crop: null, age: 0, manual: false }),
        );
        return JSON.parse(JSON.stringify(field));
    }

    static newGame(raw: unknown, difficulty: string): Game {
        let tickRate: number = 60000;
        let gameData: d.g.v2.GameData = raw == null ? d.g.loader.load(d.g.simpleClassic) : d.g.loader.load(raw);
        let saveData: d.s.v2.SaveData = {
            identifier: "sg_savedata",
            version: 2,
            gameData: raw == null ? null : gameData,
            difficulty: {
                limitResources: difficulty == "hard" || difficulty == "brutal",
                lrExploitPatch: difficulty == "brutal",
            },
            playTime: 0,
            tickRate: tickRate,
            lastTick: new Date().getTime(),
            field: this.emptyField(gameData.fieldSize),
            inventory: Object.fromEntries(
                gameData.initialCrops.map((name: string): [string, number | null] => [name, null]),
            ),
            trophies: {},
        };
        return new Game(gameData, saveData);
    }
}
