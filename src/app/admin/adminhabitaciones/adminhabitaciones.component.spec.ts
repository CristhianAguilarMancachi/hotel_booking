import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminhabitacionesComponent } from './adminhabitaciones.component';

describe('AdminhabitacionesComponent', () => {
  let component: AdminhabitacionesComponent;
  let fixture: ComponentFixture<AdminhabitacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminhabitacionesComponent]
    });
    fixture = TestBed.createComponent(AdminhabitacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
