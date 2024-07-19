import { Component, inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ManagerService } from "../../services/manager.service";

@Component({
    selector: "app-game-page",
    standalone: true,
    imports: [],
    templateUrl: "./game-page.component.html",
})
export class GamePageComponent implements OnInit {
    manager = inject(ManagerService);
    router = inject(Router);

    ngOnInit(): void {
        if (this.manager.game == null) this.router.navigate([""]);
    }
}
