import { Component, inject } from "@angular/core";
import { ReactiveFormsModule, FormControl } from "@angular/forms";
import { FileService } from "../../services/file.service";
import { RoutingService } from "../../services/routing.service";
import { WorkbenchService } from "../../services/workbench.service";
import * as g from "../../../game";

@Component({
    selector: "app-workbench-page",
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: "./workbench-page.component.html",
})
export class WorkbenchPageComponent {
    fileService = inject(FileService);
    router = inject(RoutingService);
    wbService = inject(WorkbenchService);

    importFailed: boolean = false;

    nameInput = new FormControl<string>(this.wbService.dataPack.name);
    authorInput = new FormControl<string>(this.wbService.dataPack.author);
    descriptionInput = new FormControl<string>(this.wbService.dataPack.description);
    defaultLocaleInput = new FormControl<string>(this.wbService.dataPack.i18n.defaultLocale);

    importDatapack(): void {
        if (
            !confirm(
                $localize`:@@app-workbench-page.import-conf:This will overwrite the datapack currently in the editor. Import datapack?`,
            )
        )
            return;
        this.fileService.upload((content: string) => {
            try {
                this.wbService.loadDatapack(content);
                this.importFailed = false;
            } catch {
                this.importFailed = true;
            }
        });
    }

    exportDatapack(): void {
        this.fileService.download(this.wbService.dataPack.name, JSON.stringify(this.wbService.dataPack));
    }

    returnHome(): void {
        if (
            !confirm(
                $localize`:@@app-workbench-page.homepage-conf:This does not automatically save your work. Return to homepage?`,
            )
        )
            return;
        this.router.page = "welcome";
    }
}
