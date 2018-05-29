
// configuration d'une route au format REST indiquant une base fixe (details) 
// et une partie variable à récupérer (:id)
{path: 'detail/:id', component: JediComponent}

//.....
export class JediComponent implements OnInit {
ngOnInit(): void {
  this.route.paramMap
    .switchMap(
        (params: ParamMap) => console.log(params.get('id'))
    );
}