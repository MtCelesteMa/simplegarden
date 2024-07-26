import { Loader } from "../loader";
import * as v2 from "./v2";
export * as v2 from "./v2";

export const loader = new Loader("sg_gamedata", 2, v2.gameData as any, [v2.upgrade]);
