import { z } from "zod";
import { versionedData } from "../loader";
import * as v1 from "./v1";

export const fieldTile = z.object({
    crop: z.string().nullable(),
    age: z.number().int().gte(0),
});

export type FieldTile = z.infer<typeof fieldTile>;

export const saveData = z
    .object({
        gameData: z.unknown(),
        cheat: z.boolean(),
        hardMode: z.boolean(),
        playTime: z.number().int().gte(0),
        tickRate: z.number().int().gte(0),
        lastTick: z.number().int().gte(0),
        field: fieldTile.array().array(),
        inventory: z.object({}).catchall(z.number().int().gte(0).nullable()),
        trophies: z.string().array(),
    })
    .merge(versionedData);

export type SaveData = z.infer<typeof saveData>;

export function upgrade(raw: unknown): SaveData {
    let obj = v1.saveData.parse(raw);
    let newObj: SaveData = {
        identifier: obj.identifier,
        version: 2,
        gameData: obj.gameData,
        cheat: obj.cheat,
        hardMode: false,
        playTime: obj.playTime,
        tickRate: obj.tickRate,
        lastTick: obj.lastTick,
        field: obj.field,
        inventory: Object.fromEntries(obj.unlockedCrops.map((name: string): [string, number | null] => [name, null])),
        trophies: [],
    };
    return saveData.parse(newObj);
}
