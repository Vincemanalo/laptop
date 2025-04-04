import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalinfoEmpComponent } from './modalinfoemp.component';

describe('ModalinfoEmpComponent', () => {
  let component: ModalinfoEmpComponent;
  let fixture: ComponentFixture<ModalinfoEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalinfoEmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalinfoEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
