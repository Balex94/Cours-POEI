import {NgModule } from '@angular/core';
import {BookModule} from './book.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BookModule],
  providers:[],
  bootstrap: [AppComponent]
})
export class AppModule { }