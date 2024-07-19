import { Loader } from "../loader";
import * as v1 from "./v1";
export * as v1 from "./v1";

export const loader = new Loader("sg_savedata", 1, v1.saveData, []);
