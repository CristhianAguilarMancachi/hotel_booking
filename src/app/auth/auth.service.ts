import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as bcrypt from 'bcryptjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afs: AngularFirestore) {}

  // Método para registrar un usuario y encriptar la contraseña
  async registerUser(email: string, password: string, name: string, phone: string, address: string = '', role: string = 'usuario'): Promise<any> {
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Obtener el último ID en la tabla 'users' (IDs secuenciales en formato string)
    const lastUserQuerySnapshot = await this.afs.collection('users', ref => ref.orderBy('id', 'desc').limit(1)).get().toPromise();
    
    // Calcular el nuevo ID basado en el último registrado
    let newId = '1'; // Si no hay usuarios, comenzamos con '1'
    if (lastUserQuerySnapshot && !lastUserQuerySnapshot.empty) {
      const lastUserDoc = lastUserQuerySnapshot.docs[0];
      const lastUserData = lastUserDoc.data() as any;
      newId = (parseInt(lastUserData.id) + 1).toString(); // Sumar 1 al último ID
    }

    // Datos del usuario para la tabla 'users'
    const userData = {
      id: newId,  // ID del usuario en formato string
      email,
      password: hashedPassword,
      role_id: 2,  // El ID del rol "usuario"
      created_at: new Date(),
      updated_at: new Date(),
    };

    // Guardar en la tabla 'users'
    await this.afs.collection('users').doc(newId).set(userData);

    // Datos del huésped para la tabla 'guests'
    const guestData = {
      id: (parseInt(newId) + 1).toString(), // Generar un ID secuencial para el huésped (por ejemplo, uno más que el ID del usuario)
      user_id: newId,  // Referencia al ID del usuario
      name,
      phone,
      address,
      created_at: new Date(),
      updated_at: new Date(),
    };

    // Guardar en la tabla 'guests'
    await this.afs.collection('guests').doc(guestData.id).set(guestData);

    // Crear la relación en la tabla 'user_roles'
    const userRoleData = {
      userId: newId,
      roleId: 2  // Rol "usuario"
    };

    await this.afs.collection('user_roles').add(userRoleData);

    return userData; // Retornamos los datos del usuario registrado
  }

  // Método para iniciar sesión y comparar la contraseña hasheada
  async login(email: string, password: string): Promise<any> {
    const userRef = this.afs.collection('users', ref => ref.where('email', '==', email));
    const userSnapshot = await userRef.get().toPromise();

    if (userSnapshot && !userSnapshot.empty) {
      const userData: any = userSnapshot.docs[0].data();
      const isPasswordValid = await bcrypt.compare(password, userData['password']);
      if (isPasswordValid) {
        return userData;
      } else {
        throw new Error('Contraseña incorrecta');
      }
    } else {
      throw new Error('Usuario no encontrado');
    }
  }

  // Obtener todos los usuarios
  getUsers(): Observable<any> {
    return this.afs.collection('users').valueChanges();
  }

  // Obtener todos los roles
  getRoles(): Observable<any> {
    return this.afs.collection('roles').valueChanges();
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): Observable<boolean> {
    return new Observable(observer => {
      observer.next(!!localStorage.getItem('currentUser'));
      observer.complete();
    });
  }

  // Obtener el usuario actual
  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  // Cerrar sesión
  logout() {
    localStorage.removeItem('currentUser');
  }
}
