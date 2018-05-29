import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IdCardIdentityComponent } from './id-card-identity/id-card-identity.component';

@NgModule({
  declarations: [
    AppComponent,
    IdCardIdentityComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
