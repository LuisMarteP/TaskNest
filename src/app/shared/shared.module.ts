import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterEvent, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { LogoComponent } from './components/logo/logo.component';



@NgModule({
  declarations: [
    HeaderComponent,
    CustomInputComponent,
    LogoComponent
  ],
    
  exports: [
    HeaderComponent,
    CustomInputComponent,
    LogoComponent
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
