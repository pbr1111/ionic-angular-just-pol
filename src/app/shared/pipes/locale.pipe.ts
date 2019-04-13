import { PipeTransform, Pipe } from '@angular/core';
import { LocaleService } from '../services/locale.service';

@Pipe({ name: 'locale' })
export class LocalePipe implements PipeTransform {

    constructor(private localeService: LocaleService) {
    }

    public transform(key: string): string {
        return this.localeService.getTranslation(key);
    }
}