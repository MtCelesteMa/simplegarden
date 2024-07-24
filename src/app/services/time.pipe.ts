import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "time",
    standalone: true,
})
export class TimePipe implements PipeTransform {
    transform(value: number): string {
        let S = Math.ceil(value / 1000);
        let d = Math.floor(S / 86400);
        let h = Math.floor((S % 86400) / 3600);
        let m = Math.floor((S % 3600) / 60);
        let s = S % 60;
        let dstr = d == 1 ? $localize`:@@time.ds:1 day` : $localize`:@@time.dp:${d} days`;
        let hstr = h == 1 ? $localize`:@@time.hs:1 hour` : $localize`:@@time.hp:${h} hours`;
        let mstr = m == 1 ? $localize`:@@time.ms:1 minute` : $localize`:@@time.mp:${m} minutes`;
        let sstr = s == 1 ? $localize`:@@time.ss:1 second` : $localize`:@@time.sp:${s} seconds`;
        let arr: string[] = [];
        if (d != 0) arr.push(dstr);
        if (h != 0) arr.push(hstr);
        if (m != 0) arr.push(mstr);
        if (s != 0 || arr.length == 0) arr.push(sstr);
        return arr.join(" ");
    }
}
