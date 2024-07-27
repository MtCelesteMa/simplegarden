import { Component, inject } from "@angular/core";
import { RoutingService } from "../../services/routing.service";
import { WorkbenchService } from "../../services/workbench.service";
import { DatapackInitComponent } from "./datapack-init/datapack-init.component";

@Component({
    selector: "app-workbench-page",
    standalone: true,
    imports: [DatapackInitComponent],
    templateUrl: "./workbench-page.component.html",
})
export class WorkbenchPageComponent {
    router = inject(RoutingService);
    wbService = inject(WorkbenchService);
}
