    import { Component, OnInit } from '@angular/core';
    import { HttpClient } from '@angular/common/http';

    interface Room {
        id: number;
     
        is_available: boolean;   // Disponibilidad
        capacidad: number | null; // Capacidad
        name: string;           // Nombre de la habitación
        description: string;
        price: number;
        imageUrl: string;
        created_at?: string;     // Fecha de creación
        updated_at?: string;     // Fecha de actualización
    }
    

    @Component({
        selector: 'app-adminhabitaciones',
        templateUrl: './adminhabitaciones.component.html',
        styleUrls: ['./adminhabitaciones.component.css'],
    })
    export class AdminhabitacionesComponent implements OnInit {
        rooms: Room[] = [];
        currentRoom: Room | null = null;
        tempRoom: Room = { 
            id: 0, 
           
            is_available: true, // Valor predeterminado
            capacidad: null, 
            name: '',           // Inicializar el nombre
            description: '', 
            price: 0, 
            imageUrl: '' 
        };
        

        constructor(private http: HttpClient) {}

        ngOnInit() {
            this.getRooms();
        }

        getRooms() {
            this.http.get<Room[]>('http://localhost/hotelbooking/src/app/api/rooms_api.php').subscribe(
                (data) => {
                    console.log('Datos recibidos:', data); // Verifica los datos aquí
                    this.rooms = data;
                },
                (error) => {
                    console.error('Error al obtener habitaciones:', error);
                }
            );
        }
        

        openModal(room: Room | null) {
            this.currentRoom = room;
            this.tempRoom = room ? { ...room } : {  id: 0, 
             is_available: true, // Valor predeterminado
                capacidad: null, 
                name: '',           // Inicializar el nombre
                description: '', 
                price: 0, 
                imageUrl: '' };
            this.showModal();
        }

        closeModal() {
            this.currentRoom = null;
            this.tempRoom = {  id: 0, 
              
                is_available: true, // Valor predeterminado
                capacidad: null, 
                name: '',           // Inicializar el nombre
                description: '', 
                price: 0, 
                imageUrl: ''  };
            this.hideModal();
        }

        saveRoom() {
            console.log('Datos a enviar:', this.tempRoom); // Agrega esta línea
            const roomData = {
                name: this.tempRoom.name,
                description: this.tempRoom.description,
                price: this.tempRoom.price,
                imageUrl: this.tempRoom.imageUrl,
                capacidad: this.tempRoom.capacidad,
                is_available: this.tempRoom.is_available ? 1 : 0, // Convierte booleano a entero
            };
        
            if (this.currentRoom) {
                // Editar habitación existente
                this.http.put('http://localhost/hotelbooking/src/app/api/rooms_api.php', { ...roomData, id: this.currentRoom.id }).subscribe(
                    (response) => {
                        console.log('Habitación editada:', response);
                        this.getRooms(); // Actualizar la lista de habitaciones
                    },
                    (error) => {
                        console.error('Error al editar la habitación:', error);
                    }
                );
            } else {
                // Agregar nueva habitación
                this.http.post('http://localhost/hotelbooking/src/app/api/rooms_api.php', roomData).subscribe(
                    (response) => {
                        console.log('Habitación agregada:', response);
                        this.getRooms(); // Actualizar la lista de habitaciones
                    },
                    (error) => {
                        console.error('Error al agregar la habitación:', error);
                    }
                );
            }
            this.closeModal();
        }
        
        
        

        deleteRoom(room: Room) {
            this.http.request('DELETE', 'http://localhost/hotelbooking/src/app/api/rooms_api.php', { body: { id: room.id } }).subscribe(
                (response) => {
                    console.log(response);
                    this.getRooms(); // Actualizar la lista de habitaciones
                },
                (error) => {
                    console.error('Error al eliminar la habitación:', error);
                }
            );
        }

        showModal() {
            const modal = document.getElementById('roomModal');
            if (modal) modal.style.display = 'block';
        }

        hideModal() {
            const modal = document.getElementById('roomModal');
            if (modal) modal.style.display = 'none';
        }
    }
