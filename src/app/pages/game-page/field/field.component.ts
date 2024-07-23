import { Component, inject } from "@angular/core";
import { ReactiveFormsModule, FormControl } from "@angular/forms";
import { ManagerService } from "../../../services/manager.service";
import { FieldTileComponent } from "./field-tile/field-tile.component";
import { TimePipe } from "../../../services/time.pipe";
import * as g from "../../../../game";

@Component({
    selector: "app-field",
    standalone: true,
    imports: [ReactiveFormsModule, FieldTileComponent, TimePipe],
    templateUrl: "./field.component.html",
})
export class FieldComponent {
    manager = inject(ManagerService);

    get timeToNextTick(): number {
        return this.manager.game!.saveData.tickRate - (this.manager.curTime - this.manager.game!.saveData.lastTick);
    }

    get selectedTile(): g.l.FieldTile | null {
        if (this.manager.game!.selectedTile == null) return null;
        return this.manager.game!.field.tiles[this.manager.game!.selectedTile[0]][this.manager.game!.selectedTile[1]];
    }

    get unlockedCrops(): string[] {
        return Object.keys(this.manager.game!.saveData.inventory);
    }

    togglePaintMode(ev: Event) {
        this.manager.game!.paintMode = (ev.target as HTMLInputElement).checked;
    }

    selectCrop(ev: Event) {
        let c = (ev.target as HTMLSelectElement).value;
        this.manager.game!.selectedCrop = c != "" ? c : null;
    }

    clearField() {
        if (
            !confirm(
                $localize`:@@app-field.clear-field-conf:Are you sure you want to clear the field? This will not harvest any mature crops!`,
            )
        )
            return;
        this.manager.game!.field.clearField();
    }
}
