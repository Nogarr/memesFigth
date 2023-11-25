import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from 'src/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(private loginservice: LoginService, private route: Router) { }

  password: string = "";
  email: string = "";
  user: User = new User();

  registrarUsuario() {
    this.user.email = this.email;
    this.user.password = this.password;
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

}

