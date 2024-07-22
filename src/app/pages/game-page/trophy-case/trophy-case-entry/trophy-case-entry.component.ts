import { Component, inject, Input } from "@angular/core";
import { ManagerService } from "../../../../services/manager.service";

@Component({
    selector: "app-trophy-case-entry",
    standalone: true,
    imports: [],
    templateUrl: "./trophy-case-entry.component.html",
    styleUrl: "./trophy-case-entry.component.scss",
})
export class TrophyCaseEntryComponent {
    manager = inject(ManagerService);
    @Input({required: true}) trophy!: string;

    get name(): string {
        return this.manager.game!.gameData.trophies[this.trophy].displayName;
    }

    get description(): string {
        return this.manager.game!.gameData.trophies[this.trophy].description;
    }
}
