import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
 
  darkMode = new BehaviorSubject(false);

  constructor() { }
  //Guardar el modo seleccionado por el usuario
  setInitialTheme(){
    let darkMode = JSON.parse( localStorage.getItem('darkMode')); //Despues de guardar en local storage se convierte a boolean para ser usado.
    
    if (darkMode){
      this.setTheme(darkMode)
    }else {
      this.setTheme(darkMode)
    }
  }


  //Modo Oscuro
  setTheme(darkMode:boolean){
    if (darkMode){
      document.body.setAttribute('color-theme', 'dark')
    }else {
    document.body.setAttribute('color-theme', 'light')
  }
    this.darkMode.next(darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode)) //convertir el valor para guardarlo en el localstorage
  } 
}
