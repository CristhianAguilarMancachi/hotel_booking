import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return new Observable(observer => {
      const isLoggedIn = !!this.authService.getCurrentUser();
      if (isLoggedIn) {
        observer.next(true);
      } else {
        this.router.navigate(['/login']);  // Redirige a login si no está autenticado
        observer.next(false);
      }
      observer.complete();
    });
  }
}
