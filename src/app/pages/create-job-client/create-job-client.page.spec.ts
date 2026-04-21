import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateJobClientPage } from './create-job-client.page';

describe('CreateJobClientPage', () => {
  let component: CreateJobClientPage;
  let fixture: ComponentFixture<CreateJobClientPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateJobClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
