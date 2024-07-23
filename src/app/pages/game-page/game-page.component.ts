import { Component, inject, OnInit } from "@angular/core";
import { ManagerService } from "../../services/manager.service";
import { RoutingService } from "../../services/routing.service";
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

    timerHidden: boolean = false;

    ngOnInit(): void {
        if (this.manager.game == null) this.router.page = "welcome";
    }
}
