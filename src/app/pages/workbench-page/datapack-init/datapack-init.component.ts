import { Component, inject, LOCALE_ID } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { FileService } from "../../../services/file.service";
import { WorkbenchService } from "../../../services/workbench.service";
import * as g from "../../../../game";

@Component({
    selector: "app-datapack-init",
    standalone: true,
    imports: [ReactiveFormsModule, MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatSelectModule],
    templateUrl: "./datapack-init.component.html",
})
export class DatapackInitComponent {
    clocale = inject(LOCALE_ID);
    fileService = inject(FileService);
    wbService = inject(WorkbenchService);

    basicInfo = new FormGroup({
        name: new FormControl<string>(""),
        author: new FormControl<string>(""),
        locale: new FormControl<string>(this.clocale)
    })

    importFailed: boolean = false;

    create(): void {
        this.wbService.workbench = g.Workbench.newDatapack(
            this.basicInfo.value.name!,
            this.basicInfo.value.author!,
            this.basicInfo.value.locale!
        );
    }

    continue(): void {
        this.fileService.upload((content: string): void => {
            try {
                this.wbService.workbench = new g.Workbench(g.d.d.loader.load(content));
            } catch {
                this.importFailed = true;
            }
        });
    }
}
