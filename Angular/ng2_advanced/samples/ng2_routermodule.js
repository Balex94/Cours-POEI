@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule, 
    HttpModule,
    RouterModule.forRoot([{path:"home", component: AppComponent} ])
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ], 
  providers:[]
})
export class AppModule { }
