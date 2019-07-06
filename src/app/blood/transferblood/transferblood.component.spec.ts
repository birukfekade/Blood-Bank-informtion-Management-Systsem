/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TransferbloodComponent } from './transferblood.component';

describe('TransferbloodComponent', () => {
  let component: TransferbloodComponent;
  let fixture: ComponentFixture<TransferbloodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferbloodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferbloodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
