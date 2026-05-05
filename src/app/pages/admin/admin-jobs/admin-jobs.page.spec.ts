import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminJobsPage } from './admin-jobs.page';

describe('AdminJobsPage', () => {
  let component: AdminJobsPage;
  let fixture: ComponentFixture<AdminJobsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminJobsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
