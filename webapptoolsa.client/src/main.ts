import { AppComponent } from './app/app.component';
import { provideRouter, withHashLocation } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';



bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes,withHashLocation()),
    provideHttpClient()
  ]
}).catch(err => console.error(err));
