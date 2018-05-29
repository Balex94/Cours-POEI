import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalog-component',
  templateUrl: './catalog-component.component.html',
  styleUrls: ['./catalog-component.component.css']
})
export class CatalogComponentComponent implements OnInit {

  public catalog: Array<Object>;
  constructor() {
    this.catalog = [
      { 
        titre: "Article 1",
        couleur: "rouge"
      },
      { 
        titre: "Article 2",
        couleur: "orange"
      },
      { 
        titre: "Article 3",
        couleur: "bleu"
      },
      { 
        titre: "Article 4",
        couleur: "vert"
      },
      { 
        titre: "Article 5",
        couleur: "bleu"
      },
      { 
        titre: "Article 6",
        couleur: "rouge"
      },
      { 
        titre: "Article 7",
        couleur: "orange"
      },
      { 
        titre: "Article 8",
        couleur: "vert"
      },
      { 
        titre: "Article 9",
        couleur: "bleu"
      },

    ]
  }

  ngOnInit() {
  }

}
