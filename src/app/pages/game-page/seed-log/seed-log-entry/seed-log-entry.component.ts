import { Component, inject, Input } from "@angular/core";
import { ManagerService } from "../../../../services/manager.service";
import { TimeDisplayComponent } from "../../../../time-display/time-display.component";
import * as g from "../../../../../game";

@Component({
    selector: "app-seed-log-entry",
    standalone: true,
    imports: [TimeDisplayComponent],
    templateUrl: "./seed-log-entry.component.html",
    styleUrl: "./seed-log-entry.component.scss",
})
export class SeedLogEntryComponent {
    manager = inject(ManagerService);
    @Input({ required: true }) crop: string = "";

    get cropInfo(): g.d.g.v1.CropInfo {
        return this.manager.game!.gameData.crops[this.crop];
    }

    get listMutations(): [string, string][] {
        return this.manager
            .game!.gameData.mutations.filter((mutation: g.d.g.v1.MutationInfo): boolean => {
                for (let req of Object.entries(mutation.requires)) {
                    if (req[0] == this.crop) return true;
                }
                return false;
            })
            .map((mutation: g.d.g.v1.MutationInfo): [string, string] => {
                let name = this.manager.game!.gameData.crops[mutation.target].displayName;
                if (this.manager.game!.saveData.unlockedCrops.includes(mutation.target))
                    return [name, name]
                return [name, "???"];
            });
    }
}
