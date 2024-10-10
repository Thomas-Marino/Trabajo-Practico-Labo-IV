import { Component, inject } from '@angular/core';
import { UserService } from '../../services/data/user.service';
import { PuntajesService } from '../../services/data/puntajes.service';

export interface IJuego 
{
  juego: string;
  pathImagenes: string[];
}

@Component({
  selector: 'app-game-guessr',
  templateUrl: './game-guessr.component.html',
  styleUrl: './game-guessr.component.scss'
})
export class GameGuessrComponent {
  puntajeService = inject(PuntajesService);

  juegoIniciado: boolean;
  juegos: IJuego[];
  juegoSeleccionado: IJuego;
  imagenSeleccionada: string;
  prediccionIngresada: string;
  errores: number;
  mensaje: string;
  mensajesFelicitacion: string[] = [
    "¡Excelente!",
    "¡Bravo! Tu respuesta es correcta.",
    "¡Fantástico! Has hecho un gran trabajo.",
    "¡Muy bien! Has acertado la respuesta.",
    "¡Impresionante! Sigue así.",
    "¡Genial! Has acertado.",
    "¡Perfecto! Eso es correcto.",
    "¡Sigue así!",
    "¡Maravilloso!",
    "¡Eso es! ¡Gran acierto!",
    "¡Bien hecho!",
    "¡Sin duda! Esa es la respuesta correcta.",
    "¡Eso es! Has acertado al blanco.",
    "¡Bien! Has acertado y eso es digno de celebración.",
  ];
  mensajesError: string[] = [
    "¡Ups! Eso no es correcto. Tal vez deberías consultar a un loro.",
    "¡Ay caramba! Esa respuesta es más incorrecta que un pez en un árbol.",
    "¡Casi! Pero eso fue como un intento de clavar un clavo con una sandía.",
    "¡Oh no! Has fallado como un castillo de naipes en una tormenta.",
    "¡Error 404! Respuesta no encontrada. Intenta de nuevo.",
    "¡Oh cielos! Eso fue más desastroso que una cabra en una tienda de porcelana.",
    "¡Mala suerte! Eso fue tan incorrecto como una brújula en el Polo Sur.",
    "¡Vaya! Esa respuesta fue tan acertada como lanzar un frisbee en un tornado.",
    "¡Intenta otra vez! Eso fue como buscar un unicornio en un desierto.",
    "¡Cerca, pero no! Eso fue como usar un paraguas en una tormenta de nieve.",
    "¡Fallaste! Eso fue tan acertado como un pez en una competencia de saltos.",
    "¡Lo intentaste! Pero esa respuesta se fue de vacaciones sin avisar.",
    "¡Oh, no! Has fallado como un huevo en una carrera de obstáculos.",
    "¡Intenta de nuevo! Esa respuesta fue más confusa que un laberinto sin salida.",
    "¡Eso no es correcto! Es como tratar de hacer una paella sin arroz.",
    "¡Error! Pero no te preocupes, los grandes pensadores también fallan a veces.",
  ];
  puntaje: number;

  constructor() 
  {
    this.juegoIniciado = false;
    this.juegos = [
      {juego: "dark souls", pathImagenes: ["/imgs/game-guessr/ds3-1.png", "/imgs/game-guessr/ds3-2.png"]}, 
      {juego: "devil may cry", pathImagenes: ["/imgs/game-guessr/dmc-1.png", "/imgs/game-guessr/dmc-2.png"]},
      {juego: "elden ring", pathImagenes: ["/imgs/game-guessr/eldenring-1.png", "/imgs/game-guessr/eldenring-2.png"]},
      {juego: "god of war", pathImagenes: ["/imgs/game-guessr/gow-1.png", "/imgs/game-guessr/gow-2.png"]}, 
      {juego: "gta", pathImagenes: ["/imgs/game-guessr/gta-1.png", "/imgs/game-guessr/gta-2.png"]},
      {juego: "hitman", pathImagenes: ["/imgs/game-guessr/hitman-1.png", "/imgs/game-guessr/hitman-2.png"]},
      {juego: "mario bros", pathImagenes: ["/imgs/game-guessr/mario-1.png", "/imgs/game-guessr/mario-2.png"]},
      {juego: "mortal kombat", pathImagenes: ["/imgs/game-guessr/mk-1.png", "/imgs/game-guessr/mk-2.png"]}, 
      {juego: "red dead redemption", pathImagenes: ["/imgs/game-guessr/rdr2-1.png", "/imgs/game-guessr/rdr2-2.png"]},
      {juego: "resident evil", pathImagenes: ["/imgs/game-guessr/re4-1.png", "/imgs/game-guessr/re4-2.png"]},
      {juego: "skyrim", pathImagenes: ["/imgs/game-guessr/skyrim-1.png", "/imgs/game-guessr/skyrim-2.png"]}, 
      {juego: "the last of us", pathImagenes: ["/imgs/game-guessr/tlou-1.png", "/imgs/game-guessr/tlou-2.png"]}
    ];
    this.juegoSeleccionado = {juego: "", pathImagenes: []};
    this.imagenSeleccionada = "";
    this.prediccionIngresada = "";
    this.mensaje = "Bienvenido a GameGuessr! Las reglas son sencillas: Al comenzar el juego, aparecerá una imagen de la portada de un juego, tu misión es adivinar de que juego se trata. Buena suerte!";
    this.puntaje = 10;
    this.errores = 0;
  }

  IniciarJuego(): void
  {
    this.juegoIniciado = true;
    this.ObtenerJuego();
    this.mensaje = "";
    this.errores = 0;
    this.puntaje = 12;
  }

  FinalizarJuego(mensaje: string): void
  {
    this.juegoIniciado = false;
    this.mensaje = mensaje;
    this.puntaje = this.puntaje - this.errores;
    if(this.puntaje > 0) { this.puntajeService.GuardarPuntaje(this.puntaje, "GameGuessr"); }
    this.juegoSeleccionado = {juego: "", pathImagenes: []};
  }

  ObtenerJuego(): void
  {
    this.juegoSeleccionado = this.juegos[Math.floor(Math.floor(Math.random() * this.juegos.length))];
    this.imagenSeleccionada = this.juegoSeleccionado.pathImagenes[Math.floor(Math.random() * this.juegoSeleccionado.pathImagenes.length)]
  }

  VerificarPrediccion(prediccion: string)
  {
    let coincidencia: boolean = false;

    if(prediccion == this.juegoSeleccionado.juego) 
    { 
      coincidencia = true;
      this.FinalizarJuego(`${this.mensajesFelicitacion[Math.floor(Math.random() * this.mensajesFelicitacion.length)]} Tu puntaje fue: ${this.puntaje - this.errores} puntos!`); 
    }

    if(!coincidencia)
    {
      this.mensaje = this.mensajesError[Math.floor(Math.floor(Math.random() * this.mensajesError.length))]
      this.errores = this.errores + 4;
      if(this.errores == 12) { this.FinalizarJuego(`Buena suerte la próxima...`) }
    }

    this.prediccionIngresada = "";
  }
}

