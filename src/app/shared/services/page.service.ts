import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CursorService } from './cursor.service';
import { LocaleService } from './locale.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PageService {
    constructor(private alertCtrl: AlertController,
        private cursor: CursorService,
        private localeService: LocaleService,
        private router: Router) {
    }

    public wait(): void {
        this.cursor.show();
    }

    public continue(): void {
        this.cursor.hide();
    }

    public showError(text: string): void {
        this.alertCtrl.create({
            header: this.localeService.getTranslation('fail'),
            message: text,
            buttons: [this.localeService.getTranslation('ok')]
        }).then(alert => alert.present());
    }

    public showConfirmationDialog(text: string, acceptButtonText: string): Promise<void> {
        return new Promise(resolve => {
            this.alertCtrl.create({
                header: this.localeService.getTranslation("confirm"),
                message: text,
                buttons: [
                    this.localeService.getTranslation("cancel"),
                    {
                        text: acceptButtonText,
                        handler: () => resolve()
                    }]
            }).then(alert => alert.present());
        });
    }

    public navigateToRoot(): void {
        this.router.navigate(['/']);
    }

    public navigateToLogin(): void {
        this.router.navigate(['/login']);
    }

    public navigateTo(page: string): void {
        this.router.navigate([page]);
    }

    // public navigateBack(): void {
    //     let nav = this.app.getActiveNavs()[0];
    //     if (nav.canGoBack()) {
    //         nav.pop();
    //     }
    // }
}