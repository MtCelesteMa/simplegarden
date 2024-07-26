import { z } from "zod";

export const versionedData = z.object({
    identifier: z.string(),
    version: z.number().int().gte(1),
});

export type VersionedData = z.infer<typeof versionedData>;

export class Loader<T extends typeof versionedData> {
    identifier: string;
    version: number;
    schema: T;
    upgraders: ((raw: unknown) => any)[];

    constructor(identifier: string, version: number, schema: T, upgraders: ((raw: unknown) => any)[]) {
        this.identifier = identifier;
        this.version = version;
        this.schema = schema;
        this.upgraders = upgraders;
    }

    loadVersion(raw: unknown, version: number): any {
        if (typeof raw == "string") raw = JSON.parse(raw);
        let rawv = versionedData.parse(raw);
        if (rawv.identifier != this.identifier) throw new Error("Identifier mismatch");
        if (rawv.version > version) throw new Error("Version incompatible");
        for (let v = rawv.version; v < version; v++) raw = this.upgraders[v - 1](raw);
        return raw;
    }

    load(raw: unknown): z.infer<T> {
        return this.schema.parse(this.loadVersion(raw, this.version));
    }

    loadInPlace(raw: unknown): void {
        if (raw == null || typeof raw != "object") throw new TypeError("Only objects can be loaded in place.");
        let obj = this.load(raw);
        Object.assign(raw, obj);
        Object.keys(raw)
            .filter((k: string): boolean => !Object.keys(obj).includes(k))
            .forEach((k: string): void => {
                delete (raw as any)[k];
            });
        this.schema.parse(raw);
    }
}
