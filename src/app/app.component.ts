import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MainloopService } from "./services/mainloop.service";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: "./app.component.html",
})
export class AppComponent {
    mainloop = inject(MainloopService);
}
