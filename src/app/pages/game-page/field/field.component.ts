import { Component, inject, OnInit } from "@angular/core";
import { ReactiveFormsModule, FormControl } from "@angular/forms";
import { ManagerService } from "../../../services/manager.service";
import { FieldTileComponent } from "./field-tile/field-tile.component";
import { TimePipe } from "../../../services/time.pipe";
import * as g from "../../../../game";

type SoilType = { displayName: string; tickRate: number };

@Component({
    selector: "app-field",
    standalone: true,
    imports: [ReactiveFormsModule, FieldTileComponent, TimePipe],
    templateUrl: "./field.component.html",
})
export class FieldComponent implements OnInit {
    manager = inject(ManagerService);
    soilSelector = new FormControl<string>("");
    soils: { [k: string]: SoilType } = {
        tfertilizer: {
            displayName: $localize`:@@app-field.soil-tfertilizer:Turbo Fertilizer`,
            tickRate: 60000,
        },
        fertilizer: {
            displayName: $localize`:@@app-field.soil-fertilizer:Fertilizer`,
            tickRate: 180000,
        },
        dirt: {
            displayName: $localize`:@@app-field.soil-dirt:Dirt`,
            tickRate: 300000,
        },
        clay: {
            displayName: $localize`:@@app-field.soil-clay:Clay`,
            tickRate: 600000,
        },
        cryo: {
            displayName: $localize`:@@app-field.cryo:Cryo Fluid`,
            tickRate: 1800000,
        },
    };
    freezeOption = new FormControl<boolean>(this.manager.game!.saveData.freeze);

    ngOnInit(): void {
        let rate = this.manager.game!.saveData.tickRate;
        let soil = this.listSoils
            .filter((value: [string, SoilType]): boolean => value[1].tickRate == rate)
            .map((value: [string, SoilType]): string => value[0]);
        this.soilSelector.setValue(soil.length == 1 ? soil[0] : "");
    }

    get listSoils(): [string, SoilType][] {
        return Object.entries(this.soils);
    }

    get timeToNextTick(): number {
        return this.manager.game!.saveData.tickRate - (this.manager.curTime - this.manager.game!.saveData.lastTick);
    }

    get selectedTile(): g.l.FieldTile | null {
        if (this.manager.game!.selectedTile == null) return null;
        return this.manager.game!.field.tiles[this.manager.game!.selectedTile[0]][this.manager.game!.selectedTile[1]];
    }

    get unlockedCrops(): [string, g.d.s.v2.CropUnlockData][] {
        return Object.entries(this.manager.game!.saveData.cropsUnlocked);
    }

    togglePaintMode(ev: Event): void {
        this.manager.game!.paintMode = (ev.target as HTMLInputElement).checked;
    }

    selectCrop(ev: Event): void {
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

    changeSoil(): void {
        this.manager.game!.saveData.tickRate = this.soils[this.soilSelector.value!].tickRate;
    }

    toggleFreeze(): void {
        this.manager.game!.saveData.freeze = this.freezeOption.value!;
    }
}
