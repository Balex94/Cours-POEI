import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdCardIdentityComponent } from './id-card-identity.component';

describe('IdCardIdentityComponent', () => {
  let component: IdCardIdentityComponent;
  let fixture: ComponentFixture<IdCardIdentityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdCardIdentityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdCardIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
