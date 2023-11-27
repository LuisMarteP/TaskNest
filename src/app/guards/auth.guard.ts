import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  //exportar los seervicios de firebase
  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) {

  }
  ////////////////////

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    //Comprobacion del inicio de sesion
    //activo
    return this.firebaseSvc.getAutState().pipe(map(auth => {
      if (auth) {
        return true;
      } 
    //no activo
      else {
        this.utilsSvc.routerLink('/auth')
        return false;
      }
    }))


  }

}
