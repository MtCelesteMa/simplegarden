import { Component, inject, Input } from "@angular/core";
import { ManagerService } from "../../../../services/manager.service";
import { TimePipe } from "../../../../services/time.pipe";
import * as g from "../../../../../game";

@Component({
    selector: "app-seed-log-entry",
    standalone: true,
    imports: [TimePipe],
    templateUrl: "./seed-log-entry.component.html",
    styleUrl: "./seed-log-entry.component.scss",
})
export class SeedLogEntryComponent {
    manager = inject(ManagerService);
    @Input({ required: true }) crop: string = "";

    get quantity(): string {
        if (this.manager.game!.saveData.inventory[this.crop] == null) return "∞";
        return String(this.manager.game!.saveData.inventory[this.crop]);
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
                if (Object.hasOwn(this.manager.game!.saveData.inventory, name)) return [dname, dname];
                return [dname, "???"];
            });
    }
}
