import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpromocionesComponent } from './adminpromociones.component';

describe('AdminpromocionesComponent', () => {
  let component: AdminpromocionesComponent;
  let fixture: ComponentFixture<AdminpromocionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminpromocionesComponent]
    });
    fixture = TestBed.createComponent(AdminpromocionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
