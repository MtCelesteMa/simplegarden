import { z } from "zod";
import { versionedData } from "../loader";

export const fieldTile = z.object({
    crop: z.string().nullable(),
    age: z.number().int().gte(0)
});

export type FieldTile = z.infer<typeof fieldTile>;

export const saveData = z.object({
    gameData: z.unknown(),
    cheat: z.boolean(),
    playTime: z.number().int().gte(0),
    tickRate: z.number().int().gte(0),
    lastTick: z.number().int().gte(0),
    field: fieldTile.array().array(),
    unlockedCrops: z.string().array()
}).merge(versionedData);

export type SaveData = z.infer<typeof saveData>;
