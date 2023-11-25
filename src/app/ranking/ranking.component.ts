// ranking.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { User } from 'src/users';


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  users: User[] = [];

  constructor(private http: HttpClient, private route: Router, private loginService: LoginService) { }

  ngOnInit() {
    // Actualiza la lógica para obtener toda la base de datos de user.json
    this.loginService.getAllUsers().subscribe(
      (res: any) => {
        this.users = res;
        this.sortUsersByLevel();
      },
      (e: any) => {
        console.log('Ha ocurrido un error al intentar obtener la lista de usuarios');
      }
    );
  }

  sortUsersByLevel(): void {
    // Ordena el array 'users' por el nivel de forma descendente
    this.users.sort((a, b) => b.nivel - a.nivel);
  }

  roadToMenu() {
    this.route.navigate(['/menu']);
  }
}
