import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminFreelancerDetailPage } from './admin-freelancer-detail.page';

describe('AdminFreelancerDetailPage', () => {
  let component: AdminFreelancerDetailPage;
  let fixture: ComponentFixture<AdminFreelancerDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFreelancerDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
