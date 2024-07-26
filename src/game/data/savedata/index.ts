import { Loader } from "../loader";
import * as v2 from "./v2";
import * as v3 from "./v3";
export * as v3 from "./v3";

export const loader = new Loader("sg_savedata", 3, v3.saveData, [v2.upgrade, v3.upgrade]);
