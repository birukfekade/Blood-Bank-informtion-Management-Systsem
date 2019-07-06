/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BbimsComponent } from './bbims.component';

describe('BbimsComponent', () => {
  let component: BbimsComponent;
  let fixture: ComponentFixture<BbimsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BbimsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BbimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
