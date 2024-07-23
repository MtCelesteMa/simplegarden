import { Injectable } from "@angular/core";
import * as g from "../../game";

@Injectable({
    providedIn: "root",
})
export class ManagerService {
    game: g.Game | null = null;
    curTime: number = new Date().getTime();
    
    constructor() {
        let saveData = sessionStorage.getItem("simplegarden_savedata");
        let startTime = sessionStorage.getItem("simplegarden_starttime");
        if (saveData != null && startTime != null) this.game = g.Game.fromRaw(saveData, Number(startTime));
    }

    get timeElapsed(): number {
        if (this.game == null) return 0;
        return this.curTime - this.game.sessStartTime + this.game.saveData.playTime;
    }

    cacheSave(): void {
        sessionStorage.setItem("simplegarden_savedata", JSON.stringify(this.game!.saveData));
        sessionStorage.setItem("simplegarden_starttime", String(this.game!.sessStartTime));
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

    newGame(raw: unknown, difficulty: string): void {
        this.game = g.Game.newGame(raw, difficulty);
    }

    loadGame(raw: unknown): void {
        this.game = g.Game.fromRaw(raw);
    }

    loadGameFromStorage(): void {
        this.loadGame(localStorage.getItem("simplegarden_save"))
    }

    saveGame(): void {
        let saveData = JSON.parse(JSON.stringify(this.game!.saveData));
        saveData.playTime = this.timeElapsed;
        localStorage.setItem("simplegarden_save", JSON.stringify(saveData));
    }
}
