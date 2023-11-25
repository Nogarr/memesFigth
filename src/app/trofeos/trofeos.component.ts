import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from 'src/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trofeos',
  templateUrl: './trofeos.component.html',
  styleUrls: ['./trofeos.component.css']
})
export class TrofeosComponent {

  images: string[] = [];
  user: User = new User();

  constructor(private loginservice: LoginService, private route: Router) {
    // Llamada al método actualizarUser en lugar de asignar valores directamente
    this.actualizarUser();
  }

  actualizarUser() {
    let dato = localStorage.getItem("1")!;
    let user1: User = new User();
    let flagg = 0;
    this.loginservice.getUsers(dato).subscribe(
      (res) => {
        user1 = res[0];
        // Asigna el array de trofeos de user1 a images
        this.images = user1.trofeos.concat(user1.fotoPerfil);
      },
      (e) => {
        console.log('Ha ocurrido un error al intentar editar la categoria');
      }
    );
  }

  roadToMenu() {
    this.route.navigate(['/menu']);
  }
}
