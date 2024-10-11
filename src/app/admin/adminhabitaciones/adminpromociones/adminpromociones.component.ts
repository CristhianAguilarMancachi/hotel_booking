import { Component } from '@angular/core';

interface Promotion {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
}

@Component({
    selector: 'app-adminpromociones',
    templateUrl: './adminpromociones.component.html',
    styleUrls: ['./adminpromociones.component.css'],
})
export class AdminpromocionesComponent {
    promotions: Promotion[] = [
        { id: 1, title: 'Descuento de Primavera', description: 'Aprovecha un 20% de descuento en tu estadía durante todo el mes de abril.', imageUrl: 'https://via.placeholder.com/300x200' },
        // Puedes agregar más promociones aquí
    ];
    currentPromotion: Promotion | null = null; // Almacena la promoción que se está editando
    tempPromotion: Promotion = { id: 0, title: '', description: '', imageUrl: '' }; // Objeto temporal para el formulario

    openModal(promotion: Promotion | null) {
        this.currentPromotion = promotion;
        this.tempPromotion = promotion ? { ...promotion } : { id: 0, title: '', description: '', imageUrl: '' }; // Clonar la promoción si existe
        this.showModal();
    }

    closeModal() {
        this.currentPromotion = null;
        this.tempPromotion = { id: 0, title: '', description: '', imageUrl: '' }; // Reiniciar el objeto temporal
        this.hideModal();
    }

    savePromotion() {
        if (this.currentPromotion) {
            // Editar promoción existente
            const index = this.promotions.findIndex(p => p.id === this.currentPromotion!.id);
            if (index !== -1) {
                this.promotions[index] = this.tempPromotion; // Guardar los cambios en la promoción existente
            }
        } else {
            // Agregar nueva promoción
            this.tempPromotion.id = this.promotions.length + 1; // Asignar un nuevo ID
            this.promotions.push(this.tempPromotion); // Agregar el nuevo objeto a la lista
        }
        this.closeModal();
    }

    deletePromotion(promotion: Promotion) {
        this.promotions = this.promotions.filter(p => p.id !== promotion.id);
    }

    showModal() {
        // Lógica para mostrar el modal
        const modal = document.getElementById('promotionModal');
        if (modal) modal.style.display = 'block';
    }

    hideModal() {
        // Lógica para ocultar el modal
        const modal = document.getElementById('promotionModal');
        if (modal) modal.style.display = 'none';
    }
}
