/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DonationcenterService } from './donationcenter.service';

describe('DonationcenterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DonationcenterService]
    });
  });

  it('should ...', inject([DonationcenterService], (service: DonationcenterService) => {
    expect(service).toBeTruthy();
  }));
});
