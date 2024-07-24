import * as d from "../data";
import type { Field } from "./field";

export type Mutation = { target: string; chance: number };

export class FieldTile {
    private coords: [number, number];
    private gameData: d.g.v2.GameData;
    private saveData: d.s.v2.SaveData;

    constructor(coords: [number, number], gameData: d.g.v2.GameData, saveData: d.s.v2.SaveData) {
        this.coords = coords;
        this.gameData = gameData;
        this.saveData = saveData;
    }

    get rowN(): number {
        return this.coords[0];
    }

    get colN(): number {
        return this.coords[1];
    }

    get tile(): d.s.v2.FieldTile {
        return this.saveData.field[this.rowN][this.colN];
    }

    get crop(): string | null {
        return this.tile.crop;
    }

    set crop(value: string | null) {
        this.tile.crop = value;
    }

    get age(): number {
        return this.tile.age;
    }

    set age(value: number) {
        this.tile.age = value;
    }

    get manual(): boolean {
        return this.tile.manual;
    }

    set manual(value: boolean) {
        this.tile.manual = value;
    }

    get cropInfo(): d.g.v2.CropInfo | null {
        if (this.crop == null) return null;
        return JSON.parse(JSON.stringify(this.gameData.crops[this.crop]));
    }

    get isUnlocked(): boolean | null {
        if (this.crop == null) return null;
        return Object.keys(this.saveData.inventory).includes(this.crop);
    }

    get isMature(): boolean | null {
        if (this.crop == null) return null;
        return this.cropInfo!.maturity <= this.age;
    }

    get isImmortal(): boolean | null {
        if (this.crop == null) return null;
        return this.cropInfo!.lifespan == null;
    }

    get isDead(): boolean | null {
        if (this.crop == null) return null;
        if (this.isImmortal!) return false;
        return this.cropInfo!.lifespan! <= this.age;
    }

    plantCrop(crop: string): void {
        this.crop = crop;
        this.age = 0;
        this.manual = false;
    }

    killCrop(): void {
        this.crop = null;
        this.age = 0;
        this.manual = false;
    }

    sowCrop(crop: string): void {
        if (!Object.hasOwn(this.saveData.inventory, crop)) return;
        if (this.saveData.difficulty.limitResources && this.saveData.inventory[crop] != null) {
            if (this.saveData.inventory[crop] < 1) return;
            this.saveData.inventory[crop]--;
        }
        this.plantCrop(crop);
        this.manual = true;
    }

    harvestCrop(): void {
        if (this.crop == null) return;
        if (this.isMature!) {
            if (this.saveData.difficulty.limitResources) {
                if (!this.saveData.difficulty.lrExploitPatch || !this.manual) {
                    if (this.isUnlocked!) {
                        if (this.saveData.inventory[this.crop] != null) this.saveData.inventory[this.crop]! += 1;
                    } else this.saveData.inventory[this.crop] = 1;
                }
                for (let trophy of Object.entries(this.gameData.trophies)) {
                    if (
                        !Object.hasOwn(this.saveData.trophies, trophy[0]) &&
                        trophy[1].target == this.crop &&
                        this.saveData.inventory[this.crop]! >= trophy[1].quantity
                    )
                        this.saveData.trophies[trophy[0]] = new Date().getTime();
                }
            } else {
                if (!this.isUnlocked!) this.saveData.inventory[this.crop] = null;
            }
        }
        if (this.isMature! && this.cropInfo!.spreadOnHarvest.length > 0 && Math.random() < 0.1)
            this.plantCrop(
                this.cropInfo!.spreadOnHarvest[Math.floor(Math.random() * this.cropInfo!.spreadOnHarvest.length)],
            );
        else this.killCrop();
    }

    updateTile(): void {
        if (this.crop == null) return;
        if (!this.isImmortal! || !this.isMature!) this.age++;
        if (this.isDead!) this.killCrop();
    }

    listNeighbors(field: Field): FieldTile[] {
        let neighbors: FieldTile[] = [];
        if (this.rowN > 0 && this.colN > 0) neighbors.push(field.tileAt([this.rowN - 1, this.colN - 1]));
        if (this.rowN > 0) neighbors.push(field.tileAt([this.rowN - 1, this.colN]));
        if (this.rowN > 0 && this.colN < field.nCols - 1) neighbors.push(field.tileAt([this.rowN - 1, this.colN + 1]));
        if (this.colN > 0) neighbors.push(field.tileAt([this.rowN, this.colN - 1]));
        if (this.colN < field.nCols - 1) neighbors.push(field.tileAt([this.rowN, this.colN + 1]));
        if (this.rowN < field.nRows - 1 && this.colN > 0) neighbors.push(field.tileAt([this.rowN + 1, this.colN - 1]));
        if (this.rowN < field.nRows - 1) neighbors.push(field.tileAt([this.rowN + 1, this.colN]));
        if (this.rowN < field.nRows - 1 && this.colN < field.nCols - 1)
            neighbors.push(field.tileAt([this.rowN + 1, this.colN + 1]));
        return neighbors;
    }

    countNeighbors(field: Field): { all: { [k: string]: number }; mature: { [k: string]: number } } {
        let neighbors = this.listNeighbors(field);
        let count: { all: { [k: string]: number }; mature: { [k: string]: number } } = { all: {}, mature: {} };
        for (let neighbor of neighbors) {
            let crop = neighbor.crop == null ? "" : neighbor.crop;
            if (Object.hasOwn(count.all, crop)) count.all[crop]++;
            else count.all[crop] = 1;
            if (neighbor.crop != null && neighbor.isMature!) {
                if (Object.hasOwn(count.mature, crop)) count.mature[crop]++;
                else count.mature[crop] = 1;
            }
        }
        if (neighbors.length < 8) {
            if (Object.hasOwn(count.all, "")) count.all[""] += 8 - neighbors.length;
            else count.all[""] = 8 - neighbors.length;
        }
        return count;
    }

    possibleMutations(field: Field): Mutation[] {
        if (this.crop != null) return [];
        let count = this.countNeighbors(field);
        return this.gameData.mutations
            .filter((mutation: d.g.v2.MutationInfo): boolean => {
                for (let req of Object.entries(mutation.requires)) {
                    if (req[1].min != 0) {
                        if (req[1].mature) {
                            if (!Object.hasOwn(count.mature, req[0]) || count.mature[req[0]] < req[1].min) return false;
                        } else {
                            if (!Object.hasOwn(count.all, req[0]) || count.all[req[0]] < req[1].min) return false;
                        }
                    }
                    if (Object.hasOwn(count.all, req[0]) && count.all[req[0]] > req[1].max) return false;
                }
                return true;
            })
            .map((mutation: d.g.v2.MutationInfo): Mutation => {
                return { target: mutation.target, chance: mutation.chance };
            });
    }

    possibleInfections(field: Field): Mutation[] {
        if (this.crop == null || !this.cropInfo!.infectable) return [];
        let neighbors = this.listNeighbors(field);
        return neighbors
            .filter(
                (tile: FieldTile): boolean =>
                    tile.cropInfo != null && tile.cropInfo.infectionValue != null && tile.isMature!,
            )
            .map((tile: FieldTile): Mutation => {
                return { target: tile.crop!, chance: tile.cropInfo!.infectionValue! };
            });
    }
}
