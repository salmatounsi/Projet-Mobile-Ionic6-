import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminProjectsPage } from './admin-projects.page';

describe('AdminProjectsPage', () => {
  let component: AdminProjectsPage;
  let fixture: ComponentFixture<AdminProjectsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProjectsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
