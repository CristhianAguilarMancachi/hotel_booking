import { Component } from '@angular/core';

interface Role {
    id: number;
    name: string;
    permissions: string[];
}

@Component({
    selector: 'app-adminroles',
    templateUrl: './adminroles.component.html',
    styleUrls: ['./adminroles.component.css'],
})
export class AdminRolesComponent {
    roles: Role[] = [
        { id: 1, name: 'Admin', permissions: ['read', 'write', 'delete'] },
        { id: 2, name: 'Editor', permissions: ['read', 'write'] },
        // Puedes agregar más roles aquí
    ];
    currentRole: Role | null = null; // Almacena el rol que se está editando
    tempRole: Role = { id: 0, name: '', permissions: [] }; // Objeto temporal para el formulario

    openModal(role: Role | null) {
        this.currentRole = role;
        this.tempRole = role ? { ...role } : { id: 0, name: '', permissions: [] }; // Clonar el rol si existe
        this.showModal();
    }

    closeModal() {
        this.currentRole = null;
        this.tempRole = { id: 0, name: '', permissions: [] }; // Reiniciar el objeto temporal
        this.hideModal();
    }

    saveRole() {
        if (this.currentRole) {
            // Editar rol existente
            const index = this.roles.findIndex(r => r.id === this.currentRole!.id);
            if (index !== -1) {
                this.roles[index] = this.tempRole; // Guardar los cambios en el rol existente
            }
        } else {
            // Agregar nuevo rol
            this.tempRole.id = this.roles.length + 1; // Asignar un nuevo ID
            this.roles.push(this.tempRole); // Agregar el nuevo objeto a la lista
        }
        this.closeModal();
    }

    deleteRole(role: Role) {
        this.roles = this.roles.filter(r => r.id !== role.id);
    }

    showModal() {
        const modal = document.getElementById('roleModal');
        if (modal) modal.style.display = 'block';
    }

    hideModal() {
        const modal = document.getElementById('roleModal');
        if (modal) modal.style.display = 'none';
    }
}
