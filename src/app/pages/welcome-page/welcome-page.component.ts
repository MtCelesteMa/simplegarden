import { Component, inject, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { FileService } from "../../services/file.service";
import { ManagerService } from "../../services/manager.service";
import { RoutingService } from "../../services/routing.service";
import { DifficultySelectorComponent } from "./difficulty-selector/difficulty-selector.component";
import { DatapackSelectorComponent } from "./datapack-selector/datapack-selector.component";
import { PersistenceSelectorComponent } from "./persistence-selector/persistence-selector.component";
import * as g from "../../../game";

@Component({
    selector: "app-welcome-page",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatDividerModule,
        MatExpansionModule,
        MatIconModule,
        MatTabsModule,
        DatapackSelectorComponent,
        DifficultySelectorComponent,
        PersistenceSelectorComponent,
    ],
    templateUrl: "./welcome-page.component.html",
})
export class WelcomePageComponent implements OnInit {
    fileService = inject(FileService);
    manager = inject(ManagerService);
    router = inject(RoutingService);

    difficulty: string = "normal";
    datapack: string | g.d.d.v1.DataPack = "classic";

    gameImportFailed: boolean = false;

    ngOnInit(): void {
        this.manager.game = null;
    }

    loadGame(): void {
        this.manager.loadGameFromStorage();
        this.router.page = "game";
    }

    exportGame(): void {
        this.fileService.download("simplegarden_save", localStorage.getItem("simplegarden_save")!);
    }

    eraseGame(): void {
        if (
            !confirm(
                $localize`:@@app-welcome-page.erase-game-conf:Are you sure you want to erase your save? This action is irreversible!`,
            )
        )
            return;
        if (!confirm($localize`:@@app-welcome-page.erase-game-conf-2:ARE YOU SURE?`)) return;
        localStorage.removeItem("simplegarden_save");
    }

    newGame(): void {
        this.manager.newGame(this.datapack, this.difficulty);
        this.router.page = "game";
    }

    importGame(): void {
        this.fileService.upload((content: string): void => {
            try {
                this.manager.loadGame(content);
                this.router.page = "game";
            } catch {
                this.gameImportFailed = true;
            }
        });
    }
}
