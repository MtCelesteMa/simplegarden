import { Injectable, inject, OnDestroy } from "@angular/core";
import { ManagerService } from "./manager.service";

@Injectable({
    providedIn: "root",
})
export class MainloopService implements OnDestroy {
    manager = inject(ManagerService);
    intervalId = setInterval((): void => this.mainloop(), 100);
    multipleUpdates: boolean = false;

    mainloop(): void {
        this.manager.curTime = new Date().getTime();
        if (this.manager.game == null) {
            this.multipleUpdates = false;
            return;
        }
        if (this.manager.curTime - this.manager.game.saveData.lastTick >= this.manager.game.saveData.tickRate) {
            if (this.multipleUpdates) {
                let n = Math.floor((this.manager.curTime - this.manager.game.saveData.lastTick) / this.manager.game.saveData.tickRate);
                for (let i = 0; i < n; i++) this.manager.game.field.updateField();
            }
            else this.manager.game.field.updateField();
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
