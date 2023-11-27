import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemReorderEventDetail } from '@ionic/angular';
import { Item, Task } from 'src/app/models/task.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-task',
  templateUrl: './add-update-task.component.html',
  styleUrls: ['./add-update-task.component.scss'],
})
export class AddUpdateTaskComponent implements OnInit {
  //recibir tareas
  @Input() task: Task;
  user = {} as User
  //recibir los datos de las tareas
  form = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('', [Validators.required, Validators.minLength(4)]),
    items: new FormControl([], [Validators.required, Validators.minLength(1)])
  })

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) { }

  ngOnInit() {
    this.user = this.utilsSvc.getElementFromLocalStorage('user')

    //Editar tareas
    if (this.task) {
      this.form.setValue(this.task);
      this.form.updateValueAndValidity()

    }
  }
//crear o actualizar las tareas
  submit(){
    if(this.form.valid){
      if(this.task){
        this.updateTask()
      } else{
        this.createTask();
      }
    }
  }


  //Crear Tareas
  createTask(){
    let path = `users/${this.user.uid}`;

    this.utilsSvc.presentLoading();
    delete this.form.value.id;

    this.firebaseSvc.addSubcollection(path, 'tasks',this.form.value).then(res =>{
    
      this.utilsSvc.dismissMod({ success: true });

    this.utilsSvc.presentToast({
      message: 'Tarea Agregada',
      color: 'success',
      icon: 'checkmark-circle-outline',
      duration: 1500
    })
    this.utilsSvc.dismissLoading()
    }), error =>{
      this.utilsSvc.presentToast({
        message: 'Error a Al Agregadar Tarea',
        color: 'warning',
        icon: 'alert-circle-outline',
        duration: 5000
      })
      this.utilsSvc.dismissLoading()
    }
  }
   //actualizar Tareas
   updateTask(){
    let path = `users/${this.user.uid}/taks/${this.task.id}`;

    this.utilsSvc.presentLoading();
    delete this.form.value.id;

    this.firebaseSvc.updateDocument(path, this.form.value).then(res =>{
    
      this.utilsSvc.dismissMod({ success: true });

    this.utilsSvc.presentToast({
      message: 'Tarea Actualizada',
      color: 'success',
      icon: 'checkmark-circle-outline',
      duration: 1500
    })
    this.utilsSvc.dismissLoading()
    }), error =>{
      this.utilsSvc.presentToast({
        message: 'Error a Al Agregadar Tarea',
        color: 'warning',
        icon: 'alert-circle-outline',
        duration: 5000
      })
      this.utilsSvc.dismissLoading()
    }
  }



  getPercentage(){
    return this.utilsSvc.getPercentage(this.form.value as Task)
  }
  //cargar actividades
  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    this.form.value.items = ev.detail.complete(this.form.value.items);
    this.form.updateValueAndValidity();
  }
  //eliminar actividades
  removeItem(index: number){
    this.form.value.items.splice(index, 1);
    this.form.updateValueAndValidity();
  }
  //crear actividad
  createItem() {
    this.utilsSvc.presentAlert({
      header: 'Nueva actividad',
      backdropDismiss: false,
      inputs: [
        {
          name: 'name',
          type: 'textarea',
          placeholder: 'Hacer algo'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Agregar',
          handler: (res) => {
            res.name
            let item: Item = {name: res.name, completed: false};
            this.form.value.items.push(item);
            this.form.updateValueAndValidity();
          }
        }
      ]
    });
  }
}
