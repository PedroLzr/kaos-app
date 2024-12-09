import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { defineCustomElements } from '@ionic/pwa-elements/loader';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));

//ESTO ES PARA EL PWA Y ASI PODER EJECUTAR ACCIONES NATIVAS DEL MOVIL EN EL BROWSER *remover en la version final*
// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);
