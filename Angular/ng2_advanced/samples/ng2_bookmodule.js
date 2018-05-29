import { NgModule }             from '@angular/core';
import {BookComponent }         from './book.component';
import {BookService}            from './book.service';

@NgModule({
  declarations:[BookComponent], 
  providers:[BookService]
})
export class BookModule {}
