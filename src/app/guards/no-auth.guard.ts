import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
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
    //no activo
    return this.firebaseSvc.getAutState().pipe(map(auth => {
      if (!auth) {
        return true;
      } 
    //activo
      else {
        this.utilsSvc.routerLink('/tabs/home')
        return false;
      }
    }))


  }

  
}
