beforeEach(() => {
  TestBed.configureTestingModule({
     declarations: [ WarriorComponent ],
     providers:    [ WarriorService ],
  });

  fixture = TestBed.createComponent(WarriorComponent);
  comp    = fixture.componentInstance;
  service = fixture.debugElement.injector.get(WarriorService);

  spy = spyOn(service, 'getAll')
        .and.returnValue(Promise.resolve(
            [{"name": "skywalker", "surname": "anakin"}]
        ));

  // WarriorComponent.refresh callas WarriorService.getAll()
  // and fills his public "warriors" property
  comp.refresh();

  expect(comp.warriors.length).toBeGreatThan(0);
});