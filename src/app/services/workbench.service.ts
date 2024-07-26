import { Injectable, inject, LOCALE_ID } from "@angular/core";
import { PersistedValue } from "./persistence.service";
import * as g from "../../game";

@Injectable({
    providedIn: "root",
})
export class WorkbenchService {
    locale = inject(LOCALE_ID);
    private dataPack_ = new PersistedValue<g.d.d.v1.DataPack>("wb_dataPack");

    constructor() {
        if (!this.dataPack_.isCached) {
            this.newDatapack();
        }
    }

    get dataPack(): g.d.d.v1.DataPack {
        return this.dataPack_.value;
    }

    newDatapack(): void {
        this.dataPack_.value = {
            identifier: "sg_datapack",
            version: 1,
            name: "",
            author: "",
            description: "",
            gameData: {
                identifier: "sg_gamedata",
                version: 2,
                crops: {},
                mutations: [],
                trophies: {},
                initialCrops: [],
                fieldSize: [6, 6],
            },
            i18n: {
                defaultLocale: this.locale,
                locales: {},
            },
        };
    }

    loadDatapack(raw: unknown): void {
        this.dataPack_.value = g.d.d.loader.load(raw);
    }
}
