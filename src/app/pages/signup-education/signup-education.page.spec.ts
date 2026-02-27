import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupEducationPage } from './signup-education.page';

describe('SignupEducationPage', () => {
  let component: SignupEducationPage;
  let fixture: ComponentFixture<SignupEducationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupEducationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
