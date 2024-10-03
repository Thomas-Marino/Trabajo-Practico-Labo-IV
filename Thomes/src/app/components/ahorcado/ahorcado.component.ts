import { Component } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.scss'
})
export class AhorcadoComponent {
  
  juegoIniciado: boolean;
  listaLetrasDisponibles: string[];
  listaLetrasIngresadas: string[];
  listaLetrasErroneas: string[];
  listaLetrasCorrectas: string[];
  palabras: string[];
  palabraSecreta: string;
  arrayPalabraSecreta: string[];
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
  mostrarAnimacion: boolean;

  constructor() 
  {
    this.juegoIniciado = false;
    this.listaLetrasDisponibles = [];
    this.listaLetrasIngresadas = [];
    this.listaLetrasErroneas = [];
    this.listaLetrasCorrectas = [];
    this.palabras = ["abecedario", "videojuegos", "inteligencia", "metal", "musica", "karaoke", "tenedor", "comida", "tecnicatura", "programacion", "ahorcado", "contraseña", "anticuado", "timpano", "guitarra", "electricidad", "argentina", "condimento", "estanteria", "bisagra"];
    this.palabraSecreta = "";
    this.arrayPalabraSecreta = [];
    this.mensaje = "Bienvenido al ahorcado! Las reglas son sencillas: Al comenzar el juego, se asignará una palabra secreta al azar y deberas adivinarla letra por letra. ¡Ten cuidado! Si ingresas una letra que no forma parte de la palabra, perderás una vida...";
    this.puntaje = 10;
    this.errores = 0;
    this.mostrarAnimacion = false;
  }

  IniciarJuego(): void
  {
    this.juegoIniciado = true;
    this.IniciarArrayLetras();
    this.ObtenerPalabra();
    this.mensaje = "";
    this.errores = 0;
  }

  FinalizarJuego(mensaje: string): void
  {
    this.juegoIniciado = false;
    this.mensaje = mensaje;
    this.arrayPalabraSecreta.length = 0;
    this.listaLetrasErroneas.length = 0;
    this.listaLetrasCorrectas.length = 0;
    this.listaLetrasIngresadas.length = 0;
    this.listaLetrasDisponibles.length = 0;
    this.errores = 0;
    this.puntaje = 0;
  }

  IniciarArrayLetras(): void
  {
    this.listaLetrasDisponibles = [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
      'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];
    this.listaLetrasIngresadas.length = 0;
  }

  ObtenerPalabra(): void
  {
    this.palabraSecreta = this.palabras[Math.floor(Math.floor(Math.random() * this.palabras.length))]
    for(const letra of this.palabraSecreta) { this.arrayPalabraSecreta.push(letra); }
  }

  VerificarPrediccion(prediccion: string)
  {
    this.listaLetrasIngresadas.push(prediccion);
    let coincidencias: boolean = false;

    for(const letra of this.palabraSecreta)
    {
      if(letra == prediccion) 
      { 
        coincidencias = true;
        this.listaLetrasCorrectas.push(prediccion); 
        this.mensaje = this.mensajesFelicitacion[Math.floor(Math.floor(Math.random() * this.mensajesFelicitacion.length))];
        if(this.listaLetrasCorrectas.length == this.palabraSecreta.length) { this.FinalizarJuego(`Felicidades, ganaste la partida! Tu puntaje fue: ${this.puntaje - this.errores} puntos!`)}
      }
    }

    if(!coincidencias)
    {
      this.mensaje = this.mensajesError[Math.floor(Math.floor(Math.random() * this.mensajesError.length))]
      this.listaLetrasErroneas.push(prediccion);
      this.errores++;

      if(this.errores == 7) { this.FinalizarJuego(`Buena suerte la próxima...`) }
    }
  }
}
