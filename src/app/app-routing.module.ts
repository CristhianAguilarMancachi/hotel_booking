import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { ReservasComponent } from './reservas/reservas.component';
import { PerfilComponent } from './perfil/perfil.component';

import { AuthGuard } from './guards/auth.guard';

//admin
import { AdminhabitacionesComponent } from './admin/adminhabitaciones/adminhabitaciones.component';
import { AdminpromocionesComponent } from './admin/adminhabitaciones/adminpromociones/adminpromociones.component';
import { AdminempleadosComponent } from './adminempleados/adminempleados.component';
import { AdminRolesComponent } from './adminroles/adminroles.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'reservas', component: ReservasComponent}, // Home está protegido por el guard
  { path: 'perfil', component: PerfilComponent},
  //admin
  { path: 'gestionhab', component: AdminhabitacionesComponent},
  { path: 'gestprom', component: AdminpromocionesComponent},
  { path: 'gestempleados', component: AdminempleadosComponent},
  { path: 'gestroles', component: AdminRolesComponent},


  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirige a login por defecto
  { path: '**', redirectTo: 'home' } // Redirige rutas no encontradas al login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
