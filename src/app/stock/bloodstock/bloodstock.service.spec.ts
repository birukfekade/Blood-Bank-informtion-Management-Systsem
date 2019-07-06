/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BloodstockService } from './bloodstock.service';

describe('BloodstockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BloodstockService]
    });
  });

  it('should ...', inject([BloodstockService], (service: BloodstockService) => {
    expect(service).toBeTruthy();
  }));
});
