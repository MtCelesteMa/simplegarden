import { z } from "zod";
import { versionedData } from "../loader";
import * as v1 from "./v1";

export const cropInfo = z.object({
    displayName: z.string(),
    shortName: z.string(),
    description: z.string(),
    maturity: z.number().int().gte(0),
    lifespan: z.number().int().gte(0).nullable(),
    infectionValue: z.number().gte(0).lte(1).nullable(),
    infectable: z.boolean(),
    spreadOnHarvest: z.string().array(),
});

export type CropInfo = z.infer<typeof cropInfo>;

export const mutationRequirement = z.object({
    min: z.number().int().gte(0).lte(8),
    max: z.number().int().gte(0).lte(8),
    mature: z.boolean(),
});

export type MutationRequirement = z.infer<typeof mutationRequirement>;

export const mutationInfo = z.object({
    target: z.string(),
    requires: z.object({}).catchall(mutationRequirement),
    chance: z.number().gte(0).lte(1),
});

export type MutationInfo = z.infer<typeof mutationInfo>;

export const trophyInfo = z.object({
    displayName: z.string(),
    flavorText: z.string(),
    description: z.string(),
    target: z.string(),
    quantity: z.number().gte(1),
});

export type TrophyInfo = z.infer<typeof trophyInfo>;

export const gameData = z
    .object({
        crops: z.object({}).catchall(cropInfo),
        mutations: mutationInfo.array(),
        trophies: z.object({}).catchall(trophyInfo),
        initialCrops: z.string().array(),
        fieldSize: z.tuple([z.number().int().gte(0), z.number().int().gte(0)]),
    })
    .merge(versionedData)
    .refine(validateGameData);

export type GameData = z.infer<typeof gameData>;

function validateGameData(gd: any): boolean {
    let crops = Object.keys(gd.crops);
    crops.push("");
    for (let mutation of gd.mutations) {
        if (!crops.includes(mutation.target)) {
            console.warn(`Crop ${mutation.target} not found.`);
            return false;
        }
        for (let req of Object.keys(mutation.requires)) {
            if (!crops.includes(req)) {
                console.warn(`Crop ${req} not found.`);
                return false;
            }
        }
    }
    for (let trophy of Object.entries(gd.trophies)) {
        if (!crops.includes((trophy[1] as any).target)) return false;
    }
    return true;
}

export function upgrade(raw: unknown): GameData {
    let obj = v1.gameData.parse(raw);
    let newObj: GameData = {
        identifier: obj.identifier,
        version: 2,
        crops: obj.crops,
        mutations: obj.mutations,
        trophies: {},
        initialCrops: obj.initialCrops,
        fieldSize: obj.fieldSize,
    };
    return gameData.parse(newObj);
}
