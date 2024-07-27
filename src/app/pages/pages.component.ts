import { Component, inject } from "@angular/core";
import { RoutingService } from "../services/routing.service";
import { WelcomePageComponent } from "./welcome-page/welcome-page.component";
import { GamePageComponent } from "./game-page/game-page.component";

@Component({
    selector: "app-pages",
    standalone: true,
    imports: [WelcomePageComponent, GamePageComponent],
    templateUrl: "./pages.component.html",
})
export class PagesComponent {
    router = inject(RoutingService);
}
