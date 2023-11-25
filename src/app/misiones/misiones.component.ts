import { Component, OnInit } from '@angular/core';
import { User } from 'src/users';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-misiones',
  templateUrl: './misiones.component.html',
  styleUrls: ['./misiones.component.css']
})
export class MisionesComponent implements OnInit {

  constructor(private loginservice: LoginService, private route: Router) { }

  user: User = new User();
  nivelObjetivo: number = 0;
  trofeosObjetivo: string[] = [];
  generatedmemeObjetivo: number = 0;
  nivel: number = 0; // Variable para el nivel

  ngOnInit() {
    this.actualizarUser();
  }

  actualizarUser() {
    let dato = localStorage.getItem("1")!;
    let user1: User = new User();
    let flagg = 0;
    this.loginservice.getUsers(dato).subscribe(
      (res) => {
        user1 = res[0];
        this.user = user1;

        // Actualizar las propiedades después de obtener los datos
        this.nivelObjetivo = this.user.experience;
        this.trofeosObjetivo = this.user.trofeos;
        this.generatedmemeObjetivo = this.user.generatedmemes;
        this.nivel = this.user.nivel;

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
