import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class RoutingService {
    private page_: string | null = null;

    get page(): string {
        let s = sessionStorage.getItem("simplegarden_page");
        return this.page_ == null ? (s == null ? "welcome": s) : this.page_;
    }

    set page(value: string) {
        this.page_ = value;
        sessionStorage.setItem("simplegarden_page", value);
    }
}
