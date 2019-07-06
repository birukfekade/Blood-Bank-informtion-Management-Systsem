/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HospitalService } from './hospital.service';

describe('HospitalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HospitalService]
    });
  });

  it('should ...', inject([HospitalService], (service: HospitalService) => {
    expect(service).toBeTruthy();
  }));
});
