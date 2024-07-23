import { Injectable, inject, OnDestroy } from "@angular/core";
import { ManagerService } from "./manager.service";

@Injectable({
    providedIn: "root",
})
export class MainloopService implements OnDestroy {
    manager = inject(ManagerService);
    intervalId = setInterval((): void => this.mainloop(), 100);
    private mu: boolean | null = null;

    get multipleUpdates(): boolean {
        let s = sessionStorage.getItem("simplegarden_multipleupdates");
        return this.mu == null ? (s == null ? false : (s == "0" ? false : true)) : this.mu;
    }

    set multipleUpdates(value: boolean) {
        this.mu = value;
        sessionStorage.setItem("simplegarden_multipleupdates", value ? "1" : "0");
    }

    mainloop(): void {
        this.manager.curTime = new Date().getTime();
        if (this.manager.game == null) {
            this.multipleUpdates = false;
            return;
        }
        this.manager.cacheSave();
        if (this.manager.curTime - this.manager.game.saveData.lastTick >= this.manager.game.saveData.tickRate) {
            if (this.multipleUpdates) {
                let n = Math.floor(
                    (this.manager.curTime - this.manager.game.saveData.lastTick) / this.manager.game.saveData.tickRate,
                );
                for (let i = 0; i < Math.min(n, 1440); i++) this.manager.game.field.updateField();
            } else this.manager.game.field.updateField();
            this.manager.game.saveData.lastTick = this.manager.curTime;
        }
        if (this.manager.curTime - this.manager.game.lastSaveTime >= 60000) {
            this.manager.saveGame();
            this.manager.game.lastSaveTime = this.manager.curTime;
        }
        this.multipleUpdates = true;
    }

    ngOnDestroy(): void {
        clearInterval(this.intervalId);
    }
}
