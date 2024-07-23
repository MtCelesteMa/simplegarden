import { Component, inject, Input } from "@angular/core";
import { ManagerService } from "../../../../services/manager.service";
import * as g from "../../../../../game";

@Component({
    selector: "app-field-tile",
    standalone: true,
    imports: [],
    host: {
        "(click)": "selectTile()",
    },
    templateUrl: "./field-tile.component.html",
    styleUrl: "./field-tile.component.scss",
})
export class FieldTileComponent {
    manager = inject(ManagerService);
    @Input({ required: true }) rowN: number = 0;
    @Input({ required: true }) colN: number = 0;

    get isSelected(): boolean {
        if (this.manager.game!.selectedTile == null) return false;
        return this.manager.game!.selectedTile[0] == this.rowN && this.manager.game!.selectedTile[1] == this.colN;
    }

    get tile(): g.l.FieldTile {
        return this.manager.game!.field.tiles[this.rowN][this.colN];
    }

    get displayName(): string {
        if (this.tile.crop == null) return "";
        if (!this.tile.isUnlocked!) return "?";
        return this.tile.cropInfo!.shortName;
    }

    get isMature(): boolean {
        if (this.tile.crop == null) return false;
        return this.tile.isMature!;
    }

    get isManual(): boolean {
        return this.manager.game!.saveData.difficulty.lrExploitPatch && this.tile.manual;
    }

    selectTile(): void {
        this.manager.game!.selectedTile = [this.rowN, this.colN];
        if (this.manager.game!.paintMode) {
            if (this.tile.crop == null && this.manager.game!.selectedCrop != null) {
                this.tile.sowCrop(this.manager.game!.selectedCrop);
            }
            if (this.tile.crop != null && this.manager.game!.selectedCrop == null) {
                this.tile.harvestCrop();
            }
        }
    }
}
