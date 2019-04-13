import { HttpClientModule } from '@angular/common/http';
import { CursorService } from './../services/cursor.service';
import { PageService } from '../services/page.service';
import { NgModule } from "@angular/core";

@NgModule({
    imports: [
        HttpClientModule,
    ],
    exports: [],
    providers: [
        CursorService,
        PageService
    ]
})
export class SharedModule { }