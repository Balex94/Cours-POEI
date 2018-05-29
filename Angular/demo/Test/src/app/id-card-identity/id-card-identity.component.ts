import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-id-card-identity',
  templateUrl: './id-card-identity.component.html',
  styleUrls: ['./id-card-identity.component.css']
})
export class IdCardIdentityComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  age = 28;
  taille = '2m20';
  sexe = 'long';
  profession = 'chomeur';

}
