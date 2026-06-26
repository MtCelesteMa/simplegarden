import { z } from "zod";
import { versionedData } from "../loader";
import * as v1 from "./v1";

export const fieldTile = z.object({
    crop: z.string().nullable(),
    age: z.int().gte(0),
    manual: z.boolean(),
});

export type FieldTile = z.infer<typeof fieldTile>;

export const cropUnlockData = z.object({
    quantity: z.int().gte(0).nullable(),
    timeDiscovered: z.int().gte(0).nullable(),
});

export type CropUnlockData = z.infer<typeof cropUnlockData>;

export const saveData = z
    .object({
        gameData: z.unknown(),
        difficulty: z.object({
            limitResources: z.boolean(),
            lrExploitPatch: z.boolean(),
        }),
        playTime: z.int().gte(0),
        freeze: z.boolean(),
        tickRate: z.int().gte(0),
        lastTick: z.int().gte(0),
        field: fieldTile.array().array(),
        cropsUnlocked: z.object({}).catchall(cropUnlockData),
        trophies: z.object({}).catchall(z.int().gte(0)),
    })
    .extend(versionedData.shape);

export type SaveData = z.infer<typeof saveData>;

export function upgrade(raw: unknown): SaveData {
    let obj = v1.saveData.parse(raw);
    let newObj: SaveData = {
        identifier: obj.identifier,
        version: 2,
        gameData: obj.gameData,
        difficulty: { limitResources: false, lrExploitPatch: false },
        playTime: obj.playTime,
        freeze: false,
        tickRate: obj.tickRate,
        lastTick: obj.lastTick,
        field: obj.field.map((row: v1.FieldTile[]): FieldTile[] =>
            row.map((tile: v1.FieldTile): FieldTile => {
                return { crop: tile.crop, age: tile.age, manual: false };
            }),
        ),
        cropsUnlocked: Object.fromEntries(
            obj.unlockedCrops.map((name: string): [string, CropUnlockData] => [
                name,
                { quantity: null, timeDiscovered: null },
            ]),
        ),
        trophies: {},
    };
    return saveData.parse(newObj);
}
