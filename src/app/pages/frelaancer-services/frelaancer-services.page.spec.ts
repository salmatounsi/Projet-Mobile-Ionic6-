import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrelaancerServicesPage } from './frelaancer-services.page';

describe('FrelaancerServicesPage', () => {
  let component: FrelaancerServicesPage;
  let fixture: ComponentFixture<FrelaancerServicesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FrelaancerServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
