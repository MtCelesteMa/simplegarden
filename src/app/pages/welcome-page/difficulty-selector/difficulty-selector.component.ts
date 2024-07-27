import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ReactiveFormsModule, FormControl } from "@angular/forms";
import { MatRadioModule } from "@angular/material/radio";

@Component({
    selector: "app-difficulty-selector",
    standalone: true,
    imports: [ReactiveFormsModule, MatRadioModule],
    templateUrl: "./difficulty-selector.component.html",
})
export class DifficultySelectorComponent {
    @Input() difficulty: string = "normal";
    @Output() difficultyChange = new EventEmitter<string>();

    difficultySelect = new FormControl<string>(this.difficulty);

    updateDifficulty(): void {
        this.difficulty = this.difficultySelect.value!;
        this.difficultyChange.emit(this.difficulty);
    }
}
