import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth/guards/auth-guard.service';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/services/auth.service';
import { HomeService } from './home/services/home.service';
import { MeuInterceptor } from './meu-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    AppRoutingModule
  ],
  providers: [
    AuthGuardService,
    AuthService,
    HomeService,
    { provide: HTTP_INTERCEPTORS, useClass: MeuInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
