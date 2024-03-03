import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministradorAccessGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const rol_Id = localStorage.getItem("rol_Id") 
  
      // Verifica si el usuario es el propietario del idioma o si el idioma es privado
      if (rol_Id=='1') {
        return true; // Permite el acceso
      } else {
        // Redirige a una página de acceso denegado o a otra página según sea necesario
        return false;
      }
  }
  
}
