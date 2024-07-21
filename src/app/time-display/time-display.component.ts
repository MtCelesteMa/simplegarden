import { Component, Input } from "@angular/core";

@Component({
    selector: "app-time-display",
    standalone: true,
    imports: [],
    templateUrl: "./time-display.component.html",
})
export class TimeDisplayComponent {
    @Input({ required: true }) ms: number = 0;

    get S(): number {
        return Math.ceil(this.ms / 1000);
    }

    get d(): number {
        return Math.floor(this.S / 86400);
    }

    get h(): number {
        return Math.floor((this.S % 86400) / 3600);
    }

    get m(): number {
        return Math.floor((this.S % 3600) / 60);
    }

    get s(): number {
        return this.S % 60;
    }
}
