import { Component, inject, OnInit } from "@angular/core";
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
    manager = inject(ManagerService);
    router = inject(RoutingService);
    persistence = inject(PersistenceService);

    timerHidden: boolean = false;

    ngOnInit(): void {
        if (this.manager.game == null) this.router.page = "welcome";
    }

    exportGame(): void {
        this.manager.saveGame();
        let blob = new Blob([localStorage.getItem("simplegarden_save")!], { type: "application/json;charset=utf-8" });
        let url = URL.createObjectURL(blob);
        let dl = document.createElement("a");
        dl.href = url;
        dl.download = "simplegarden_save";
        dl.click();
        URL.revokeObjectURL(url);
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
