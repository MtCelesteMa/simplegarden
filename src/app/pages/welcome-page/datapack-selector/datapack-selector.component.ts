import { Component, inject, LOCALE_ID, EventEmitter, Input, Output } from "@angular/core";
import { ReactiveFormsModule, FormControl } from "@angular/forms";
import * as g from "../../../../game";

@Component({
    selector: "app-datapack-selector",
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: "./datapack-selector.component.html",
})
export class DatapackSelectorComponent {
    locale = inject(LOCALE_ID);
    @Input() datapack: string | g.d.d.v1.DataPack = "classic";
    @Output() datapackChange = new EventEmitter<string | g.d.d.v1.DataPack>();

    modeSelect = new FormControl<string>(typeof this.datapack == "string" ? "builtin" : "custom");
    builtInSelect = new FormControl<string>(typeof this.datapack == "string" ? this.datapack : "");
    importFailed: boolean = false;

    get builtInPack(): g.d.d.v1.DataPack | null {
        if (typeof this.datapack != "string" || !Object.hasOwn(g.d.d.presets, this.datapack)) return null;
        return g.d.d.presets[this.datapack];
    }

    get customPack(): g.d.d.v1.DataPack | null {
        if (typeof this.datapack == "string") return null;
        return this.datapack;
    }

    listBuiltIn(): [string, g.d.d.v1.DataPack][] {
        return Object.entries(g.d.d.presets);
    }

    l10nName(datapack: g.d.d.v1.DataPack): string {
        if (
            this.locale == datapack.i18n.defaultLocale ||
            !Object.hasOwn(datapack.i18n.locales, this.locale) ||
            datapack.i18n.locales[this.locale].name == undefined
        )
            return datapack.name;
        return datapack.i18n.locales[this.locale].name!;
    }

    l10nDescription(datapack: g.d.d.v1.DataPack): string {
        if (
            this.locale == datapack.i18n.defaultLocale ||
            !Object.hasOwn(datapack.i18n.locales, this.locale) ||
            datapack.i18n.locales[this.locale].description == undefined
        )
            return datapack.description;
        return datapack.i18n.locales[this.locale].description!;
    }

    selectBuiltIn(): void {
        this.datapack = this.builtInSelect.value!;
        this.datapackChange.emit(this.datapack);
    }

    importDatapack(): void {
        let upl = document.createElement("input");
        upl.type = "file";
        upl.accept = "application/json";
        upl.addEventListener("change", (ev: Event): void => {
            let file = (ev.target as HTMLInputElement).files![0];
            let reader = new FileReader();
            reader.addEventListener("load", (e: ProgressEvent<FileReader>): void => {
                try {
                    this.datapack = g.d.d.loader.load(e.target!.result as string);
                    this.datapackChange.emit(this.datapack);
                    this.importFailed = false;
                } catch {
                    this.importFailed = true;
                }
            });
            reader.readAsText(file);
        });
        upl.click();
    }
}
