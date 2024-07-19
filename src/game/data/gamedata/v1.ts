import { z } from "zod";
import { versionedData } from "../loader";

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

export const gameData = z
    .object({
        crops: z.object({}).catchall(cropInfo),
        mutations: mutationInfo.array(),
        initialCrops: z.string().array(),
        fieldSize: z.tuple([z.number().int().gte(0), z.number().int().gte(0)]),
    })
    .merge(versionedData);

export type GameData = z.infer<typeof gameData>;
