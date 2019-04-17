import { Directive, HostListener, Input, Output, EventEmitter } from "@angular/core";


@Directive({
    selector: '[appPress]'
})
export class PressDirective {
    @Input() public timeout: number = 50;
    @Output() public appPress: EventEmitter<void> = new EventEmitter<void>();
    private interval: NodeJS.Timeout = null;

    constructor() {
    }

    @HostListener('press')
    public onPress(): void {
        this.startInterval();
    }

    @HostListener('pressup')
    public onPressUp(): void {
        this.stopInterval();
    }

    private startInterval() {
        this.interval = setInterval(() => {
            this.appPress.emit();
        }, this.timeout);
    }

    private stopInterval() {
        clearInterval(this.interval);
    }

}