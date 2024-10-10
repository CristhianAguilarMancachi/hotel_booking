import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environment/enviroment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxPasswordStrengthBarModule } from 'ngx-password-strength-bar'; // Corrige esto
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,  // Importa BrowserAnimationsModule
    ToastrModule.forRoot({   // Configuración inicial para toastr
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AppRoutingModule,
    FormsModule,
    NgxPasswordStrengthBarModule, // Modulo para verificar contraseñas
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),  // Configurar Firebase
    AngularFireAuthModule  // Módulo para autenticación
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
