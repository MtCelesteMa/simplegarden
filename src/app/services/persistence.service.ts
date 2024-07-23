import { Injectable, inject } from "@angular/core";

export class PersistedValue<T> {
    private persistence = inject(PersistenceService);
    private key: string;
    private df: T | null;
    private v: T | null = null;

    constructor(key: string, df: T | null) {
        this.key = key;
        this.df = df;
    }

    get isCached(): boolean {
        return this.persistence.enabled && sessionStorage.getItem(this.key) != null;
    }

    get value(): T {
        if (this.v == null) {
            if (this.persistence.enabled) {
                let cv = sessionStorage.getItem(this.key);
                if (cv == null) return this.df!;
                else return JSON.parse(cv).value;
            }
            return this.df!;
        }
        return this.v;
    }

    set value(value: T) {
        this.v = value;
        if (this.persistence.enabled) sessionStorage.setItem(this.key, JSON.stringify({ value: value }));
    }
}

@Injectable({
    providedIn: "root",
})
export class PersistenceService {
    enabled: boolean = true;

    constructor() {
        let s = localStorage.getItem("simplegarden_disablepersistence");
        if (s != null) this.enabled = false;
    }

    enable(): void {
        this.enabled = true;
        localStorage.removeItem("simplegarden_disablepersistence");
    }

    disable(): void {
        this.enabled = false;
        localStorage.setItem("simplegarden_disablepersistence", "yes");
    }
}
