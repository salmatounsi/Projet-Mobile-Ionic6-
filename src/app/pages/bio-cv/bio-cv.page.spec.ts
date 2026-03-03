import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BioCvPage } from './bio-cv.page';

describe('BioCvPage', () => {
  let component: BioCvPage;
  let fixture: ComponentFixture<BioCvPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BioCvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
