/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GetbloodComponent } from './getblood.component';

describe('GetbloodComponent', () => {
  let component: GetbloodComponent;
  let fixture: ComponentFixture<GetbloodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetbloodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetbloodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
