import { Component, inject, OnInit } from "@angular/core";
import { FileService } from "../../services/file.service";
import { ManagerService } from "../../services/manager.service";
import { RoutingService } from "../../services/routing.service";
import { PersistenceService } from "../../services/persistence.service";
import { TimePipe } from "../../services/time.pipe";
import { FieldComponent } from "./field/field.component";
import { SeedLogComponent } from "./seed-log/seed-log.component";
import { TrophyCaseComponent } from "./trophy-case/trophy-case.component";

@Component({
    selector: "app-game-page",
    standalone: true,
    imports: [TimePipe, FieldComponent, SeedLogComponent, TrophyCaseComponent],
    templateUrl: "./game-page.component.html",
})
export class GamePageComponent implements OnInit {
    fileService = inject(FileService);
    manager = inject(ManagerService);
    router = inject(RoutingService);
    persistence = inject(PersistenceService);

    timerHidden: boolean = false;

    ngOnInit(): void {
        if (this.manager.game == null) this.router.page = "welcome";
    }

    exportGame(): void {
        let saveData = JSON.parse(JSON.stringify(this.manager.game!.saveData));
        saveData.playTime = this.manager.timeElapsed;
        this.fileService.download("simplegarden_save", JSON.stringify(saveData));
    }

    returnHome(): void {
        if (
            !confirm(
                $localize`:@@app-game-page.homepage-conf:This does not automatically save your progress. Return to homepage?`,
            )
        )
            return;
        this.persistence.clear();
    }
}
