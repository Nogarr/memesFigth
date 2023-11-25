import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/users';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-juego-solitario',
  templateUrl: './juego-contra-reloj.component.html',
  styleUrls: ['./juego-contra-reloj.component.css'],
})

export class JuegoContraReloj implements OnInit {
  memeForm: FormGroup;
  private url =
    'https://cors-anywhere.herokuapp.com/https://api.imgflip.com/caption_image';
  private templateId = 61579;
  private username = 'gasparroncayoli';
  private password = 'balneario24';
  text0: string = '';
  text1: string = '';
  memeUrl = '';
  memeImageVisible = false;
  turnoActual: number = 1;
  tiempoRestante: number = 30;
  interval: any;
  memesTurno1: string[] = [];
  memesTurno2: string[] = [];
  mostrarResultados: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private loginservice: LoginService) {
    this.memeForm = this.formBuilder.group({
      text0: [''],
      text1: [''],
    });
  }

  actualizarMeme() {
    const text0 = this.memeForm.get('text0')?.value ?? '';
    const text1 = this.memeForm.get('text1')?.value ?? '';

    const requestData = new URLSearchParams();

    requestData.append('template_id', this.templateId.toString());
    requestData.append('username', this.username);
    requestData.append('password', this.password);
    requestData.append('text0', text0);
    requestData.append('text1', text1);

    fetch(this.url, {
      method: 'POST',
      body: requestData.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          this.memeUrl = data.data.url;
          console.log('URL del meme creado:', this.memeUrl);
          this.memeImageVisible = true;

          if (this.turnoActual === 1) {
            this.memesTurno1.push(this.memeUrl);
          } else {
            this.memesTurno2.push(this.memeUrl);
          }
        } else {
          console.error('Error al crear el meme:', data.error_message);
        }
      })
      .catch((error) => {
        console.error('Error al realizar la solicitud:', error);
      });
  }

  cambiarTemplate() {
    fetch('https://api.imgflip.com/get_memes')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const memes = data.data.memes;
          const randomIndex = Math.floor(Math.random() * memes.length);

          this.templateId = memes[randomIndex].id;

          this.actualizarMeme();
        } else {
          console.error('Error al obtener las plantillas de memes:', data.error_message);
        }
      })
      .catch((error) => {
        console.error('Error al realizar la solicitud:', error);
      });
  }

  iniciarTurno() {
    console.log(`Inicio del Turno ${this.turnoActual}`);
    this.tiempoRestante = 30;

    this.interval = setInterval(() => {
      if (this.tiempoRestante > 0) {
        this.tiempoRestante--;
      } else {
        clearInterval(this.interval);
        this.finalizarTurno();
      }
    }, 1000);

    this.actualizarMeme();
  }

  finalizarTurno() {
    console.log(`Fin del Turno ${this.turnoActual}`);
    if (this.turnoActual === 1) {
      console.log('Último Meme Turno 1:', this.memesTurno1[this.memesTurno1.length - 1]);
    } else {
      console.log('Último Meme Turno 2:', this.memesTurno2[this.memesTurno2.length - 1]);
    }

    this.turnoActual++;
    if (this.turnoActual <= 2) {
      this.tiempoRestante = 30;

      setTimeout(() => {
        clearInterval(this.interval); // Limpiar el intervalo antes de iniciar el próximo turno
        this.iniciarTurno();
      }, 1000); // Cambiado a 1000ms (1 segundo) para asegurar que clearInterval se complete antes de iniciar el próximo turno
    } else {
      console.log('Fin del juego. Mostrar resultados finales.');
      this.mostrarResultados = true; // Asegúrate de establecer mostrarResultados en true al finalizar el segundo turno
    }
  }
  detenerTurno() {
    clearInterval(this.interval);
    this.finalizarTurno();
  }

  onClick() {
    this.router.navigate(['/menu']);
  }

  ngOnInit(): void {
    this.iniciarTurno();
  }

  sumarXP() {
    let dato = localStorage.getItem("1")!;
    let user1: User = new User();
    this.loginservice.getUsers(dato).subscribe(
      (res) => {
        user1 = res[0];
        user1.experience++;
        user1.generatedmemes++;
        if (user1.experience >= 10) {
          user1.nivel += 1;
          console.log(user1.nivel);
          user1.coins += 15;
          user1.experience -= 10;
        }
        if (user1.nivel === 100 && user1.experience === 0) {
          user1.logros.push({ ruta: "./assets/Logros/reyDeLosMemes.jpg", nombre: "Rey De Los Memes" });
        }
        if (user1.generatedmemes === 1000) {
          user1.logros.push({ ruta: "./assets/Logros/locoPorLosMemes.jpg", nombre: "Loco Por Los Memes" });
        }
        this.loginservice.funcion(user1).subscribe(
          (res) => {
            console.log(user1.experience);
          },
          (e) => {
            console.log('Ha ocurrido un error al intentar editar la categoria2');
          }
        );
      },
      (e) => {
        console.log('Ha ocurrido un error al intentar editar la categoria');
      }
    );
  }
}
