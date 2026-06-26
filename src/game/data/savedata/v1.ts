import { z } from "zod";
import { versionedData } from "../loader";

export const fieldTile = z.object({
    crop: z.string().nullable(),
    age: z.int().gte(0),
});

export type FieldTile = z.infer<typeof fieldTile>;

export const saveData = z
    .object({
        gameData: z.unknown(),
        cheat: z.boolean(),
        playTime: z.int().gte(0),
        tickRate: z.int().gte(0),
        lastTick: z.int().gte(0),
        field: fieldTile.array().array(),
        unlockedCrops: z.string().array(),
    })
    .extend(versionedData.shape);

export type SaveData = z.infer<typeof saveData>;
