import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  name: string = '';
  phone: string = '';
  address: string = ''; // Añadimos la dirección
  role: string = 'usuario'; // Definimos el rol por defecto como 'usuario'
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onRegister() {
    try {
      // Pasamos la dirección como parte del registro
      await this.authService.registerUser(this.email, this.password, this.name, this.phone, this.address, this.role);
      this.router.navigate(['/login']); // Redirigir a la página de login después del registro
    } catch (error: any) {
      this.errorMessage = 'Error en el registro: ' + error.message;
      console.error('Error en el registro:', error);  // Para depurar en la consola
    }
  }
}
