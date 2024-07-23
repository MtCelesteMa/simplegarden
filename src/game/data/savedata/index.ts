import { Loader } from "../loader";
import * as v2 from "./v2";
export * as v2 from "./v2";

export const loader = new Loader("sg_savedata", 2, v2.saveData, [v2.upgrade]);
