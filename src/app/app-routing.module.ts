import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importa los componentes correspondientes para cada ruta
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { RegistrationComponent } from './registration/registration.component';
import { MisionesComponent } from './misiones/misiones.component';
import { TiendaComponent } from './tienda/tienda.component';
import { RankingComponent } from './ranking/ranking.component';
import { TrofeosComponent } from './trofeos/trofeos.component';
import { JuegoSolitarioComponent } from './juego-solitario/juego-solitario.component';
import { LogrosComponent } from './logros/logros.component';
import { JuegoContraReloj } from './juego-contra-reloj/juego-contra-reloj.component';
import { GenerarMemePropioComponent } from './generar-meme-propio/generar-meme-propio.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },               // Ruta para el componente de login
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },               // Ruta para el componente de menú
  { path: 'register', component: RegistrationComponent }, // Ruta para el componente de registro // Ruta para el componente de juego solitario
  { path: 'misiones', component: MisionesComponent, canActivate: [AuthGuard] },
  { path: 'tienda', component: TiendaComponent, canActivate: [AuthGuard] },
  { path: 'ranking', component: RankingComponent, canActivate: [AuthGuard] },
  { path: 'juegoSolitario', component: JuegoSolitarioComponent, canActivate: [AuthGuard] },
  { path: 'trofeos', component: TrofeosComponent, canActivate: [AuthGuard] },
  { path: 'logros', component: LogrosComponent, canActivate: [AuthGuard] },
  { path: 'juegoContraReloj', component: JuegoContraReloj, canActivate: [AuthGuard] },
  { path: 'generarMemePropio', component: GenerarMemePropioComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
