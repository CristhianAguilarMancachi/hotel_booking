import { Component } from '@angular/core';

interface Room {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

@Component({
    selector: 'app-adminhabitaciones',
    templateUrl: './adminhabitaciones.component.html',
    styleUrls: ['./adminhabitaciones.component.css'],
})
export class AdminhabitacionesComponent {
    rooms: Room[] = [
        { id: 1, name: 'Suite Deluxe', description: 'Una suite de lujo con vista a la ciudad, cama king size, jacuzzi, y desayuno incluido.', price: 200, imageUrl: 'https://via.placeholder.com/300x200' },
        // Puedes agregar más habitaciones aquí
    ];
    currentRoom: Room | null = null; // Almacena la habitación que se está editando
    tempRoom: Room = { id: 0, name: '', description: '', price: 0, imageUrl: '' }; // Objeto temporal para el formulario

    openModal(room: Room | null) {
        this.currentRoom = room;
        this.tempRoom = room ? { ...room } : { id: 0, name: '', description: '', price: 0, imageUrl: '' }; // Clonar la habitación si existe, o inicializar un nuevo objeto
        this.showModal();
    }

    closeModal() {
        this.currentRoom = null;
        this.tempRoom = { id: 0, name: '', description: '', price: 0, imageUrl: '' }; // Reiniciar el objeto temporal
        this.hideModal();
    }

    saveRoom() {
      if (this.currentRoom) {
          // Editar habitación existente
          const index = this.rooms.findIndex(r => r.id === this.currentRoom!.id); // Usando `!`
          if (index !== -1) {
              // Solo actualiza si la habitación existe
              this.rooms[index] = this.tempRoom; // Guardar los cambios en la habitación existente
          }
      } else {
          // Agregar nueva habitación
          this.tempRoom.id = this.rooms.length + 1; // Asignar un nuevo ID
          this.rooms.push(this.tempRoom); // Agregar el nuevo objeto a la lista
      }
      this.closeModal();
  }
  

    deleteRoom(room: Room) {
        this.rooms = this.rooms.filter(r => r.id !== room.id);
    }

    showModal() {
        // Lógica para mostrar el modal
        const modal = document.getElementById('roomModal');
        if (modal) modal.style.display = 'block';
    }

    hideModal() {
        // Lógica para ocultar el modal
        const modal = document.getElementById('roomModal');
        if (modal) modal.style.display = 'none';
    }
}
