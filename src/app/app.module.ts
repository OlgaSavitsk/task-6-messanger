import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@shared/modules/material/material.module';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [],
  imports: [BrowserModule, BrowserAnimationsModule, AppComponent, HttpClientModule],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
