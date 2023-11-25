import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('Guardia activado');
    if (this.loginService.isLoggedIn()) {
      return true; // Usuario autenticado, permite el acceso a la ruta
    } else {
      // Redirige al componente de inicio de sesión si el usuario no está autenticado
      this.router.navigate(['/login']);
      return false; // Impide el acceso a la ruta
    }
  }
}