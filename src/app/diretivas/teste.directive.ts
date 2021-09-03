import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[teste]',
  host: {
    '[class.teste-diretiva]': 'isEnabled()',
  }
})
export class TesteDirective implements AfterViewInit {
  @Input() teste!: string;
  @Input() label!: string;
  @Output() algoAconteceu: EventEmitter<number> = new EventEmitter<number>();

  elemento!: HTMLElement;
  qtdHover = 0;

  constructor(private _elementRef: ElementRef) {
    this.elemento = this._elementRef.nativeElement;
  }

  isEnabled() {
    return true;
  }

  ngAfterViewInit(): void {
    console.log(this.label, this.teste, this.elemento.children.item(0));
    this.setupHost();
    this.setupForm();
  }

  private setupHost(): void {
    const corAnterior = this.elemento.style.backgroundColor;
    this.elemento.style.transition = 'background-color 200ms';
    this.elemento.append(this.label);
    this.elemento.addEventListener('click', () => {
      this.elemento.style.backgroundColor = '#06193c';
      setTimeout(() => this.elemento.style.backgroundColor = corAnterior, 300);
    });
  }

  private setupForm(): void {
    const form = this.elemento.children.item(0) as HTMLElement;
    const inputUser = form.getElementsByClassName('usuario').item(0) as HTMLElement;
    const corPadrao = form.style.backgroundColor;

    form.addEventListener('mouseover', () => {
      form.style.backgroundColor = '#1b1b1b';
      inputUser.focus();
    });
    form.addEventListener('mouseout', () => {
      form.style.backgroundColor = corPadrao;
      inputUser.blur();
    });
  }

  @HostListener('mouseover', ['$event'])
  onHover(event: any) {
    this.qtdHover++;
    this.algoAconteceu.emit(this.qtdHover);
  }

}
