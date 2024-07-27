import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { FileService } from "../../../services/file.service";
import { ManagerService } from "../../../services/manager.service";
import { PersistenceService } from "../../../services/persistence.service";
import { TimePipe } from "../../../services/time.pipe";

@Component({
    selector: "app-game-controller",
    standalone: true,
    imports: [MatButtonModule, MatCardModule, MatIconModule, TimePipe],
    templateUrl: "./game-controller.component.html",
})
export class GameControllerComponent {
    fileService = inject(FileService);
    persistence = inject(PersistenceService);
    manager = inject(ManagerService);

    hideTimer: boolean = false;

    exportGame(): void {
        let saveData = JSON.parse(JSON.stringify(this.manager.game!.saveData));
        saveData.playTime = this.manager.timeElapsed;
        this.fileService.download("simplegarden_save", JSON.stringify(saveData));
    }

    returnHome(): void {
        if (
            !confirm(
                $localize`:@@app-game-controller.homepage-conf:This does not automatically save your progress. Return to homepage?`,
            )
        )
            return;
        this.persistence.clear();
    }
}
