/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UsedComponent } from './used.component';

describe('UsedComponent', () => {
  let component: UsedComponent;
  let fixture: ComponentFixture<UsedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
