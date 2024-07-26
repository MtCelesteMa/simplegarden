import { Component, inject, OnInit } from "@angular/core";
import { ReactiveFormsModule, FormControl } from "@angular/forms";
import { ManagerService } from "../../services/manager.service";
import { RoutingService } from "../../services/routing.service";
import { PersistenceService } from "../../services/persistence.service";
import { LocaleSelectorComponent } from "./locale-selector/locale-selector.component";
import { DatapackSelectorComponent } from "./datapack-selector/datapack-selector.component";
import * as g from "../../../game";

@Component({
    selector: "app-welcome-page",
    standalone: true,
    imports: [ReactiveFormsModule, LocaleSelectorComponent, DatapackSelectorComponent],
    templateUrl: "./welcome-page.component.html",
})
export class WelcomePageComponent implements OnInit {
    manager = inject(ManagerService);
    router = inject(RoutingService);
    persistence = inject(PersistenceService);

    difficultySelect = new FormControl<string>("normal");
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
        let blob = new Blob([localStorage.getItem("simplegarden_save")!], { type: "application/json;charset=utf-8" });
        let url = URL.createObjectURL(blob);
        let dl = document.createElement("a");
        dl.href = url;
        dl.download = "simplegarden_save";
        dl.click();
        URL.revokeObjectURL(url);
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
        this.manager.game = g.Game.newGame(this.datapack, this.difficultySelect.value!);
        this.router.page = "game";
    }

    importGame(): void {
        let upl = document.createElement("input");
        upl.type = "file";
        upl.accept = "application/json";
        upl.addEventListener("change", (ev: Event): void => {
            let file = (ev.target as HTMLInputElement).files![0];
            let reader = new FileReader();
            reader.addEventListener("load", (e: ProgressEvent<FileReader>): void => {
                try {
                    this.manager.loadGame(e.target!.result as string);
                    this.router.page = "game";
                } catch {
                    this.gameImportFailed = true;
                }
            });
            reader.readAsText(file);
        });
        upl.click();
    }

    setPersistence(): void {
        this.persistence.location = this.persistenceSelect.value!;
    }
}
