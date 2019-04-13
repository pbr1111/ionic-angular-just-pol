import { LoadingOptions } from '@ionic/core';
import { LoadingController } from '@ionic/angular';
import { Injectable } from '@angular/core';

const minLoadingMs: number = 500;
const loadingConf: LoadingOptions = {
    spinner: 'crescent',
    cssClass: 'custom-loading-cursor'
};

@Injectable({ providedIn: 'root' })
export class CursorService {
    private activeCount: number;
    private presentTime: number;
    private isDismising: boolean;

    constructor(private loadingCtrl: LoadingController) {
        this.setDefaultValues();
    }

    public show(): void {
        this.activeCount++;
        if (this.activeCount == 1) {
            this.loadingCtrl.create(loadingConf).then(loading => {
                loading.present().then((a) => {
                    this.presentTime = this.getCurrentTime();
                });
            });
        }
    }

    public hide(): void {
        if (this.activeCount == 1 && !this.isDismising) {
            this.dismissCursor();
        }
    }

    private setDefaultValues(): void {
        this.activeCount = 0;
        this.presentTime = 0;
        this.isDismising = false;
    }

    private dismissCursor(): void {
        this.isDismising = true;
        if (!this.isMinimumTimeCompleted()) {
            setTimeout(() => this.dismissLoading(), minLoadingMs);
        } else {
            this.dismissLoading();
        }
    }

    private dismissLoading(): void {
        this.loadingCtrl.dismiss();
        this.setDefaultValues();
    }

    private getCurrentTime(): number {
        return Date.now();
    }

    private isMinimumTimeCompleted(): boolean {
        const currentTime = this.getCurrentTime();
        return this.presentTime >= (currentTime - minLoadingMs);
    }
}