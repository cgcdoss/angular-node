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

  ngAfterViewInit(): void {
    console.log(this.label, this.teste, this.elemento.children.item(0));
    this.setupElemento();
    this.setupForm();
  }

  isEnabled(): boolean {
    return true;
  }

  private setupElemento(): void {
    const backgroundColorContainer = getComputedStyle(this.elemento).backgroundColor;

    const span = document.createElement('span');
    span.style.color = backgroundColorContainer;
    span.append(this.label)
    this.elemento.append(span);

    this.elemento.style.transition = 'background-color 100ms';
    this.elemento.addEventListener('click', () => {
      this.elemento.style.backgroundColor = '#06193c';
      setTimeout(() => this.elemento.style.backgroundColor = '', 100);
    });
  }

  private setupForm(): void {
    const form = this.elemento.children.item(0) as HTMLElement;
    const inputUser = form.getElementsByClassName('usuario').item(0) as HTMLElement;
    const corPadrao = getComputedStyle(form).backgroundColor;
    form.style.transition = 'background-color 200ms';

    form.addEventListener('mouseover', () => {
      form.style.backgroundColor = '#191919';
      inputUser.style.transform = 'scalex(1)';
      inputUser.focus();
    });
    form.addEventListener('mouseout', () => {
      form.style.backgroundColor = '';
      inputUser.style.transform = 'scalex(-1)'; // apenas para testar (invertendo elemento)
      inputUser.blur();
    });

    inputUser.addEventListener('click', () => {
      const oiSpan = document.createElement('span');
      oiSpan.append('oi');
      form.append(oiSpan);
      setTimeout(() => form.removeChild(oiSpan), 500);
    });
  }

  @HostListener('mouseover', ['$event'])
  onHover(event: PointerEvent) {
    this.qtdHover++;
    this.algoAconteceu.emit(this.qtdHover);
  }

}
