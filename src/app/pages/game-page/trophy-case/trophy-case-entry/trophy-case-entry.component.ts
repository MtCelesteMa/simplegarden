import { Component, inject, Input } from "@angular/core";
import { DatePipe } from "@angular/common";
import { ManagerService } from "../../../../services/manager.service";

@Component({
    selector: "app-trophy-case-entry",
    standalone: true,
    imports: [DatePipe],
    templateUrl: "./trophy-case-entry.component.html",
    styleUrl: "./trophy-case-entry.component.scss",
})
export class TrophyCaseEntryComponent {
    manager = inject(ManagerService);
    @Input({required: true}) trophy!: string;

    get name(): string {
        return this.manager.game!.gameData.trophies[this.trophy].displayName;
    }

    get flavorText(): string {
        return this.manager.game!.gameData.trophies[this.trophy].flavorText;
    }

    get description(): string {
        return this.manager.game!.gameData.trophies[this.trophy].description;
    }

    get obtainedOn(): number | null {
        if (!Object.hasOwn(this.manager.game!.saveData.trophies, this.trophy)) return null;
        return this.manager.game!.saveData.trophies[this.trophy];
    }
}
