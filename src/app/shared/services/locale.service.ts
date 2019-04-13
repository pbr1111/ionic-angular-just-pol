import { Injectable } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { TranslateService } from '@ngx-translate/core';

const defaultLanguage = 'en';
const validLanguages = ['en', 'es'];

@Injectable({ providedIn: 'root' })
export class LocaleService {

    constructor(private translate: TranslateService) {
        registerLocaleData(localeEs);
    }

    public initialize(): void {
        this.translate.setDefaultLang(defaultLanguage);
        this.setBrowserLanguage();
    }

    public getTranslation(key: string): string {
        return this.translate.instant(key);
    }

    private setBrowserLanguage(): void {
        let browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang);
    }

    public getLanguage(): string {
        let browserLang = this.translate.getBrowserLang();
        if(validLanguages.indexOf(browserLang) == -1) {
            return defaultLanguage;
        }
        return this.translate.getBrowserLang();
    }
}

