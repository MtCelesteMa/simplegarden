import { Injectable, inject } from "@angular/core";

export class CachedValue<T> {
    private cache = inject(CacheService);
    private key: string;
    private df: T | null;
    private v: T | null = null;

    constructor(key: string, df: T | null) {
        this.key = key;
        this.df = df;
    }

    get isCached(): boolean {
        return this.cache.enabled && sessionStorage.getItem(this.key) != null;
    }

    get value(): T {
        if (this.v == null) {
            if (this.cache.enabled) {
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
        if (this.cache.enabled) sessionStorage.setItem(this.key, JSON.stringify({ value: value }));
    }
}

@Injectable({
    providedIn: "root",
})
export class CacheService {
    enabled: boolean = true;

    constructor() {
        let s = localStorage.getItem("simplegarden_disablecache");
        if (s != null) this.enabled = false;
    }

    enable(): void {
        this.enabled = true;
        localStorage.removeItem("simplegarden_disablecache");
    }

    disable(): void {
        this.enabled = false;
        localStorage.setItem("simplegarden_disablecache", "yes");
    }
}
