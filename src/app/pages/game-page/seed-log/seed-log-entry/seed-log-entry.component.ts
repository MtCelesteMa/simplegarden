import { Component, inject, Input } from "@angular/core";
import { DatePipe } from "@angular/common";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { ManagerService } from "../../../../services/manager.service";
import { TimePipe } from "../../../../services/time.pipe";
import * as g from "../../../../../game";

@Component({
    selector: "app-seed-log-entry",
    standalone: true,
    imports: [TimePipe, DatePipe, MatBadgeModule, MatButtonModule, MatCardModule, MatIconModule, MatListModule],
    templateUrl: "./seed-log-entry.component.html",
    styleUrl: "./seed-log-entry.component.scss",
})
export class SeedLogEntryComponent {
    newBadge = $localize`:@@app-seed-log-entry.new:New`;
    manager = inject(ManagerService);
    @Input({ required: true }) crop: string = "";

    get quantity(): number | null {
        return this.manager.game!.saveData.cropsUnlocked[this.crop].quantity;
    }

    get timeDiscovered(): number | null {
        return this.manager.game!.saveData.cropsUnlocked[this.crop].timeDiscovered;
    }

    get cropInfo(): g.d.g.v2.CropInfo {
        return this.manager.game!.gameData.crops[this.crop];
    }

    get listMutations(): [string, string][] {
        return this.manager
            .game!.gameData.mutations.filter((mutation: g.d.g.v2.MutationInfo): boolean => {
                for (let req of Object.entries(mutation.requires)) {
                    if (req[0] == this.crop) return true;
                }
                return false;
            })
            .map((mutation: g.d.g.v2.MutationInfo): string => mutation.target)
            .filter((name: string, index: number, arr: string[]): boolean => {
                return index == arr.length - 1 ? true : !arr.includes(name, index + 1);
            })
            .map((name: string): [string, string] => {
                let dname = this.manager.game!.gameData.crops[name].displayName;
                if (Object.hasOwn(this.manager.game!.saveData.cropsUnlocked, name)) return [dname, dname];
                return [dname, "???"];
            });
    }

    markAsRead(): void {
        this.manager.game!.newCrops = this.manager.game!.newCrops.filter((value: string) => value != this.crop);
    }
}
