// tienda.component.ts

import { Component, OnInit } from '@angular/core';
import { User } from 'src/users';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

interface Gachapon {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  fotosFaltantes: number = 0;

  fotosDisponibles: string[] = [
    "./assets/fotos/foto1.jpg",
    "./assets/fotos/foto2.jpg",
    "./assets/fotos/foto3.jpg"
  ];

  gachapones: Gachapon[] = [
    { id: 1, nombre: "Gachapon 1" },
  ];

  gachaponSeleccionadoId: number | null = null;
  user: User = new User();
  gachaponSeleccionado: Gachapon | null = null;
  mensajeResultado: string | null = null;
  mensajeResultadoF: string | null = null;




  constructor(private loginservice: LoginService, private route: Router) { }

  ngOnInit() {
    this.inicializarTienda();
  }

  girarGachapon(numeroGachapon: number): void {
    const gachaponSeleccionado = this.gachapones.find(g => g.id === numeroGachapon);

    if (gachaponSeleccionado) {
      if (this.user.coins >= 10) {
        this.user.coins -= 10;

        const opciones: string[] = ["1", "2", "3", "4", "5", "6", "7", "8"];
        const probabilidades: number[] = [0.2, 0.2, 0.2, 0.14, 0.13, 0.1, 0.02, 0.01];

        const resultadoIndex = this.obtenerResultadoConProbabilidades(probabilidades);
        const resultado: string = opciones[resultadoIndex];

        this.sumarTrofeo(`./assets/memes/${resultado}.png`);
        this.actualizarResultado(numeroGachapon, resultado);
        gachaponSeleccionado.id = parseInt(resultado);
        gachaponSeleccionado.nombre = resultado;


        this.gachaponSeleccionado = gachaponSeleccionado;
        this.gachaponSeleccionadoId = parseInt(resultado);
        this.getImagenSrc(this.gachaponSeleccionado);

      } else {
        console.log('No tienes suficientes coins para girar este gachapon.');
      }
    }
  }


  roadToMenu() {
    // Restablecer el gachapon seleccionado al volver al menú
    this.gachaponSeleccionado = null;
    this.route.navigate(['/menu']);
  }

  private inicializarTienda(): void {
    let dato = localStorage.getItem("1")!;
    let flagg = 0;
    this.loginservice.getUsers(dato).subscribe(
      (res) => {
        this.user = res[0];
        this.loginservice.funcion(this.user).subscribe(
          (res) => {
            console.log(this.user.trofeos);
          },
          (e) => {
            console.log('Ha ocurrido un error al intentar editar la categoria2');
          }
        );



      },
      (e) => {
        console.log('Ha ocurrido un error al intentar obtener los datos del usuario');
      }
    );
  }

  obtenerResultado(gachaponId: number): string {
    const opciones: string[] = ["Resultado 1", "Resultado 2", "Resultado 3", "Resultado 4", "Resultado 5", "Resultado 6", "Resultado 7", "Resultado 8"];

    if (gachaponId >= 1 && gachaponId <= opciones.length) {
      return opciones[gachaponId - 1];
    } else {
      return "Resultado no válido";
    }
  }

  sumarTrofeo(trofeo: string) {
    if (!this.user.trofeos.includes(trofeo)) {
      this.user.trofeos.push(trofeo);
      if (this.user.trofeos.length === 8) {
        this.user.logros.push({ ruta: "./assets/Logros/coleccionistaExperto.jpg", nombre: "Coleccionista Experto" });
      }
      this.loginservice.funcion(this.user).subscribe(
        (res) => {
          console.log(this.user.trofeos);

        },
        (e) => {
          console.log('Ha ocurrido un error al intentar editar la categoria2');
        }
      );
    } else {
      console.log('El trofeo ya existe en el array.');

    }

  }

  getImagenSrc(gachapon: Gachapon) {
    const imagePath = `./assets/memes/${gachapon.id}.png`;
    return imagePath;
  }


  private obtenerResultadoConProbabilidades(probabilidades: number[]): number {
    const randomNumber = Math.random();
    let cumulativeProbability = 0;

    for (let i = 0; i < probabilidades.length; i++) {
      cumulativeProbability += probabilidades[i];

      if (randomNumber <= cumulativeProbability) {
        return i;
      }
    }

    // Por si acaso, devolvemos el último índice si no hemos encontrado ninguno
    return probabilidades.length - 1;
  }

  private actualizarResultado(gachaponId: number, resultado: string): void {
    const opciones: string[] = ["Resultado 1", "Resultado 2", "Resultado 3", "Resultado 4", "Resultado 5", "Resultado 6", "Resultado 7", "Resultado 8"];

    // Supongamos que gachaponId es un índice válido en el array de resultados
    if (gachaponId >= 1 && gachaponId <= opciones.length) {
      opciones[gachaponId - 1] = resultado;
    }
  }


  testearTuSuerte(): void {
    if (this.user.coins >= 10) {
      const resultado = Math.random();

      if (resultado < 0.95) { // 95% de probabilidad de perder
        this.user.coins -= 10;
        this.mensajeResultado = 'Perdiste 10 coins. ¡Suerte la próxima vez!';
      } else {
        this.user.coins += 500; // Ganar 500 coins si la probabilidad es del 5%
        this.mensajeResultado = '¡Felicidades! Ganaste 500 coins.';
      }

      this.loginservice.funcion(this.user).subscribe(
        (res) => {
          console.log('Datos del usuario actualizados:', res);
        },
        (error) => {
          console.error('Error al actualizar los datos del usuario:', error);
        });

      // Después de unos segundos, limpiar el mensaje
      setTimeout(() => {
        this.mensajeResultado = null;
      }, 500); // Mostrar el mensaje durante 3 segundos (ajusta según tus necesidades)
    } else {
      console.log('No tienes suficientes coins para probar tu suerte.');
    }
  }


  comprarFoto(index: number): void {
    const fotoSeleccionada: string = this.fotosDisponibles[index];

    if (this.user.coins >= 50) {
      this.user.coins -= 50;

      // Verificar si la foto ya está en la lista de fotos de perfil
      if (!this.user.fotoPerfil.includes(fotoSeleccionada)) {
        this.user.fotoPerfil.push(fotoSeleccionada);
        this.loginservice.funcion(this.user).subscribe(
          (res) => {
            console.log('Compra de foto de perfil exitosa. Datos del usuario actualizados:', res);
          },
          (error) => {
            console.error('Error al actualizar los datos del usuario:', error);
          });

        // Limpiar el mensaje después de unos segundos
        setTimeout(() => {
          this.mensajeResultadoF = null;
        }, 3000); // Mostrar el mensaje durante 3 segundos (ajusta según tus necesidades)
      } else {
        // Mostrar mensaje si el usuario ya tiene la foto de perfil
        alert("Ya tienes esta foto de perfil");
        //devuelve el dinero si el usuario ya tiene la imagen
        this.user.coins += 50;
      }
    } else {
      console.log('No tienes suficientes coins para comprar esta foto de perfil.');
    }
  }


}
