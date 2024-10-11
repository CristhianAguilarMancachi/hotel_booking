import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  // Datos estáticos del perfil
  user = {
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    phone: '123456789',
    address: 'Calle Falsa 123'
  };

  // Datos editados
  editedUser = { ...this.user };

  showModal = false; // Controla la visibilidad del modal

  openModal() {
    this.showModal = true; // Abre el modal
  }

  closeModal() {
    this.showModal = false; // Cierra el modal
  }

  onSubmit() {
    this.user = { ...this.editedUser }; // Actualiza la información del usuario
    this.closeModal(); // Cierra el modal después de guardar
  }
}
