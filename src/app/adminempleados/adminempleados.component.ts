import { Component } from '@angular/core';

interface Employee {
  id: number;
  name: string;
  position: string;
  salary: number;
  permissions: string[];
  photoUrl: string; // URL de la foto del empleado
  email: string; // Correo electrónico
  phone: string; // Número de teléfono
  startDate: Date; // Fecha de inicio
}


@Component({
    selector: 'app-adminempleados',
    templateUrl: './adminempleados.component.html',
    styleUrls: ['./adminempleados.component.css'],
})
export class AdminempleadosComponent {
  employees: Employee[] = [
    {
        id: 1,
        name: 'Juan Pérez',
        position: 'Gerente',
        salary: 5000,
        permissions: ['read', 'write'],
        photoUrl: 'https://example.com/photos/juan.jpg', // URL de la foto
        email: 'juan.perez@example.com', // Correo electrónico
        phone: '123-456-7890', // Número de teléfono
        startDate: new Date('2020-01-15') // Fecha de inicio
    },
    {
        id: 2,
        name: 'Ana García',
        position: 'Recepcionista',
        salary: 2500,
        permissions: ['read'],
        photoUrl: 'https://example.com/photos/ana.jpg', // URL de la foto
        email: 'ana.garcia@example.com', // Correo electrónico
        phone: '098-765-4321', // Número de teléfono
        startDate: new Date('2021-06-01') // Fecha de inicio
    },
    {
        id: 3,
        name: 'Carlos López',
        position: 'Cocinero',
        salary: 3000,
        permissions: ['read', 'write'],
        photoUrl: 'https://example.com/photos/carlos.jpg', // URL de la foto
        email: 'carlos.lopez@example.com', // Correo electrónico
        phone: '456-789-1230', // Número de teléfono
        startDate: new Date('2019-08-20') // Fecha de inicio
    },
    {
        id: 4,
        name: 'Laura Sánchez',
        position: 'Limpiadora',
        salary: 2000,
        permissions: ['read'],
        photoUrl: 'https://example.com/photos/laura.jpg', // URL de la foto
        email: 'laura.sanchez@example.com', // Correo electrónico
        phone: '321-654-9870', // Número de teléfono
        startDate: new Date('2022-02-15') // Fecha de inicio
    }
    // Puedes agregar más empleados aquí
];

    currentEmployee: Employee | null = null; // Almacena el empleado que se está editando
    tempEmployee: Employee = { 
      id: 0, 
      name: '', 
      position: '', 
      salary: 0, 
      permissions: [], 
      photoUrl: '', // Inicializa la URL de la foto
      email: '', // Inicializa el correo electrónico
      phone: '', // Inicializa el número de teléfono
      startDate: new Date() // Inicializa la fecha de inicio
  };
  
  openModal(employee: Employee | null) {
    this.currentEmployee = employee;
    this.tempEmployee = employee
        ? { ...employee } // Clonar el empleado si existe
        : { 
            id: 0, 
            name: '', 
            position: '', 
            salary: 0, 
            permissions: [], 
            photoUrl: '', // Inicializar campo de foto
            email: '', // Inicializar campo de correo electrónico
            phone: '', // Inicializar campo de teléfono
            startDate: new Date() // Inicializar campo de fecha de inicio
        };
    this.showModal();
}

closeModal() {
    this.currentEmployee = null;
    this.tempEmployee = { 
        id: 0, 
        name: '', 
        position: '', 
        salary: 0, 
        permissions: [], 
        photoUrl: '', // Reiniciar campo de foto
        email: '', // Reiniciar campo de correo electrónico
        phone: '', // Reiniciar campo de teléfono
        startDate: new Date() // Reiniciar campo de fecha de inicio
    }; 
    this.hideModal();
}


    saveEmployee() {
        if (this.currentEmployee) {
            // Editar empleado existente
            const index = this.employees.findIndex(e => e.id === this.currentEmployee!.id);
            if (index !== -1) {
                this.employees[index] = this.tempEmployee; // Guardar los cambios en el empleado existente
            }
        } else {
            // Agregar nuevo empleado
            this.tempEmployee.id = this.employees.length + 1; // Asignar un nuevo ID
            this.employees.push(this.tempEmployee); // Agregar el nuevo objeto a la lista
        }
        this.closeModal();
    }

    deleteEmployee(employee: Employee) {
        this.employees = this.employees.filter(e => e.id !== employee.id);
    }

    showModal() {
        const modal = document.getElementById('employeeModal');
        if (modal) modal.style.display = 'block';
    }

    hideModal() {
        const modal = document.getElementById('employeeModal');
        if (modal) modal.style.display = 'none';
    }
}
