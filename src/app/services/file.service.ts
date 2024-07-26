import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class FileService {
    upload(onLoad: (content: string) => void, accept: string = "application/json"): void {
        let upl = document.createElement("input");
        upl.type = "file";
        upl.accept = accept;
        upl.addEventListener("change", (ev: Event): void => {
            let file = (ev.target as HTMLInputElement).files![0];
            let reader = new FileReader();
            reader.addEventListener("load", (e: ProgressEvent<FileReader>): void => {
                onLoad(e.target!.result as string);
            });
            reader.readAsText(file);
        });
        upl.click();
    }

    download(name: string, content: string, type: string = "application/json;charset=utf-8"): void {
        let blob = new Blob([content], { type: type });
        let url = URL.createObjectURL(blob);
        let dl = document.createElement("a");
        dl.href = url;
        dl.download = name;
        dl.click();
        URL.revokeObjectURL(url);
    }
}
