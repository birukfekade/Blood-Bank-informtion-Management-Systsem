/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DonationcenterComponent } from './donationcenter.component';

describe('DonationcenterComponent', () => {
  let component: DonationcenterComponent;
  let fixture: ComponentFixture<DonationcenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationcenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
