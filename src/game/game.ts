import * as d from "./data";

export class Game {
    gameData: d.g.v1.GameData;
    saveData: d.s.v1.SaveData;

    constructor(gameData: d.g.v1.GameData, saveData: d.s.v1.SaveData) {
        this.gameData = gameData;
        this.saveData = saveData;
    }

    static fromRaw(raw: unknown): Game {
        let saveData = d.s.loader.load(raw);
        if (saveData.gameData == null) return new Game(d.g.loader.load(d.g.simpleClassic), saveData);
        d.g.loader.loadInPlace(saveData.gameData);
        return new Game(saveData.gameData as d.g.v1.GameData, saveData);
    }

    private static emptyField(dims: [number, number]): d.s.v1.FieldTile[][] {
        let field = Array<d.s.v1.FieldTile[]>(dims[0]).fill(Array<d.s.v1.FieldTile>(dims[1]).fill({crop: null, age: 0}));
        return JSON.parse(JSON.stringify(field));
    }

    static newGame(raw: unknown, options: {tickRate?: number, unlockAllCrops?: boolean} = {}): Game {
        let unlockAllCrops: boolean = false;
        let tickRate: number = 60000;
        let gameData = raw == null ? d.g.simpleClassic : d.g.loader.load(raw);
        let saveData: d.s.v1.SaveData = {
            identifier: "sg_savedata",
            version: 1,
            gameData: raw == null ? null : gameData,
            cheat: unlockAllCrops,
            playTime: 0,
            tickRate: tickRate,
            lastTick: new Date().getTime(),
            field: this.emptyField(gameData.fieldSize),
            unlockedCrops: unlockAllCrops ? Object.entries(gameData.crops).map((value: [string, d.g.v1.CropInfo]): string => value[0]) : JSON.parse(JSON.stringify(gameData.initialCrops))
        }
        return new Game(gameData, saveData);
    }
}
