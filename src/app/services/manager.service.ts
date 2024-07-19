import { Injectable } from "@angular/core";
import * as g from "../../game";

@Injectable({
    providedIn: "root",
})
export class ManagerService {
    game: g.Game | null = null;

    saveExists(): boolean {
        return localStorage.getItem("simplegarden_save") != null;
    }

    saveIsValid(): boolean {
        try {
            g.Game.fromRaw(localStorage.getItem("simplegarden_save"));
            return true;
        } catch {
            return false;
        }
    }

    loadGame(): void {
        this.game = g.Game.fromRaw(localStorage.getItem("simplegarden_save"));
    }

    saveGame(): void {
        localStorage.setItem("simplegarden_save", JSON.stringify(this.game!.saveData));
    }
}
