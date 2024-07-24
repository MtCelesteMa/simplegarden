import { Injectable } from "@angular/core";
import { PersistedValue } from "./persistence.service";

@Injectable({
    providedIn: "root",
})
export class RoutingService {
    private page_ = new PersistedValue("page", "welcome");

    get page(): string {
        return this.page_.value;
    }

    set page(value: string) {
        this.page_.value = value;
    }
}
