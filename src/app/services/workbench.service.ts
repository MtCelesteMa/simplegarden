import { Injectable, inject, LOCALE_ID } from "@angular/core";
import { PersistedValue } from "./persistence.service";
import * as g from "../../game";

@Injectable({
    providedIn: "root",
})
export class WorkbenchService {
    locale = inject(LOCALE_ID);
    workbench: g.Workbench | null = null;
    private dataPack = new PersistedValue<g.d.d.v1.DataPack>("wb_dataPack");

    constructor() {
        if (this.dataPack.isCached) {
            this.workbench = new g.Workbench(this.dataPack.value);
        }
    }
}
