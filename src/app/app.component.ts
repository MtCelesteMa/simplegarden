import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MainloopService } from "./services/mainloop.service";
import { PagesComponent } from "./pages/pages.component";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [RouterOutlet, PagesComponent],
    templateUrl: "./app.component.html",
})
export class AppComponent {
    mainloop = inject(MainloopService);
}
