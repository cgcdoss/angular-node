import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { retry, tap, timeout } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;
  @ViewChild('template', { read: TemplateRef }) template!: TemplateRef<any>;
  @ViewChild('template2', { read: TemplateRef }) template2!: TemplateRef<any>;

  clientes!: any[];
  templateAtual!: TemplateRef<any>;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _homeService: HomeService,
  ) { }

  ngOnInit(): void {
    this._homeService.getClientes()
      .pipe(
        tap(() => console.log('carregando clientes')),
        timeout(4000), // espera até 4s pra ter resposta
        retry(3), // tenta 3 vezes, se a primeira der falha
      )
      .subscribe((res: any) => {
        this.clientes = res;
        this.container.createEmbeddedView(this.template, { $implicit: this.clientes[0].nome }); // uma forma de fazer o createEmbeddedView
      }, err => {
        console.log('falha ao recuperar clientes', err.error);
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.templateAtual = this.template;
      
      // Outra forma de fazer o createEmbeddedView
      const view = this.template.createEmbeddedView({ $implicit: 'Hello World' });
      this.container.insert(view);
    });
  }

  logout(): void {
    this._authService.logout().subscribe(resp => {
      this._router.navigateByUrl('/login');
    });
  }

  trocaTemplate(): void {
    if (this.templateAtual === this.template) {
      this.templateAtual = this.template2;
    } else {
      this.templateAtual = this.template;
    }
  }

}
