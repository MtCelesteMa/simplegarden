import { Component, inject, Input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { ManagerService } from "../../../../services/manager.service";
import { TimePipe } from "../../../../services/time.pipe";
import * as g from "../../../../../game";

@Component({
    selector: "app-tile-info",
    standalone: true,
    imports: [MatCardModule, TimePipe],
    templateUrl: "./tile-info.component.html",
})
export class TileInfoComponent {
    @Input({ required: true }) rowN: number = 0;
    @Input({ required: true }) colN: number = 0;
    manager = inject(ManagerService);

    get tile(): g.l.FieldTile {
        return this.manager.game!.field.tileAt([this.rowN, this.colN]);
    }
}
