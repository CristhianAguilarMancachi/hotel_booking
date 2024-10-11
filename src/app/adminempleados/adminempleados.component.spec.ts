import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminempleadosComponent } from './adminempleados.component';

describe('AdminempleadosComponent', () => {
  let component: AdminempleadosComponent;
  let fixture: ComponentFixture<AdminempleadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminempleadosComponent]
    });
    fixture = TestBed.createComponent(AdminempleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
