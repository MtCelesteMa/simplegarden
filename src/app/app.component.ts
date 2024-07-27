import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MainloopService } from "./services/mainloop.service";
import { HeaderComponent } from "./header/header.component";
import { PagesComponent } from "./pages/pages.component";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, PagesComponent],
    templateUrl: "./app.component.html",
})
export class AppComponent {
    mainloop = inject(MainloopService);
}
