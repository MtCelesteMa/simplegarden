import { Component, inject, LOCALE_ID, ChangeDetectionStrategy } from "@angular/core";
import { PathLocationStrategy } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RoutingService } from "../services/routing.service";

type Locale = { id: string; displayName: string };

@Component({
    selector: "app-header",
    imports: [MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule, MatTooltipModule],
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: "./header.component.html",
})
export class HeaderComponent {
    locale = inject(LOCALE_ID);
    baseHref = inject(PathLocationStrategy).getBaseHref();
    router = inject(RoutingService);

    locales: Locale[] = [
        { id: "en-US", displayName: "🇬🇧 English" },
        { id: "zh-TW", displayName: "🇹🇼 中文" },
        { id: "zh-CN", displayName: "🇨🇳 中文（简体）" },
    ];
}
