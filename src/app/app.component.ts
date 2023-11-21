import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
   //Llamando a la funcion de guardar tema
   private themeSvc: ThemeService

  ) {
    this.themeSvc.setInitialTheme()
  }
}
