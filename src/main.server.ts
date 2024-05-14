import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { Logincomponet } from './app/login.component';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
