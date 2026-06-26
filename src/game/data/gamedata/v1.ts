import { z } from "zod";
import { versionedData } from "../loader";

export const cropInfo = z.object({
    displayName: z.string(),
    shortName: z.string(),
    description: z.string(),
    maturity: z.int().gte(0),
    lifespan: z.int().gte(0).nullable(),
    infectionValue: z.number().gte(0).lte(1).nullable(),
    infectable: z.boolean(),
    spreadOnHarvest: z.string().array(),
});

export type CropInfo = z.infer<typeof cropInfo>;

export const mutationRequirement = z.object({
    min: z.int().gte(0).lte(8),
    max: z.int().gte(0).lte(8),
    mature: z.boolean(),
});

export type MutationRequirement = z.infer<typeof mutationRequirement>;

export const mutationInfo = z.object({
    target: z.string(),
    requires: z.object({}).catchall(mutationRequirement),
    chance: z.number().gte(0).lte(1),
});

export type MutationInfo = z.infer<typeof mutationInfo>;

export const gameData = z
    .object({
        crops: z.object({}).catchall(cropInfo),
        mutations: mutationInfo.array(),
        initialCrops: z.string().array(),
        fieldSize: z.tuple([z.int().gte(0), z.int().gte(0)]),
    })
    .extend(versionedData.shape)
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
    return true;
}
