import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageAccessGuard implements CanActivate {
  constructor() {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const langUserID = localStorage.getItem("langUserID") 
    const langprivacity = localStorage.getItem("langprivacity") 
    const logUserID = localStorage.getItem("logUserID") 

    // Verifica si el usuario es el propietario del idioma o si el idioma es privado
    if ((langprivacity=='false') || (langprivacity=='true' && langUserID==logUserID)) {
      return true; // Permite el acceso
    } else {
      // Redirige a una página de acceso denegado o a otra página según sea necesario
      return false;
    }
  }
}
  

