import { Injectable, inject, OnDestroy } from "@angular/core";
import { ManagerService } from "./manager.service";
import { CachedValue } from "./cache.service";

@Injectable({
    providedIn: "root",
})
export class MainloopService implements OnDestroy {
    manager = inject(ManagerService);
    intervalId = setInterval((): void => this.mainloop(), 100);
    multipleUpdates = new CachedValue<boolean>("simplegarden_multipleupdates", false);

    mainloop(): void {
        this.manager.curTime = new Date().getTime();
        if (this.manager.game == null) {
            this.multipleUpdates.value = false;
            return;
        }
        this.manager.cacheSave();
        if (this.manager.curTime - this.manager.game.saveData.lastTick >= this.manager.game.saveData.tickRate) {
            if (this.multipleUpdates.value) {
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
        this.multipleUpdates.value = true;
    }

    ngOnDestroy(): void {
        clearInterval(this.intervalId);
    }
}
