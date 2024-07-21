import { Injectable } from "@angular/core";
import * as g from "../../game";

@Injectable({
    providedIn: "root",
})
export class ManagerService {
    game: g.Game | null = null;
    curTime: number = new Date().getTime();

    get timeElapsed(): number {
        if (this.game == null) return 0;
        return (this.curTime - this.game.sessStartTime) + this.game.saveData.playTime;
    }

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
        let saveData = JSON.parse(JSON.stringify(this.game!.saveData));
        saveData.playTime = this.timeElapsed;
        localStorage.setItem("simplegarden_save", JSON.stringify(saveData));
    }
}
