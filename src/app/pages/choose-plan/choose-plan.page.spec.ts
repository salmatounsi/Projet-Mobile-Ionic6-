import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChoosePlanPage } from './choose-plan.page';

describe('ChoosePlanPage', () => {
  let component: ChoosePlanPage;
  let fixture: ComponentFixture<ChoosePlanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosePlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
