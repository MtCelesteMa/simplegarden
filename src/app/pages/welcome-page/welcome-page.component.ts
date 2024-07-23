import { Component, inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ReactiveFormsModule, FormControl } from "@angular/forms";
import { ManagerService } from "../../services/manager.service";
import { LocaleSelectorComponent } from "./locale-selector/locale-selector.component";
import * as g from "../../../game";

@Component({
    selector: "app-welcome-page",
    standalone: true,
    imports: [ReactiveFormsModule, LocaleSelectorComponent],
    templateUrl: "./welcome-page.component.html",
})
export class WelcomePageComponent implements OnInit {
    manager = inject(ManagerService);
    router = inject(Router);

    customGameData: g.d.g.v2.GameData | null = null;
    customGameDataOption = new FormControl<boolean>(false);
    customGameDataImportFailed: boolean = false;
    difficultySelect = new FormControl<string>("normal");

    gameImportFailed: boolean = false;

    ngOnInit(): void {
        this.manager.game = null;
    }

    loadGame(): void {
        this.manager.loadGame();
        this.router.navigate(["game"]);
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
        this.manager.game = g.Game.newGame(this.customGameData, this.difficultySelect.value!);
        this.router.navigate(["game"]);
    }

    importGameData(): void {
        if (this.customGameDataOption.value) {
            let upl = document.createElement("input");
            upl.type = "file";
            upl.accept = "application/json";
            upl.addEventListener("change", (ev: Event): void => {
                let file = (ev.target as HTMLInputElement).files![0];
                let reader = new FileReader();
                reader.addEventListener("load", (e: ProgressEvent<FileReader>): void => {
                    try {
                        this.customGameData = g.d.g.loader.load(e.target!.result as string);
                        this.customGameDataImportFailed = false;
                    } catch {
                        this.customGameDataImportFailed = true;
                        this.customGameDataOption.setValue(false);
                    }
                });
                reader.readAsText(file);
            });
            upl.click();
        } else {
            this.customGameData = null;
        }
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
                    this.manager.game = g.Game.fromRaw(e.target!.result as string);
                    this.router.navigate(["game"]);
                } catch {
                    this.gameImportFailed = true;
                }
            });
            reader.readAsText(file);
        });
        upl.click();
    }
}
