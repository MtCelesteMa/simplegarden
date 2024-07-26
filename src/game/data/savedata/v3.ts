import { z } from "zod";
import { versionedData } from "../loader";
import * as v2 from "./v2";
import * as g from "../gamedata";
import * as d from "../datapack";

export const fieldTile = z.object({
    crop: z.string().nullable(),
    age: z.number().int().gte(0),
    manual: z.boolean(),
});

export type FieldTile = z.infer<typeof fieldTile>;

export const cropUnlockData = z.object({
    quantity: z.number().int().gte(0).nullable(),
    timeDiscovered: z.number().int().gte(0).nullable(),
});

export type CropUnlockData = z.infer<typeof cropUnlockData>;

export const saveData = z
    .object({
        dataPack: z.preprocess(
            (raw: unknown): d.v1.DataPack | string => (typeof raw == "string" ? raw : d.loader.loadVersion(raw, 1)),
            d.v1.dataPack.or(z.string()),
        ),
        difficulty: z.object({
            limitResources: z.boolean(),
            lrExploitPatch: z.boolean(),
        }),
        playTime: z.number().int().gte(0),
        freeze: z.boolean(),
        tickRate: z.number().int().gte(0),
        lastTick: z.number().int().gte(0),
        field: fieldTile.array().array(),
        cropsUnlocked: z.object({}).catchall(cropUnlockData),
        trophies: z.object({}).catchall(z.number().int().gte(0)),
    })
    .merge(versionedData);

export type SaveData = z.infer<typeof saveData>;

export function gd2dp(raw: unknown): d.v1.DataPack | string {
    if (raw == null) return "classic";
    return {
        identifier: "sg_datapack",
        version: 1,
        name: "unknown",
        author: "unknown",
        description: "",
        gameData: g.loader.loadVersion(raw, 2),
        i18n: {
            defaultLocale: "en-US",
            locales: {},
        },
    };
}

export function upgrade(raw: unknown): SaveData {
    let obj = v2.saveData.parse(raw);
    let newObj: SaveData = {
        identifier: obj.identifier,
        version: 3,
        dataPack: gd2dp(obj.gameData),
        difficulty: obj.difficulty,
        playTime: obj.playTime,
        freeze: obj.freeze,
        tickRate: obj.tickRate,
        lastTick: obj.lastTick,
        field: obj.field,
        cropsUnlocked: obj.cropsUnlocked,
        trophies: obj.trophies,
    };
    return saveData.parse(newObj);
}
