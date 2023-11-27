import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateTaskComponent } from 'src/app/shared/components/add-update-task/add-update-task.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  tasks: Task[] = []

  constructor(
    private firebaseSvc: FirebaseService, 
    private utilsSvc: UtilsService
  ) { }

  ngOnInit() {
  }

  //llamada a la consulta de la base de datos firebase
  ionViewWillEnter(){
    this.getTasks()
  }


//barra de porcentage
  getPercentage(task: Task){
    return this.utilsSvc.getPercentage(task)
  }
//Funcion de Agregar tareas
addOrUpdateTask(task?: Task){
  this.utilsSvc.presentModal({
    component: AddUpdateTaskComponent,
    componentProps: { task },
    cssClass: 'add-update-modal'
  })
}
//Consultar base de datos firebase
getTasks(){
  let user: User = this.utilsSvc.getElementFromLocalStorage('user')
  let path = 'users/${user.uid}'
  let sub = this.firebaseSvc.getSubcollection(path, 'tasks').subscribe({
    next: (res: Task[]) => {
      console.log(res);
      this.tasks = res
      sub.unsubscribe()
    }
  })
}

}
