import { Component, inject } from "@angular/core";
import { ReactiveFormsModule, FormControl } from "@angular/forms";
import { MatRadioModule } from "@angular/material/radio";
import { PersistenceService } from "../../../services/persistence.service";

@Component({
    selector: "app-persistence-selector",
    standalone: true,
    imports: [ReactiveFormsModule, MatRadioModule],
    templateUrl: "./persistence-selector.component.html",
})
export class PersistenceSelectorComponent {
    persistence = inject(PersistenceService);

    persistenceLocation = new FormControl<string>(this.persistence.location);

    setPersistence(): void {
        this.persistence.location = this.persistenceLocation.value!;
    }
}
