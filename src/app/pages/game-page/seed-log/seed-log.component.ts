import { Component, inject } from "@angular/core";
import { ReactiveFormsModule, FormControl } from "@angular/forms";
import { MatBadgeModule } from "@angular/material/badge";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { ManagerService } from "../../../services/manager.service";
import { SeedLogEntryComponent } from "./seed-log-entry/seed-log-entry.component";
import * as g from "../../../../game";

@Component({
    selector: "app-seed-log",
    standalone: true,
    imports: [ReactiveFormsModule, SeedLogEntryComponent, MatBadgeModule, MatCardModule, MatInputModule, MatIconModule],
    templateUrl: "./seed-log.component.html",
    styleUrl: "./seed-log.component.scss",
})
export class SeedLogComponent {
    manager = inject(ManagerService);

    cropSearch = new FormControl<string>("");

    get nCrops(): number {
        return Object.entries(this.manager.game!.gameData.crops).length;
    }

    get nCropsUnlocked(): number {
        return Object.keys(this.manager.game!.saveData.cropsUnlocked).length;
    }

    get listUnlockedCrops(): [string, g.d.g.v2.CropInfo][] {
        return Object.entries(this.manager.game!.gameData.crops).filter(
            (value: [string, g.d.g.v2.CropInfo]): boolean => {
                return Object.hasOwn(this.manager.game!.saveData.cropsUnlocked, value[0]);
            },
        );
    }
}
