/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddbloodComponent } from './addblood.component';

describe('AddbloodComponent', () => {
  let component: AddbloodComponent;
  let fixture: ComponentFixture<AddbloodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbloodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbloodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
