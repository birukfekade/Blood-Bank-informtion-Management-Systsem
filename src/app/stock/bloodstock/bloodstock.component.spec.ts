/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BloodstockComponent } from './bloodstock.component';

describe('BloodstockComponent', () => {
  let component: BloodstockComponent;
  let fixture: ComponentFixture<BloodstockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodstockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
