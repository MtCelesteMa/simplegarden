import { Component, inject, LOCALE_ID } from "@angular/core";
import { PathLocationStrategy } from "@angular/common";

type Locale = { id: string; displayName: string };

@Component({
    selector: "app-locale-selector",
    standalone: true,
    imports: [],
    templateUrl: "./locale-selector.component.html",
})
export class LocaleSelectorComponent {
    curLocale = inject(LOCALE_ID);
    baseHref = inject(PathLocationStrategy).getBaseHref();

    locales: Locale[] = [
        { id: "en-US", displayName: "🇬🇧 English" },
        { id: "zh-TW", displayName: "🇹🇼 中文" },
        { id: "zh-CN", displayName: "🇨🇳 中文（简体）" },
    ];
}
