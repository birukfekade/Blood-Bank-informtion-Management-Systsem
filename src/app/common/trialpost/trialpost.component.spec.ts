/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TrialpostComponent } from './trialpost.component';

describe('TrialpostComponent', () => {
  let component: TrialpostComponent;
  let fixture: ComponentFixture<TrialpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrialpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
