/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DonateService } from './donate.service';

describe('DonateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DonateService]
    });
  });

  it('should ...', inject([DonateService], (service: DonateService) => {
    expect(service).toBeTruthy();
  }));
});
