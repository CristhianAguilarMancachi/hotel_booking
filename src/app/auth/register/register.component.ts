import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  name: string = '';
  phone: string = '';
  address: string = ''; // Añadimos la dirección
  role: string = 'usuario'; // Definimos el rol por defecto como 'usuario'
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  async onRegister() {
    if (this.password.length < 12) {
      this.toastr.error('La contraseña debe tener al menos 12 caracteres.', 'Error');
      return; // Detiene la ejecución si la contraseña es demasiado corta
    }
    
    try {
      await this.authService.registerUser(this.email, this.password, this.name, this.phone, this.address, this.role);
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.errorMessage = 'Error en el registro: ' + error.message;
      this.toastr.error(this.errorMessage, 'Error de Registro');  // Usa toastr para mostrar errores
    }
  }
}
