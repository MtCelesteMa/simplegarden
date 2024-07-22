import { Component, inject } from "@angular/core";
import { ManagerService } from "../../../services/manager.service";
import { SeedLogEntryComponent } from "./seed-log-entry/seed-log-entry.component";
import * as g from "../../../../game";

@Component({
    selector: "app-seed-log",
    standalone: true,
    imports: [SeedLogEntryComponent],
    templateUrl: "./seed-log.component.html",
    styleUrl: "./seed-log.component.scss",
})
export class SeedLogComponent {
    manager = inject(ManagerService);

    get nCrops(): number {
        return Object.entries(this.manager.game!.gameData.crops).length;
    }

    get nCropsUnlocked(): number {
        return this.manager.game!.saveData.unlockedCrops.length;
    }

    get listUnlockedCrops(): string[] {
        return Object.entries(this.manager.game!.gameData.crops)
            .filter((value: [string, g.d.g.v1.CropInfo]): boolean => {
                return this.manager.game!.saveData.unlockedCrops.includes(value[0]);
            })
            .map((value: [string, g.d.g.v1.CropInfo]): string => value[0]);
    }
}
