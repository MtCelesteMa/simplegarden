import { Component, inject } from "@angular/core";
import { TrophyCaseEntryComponent } from "./trophy-case-entry/trophy-case-entry.component";
import { ManagerService } from "../../../services/manager.service";

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
        return this.manager.game!.saveData.trophies.length;
    }
}
