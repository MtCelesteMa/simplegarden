import { Component, inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ManagerService } from "../../services/manager.service";
import { TimeDisplayComponent } from "../../time-display/time-display.component";

@Component({
    selector: "app-game-page",
    standalone: true,
    imports: [TimeDisplayComponent],
    templateUrl: "./game-page.component.html",
})
export class GamePageComponent implements OnInit {
    manager = inject(ManagerService);
    router = inject(Router);

    timerHidden: boolean = false;

    ngOnInit(): void {
        if (this.manager.game == null) this.router.navigate([""]);
    }
}
