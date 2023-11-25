import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { JuegoSolitarioComponent } from './juego-solitario/juego-solitario.component';
import { MenuComponent } from './menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { MisionesComponent } from './misiones/misiones.component';
import { LoginService } from './login.service';
import { TiendaComponent } from './tienda/tienda.component';
import { RankingComponent } from './ranking/ranking.component';
import { TrofeosComponent } from './trofeos/trofeos.component';
import { LogrosComponent } from './logros/logros.component';
import { JuegoContraReloj } from './juego-contra-reloj/juego-contra-reloj.component';
import { GenerarMemePropioComponent } from './generar-meme-propio/generar-meme-propio.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    JuegoSolitarioComponent,
    MenuComponent,
    MisionesComponent,
    TiendaComponent,
    RankingComponent,
    TrofeosComponent,
    LogrosComponent,
    JuegoContraReloj,
    GenerarMemePropioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
