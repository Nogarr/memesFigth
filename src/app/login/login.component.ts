import { Component, ElementRef, Renderer2 } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from 'src/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginContainer: HTMLElement | null;
  registrationContainer: HTMLElement | null;
  toggleButton: HTMLElement | null;

  password: string = "";
  email: string = "";
  email2: string = "";
  user: User = new User();
  showLogin: boolean = true;

  constructor(private loginservice: LoginService, private route: Router, private el: ElementRef, private renderer: Renderer2) {
    this.loginContainer = el.nativeElement.querySelector('.login-container');
    this.registrationContainer = el.nativeElement.querySelector('.registration-container');
    this.toggleButton = el.nativeElement.querySelector('#toggleButton');

    this.toggleButton?.addEventListener('click', () => {
      this.showLogin = !this.showLogin;
    });

    // Inicializa showLogin en true para mostrar el formulario de inicio de sesión por defecto
    this.showLogin = true;
  }

  verificacion() {
    this.loginservice.getUsers(this.email).subscribe(
      (response) => {
        if (response[0].password == this.password) {
          localStorage.setItem("1", this.email);
          this.route.navigate(['/menu']);
        } else {
          alert("Contraseña incorrecta");
        }
      }, (e) => {
        alert("Error al intentar autenticar el email");
      }
    );
  }



  password2: string = "";

  registrarUsuario() {
    this.loginservice.getUsers(this.email2).subscribe(
      (usuarios) => {
        if (usuarios && usuarios.length > 0 || this.password2.length < 6) {
          alert("Ya existe un usuario con este correo electrónico o su contraseña es menor a 6 digitos.");
        } else {
          // Si no existe, proceder con el registro
          this.user.email = this.email2;
          this.user.password = this.password2;
          this.user.coins = 0;
          this.user.experience = 0;
          this.user.generatedmemes = 0;

          this.loginservice.agregarUsers(this.user).subscribe(
            (respuesta) => {
              alert("Registro exitoso");
              this.route.navigate(['/login']);
            },
            (e) => {
              alert("No se ha logrado registrar");
            }
          );
        }
      },
      (error) => {
        console.error("Error al verificar la existencia del usuario", error);
      }
    );
  }

  toggleForms() {
    const button = this.el.nativeElement.querySelector('#toggleButton');
    if (button) {
      button.classList.add('shadow-drop-center');
      setTimeout(() => {
        button.classList.remove('shadow-drop-center');
      }, 400);
    }
    this.showLogin = !this.showLogin;
  }

  applyAnimation() {
    const formContainer = this.el.nativeElement.querySelector('.form-container');
    this.renderer.addClass(formContainer, 'shadow-drop-center');

    // Establece un temporizador para quitar la clase después de que termine la animación
    setTimeout(() => {
      this.renderer.removeClass(formContainer, 'shadow-drop-center');
    }, 400);
  }


}
