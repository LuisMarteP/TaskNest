import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterEvent, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { LogoComponent } from './components/logo/logo.component';
import { AddUpdateTaskComponent } from './components/add-update-task/add-update-task.component';



@NgModule({
  declarations: [
    HeaderComponent,
    CustomInputComponent,
    LogoComponent,
    AddUpdateTaskComponent
  ],
    
  exports: [
    HeaderComponent,
    CustomInputComponent,
    LogoComponent,
    AddUpdateTaskComponent
  ],

  imports: [
    CommonModule,
    //Importacion de Modulos
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule

  ]
})
export class SharedModule { }
