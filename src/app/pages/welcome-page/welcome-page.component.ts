import { Component, inject, OnInit } from "@angular/core";
import { ReactiveFormsModule, FormControl } from "@angular/forms";
import { FileService } from "../../services/file.service";
import { ManagerService } from "../../services/manager.service";
import { RoutingService } from "../../services/routing.service";
import { PersistenceService } from "../../services/persistence.service";
import { LocaleSelectorComponent } from "./locale-selector/locale-selector.component";
import { DifficultySelectorComponent } from "./difficulty-selector/difficulty-selector.component";
import { DatapackSelectorComponent } from "./datapack-selector/datapack-selector.component";
import * as g from "../../../game";

@Component({
    selector: "app-welcome-page",
    standalone: true,
    imports: [ReactiveFormsModule, LocaleSelectorComponent, DatapackSelectorComponent, DifficultySelectorComponent],
    templateUrl: "./welcome-page.component.html",
})
export class WelcomePageComponent implements OnInit {
    fileService = inject(FileService);
    manager = inject(ManagerService);
    router = inject(RoutingService);
    persistence = inject(PersistenceService);

    difficulty: string = "normal";
    datapack: string | g.d.d.v1.DataPack = "classic";
    persistenceSelect = new FormControl<string>(this.persistence.location);

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
        this.manager.game = g.Game.newGame(this.datapack, this.difficulty);
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

    setPersistence(): void {
        this.persistence.location = this.persistenceSelect.value!;
    }

    openWorkbench(): void {
        this.router.page = "workbench";
    }
}
