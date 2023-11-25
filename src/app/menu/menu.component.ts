import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from 'src/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {


  cemail: string = "";
  constructor(private loginservice: LoginService, private route: Router) {

  }

  ngOnInit() {


  }
  roadToLogin() {
    // Cuando el usuario cierra sesión
    localStorage.removeItem('1');
    this.route.navigate(['/login']);
  }

  roadToJuegoSolitario() {
    this.route.navigate(['/juegoSolitario']);
  }

  roadToMisiones() {
    this.route.navigate(['/misiones']);
  }

  roadToTienda() {

    this.route.navigate(['/tienda']);


  }



  roadToRanking() {
    this.route.navigate(['/ranking']);
  }
  roadToTrofeos() {
    this.route.navigate(['/trofeos']);
  }
  roadToLogros() {
    this.route.navigate(['/logros']);
  }

  roadToContraReloj() {
    this.route.navigate(['/juegoContraReloj']);
  }
  roadToMemePropio() {
    this.route.navigate(['/generarMemePropio']);
  }

}
