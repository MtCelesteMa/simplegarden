import { Injectable, inject } from "@angular/core";
import { PersistenceService, PersistedValue } from "./persistence.service";
import * as g from "../../game";

@Injectable({
    providedIn: "root",
})
export class ManagerService {
    persistence = inject(PersistenceService);
    game: g.Game | null = null;
    curTime: number = new Date().getTime();
    private saveData = new PersistedValue<g.d.s.v2.SaveData>("saveData");
    private startTime = new PersistedValue<number>("startTime");

    constructor() {
        if (this.saveData.isCached && this.startTime.isCached) {
            try {
                this.game = g.Game.fromRaw(this.saveData.value, this.startTime.value);
            } catch {
                this.persistence.clear();
            }
        }
    }

    get timeElapsed(): number {
        if (this.game == null) return 0;
        return this.curTime - this.game.sessStartTime + this.game.saveData.playTime;
    }

    cacheSave(): void {
        this.saveData.value = this.game!.saveData;
        this.startTime.value = this.game!.sessStartTime;
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
        this.loadGame(localStorage.getItem("simplegarden_save"));
    }

    saveGame(): void {
        let saveData = JSON.parse(JSON.stringify(this.game!.saveData));
        saveData.playTime = this.timeElapsed;
        localStorage.setItem("simplegarden_save", JSON.stringify(saveData));
    }
}
