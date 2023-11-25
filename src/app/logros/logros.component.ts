import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/users';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-logros',
  templateUrl: './logros.component.html',
  styleUrls: ['./logros.component.css']
})
export class LogrosComponent {
  logros: { ruta: string, nombre: string }[] = [];

  constructor(private router: Router, private loginService: LoginService) {
    this.actualizarUser();
  }

  roadToMenu() {
    this.router.navigate(['/menu']);
  }

  actualizarUser() {
    let dato = localStorage.getItem("1")!;
    let user1: User = new User();

    this.loginService.getUsers(dato).subscribe(
      (res) => {
        user1 = res[0];
        console.log(user1.logros);
        this.logros = user1.logros;
        this.loginService.funcion(user1).subscribe(
          (res) => {
            console.log(user1.logros);
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
}
