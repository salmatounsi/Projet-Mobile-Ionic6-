import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhatDydPage } from './what-dyd.page';

describe('WhatDydPage', () => {
  let component: WhatDydPage;
  let fixture: ComponentFixture<WhatDydPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatDydPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
