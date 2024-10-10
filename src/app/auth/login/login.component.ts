import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onLogin() {
    try {
      const user = await this.authService.login(this.email, this.password);
      localStorage.setItem('currentUser', JSON.stringify(user)); // Guarda el usuario autenticado en localStorage
      this.router.navigate(['/home']); // Redirigir a la página de inicio si el login es exitoso
    } catch (error: any) {
      this.errorMessage = error.message || 'Credenciales incorrectas o usuario no encontrado';
      console.error('Error en el login:', error);  // Para depurar en la consola
    }
  }

   // Redirigir al usuario a la página de registro
   goToRegister() {
    this.router.navigate(['/register']);
  }
}
