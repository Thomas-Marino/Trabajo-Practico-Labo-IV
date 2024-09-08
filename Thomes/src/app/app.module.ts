import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { HeaderComponent } from './components/header/header.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';

@NgModule({
  declarations: [
    AppComponent,
    IngresoComponent,
    InicioComponent,
    HeaderComponent,
    QuienSoyComponent
  ],
  imports: [BrowserModule, AppRoutingModule, AngularFireModule.initializeApp(environment.firebaseConfig)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
