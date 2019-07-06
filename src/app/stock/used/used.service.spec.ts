/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UsedService } from './used.service';

describe('UsedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsedService]
    });
  });

  it('should ...', inject([UsedService], (service: UsedService) => {
    expect(service).toBeTruthy();
  }));
});
