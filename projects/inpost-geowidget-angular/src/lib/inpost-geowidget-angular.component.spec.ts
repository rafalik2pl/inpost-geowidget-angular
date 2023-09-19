import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InpostGeowidgetAngularComponent } from './inpost-geowidget-angular.component';

describe('InpostGeowidgetAngularComponent', () => {
  let component: InpostGeowidgetAngularComponent;
  let fixture: ComponentFixture<InpostGeowidgetAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InpostGeowidgetAngularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InpostGeowidgetAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
