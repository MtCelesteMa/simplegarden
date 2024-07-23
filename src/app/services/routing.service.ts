import { Injectable } from "@angular/core";
import { CachedValue } from "./cache.service";

@Injectable({
    providedIn: "root",
})
export class RoutingService {
    private page_ = new CachedValue("simplegarden_page", "welcome");

    get page(): string {
        return this.page_.value;
    }

    set page(value: string) {
        this.page_.value = value;
    }
}
