import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Logincomponet } from './app/login.component';
import { LayoutComponent } from './app/layout.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
