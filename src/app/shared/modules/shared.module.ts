import { HttpClientModule } from '@angular/common/http';
import { CursorService } from './../services/cursor.service';
import { PageService } from '../services/page.service';
import { NgModule } from "@angular/core";
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { IonicGestureConfig } from '../config/gesture.config';
import { PressDirective } from '../directives/press.directive';

@NgModule({
    imports: [
        HttpClientModule,
    ],
    declarations: [
        PressDirective
    ],
    exports: [
        PressDirective
    ],
    providers: [
        CursorService,
        PageService,
        { provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig }
    ]
})
export class SharedModule { }