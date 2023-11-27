import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

user = {} as User
  constructor(
    private firebaseSvc: FirebaseService, 
    private utilsSvc: UtilsService
  ) { }

  ngOnInit() {
  }
  
//Se ejecura cuando el usuario entre a la pagina
ionViewWillEnter() {
  this.getUser()
}
///////

//Mostrar datos del usuario
getUser(){
return this.user = this.utilsSvc.getElementFromLocalStorage('user')
}
signOuth(){
 this.utilsSvc.presentAlert({
  header: 'Cerrar Sesion',
  message: 'Desea cerrar sesion?',
  mode: 'ios',
  buttons: [
    {
      text: 'Cancelar',
      role: 'cancel',
      cssClass: 'secondary',
      handler: () => {
        console.log('Confirm Cancel: blah');
      }
    }, {
      text: 'Aceptar',
      handler: () => {
        this.firebaseSvc.singOut();
      }
    }
  ]
})
}

}
