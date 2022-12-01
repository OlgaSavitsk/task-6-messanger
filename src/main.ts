import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app/app-routing.module';
import { AppComponent } from './app/app.component';

import { AppModule } from './app/app.module';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(AppModule), provideRouter(appRoutes)],
}).catch((err) => console.error(err));
