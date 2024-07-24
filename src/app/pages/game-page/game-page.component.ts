import { Component, inject, OnInit } from "@angular/core";
import { ManagerService } from "../../services/manager.service";
import { RoutingService } from "../../services/routing.service";
import { PersistenceService } from "../../services/persistence.service";
import { TimeDisplayComponent } from "../../time-display/time-display.component";
import { FieldComponent } from "./field/field.component";
import { SeedLogComponent } from "./seed-log/seed-log.component";

@Component({
    selector: "app-game-page",
    standalone: true,
    imports: [TimeDisplayComponent, FieldComponent, SeedLogComponent],
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
}
