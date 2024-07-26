import { Loader } from "../loader";
import * as g from "../gamedata";
import * as v1 from "./v1";
export * as v1 from "./v1";
export { presets } from "./presets";

export const loader = new Loader("sg_datapack", 1, v1.dataPack, []);

function cropL10n(
    dataPack: v1.DataPack,
    locale: string,
    crop: string,
): { displayName: string; shortName: string; description: string } {
    let displayName = dataPack.gameData.crops[crop].displayName;
    if (
        Object.hasOwn(dataPack.i18n.locales[locale].crops, crop) &&
        dataPack.i18n.locales[locale].crops[crop].displayName != undefined
    )
        displayName = dataPack.i18n.locales[locale].crops[crop].displayName;
    let shortName = dataPack.gameData.crops[crop].shortName;
    if (
        Object.hasOwn(dataPack.i18n.locales[locale].crops, crop) &&
        dataPack.i18n.locales[locale].crops[crop].shortName != undefined
    )
        shortName = dataPack.i18n.locales[locale].crops[crop].shortName;
    let description = dataPack.gameData.crops[crop].description;
    if (
        Object.hasOwn(dataPack.i18n.locales[locale].crops, crop) &&
        dataPack.i18n.locales[locale].crops[crop].description != undefined
    )
        description = dataPack.i18n.locales[locale].crops[crop].description;
    return {
        displayName: displayName,
        shortName: shortName,
        description: description,
    };
}

function trophyL10n(
    dataPack: v1.DataPack,
    locale: string,
    trophy: string,
): { displayName: string; flavorText: string; description: string } {
    let displayName = dataPack.gameData.trophies[trophy].displayName;
    if (
        Object.hasOwn(dataPack.i18n.locales[locale].trophies, trophy) &&
        dataPack.i18n.locales[locale].trophies[trophy].displayName != undefined
    )
        displayName = dataPack.i18n.locales[locale].trophies[trophy].displayName;
    let flavorText = dataPack.gameData.trophies[trophy].flavorText;
    if (
        Object.hasOwn(dataPack.i18n.locales[locale].trophies, trophy) &&
        dataPack.i18n.locales[locale].trophies[trophy].flavorText != undefined
    )
        flavorText = dataPack.i18n.locales[locale].trophies[trophy].flavorText;
    let description = dataPack.gameData.trophies[trophy].description;
    if (
        Object.hasOwn(dataPack.i18n.locales[locale].trophies, trophy) &&
        dataPack.i18n.locales[locale].trophies[trophy].description != undefined
    )
        description = dataPack.i18n.locales[locale].trophies[trophy].description;
    return {
        displayName: displayName,
        flavorText: flavorText,
        description: description,
    };
}

export function gameDataL10n(dataPack: v1.DataPack, locale: string | null = null): g.v2.GameData {
    if (locale == null || locale == dataPack.i18n.defaultLocale || !Object.hasOwn(dataPack.i18n.locales, locale))
        return JSON.parse(JSON.stringify(dataPack.gameData));
    return {
        identifier: dataPack.gameData.identifier,
        version: dataPack.gameData.version,
        crops: Object.fromEntries(
            Object.entries(dataPack.gameData.crops).map((crop: [string, g.v2.CropInfo]): [string, g.v2.CropInfo] => {
                return [
                    crop[0],
                    Object.assign(JSON.parse(JSON.stringify(crop[1])), cropL10n(dataPack, locale, crop[0])),
                ];
            }),
        ),
        mutations: dataPack.gameData.mutations,
        trophies: Object.fromEntries(
            Object.entries(dataPack.gameData.trophies).map(
                (trophy: [string, g.v2.TrophyInfo]): [string, g.v2.TrophyInfo] => {
                    return [
                        trophy[0],
                        Object.assign(JSON.parse(JSON.stringify(trophy[1])), trophyL10n(dataPack, locale, trophy[0])),
                    ];
                },
            ),
        ),
        initialCrops: dataPack.gameData.initialCrops,
        fieldSize: dataPack.gameData.fieldSize,
    };
}
