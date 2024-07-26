import { z } from "zod";
import { versionedData } from "../loader";
import * as g from "../gamedata";

export const cropL10n = z
    .object({
        displayName: z.string(),
        shortName: z.string(),
        description: z.string(),
    })
    .partial();

export type CropL10n = z.infer<typeof cropL10n>;

export const trophyL10n = z
    .object({
        displayName: z.string(),
        flavorText: z.string(),
        description: z.string(),
    })
    .partial();

export type TrophyL10n = z.infer<typeof trophyL10n>;

export const l10nPack = z.object({
    crops: z.object({}).catchall(cropL10n),
    trophies: z.object({}).catchall(trophyL10n),
});

export type L10nPack = z.infer<typeof l10nPack>;

export const i18nInfo = z.object({
    defaultLocale: z.string(),
    locales: z.object({}).catchall(l10nPack),
});

export type I18nInfo = z.infer<typeof i18nInfo>;

export const dataPack = z
    .object({
        name: z.string(),
        author: z.string(),
        authorEmail: z.string().optional(),
        description: z.string(),
        gameData: z.preprocess((raw: unknown): g.v2.GameData => g.loader.loadVersion(raw, 2), g.v2.gameData),
        i18n: i18nInfo,
    })
    .merge(versionedData);

export type DataPack = z.infer<typeof dataPack>;
