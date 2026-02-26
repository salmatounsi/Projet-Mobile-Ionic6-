import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupExperiencePage } from './signup-experience.page';

describe('SignupExperiencePage', () => {
  let component: SignupExperiencePage;
  let fixture: ComponentFixture<SignupExperiencePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupExperiencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
