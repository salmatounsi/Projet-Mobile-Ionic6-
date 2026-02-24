import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupLanguagesPage } from './signup-languages.page';

describe('SignupLanguagesPage', () => {
  let component: SignupLanguagesPage;
  let fixture: ComponentFixture<SignupLanguagesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupLanguagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
