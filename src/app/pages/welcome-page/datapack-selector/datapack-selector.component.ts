import { Component, inject, LOCALE_ID, EventEmitter, Input, Output } from "@angular/core";
import { ReactiveFormsModule, FormControl } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { FileService } from "../../../services/file.service";
import { WorkbenchService } from "../../../services/workbench.service";
import { RoutingService } from "../../../services/routing.service";
import * as g from "../../../../game";

@Component({
    selector: "app-datapack-selector",
    standalone: true,
    imports: [ReactiveFormsModule, MatButtonModule, MatCardModule, MatIconModule, MatRadioModule, MatSelectModule],
    templateUrl: "./datapack-selector.component.html",
})
export class DatapackSelectorComponent {
    locale = inject(LOCALE_ID);
    fileService = inject(FileService);
    wbService = inject(WorkbenchService);
    router = inject(RoutingService);

    @Input() datapack: string | g.d.d.v1.DataPack = "classic";
    @Output() datapackChange = new EventEmitter<string | g.d.d.v1.DataPack>();

    modeSelect = new FormControl<string>(typeof this.datapack == "string" ? "builtin" : "custom");
    builtInSelect = new FormControl<string>(typeof this.datapack == "string" ? this.datapack : "");
    importFailed: boolean = false;
    selectedDatapack: g.d.d.v1.DataPack = g.d.d.presets["classic"];

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
        this.selectedDatapack = g.d.d.presets[this.builtInSelect.value!];
        this.datapackChange.emit(this.datapack);
    }

    importDatapack(): void {
        this.fileService.upload((content: string): void => {
            try {
                this.datapack = g.d.d.loader.load(content);
                this.selectedDatapack = this.datapack;
                this.datapackChange.emit(this.datapack);
                this.importFailed = false;
            } catch {
                this.importFailed = true;
            }
        });
    }

    exportDatapack(): void {
        this.fileService.download(this.selectedDatapack.name, JSON.stringify(this.selectedDatapack));
    }

    openInWorkbench(load: boolean = true): void {
        if (load) this.wbService.workbench = g.Workbench.fromRaw(this.selectedDatapack);
        this.router.page = "workbench";
    }
}
