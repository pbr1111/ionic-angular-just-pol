import { NgModule, LOCALE_ID, ModuleWithProviders } from '@angular/core';
import { TranslateModule, TranslateService, TranslatePipe, TranslateLoader } from '@ngx-translate/core';
import { LocaleService } from '../services/locale.service';
import { LocalePipe } from '../pipes/locale.pipe';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
    imports: [
        HttpClientModule,
        TranslateModule
    ],
    declarations: [
        LocalePipe
    ],
    exports: [
        LocalePipe
    ],
    providers: [
        TranslateService,
        LocaleService,
    ]
})
export class LocaleModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: LocaleModule,
            providers: [
                { provide: LOCALE_ID, deps: [LocaleService], useFactory: (localeService) => localeService.getLanguage() },
                ...TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: createTranslateLoader,
                        deps: [HttpClient]
                    }
                }).providers
            ]
        };
    }
}

export function createTranslateLoader(httpClient: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(httpClient);
}