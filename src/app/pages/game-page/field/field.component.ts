import { Component, inject } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { ManagerService } from "../../../services/manager.service";
import { FieldControllerComponent } from "./field-controller/field-controller.component";
import { FieldTileComponent } from "./field-tile/field-tile.component";
import { TileInfoComponent } from "./tile-info/tile-info.component";
import { TimePipe } from "../../../services/time.pipe";

@Component({
    selector: "app-field",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        FieldControllerComponent,
        FieldTileComponent,
        TileInfoComponent,
        TimePipe,
    ],
    templateUrl: "./field.component.html",
})
export class FieldComponent {
    manager = inject(ManagerService);

    get timeToNextTick(): number {
        return this.manager.game!.saveData.tickRate - (this.manager.curTime - this.manager.game!.saveData.lastTick);
    }
}
