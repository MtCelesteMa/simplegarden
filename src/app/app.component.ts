import { Component, inject, ChangeDetectionStrategy } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MainloopService } from "./services/mainloop.service";
import { HeaderComponent } from "./header/header.component";
import { PagesComponent } from "./pages/pages.component";

@Component({
    selector: "app-root",
    imports: [RouterOutlet, HeaderComponent, PagesComponent],
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: "./app.component.html",
})
export class AppComponent {
    mainloop = inject(MainloopService);
}
