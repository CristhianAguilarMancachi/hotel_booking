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
  async registerUser(email: string, password: string, role: string = 'usuario'): Promise<any> {
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10); 

    // Obtener el último ID autoincremental en la tabla 'users'
    const lastUserQuerySnapshot = await this.afs.collection('users', ref => ref.orderBy('id', 'desc').limit(1)).get().toPromise();
    
    // Porque ya existe un usuario en bdd empezamos con el id 2
    let newId = 2;
    if (lastUserQuerySnapshot && !lastUserQuerySnapshot.empty) {
      const lastUserDoc = lastUserQuerySnapshot.docs[0]; // Obtenemos el primer documento
      const lastUserData = lastUserDoc.data() as any; // Convertimos el documento en un objeto
      newId = lastUserData.id + 1; // Incrementamos el ID
    }

    const userData = {
      id: newId,
      email,
      password: hashedPassword
    };

    // Guardar el nuevo usuario en la tabla 'users'
    await this.afs.collection('users').doc(newId.toString()).set(userData);

    // Crear una relación en la tabla 'user_roles' con el rol 'usuario' (id: 2)
    const userRoleData = {
      userId: newId,
      roleId: 2  // Asignar el ID del rol 'usuario'
    };

    await this.afs.collection('user_roles').add(userRoleData);

    return userData; // Retornamos los datos del usuario registrado
  }



  // Método para iniciar sesión y comparar la contraseña hasheada
  async login(email: string, password: string): Promise<any> {
    const userRef = this.afs.collection('users', ref => ref.where('email', '==', email));
    const userSnapshot = await userRef.get().toPromise();

    if (userSnapshot && !userSnapshot.empty) { // Verifica si la consulta fue exitosa
      const userData: any = userSnapshot.docs[0].data(); // Asegura que userData es de tipo 'any'
      const isPasswordValid = await bcrypt.compare(password, userData['password']); // Comparar la contraseña
      if (isPasswordValid) {
        return userData; // Si la contraseña es válida, retornar el usuario
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

  // Guardar un rol en Firestore
  saveRole(roleData: any): Promise<any> {
    return this.afs.collection('roles').add(roleData);
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): Observable<boolean> {
    return new Observable(observer => {
      observer.next(!!localStorage.getItem('currentUser')); // Verifica si hay un usuario actual
      observer.complete();
    });
  }

  // Obtener el usuario actual
  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || '{}'); // Devuelve el usuario actual desde localStorage
  }

  // Cerrar sesión
  logout() {
    localStorage.removeItem('currentUser'); // Remueve el usuario del localStorage
  }
}
