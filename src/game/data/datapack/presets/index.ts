import * as v1 from "../v1";
import { classic } from "./classic";
import { simpleClassic } from "./simpleclassic";

export const presets: { [k: string]: v1.DataPack } = {
    classic: classic,
    simpleClassic: simpleClassic,
};
