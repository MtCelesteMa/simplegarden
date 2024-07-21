import * as d from "../data";
import { FieldTile, Mutation } from "./fieldtile";

export class Field {
    private tiles: FieldTile[][];
    private gameData: d.g.v1.GameData;
    private saveData: d.s.v1.SaveData;

    constructor(gameData: d.g.v1.GameData, saveData: d.s.v1.SaveData) {
        this.gameData = gameData;
        this.saveData = saveData;
        this.tiles = this.saveData.field.map((row: d.s.v1.FieldTile[], rowN: number): FieldTile[] => {
            return row.map((tile: d.s.v1.FieldTile, colN: number): FieldTile => {
                return new FieldTile([rowN, colN], this.gameData, this.saveData);
            });
        });
    }

    get nRows(): number {
        return this.tiles.length;
    }

    get nCols(): number {
        return this.tiles[0].length;
    }

    tileAt(coords: [number, number]): FieldTile {
        return this.tiles[coords[0]][coords[1]];
    }

    updateField(): void {
        let mutations: (string | null)[][] = this.tiles.map((row: FieldTile[]): (string | null)[] =>
            row.map((tile: FieldTile): string | null => {
                let pmutations = tile
                    .possibleMutations(this)
                    .concat(tile.possibleInfections(this))
                    .filter((mutation: Mutation): boolean => Math.random() < mutation.chance);
                if (pmutations.length > 0) return pmutations[Math.floor(Math.random() * pmutations.length)].target;
                return null;
            }),
        );
        this.tiles.forEach((row: FieldTile[], rowN: number): void => {
            row.forEach((tile: FieldTile, colN: number): void => {
                if (mutations[rowN][colN] == null) tile.updateTile();
                else tile.plantCrop(mutations[rowN][colN]);
            });
        });
    }
}