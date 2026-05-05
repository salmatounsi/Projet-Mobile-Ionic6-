import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminFreelancersPage } from './admin-freelancers.page';

describe('AdminFreelancersPage', () => {
  let component: AdminFreelancersPage;
  let fixture: ComponentFixture<AdminFreelancersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFreelancersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
