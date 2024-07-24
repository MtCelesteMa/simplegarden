import { Injectable, inject } from "@angular/core";

export class PersistedValue<T> {
    private persistence = inject(PersistenceService);
    private key: string;
    private defaultValue?: T;

    constructor(key: string, defaultValue?: T) {
        this.key = key;
        this.defaultValue = defaultValue;
    }

    get isCached(): boolean {
        return this.persistence.hasItem(this.key);
    }

    get value(): T {
        if (this.persistence.getItem(this.key) == undefined) return this.defaultValue!;
        return this.persistence.getItem(this.key);
    }

    set value(value: T) {
        this.persistence.setItem(this.key, value);
    }
}

@Injectable({
    providedIn: "root",
})
export class PersistenceService {
    private loc: string = "transient";
    private data: { [k: string]: any } = {};

    constructor() {
        let loc = localStorage.getItem("simplegarden_persistence");
        if (loc != null) this.loc = loc;
        let data: string | null = null;
        if (this.loc == "session") data = sessionStorage.getItem("simplegarden_persisted");
        else if (this.loc == "local") data = localStorage.getItem("simplegarden_persisted");
        try {
            if (data != null) this.data = JSON.parse(data);
        } catch {
            if (this.loc == "session") sessionStorage.removeItem("simplegarden_persisted");
            else if (this.loc == "local") localStorage.removeItem("simplegarden_persisted");
            window.location.reload();
        }
    }

    get location(): string {
        return this.loc;
    }

    set location(value: string) {
        if (this.loc == "session") sessionStorage.removeItem("simplegarden_persisted");
        else if (this.loc == "local") localStorage.removeItem("simplegarden_persisted");
        this.loc = value;
        localStorage.setItem("simplegarden_persistence", value);
        if (this.loc == "session") sessionStorage.setItem("simplegarden_persisted", JSON.stringify(this.data));
        else if (this.loc == "local") localStorage.setItem("simplegarden_persisted", JSON.stringify(this.data));
    }

    hasItem(key: string) {
        return Object.hasOwn(this.data, key);
    }

    getItem(key: string): any {
        if (!this.hasItem(key)) return undefined;
        return this.data[key];
    }

    setItem(key: string, value: any): any {
        this.data[key] = value;
        if (this.loc == "session") sessionStorage.setItem("simplegarden_persisted", JSON.stringify(this.data));
        else if (this.loc == "local") localStorage.setItem("simplegarden_persisted", JSON.stringify(this.data));
    }

    unpersist(): void {
        if (this.loc == "session") sessionStorage.removeItem("simplegarden_persisted");
        else if (this.loc == "local") localStorage.removeItem("simplegarden_persisted");
        this.location = "transient";
        this.data = {};
    }
}
