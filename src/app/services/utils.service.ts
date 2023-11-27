import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertOptions, LoadingController, LoadingOptions, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Task } from 'src/app/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    //funcion de carga
    private loadingController: LoadingController,
    private router:Router,
    private toastController: ToastController,
    //Alerta
    private alertController: AlertController,
    //Agregar Tareas
    private modalController: ModalController
  ) { }

   //llamando a la funcion de carga
   async presentLoading(opts?: LoadingOptions) {
    const loading = await this.loadingController.create(opts);
    await loading.present();
   }
   //Ocultar la funcion de carga
   async dismissLoading(){
    return await this.loadingController.dismiss()
   }
//local storage SET
   setElemenInLocalstorage(key: string, element: any){
    return localStorage.setItem(key, JSON.stringify(element))
   }
//local storage GET
   getElementFromLocalStorage(key: string){
    return JSON.parse(localStorage.getItem(key));
   }
 
   async presentToast(opts: ToastOptions) {
    const toast = await this.toastController.create(opts);
    toast.present();
   }

   routerLink(url: string){
    return this.router.navigateByUrl(url);
   }
   //Alerta
   async presentAlert(opts: AlertOptions) {
    const alert = await this.alertController.create(opts);
   
    await alert.present();
   }
 
   //Agregar tareas
   async presentModal(opts: ModalOptions) {
    const modal = await this.modalController.create(opts);
   
    await modal.present();

    const {data} = await modal.onWillDismiss();

    if(data){
      return data;
    }
   }
   dismissMod(data?: any){
    this.modalController.dismiss(data);
   }
   //Calcular progreso de las tareas
   getPercentage(task: Task) {
    let completedItems = task.items.filter(item => item.completed).length;
    let totalItems = task.items.length;
    
    if (totalItems === 0) {
      return 0; // Manejo de división por cero
    }
  
    let percentage = (completedItems / totalItems) * 100; // Multiplicar por 100 para obtener el porcentaje
  
    return Math.round(percentage); // Redondear el porcentaje para mostrarlo como un número entero
  }
  
}
