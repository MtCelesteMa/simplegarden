import { Component, inject, LOCALE_ID } from "@angular/core";

type Locale = { id: string; displayName: string };

@Component({
    selector: "app-locale-selector",
    standalone: true,
    imports: [],
    templateUrl: "./locale-selector.component.html",
})
export class LocaleSelectorComponent {
    curLocale = inject(LOCALE_ID);

    locales: Locale[] = [
        { id: "en-US", displayName: "🇬🇧 English" },
        { id: "zh-TW", displayName: "🇹🇼 中文" },
        { id: "zh-CN", displayName: "🇨🇳 中文（简体）" },
    ];
}
