;
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// ------------ Components -----------
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ChatComponent } from './components/chat/chat.component';
import { AhorcadoComponent } from './components/ahorcado/ahorcado.component';
import { MayorMenorComponent } from './components/mayor-menor/mayor-menor.component';
import { GameGuessrComponent } from './components/game-guessr/game-guessr.component';
import { TablaPuntajesComponent } from './components/tabla-puntajes/tabla-puntajes.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { PreguntadosComponent } from './components/preguntados/preguntados.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { NotFoundComponent } from './components/errores/not-found/not-found.component';
import { UnauthorizedComponent } from './components/errores/unauthorized/unauthorized.component';
// ------------ Modulos -----------
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
// ---- Material
import { AngularMaterialModule } from './modules/angular-material/angular-material.module'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// ---- FireBase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
// ---- Variables de entorno
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    IngresoComponent,
    InicioComponent,
    HeaderComponent,
    QuienSoyComponent,
    RegistroComponent,
    ChatComponent,
    AhorcadoComponent,
    MayorMenorComponent,
    GameGuessrComponent,
    TablaPuntajesComponent,
    UnauthorizedComponent, 
    NotFoundComponent, PreguntadosComponent, EncuestaComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    FormsModule, 
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), 
    AngularFireAuthModule, 
    AngularFirestoreModule, 
    NgbModule, 
    AngularMaterialModule
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
