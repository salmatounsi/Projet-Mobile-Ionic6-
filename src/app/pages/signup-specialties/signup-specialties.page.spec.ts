import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupSpecialtiesPage } from './signup-specialties.page';

describe('SignupSpecialtiesPage', () => {
  let component: SignupSpecialtiesPage;
  let fixture: ComponentFixture<SignupSpecialtiesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupSpecialtiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
