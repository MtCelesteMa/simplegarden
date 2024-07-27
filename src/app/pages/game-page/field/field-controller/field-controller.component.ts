import { Component, inject, OnInit } from "@angular/core";
import { ReactiveFormsModule, FormControl } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { ManagerService } from "../../../../services/manager.service";
import { TimePipe } from "../../../../services/time.pipe";
import * as g from "../../../../../game";

type SoilType = { displayName: string; tickRate: number };

@Component({
    selector: "app-field-controller",
    standalone: true,
    imports: [ReactiveFormsModule, MatButtonModule, MatCheckboxModule, MatIconModule, MatSelectModule, TimePipe],
    templateUrl: "./field-controller.component.html",
})
export class FieldControllerComponent implements OnInit {
    manager = inject(ManagerService);
    soils: { [k: string]: SoilType } = {
        tfertilizer: {
            displayName: $localize`:@@app-field-controller.soil-tfertilizer:Turbo Fertilizer`,
            tickRate: 60000,
        },
        fertilizer: {
            displayName: $localize`:@@app-field-controller.soil-fertilizer:Fertilizer`,
            tickRate: 180000,
        },
        dirt: {
            displayName: $localize`:@@app-field-controller.soil-dirt:Dirt`,
            tickRate: 300000,
        },
        clay: {
            displayName: $localize`:@@app-field-controller.soil-clay:Clay`,
            tickRate: 600000,
        },
        cryo: {
            displayName: $localize`:@@app-field-controller.cryo:Cryo Fluid`,
            tickRate: 1800000,
        },
    };

    paintMode = new FormControl<boolean>(false);
    cropSelect = new FormControl<string>("");
    soilSelect = new FormControl<string>("");
    freezeField = new FormControl<boolean>(this.manager.game!.saveData.freeze);

    ngOnInit(): void {
        let rate = this.manager.game!.saveData.tickRate;
        let soil = this.listSoils
            .filter((value: [string, SoilType]): boolean => value[1].tickRate == rate)
            .map((value: [string, SoilType]): string => value[0]);
        this.soilSelect.setValue(soil.length == 1 ? soil[0] : "");
    }

    get listSoils(): [string, SoilType][] {
        return Object.entries(this.soils);
    }

    get unlockedCrops(): [string, g.d.s.v3.CropUnlockData][] {
        return Object.entries(this.manager.game!.saveData.cropsUnlocked);
    }

    clearField() {
        if (
            !confirm(
                $localize`:@@app-field-controller.clear-field-conf:Are you sure you want to clear the field? This will not harvest any mature crops!`,
            )
        )
            return;
        this.manager.game!.field.clearField();
    }
}
