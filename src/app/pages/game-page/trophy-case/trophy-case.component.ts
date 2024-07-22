import { Component, inject } from "@angular/core";
import { TrophyCaseEntryComponent } from "./trophy-case-entry/trophy-case-entry.component";
import { ManagerService } from "../../../services/manager.service";
import * as g from "../../../../game";

@Component({
    selector: "app-trophy-case",
    standalone: true,
    imports: [TrophyCaseEntryComponent],
    templateUrl: "./trophy-case.component.html",
    styleUrl: "./trophy-case.component.scss",
})
export class TrophyCaseComponent {
    manager = inject(ManagerService);

    get nTrophies(): number {
        return Object.entries(this.manager.game!.gameData.trophies).length;
    }

    get nTrophiesObtained(): number {
        return Object.entries(this.manager.game!.saveData.trophies).length;
    }

    get listTrophies(): string[] {
        return Object.entries(this.manager.game!.gameData.trophies).filter(
            (value: [string, g.d.g.v2.TrophyInfo]): boolean => {
                return Object.hasOwn(this.manager.game!.saveData.trophies, value[0]);
            }
        )
        .map((value: [string, g.d.g.v2.TrophyInfo]): string => value[0]);
    }
}
