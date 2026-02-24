import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupSkillsPage } from './signup-skills.page';

describe('SignupSkillsPage', () => {
  let component: SignupSkillsPage;
  let fixture: ComponentFixture<SignupSkillsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupSkillsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
